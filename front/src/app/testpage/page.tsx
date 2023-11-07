import Link from 'next/link';
export default function Page() {
  return (
    <div>
      <Link
        href={{
          pathname: `/testpage/${1}`
        }}
      >
        <button> 1 페이지로 이동합니다 </button>
      </Link>
      <Link
        href={{
          pathname: `/testpage/${2}`
        }}
      >
        <button> 2 페이지로 이동합니다 </button>
      </Link>
      <Link
        href={{
          pathname: `/testpage/${3}`
        }}
      >
        <button> 3 페이지로 이동합니다 </button>
      </Link>
    </div>
  );
}
