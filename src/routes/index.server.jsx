import { Suspense } from "react";
import Page from "../components/Page.client";

export default function Home() {
  return (
    <Suspense fallback={<Fallback />}>
      <Page />
    </Suspense>
  );
}

function Fallback() {
  return (
    <main className="flex flex-col max-w-3xl min-h-screen gap-8 px-4 py-8 mx-auto sm:py-12 sm:px-8 sm:gap-12 md:gap-16 lg:gap-20 md:px-12 md:py-16 lg:py-20">
      <header className="flex items-center justify-between gap-8">
        <div className="grid gap-2 font-sans text-transparent">
          <h1 className="font-medium leading-4 rounded bg-darkGray dark:text-offWhite">
            Benjamin Sehl
          </h1>
          <p className="leading-4 rounded bg-lightGray">Product Generalist</p>
          <p className="leading-4 rounded bg-lightGray">Toronto, Canada</p>
        </div>
        <div className="w-20 h-20 rounded-full mix-blend-luminosity bg-lightGray" />
      </header>

      <div className="flex-grow">
        <section className="font-serif markdown md:text-xl text-darkGray dark:text-offWhite">
          <p>Loading…</p>
        </section>
      </div>

      <footer className="grid justify-start gap-4 text-sm text-gray">
        <h3 className="font-medium text-transparent">Contact:</h3>
        <dl className="grid grid-flow-row grid-cols-2 gap-2">
          <dt>Twitter:</dt>
          <dd>
            <span className="rounded dark:border-gray bg-darkGrey dark:bg-offWhite">
              @benjaminsehl
            </span>
          </dd>
          <dt>Email:</dt>
          <dd>
            <span className="rounded dark:border-gray bg-darkGrey dark:bg-offWhite">
              ben@sehl.ca
            </span>
          </dd>
        </dl>
      </footer>
    </main>
  );
}
