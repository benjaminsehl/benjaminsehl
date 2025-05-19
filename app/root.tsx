import {Analytics, getShopAnalytics, useNonce} from '@shopify/hydrogen';
import {data, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {
  Outlet,
  useRouteError,
  isRouteErrorResponse,
  type ShouldRevalidateFunction,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from '@remix-run/react';
import favicon from '~/assets/favicon.svg';
import appStyles from '~/styles/app.css?url';
import {PageLayout} from './components/PageLayout';

export type RootLoader = typeof loader;

export const shouldRevalidate: ShouldRevalidateFunction = ({
  formMethod,
  currentUrl,
  nextUrl,
}) => {
  if (formMethod && formMethod !== 'GET') return true;

  if (currentUrl.toString() === nextUrl.toString()) return true;

  return false;
};

export function links() {
  return [
    {
      rel: 'preconnect',
      href: 'https://cdn.shopify.com',
    },
    {
      rel: 'preconnect',
      href: 'https://shop.app',
    },
    {rel: 'icon', type: 'image/svg+xml', href: favicon},
  ];
}

export async function loader({context}: LoaderFunctionArgs) {
  const {storefront, env} = context;

  const profile: ProfileData = {
    user: {
      avatarUrl:
        'https://avatars.githubusercontent.com/u/1060770?u=5c7dd87e798317d89a5bc5ece63ceb54325d8d23&v=4',
      bio: 'Product Generalist',
      company: '@Shopify',
      location: 'Toronto, Canada',
      name: 'Benjamin Sehl',
      email: 'ben@sehl.ca',
      twitter: 'benjaminsehl',
    },
    seo: {
      ogImage:
        'https://repository-images.githubusercontent.com/444474533/c3a34d3e-8ee8-4af9-9ef4-dad5d0e0ad53',
      description:
        'Ben lives in Toronto with his wife, son, and dog. Practices product strategy, design, and development. Likes to learn, exercise, and make stuff.',
      web: 'https://sehl.ca',
    },
    content: {
      readme: {
        text: `I'm Ben Sehl. Product Director for Online Store at Shopify, dad of two, Torontonian, tinkerer.

I've worked in various roles, including design, development, marketing, and strategy. I co-founded a brand called [Kotn](https://kotn.com), working on everything to do with digital and the customer experience. At the beginning of 2022 I joined Shopify and led [Hydrogen & Oxygen](https://hydrogen.shopify.dev/) — taking it from zero to one, scaling to >$1B GMV in under a year, and continuing to more than double growth for 3 years. I now lead Online Store, where I'm working to make it simple for anyone to get what's in their head onto the web. I'm also building [Margin](https://margin.global) with my friend Drew, and sometimes when my kids are napping I'll chip away on [other ideas](https://naptime.work).`,
      },
    },
  };

  return data(
    {
      profile,
      publicStoreDomain: env.PUBLIC_STORE_DOMAIN,
      shop: getShopAnalytics({
        storefront,
        publicStorefrontId: env.PUBLIC_STOREFRONT_ID,
      }),
      consent: {
        checkoutDomain: env.PUBLIC_CHECKOUT_DOMAIN,
        storefrontAccessToken: env.PUBLIC_STOREFRONT_API_TOKEN,
        withPrivacyBanner: false,
        // localize the privacy banner
        country: storefront.i18n.country,
        language: storefront.i18n.language,
      },
    },
    {
      headers: {
        'Oxygen-Cache-Control':
          'public, max-age=31536000, stale-while-revalidate=600',
        Vary: 'Accept-Encoding, Accept-Language',
      },
    },
  );
}

export function Layout({children}: {children?: React.ReactNode}) {
  const nonce = useNonce();
  const data = useRouteLoaderData<RootLoader>('root');

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="stylesheet" href={appStyles}></link>
        <Meta />
        <Links />
      </head>
      <body>
        {data ? (
          <Analytics.Provider
            cart={null}
            shop={data.shop}
            consent={data.consent}
          >
            <PageLayout {...data}>{children}</PageLayout>
          </Analytics.Provider>
        ) : (
          children
        )}
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();
  let errorMessage = 'Unknown error';
  let errorStatus = 500;

  if (isRouteErrorResponse(error)) {
    errorMessage = error?.data?.message ?? error.data;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="route-error">
      <h1>Oops</h1>
      <h2>{errorStatus}</h2>
      {errorMessage && (
        <fieldset>
          <pre>{errorMessage}</pre>
        </fieldset>
      )}
    </div>
  );
}

export type ProfileData = {
  user: {
    avatarUrl: string;
    bio: string;
    company: string;
    location: string;
    name: string;
    email: string;
    twitter: string;
  };
  seo: {
    ogImage: string;
    description: string;
    web: string;
  };
  content: {
    readme: {
      text: string;
    };
  };
};
