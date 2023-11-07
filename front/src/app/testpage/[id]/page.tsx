type MovieState = {
  movieTitle: string[];
  movieSeq: string[];
  movieId: string[];
};

export function generateStaticParams(
  movieData: MovieState
): { params: { id: string } }[] {
  const { movieSeq } = movieData;

  if (!Array.isArray(movieSeq) || movieSeq.length === 0) {
    return [];
  }

  return movieSeq.map((seq) => ({ params: { id: seq } }));
}
// Page 컴포넌트에서 params의 타입을 정확히 지정합니다.

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  return <div>{id} 페이지입니다.</div>;
}
