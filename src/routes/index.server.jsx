import { fetchSync, CacheLong, gql } from "@shopify/hydrogen";
import { marked } from "marked";
import Layout from "../components/Layout.server";
export default function Home() {
  const GITHUB_TOKEN = Oxygen.env.GITHUB_TOKEN;

  const { data } = fetchSync("https://api.github.com/graphql", {
    method: "POST",
    body: JSON.stringify({
      query: PROFILE_QUERY,
      variables: { username: "benjaminsehl" },
    }),
    headers: {
      "content-type": "application/json",
      Authorization: `bearer ${GITHUB_TOKEN}`,
    },
    cache: CacheLong(),
  }).json();

  const { user, seo, content } = data;

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
