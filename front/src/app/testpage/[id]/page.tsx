'use client';
import { useEffect, useState } from 'react';
// export function generateStaticParams() {
//   const MovieNumber = localStorage.getItem('MovieNum');
//   return [{ id: MovieNumber }];
// }

export default function Page() {
  //   const { id } = params;
  const [MovieNumbers, setMovieNumbers] = useState('');

  useEffect(() => {
    const storedMovieNumbers = localStorage.getItem('MovieNum');

    if (storedMovieNumbers) {
      setMovieNumbers(storedMovieNumbers);
    }
  });

  return <div>{MovieNumbers.substring(1)} 페이지입니다.</div>;
}
