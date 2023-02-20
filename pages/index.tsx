import { NextPage } from "next";
import { useRouter } from "next/router";

import useUser from "../lib/client/useUser";

const Home: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const tweetUpload = router.asPath === "/create-tweet";
  console.log(router);
  return (
    <div className="flex flex-col justify-center items-center p-36">
      <h1 className="text-4xl font-extrabold mb-12 border-b-4 border-b-orange-300 pb-2">
        Hello, {user?.name}!
      </h1>
      {tweetUpload ? <span>Matched!</span> : null}
      <button></button>
    </div>
  );
};

export default Home;
