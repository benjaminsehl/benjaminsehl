import {Link} from '@remix-run/react';
import {ProfileData} from '~/root';

interface PageLayoutProps {
  profile: ProfileData;
  children?: React.ReactNode;
}

export function PageLayout({profile, children = null}: PageLayoutProps) {
  const {user} = profile;
  return (
    <main className="flex flex-col max-w-3xl min-h-[100svh] gap-8 px-4 py-8 mx-auto sm:py-12 sm:px-8 sm:gap-12 md:gap-16 lg:gap-20 md:px-12 md:py-16 lg:py-20">
      <header className="flex items-center justify-between gap-8 animate-fadeIn">
        <div className="grid font-sans">
          <h1 className="font-medium text-darkGray dark:text-offWhite">
            <Link to="/">{user.name}</Link>
          </h1>
          <p className="text-lightGray">{user.bio}</p>
          <p className="text-lightGray">{user.location}</p>
        </div>
        <img
          className="w-20 h-20 rounded-full mix-blend-luminosity animate-fadeIn animation-delay-200"
          src={user.avatarUrl}
          alt={user.name}
        />
      </header>

      <div className="flex-grow animate-fadeIn animation-delay-400">{children}</div>

      <footer className="grid justify-start gap-4 text-sm text-gray animate-fadeIn animation-delay-600">
        <p>
          Get in touch:{` `}
          <a
            className="border-b dark:border-gray"
            href={`https://x.com/${user.twitter}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            @{user.twitter}
          </a>
        </p>
      </footer>
    </main>
  );
}
