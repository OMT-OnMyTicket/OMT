type PageParams = {
  slug: string;
};

export async function generateStaticParams() {
  const posts = await fetch('https://.../testpage').then((res) => res.json());

  return posts.map((post: any) => ({
    slug: post.slug
  }));
}

export default function Page({ params }: { params: { slug: string } }) {
  return <div>My Post: {params.slug}</div>;
}
