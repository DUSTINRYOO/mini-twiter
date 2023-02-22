import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

import useMutation from "../../lib/client/useMutation";
type userForm = {
  name: string;
};

type tweetForm = {
  id: number;
  createdAt: string;
  userId: number;
  context: string;
  user: userForm;
};
interface TweetDetailResponse {
  ok: boolean;
  tweetDetail: tweetForm;
  isLiked: boolean;
}

const TweetDetail: NextPage = () => {
  const router = useRouter();

  const { data, mutate: boundMutate } = useSWR<TweetDetailResponse>(
    router.query.id ? `/api/tweet/${router.query.id}` : null
  );
  const [toggleFav] = useMutation(`/api/tweet/${router.query.id}/fav`);
  const onFavClick = () => {
    if (!data) return;
    boundMutate((prev) => prev && { ...prev, isLiked: !prev.isLiked }, false);
    toggleFav({});
  };
  const isLiked = data?.isLiked;

  return (
    <div className="flex flex-col justify-center items-center relative p-24 w-[40rem]  mx-auto">
      <h1 className="text-4xl font-extrabold mb-12 border-b-4 border-b-orange-300 pb-2">
        Tweet #{data?.tweetDetail.id}
      </h1>
      <Link legacyBehavior href="/">
        <a className="text-2xl font-extrabold border-b-2 border-black w-full">
          ⬅️ Home
        </a>
      </Link>
      <div
        key={data?.tweetDetail!.id}
        className="flex flex-col justify-between items-center text-lg font-bold w-full m-4 bg-orange-200 p-6 rounded-2xl shadow-xl h-96"
      >
        <div className="flex flex-col items-center justify-start h-full w-full">
          <div className="flex flex-row justify-between items-center text-lg font-bold w-full mb-4">
            <h1>{data?.tweetDetail.user.name}</h1>
            <div className="flex flex-col items-center text-sm font-semibold">
              <h1>{data?.tweetDetail.createdAt.slice(0, 10)}</h1>
              <h1>{data?.tweetDetail.createdAt.slice(11, 19)}</h1>
            </div>
          </div>
          <h1 className="text-xl font-semibold">{data?.tweetDetail.context}</h1>
        </div>
        <button
          onClick={onFavClick}
          className={
            isLiked
              ? "p-3 rounded-md flex items-center hover:bg-gray-100 justify-center text-red-500  hover:text-red-600"
              : "p-3 rounded-md flex items-center hover:bg-gray-100 justify-center text-gray-400  hover:text-gray-500"
          }
        >
          {isLiked ? (
            <svg
              className="w-12 h-12"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              ></path>
            </svg>
          ) : (
            <svg
              className="h-12 w-12 "
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default TweetDetail;
