export function generateStaticParams(ids: any[] | undefined) {
  if (!Array.isArray(ids)) {
    // 만약 ids가 배열이 아니라면 빈 배열을 반환하거나 다른 처리를 할 수 있습니다.
    return [];
  }

  return ids.map((id) => ({ id }));
}

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  return <div>{id} 페이지입니다.</div>;
}
