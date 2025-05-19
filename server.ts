// Virtual entry point for the app
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import * as remixBuild from 'virtual:remix/server-build';
import {storefrontRedirect} from '@shopify/hydrogen';
import {createRequestHandler} from '@shopify/remix-oxygen';
import {createAppLoadContext} from '~/lib/context';

/**
 * Export a fetch handler in module format.
 */
export default {
  async fetch(
    request: Request,
    env: Env,
    executionContext: ExecutionContext,
  ): Promise<Response> {
    try {
      const appLoadContext = await createAppLoadContext(
        request,
        env,
        executionContext,
      );

      /**
       * Create a Remix request handler and pass
       * Hydrogen's Storefront client to the loader context.
       */
      const handleRequest = createRequestHandler({
        build: remixBuild,
        mode: process.env.NODE_ENV,
        getLoadContext: () => appLoadContext,
      });

      const response = await handleRequest(request);

      if (appLoadContext.session.isPending) {
        response.headers.set(
          'Set-Cookie',
          await appLoadContext.session.commit(),
        );
      }

      if (response.status === 404) {
        /**
         * Check for redirects only when there's a 404 from the app.
         * If the redirect doesn't exist, then `storefrontRedirect`
         * will pass through the 404 response.
         */
        return storefrontRedirect({
          request,
          response,
          storefront: appLoadContext.storefront,
        });
      }

      // Make sure we're not modifying the original response headers object
      const headers = new Headers(response.headers);

      // Ensure response is eligible for Oxygen full-page caching
      // based on the headers set in loaders
      const oxygenCacheControl = headers.get('Oxygen-Cache-Control');
      const varyHeader = headers.get('Vary');

      // Verify the response is a GET request with appropriate status
      if (
        request.method === 'GET' &&
        (response.status >= 200 && response.status < 400) &&
        oxygenCacheControl &&
        oxygenCacheControl.includes('public') &&
        varyHeader
      ) {
        // Headers are already set correctly in the response
        return response;
      } else if (headers.get('Oxygen-Full-Page-Cache') === 'uncacheable') {
        console.log('Response is marked as uncacheable. Checking why:');
        if (request.method !== 'GET') console.log('- Not a GET request');
        if (!(response.status >= 200 && response.status < 400)) console.log('- Status code not 2XX or 3XX');
        if (!oxygenCacheControl) console.log('- Missing Oxygen-Cache-Control header');
        if (oxygenCacheControl && !oxygenCacheControl.includes('public')) console.log('- Oxygen-Cache-Control missing public directive');
        if (!varyHeader) console.log('- Missing Vary header');
        if (headers.has('Set-Cookie')) console.log('- Has Set-Cookie header');
      }

      return response;
    } catch (error) {
      console.error(error);
      return new Response('An unexpected error occurred', {status: 500});
    }
  },
};
