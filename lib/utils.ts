import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {format} from 'date-fns' 
import { Metadata } from "next"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL as string}${path}`
}

export function ReverseString(str : string) {
  return str.split('').reverse().join('')
}
export function timeFormat(date : Date) {

      const d = new Date(date);

      const result = format(d, 'dd/MM/yyyy');
      return result
}



export function constructMetadata({
  title = "Nextjs MDX Starter",
  description = "A Nextjs - MDX with contentlayer starter  ",
  // this will used for constructing an og stuff from your normal or catch all page
  image = `${process.env.BASE_URL}/og.png`,
}: {
  title?: string;
  description?: string;
  image?: string;
}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: '@shadcn',
    },
    icons: "/favicon.ico",
    metadataBase: new URL(`${process.env.BASE_URL}`),
    themeColor: "#000",
  };
}
    