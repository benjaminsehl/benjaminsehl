import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, type MetaFunction} from '@remix-run/react';
import { marked } from "marked";

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [
    {
      title: `${data?.user.name} · ${data?.user.bio}`,
      description: data?.seo.description,
      'og:url': data?.seo.web,
      'og:type': 'website',
      'og:title': `${data?.user.name} · ${data?.user.bio}`,
      'og:description': data?.seo.description,
      'og:image': data?.seo.ogImage,
      'twitter:card': 'summary_large_image',
      'twitter:title': `${data?.user.name} · ${data?.user.bio}`,
      'twitter:description': data?.seo.description,
      'twitter:image': data?.seo.ogImage,
      'twitter:creator': `@${data?.user.twitter}`,
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
      twitter: '@benjaminsehl',
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
        text: `I’m Ben Sehl. Product Director for Online Store at Shopify, and cofounder of [Kotn](https://kotn.com) and [Margin](https://margin.global). Previously, I've worked across design, development, marketing, and strategy.

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
