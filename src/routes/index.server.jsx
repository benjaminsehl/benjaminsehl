import Content from "../components/index.client";

export default function Home() {
  return (
    <div className="flex items-center min-h-screen p-4 mx-auto font-serif prose-p:mb-3 prose-a:border-opacity-25 prose-a:italic prose-a:border-b max-w-prose dark:prose-invert prose-p:leading-normal lg:prose-lg xl:prose-xl just md:p-6 lg:p-8 xl:p-12">
      <Content />
    </div>
  );
}
