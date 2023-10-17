type PageParams = {
  slug: string;
};

export default function page({ params }: { params: PageParams }) {
  console.log({ params });
  return <div>테스트페이지입니다.</div>;
}
