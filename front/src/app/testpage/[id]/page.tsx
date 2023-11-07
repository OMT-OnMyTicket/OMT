// export function generateStaticParams() {
//   return [{ id: '1' }, { id: '2' }, { id: '3' }];
// }

// export default function Page({ params }: { params: { id: string } }) {
//   const { id } = params;
//   return <div>{id} 페이지입니다.</div>;
// }
export default function Page({ params }: { params: { id: string } }) {
  return <div>My Post: {params.id}</div>;
}
