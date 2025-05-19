import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, type MetaFunction} from '@remix-run/react';
import {marked} from 'marked';

export const meta: MetaFunction<typeof loader> = ({data, error}) => {
  if (error) {
    return [
      {title: 'Error | Benjamin Sehl'},
      {name: 'description', content: 'There was an error loading the page.'},
    ];
  }

  if (!data) {
    return [
      {title: 'Benjamin Sehl'},
      {name: 'description', content: 'Personal website of Benjamin Sehl'},
    ];
  }

  return [
    // Basic metadata
    {title: `${data.user.name} · ${data.user.bio}`},
    {name: 'description', content: data.seo.description},

    // Canonical URL
    {tagName: 'link', rel: 'canonical', href: data.seo.web},

    // Open Graph metadata
    {property: 'og:url', content: data.seo.web},
    {property: 'og:type', content: 'website'},
    {property: 'og:title', content: `${data.user.name} · ${data.user.bio}`},
    {property: 'og:description', content: data.seo.description},
    {property: 'og:image', content: data.seo.ogImage},

    // Twitter metadata
    {name: 'twitter:card', content: 'summary_large_image'},
    {name: 'twitter:title', content: `${data.user.name} · ${data.user.bio}`},
    {name: 'twitter:description', content: data.seo.description},
    {name: 'twitter:image', content: data.seo.ogImage},
    {name: 'twitter:creator', content: `@${data.user.handle}`},

    // JSON-LD Person schema
    {
      'script:ld+json': {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: data.user.name,
        description: data.user.bio,
        image: data.user.avatarUrl,
        email: data.user.email,
        jobTitle: 'Product Director',
        affiliation: {
          '@type': 'Organization',
          name: 'Kotn',
        },
        worksFor: {
          '@type': 'Organization',
          name: 'Shopify',
        },
        award: 'Forbes 30 Under 30: Retail and Ecommerce',
        sameAs: [
          `https://x.com/${data.user.handle}`,
          `https://instagram.com/${data.user.handle}`,
          `https://github.com/${data.user.handle}`,
          `https://linkedin.com/in/${data.user.handle}`,
          `https://youtube.com/@${data.user.handle}`,
          `https://threads.net/@${data.user.handle}`,
        ],
        url: data.seo.web,
        height: '183cm',
        weight: '80kg',
        gender: 'male',
        nationality: 'Canadian',
        hasOccupation: {
          '@type': 'Occupation',
          name: 'Product Director',
          responsibilities: 'Lead the Online Store product area for Shopify',
        },
        hasMerchantReturnPolicy: {
          '@type': 'MerchantReturnPolicy',
          applicableCountry: 'CA',
          returnFees: 'Free return shipping',
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Toronto',
          addressRegion: 'ON',
          addressCountry: 'Canada',
        },
      },
    },
  ];
};

export async function loader({context}: LoaderFunctionArgs) {
  const data = {
    user: {
      avatarUrl:
        'https://avatars.githubusercontent.com/u/1060770?u=5c7dd87e798317d89a5bc5ece63ceb54325d8d23&v=4',
      bio: 'Product Generalist',
      company: '@Shopify',
      location: 'Toronto, Canada',
      name: 'Benjamin Sehl',
      email: 'ben@sehl.ca',
      handle: 'benjaminsehl',
    },
    seo: {
      ogImage:
        'https://repository-images.githubusercontent.com/444474533/c3a34d3e-8ee8-4af9-9ef4-dad5d0e0ad53',
      description:
        'Ben is the Product Director of Online Store at Shopify, and cofounder of Kotn and Margin.',
      web: 'https://sehl.ca',
    },
    content: {
      readme: {
        text: `I'm Ben Sehl. Product Director for Online Store at Shopify, and cofounder of [Kotn](https://kotn.com) and [Margin](https://margin.global). Previously, I've worked across design, development, marketing, and strategy.

Besides work, I'm a dad of two, which takes up basically all of my free time—though I try to run or strength train daily. I also like working on my home, doing yard work, and other typical dad things.`,
      },
    },
  };

  return {...data};
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  return (
    <section
      className="font-serif markdown md:text-xl text-darkGray dark:text-offWhite"
      dangerouslySetInnerHTML={{
        __html: marked.parse(data.content.readme.text),
      }}
    />
  );
}
