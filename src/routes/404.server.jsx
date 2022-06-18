import { useQuery, gql, Link } from "@shopify/hydrogen";
import Layout from "../components/Layout.server";

export default function NotFound() {
  const GITHUB_USERNAME = "benjaminsehl";
  const GITHUB_TOKEN = Oxygen.env.GITHUB_TOKEN;

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
    });
    return await response.json();
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
        text: "I’m Ben Sehl. A mid-thirties guy living and working in Toronto with my wife, Mackenzie; son, Emmett; and dog, Dash. \n\nAn advocate of lifelong learning, I studied semiotics and fine arts in school, then learned from the team at Bruce Mau Design about graphic design, brand architecture, systems thinking, and how to make a polished presentation. I’ve since taken crash courses in data science and web development. Mostly though, I learn on my own by reading and tinkering. \n\nThrough my career, I’ve been a designer (of graphics, experiences, products & services), a web and software developer, a growth marketer, a brand strategist and an analytics engineer, as well as a team leader and founder*. Through teenage years, I worked in manufacturing, customer support, and retail sales (not to mention landscaping, DJing, security monitoring, and ski coaching.)\n\nNow I make a living by using my experience and perspective, centred around commerce and technology, to create products that fuel entrepreneurship.\n\nMost people outside of friends and family know me for co-founding [Kotn](https://github.com/kotn)—an apparel and home goods company, which I was spending all of my time on from 2014 through 2021. Now I lead product for [Hydrogen](https://github.com/shopify/hydrogen) at [Shopify](https://shopify.com). Recently I’ve begun working on side-projects under the alias [Incremental Studio](https://github.com/incremental-studio). I also help a few consumer brands that I really believe in, by advising on ecommerce, analytics, and strategy—and by connecting them with great people. \n\n_*Mileage across competencies may vary._\n",
      },
    },
  };

  const { user, seo } = data || staleData;

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
