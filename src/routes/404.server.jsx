import { fetchSync, gql, Link } from "@shopify/hydrogen";
import Layout from "../components/Layout.server";

export default function NotFound() {
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
  }).json();

  const { user, seo } = data;

  return (
    <Layout user={user} seo={seo}>
      <section className="font-serif markdown md:text-xl text-darkGray dark:text-offWhite">
        <p>
          Sorry, can’t find that. Simple site — 
          <Link to="/">just click here.</Link>
        </p>
      </section>
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
  }
`;
