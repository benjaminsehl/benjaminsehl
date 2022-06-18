import { Head, Link } from "@shopify/hydrogen";

export default function Layout({ user, seo, children }) {
  return (
    <>
      <Head>
        <title>
          {user.name} · {user.bio}
        </title>
        <meta name="description" content={seo.description} />
        <meta property="og:image" content={seo.ogImage} />
        <link rel="canonical" href={seo.web} />
      </Head>
      <main className="flex flex-col max-w-3xl min-h-screen gap-8 px-4 py-8 mx-auto sm:py-12 sm:px-8 sm:gap-12 md:gap-16 lg:gap-20 md:px-12 md:py-16 lg:py-20">
        <header className="flex items-center justify-between gap-8">
          <div className="grid font-sans">
            <h1 className="font-medium text-darkGray dark:text-offWhite">
              <Link to="/">{user.name}</Link>
            </h1>
            <p className="text-lightGray">{user.bio}</p>
            <p className="text-lightGray">{user.location}</p>
          </div>
          <img
            className="w-20 h-20 rounded-full mix-blend-luminosity"
            src={user.avatarUrl}
            alt={user.name}
          />
        </header>

        <div className="flex-grow">{children}</div>

        <footer className="grid justify-start gap-4 text-sm text-gray">
          <h3 className="font-medium text-darkGrey dark:text-offWhite">
            Contact:
          </h3>
          <dl className="grid grid-flow-row grid-cols-2 gap-2">
            <dt>Twitter:</dt>
            <dd>
              <a
                className="border-b dark:border-gray"
                href={`https://twitter.com/${user.twitter}`}
              >
                @{user.twitter}
              </a>
            </dd>
            <dt>Email:</dt>
            <dd>
              <a
                className="border-b dark:border-gray"
                href={`mailto:${user.email}`}
              >
                {user.email}
              </a>
            </dd>
          </dl>
        </footer>
      </main>
    </>
  );
}
