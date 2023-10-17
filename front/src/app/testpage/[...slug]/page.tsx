type PageParams = {
  slug: string;
};
export function generateStaticParams() {
  return [{ slug: ['a', '1'] }, { slug: ['b', '2'] }, { slug: ['c', '3'] }];
}

export default function Page({ params }: { params: { slug: string[] } }) {
  const { slug } = params;
  return (
    <div>
      <div>테스트 페이지입니다. </div>
    </div>
  );
}
