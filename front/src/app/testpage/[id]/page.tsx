export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  return <div>{id} 페이지입니다.</div>;
}
