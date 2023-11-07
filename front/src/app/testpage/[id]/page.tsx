// generateStaticParams 함수의 반환 타입을 정확히 지정합니다.
export function generateStaticParams(
  ids: any[] | undefined
): { params: any }[] {
  if (!Array.isArray(ids) || ids.length === 0) {
    return [];
  }

  return ids.map((id) => ({ params: { id: String(id) } }));
}

// Page 컴포넌트에서 params의 타입을 정확히 지정합니다.
export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  return <div>{id} 페이지입니다.</div>;
}
