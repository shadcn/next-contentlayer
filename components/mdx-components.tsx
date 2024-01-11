import NextImage, { ImageProps } from "next/image"
import { useMDXComponent } from "next-contentlayer/hooks"

const Image = (props: ImageProps) => {
  return <NextImage {...props} />;
};

const components = {
  Image,
}

interface MdxProps {
  code: string
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code)

  return <Component components={components} />
}
