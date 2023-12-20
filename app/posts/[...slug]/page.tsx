import { notFound } from "next/navigation";
import { allPosts, allAuthors } from "contentlayer/generated";

import { Metadata } from "next";
import { Mdx } from "@/components/mdx-components";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface PostProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = allPosts.find((post) => post.slugAsParams === slug);

  if (!post) {
    null;
  }

  return post;
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params);
  const authors = post!.authors.map((author) =>
    allAuthors.find(({ slug }) => slug === `/authors/${author}`)
  );

  if (!post) {
    notFound();
  }

  return (
    <div className="container font-heading2 relative max-w-4xl py-6 gap-2">
      <article className="py-6 prose dark:prose-invert overflow-x-hidden">
        <h1 className="mb-2">{post.title}</h1>

        {post.description && (
          <p className="text-xl mt-0 text-slate-700 dark:text-slate-200">
            {post.description}
          </p>
        )}
        {post.date && (
          <time
            dateTime={post.date}
            className="block text-sm text-gray-300/80 mx-auto"
          >
            {formatDate(post.date)}
          </time>
        )}

        <hr className="my-4" />

        <Mdx code={post.body.code} />
      </article>
      <hr className="my-4" />
      <p className="text-center mb-2">Published by</p>
      {authors?.length ? (
        <div className="mt-0 flex space-x-1 flex-col justify-center items-center gap-0">
          {authors.map((author) =>
            author ? (
              <div
                key={author._id}
                className="flex flex-col gap-2 justify-center items-center"
              >
                <Link
                  key={author._id}
                  href={`https://twitter.com/${author.twitter}`}
                  className="flex items-center space-x-2 text-sm"
                >
                  <Image
                    src={author.avatar!}
                    alt={author.name!}
                    width={42}
                    height={42}
                    className="rounded-full bg-white"
                  />
                  <br />
                  <div className=" text-left leading-tight">
                    <p className="font-medium underline-none">{author.name}</p>
                    <p className="text-[12px] text-muted-foreground">
                      @{author.twitter}
                    </p>
                  </div>
                </Link>
                <p className="text-gray-300/80">{author.description}</p>
              </div>
            ) : null
          )}
        </div>
      ) : null}
    </div>
  );
}
