import {
  CacheLong,
  gql,
  ShopifyAnalyticsConstants,
  useQuery,
  useServerAnalytics,
  useShopQuery,
} from "@shopify/hydrogen";
import { marked } from "marked";
import Layout from "../components/Layout.server";
export default function Home() {
  const GITHUB_USERNAME = "benjaminsehl";
  const GITHUB_TOKEN = Oxygen.env.GITHUB_TOKEN;

  const {
    data: {
      shop: {
        id,
        paymentSettings: { currencyCode },
      },
    },
  } = useShopQuery({
    query: SHOP_QUERY,
    cache: CacheLong(),
    preload: "*",
  });

  const { data } = useQuery(["github", GITHUB_USERNAME], async () => {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      body: JSON.stringify({
        query: PROFILE_QUERY,
        variables: { username: GITHUB_USERNAME },
      }),
      headers: {
        "content-type": "application/json",
        Authorization: `bearer ${GITHUB_TOKEN}`,
      },
      cache: CacheLong(),
      preload: "*",
    });
    return await response.json();
  });

  useServerAnalytics({
    shopify: {
      shopId: id,
      currency: currencyCode,
      pageType: ShopifyAnalyticsConstants.pageType.home,
    },
  });

  const staleData = {
    user: {
      avatarUrl:
        "https://avatars.githubusercontent.com/u/1060770?u=5c7dd87e798317d89a5bc5ece63ceb54325d8d23&v=4",
      bio: "Product Generalist",
      company: "@Shopify",
      location: "Toronto, Canada",
      name: "Benjamin Sehl",
      email: "ben@sehl.ca",
      twitter: "benjaminsehl",
    },
    seo: {
      ogImage:
        "https://repository-images.githubusercontent.com/444474533/c3a34d3e-8ee8-4af9-9ef4-dad5d0e0ad53",
      description:
        "Ben lives in Toronto with his wife, son, and dog. Practices product strategy, design, and development. Likes to learn, exercise, and make stuff.",
      web: "https://sehl.ca",
    },
    content: {
      readme: {
        text: `I'm Ben Sehl, a Torontonian dad, and a Product Manager at Shopify. 
        
I've worked in various roles, including design, development, marketing, and strategy. I co-founded a brand called [Kotn](https://kotn.com) with my wife and oldest friend, and worked on all things digital. At Shopify, I'm working on [Hydrogen](https://h2o.shop) as a PM, trying to make it more fun to build websites. Nights and weekends, I spend time working on [Margin](https://margin.global), a premium skincare company, and push forward on some [side projects](https://incremental.studio).`,
      },
    },
  };

  const { user, seo, content } = data || staleData;

  return (
    <Layout user={user} seo={seo}>
      <section
        className="font-serif markdown md:text-xl text-darkGray dark:text-offWhite"
        dangerouslySetInnerHTML={{
          __html: marked.parse(content.readme.text),
        }}
      />
    </Layout>
  );
}

const PROFILE_QUERY = gql`
  query Profile($username: String!) {
    user(login: $username) {
      avatarUrl
      bio
      company
      location
      name
      email
      twitter: twitterUsername
    }
    seo: repository(name: $username, owner: $username) {
      ogImage: openGraphImageUrl
      description
      web: homepageUrl
    }
    content: repository(name: $username, owner: $username) {
      readme: object(expression: "main:README.md") {
        ... on Blob {
          text
        }
      }
    }
  }
`;

const SHOP_QUERY = gql`
  query shopInfo {
    shop {
      id
      paymentSettings {
        currencyCode
      }
    }
  }
`;
