import { NextPage } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useTweet from "../lib/client/useTweet";

import useUser from "../lib/client/useUser";

type createTweetForm = {
  context: string;
};

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

const Home: NextPage = () => {
  const { user } = useUser();
  const { data } = useTweet();
  const [newTweet, setNewTweet] = useState(false);
  const onValid = async (data: createTweetForm) => {
    const created = await fetch("/api/create-tweet", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    }).then((response) =>
      response.json().catch(() => {
        return response.ok;
      })
    );
    if (!created) {
      resetField("context");
      alert("Something Wrong!");
    } else {
      resetField("context");
      setNewTweet(false);
      alert("Successfully tweeted!");
    }
  };

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<createTweetForm>();
  const onSubmit = (data: createTweetForm) => onValid(data);
  return (
    <div className="flex flex-col justify-center items-center relative p-24 w-[40rem]  mx-auto">
      <h1 className="text-4xl font-extrabold mb-12 border-b-4 border-b-orange-300 pb-2">
        Hello, {user?.name}!
      </h1>
      <h1 className="text-2xl font-extrabold border-b-2 border-black w-full">
        All Tweets
      </h1>
      {data?.tweets.map((tweet: tweetForm) => (
        <div
          key={tweet.id}
          className="flex flex-col justify-between items-center text-lg font-bold w-full m-4 bg-orange-200 p-6 rounded-2xl shadow-xl"
        >
          <div className="flex flex-row justify-between items-center text-lg font-bold w-full mb-4">
            <h1>{tweet.user.name}</h1>
            <div className="flex flex-col items-center text-sm font-semibold">
              <h1>{tweet.createdAt.slice(0, 10)}</h1>
              <h1>{tweet.createdAt.slice(11, 19)}</h1>
            </div>
          </div>
          <h1 className="text-xl font-semibold">{tweet.context}</h1>
        </div>
      ))}
      {newTweet ? (
        <form
          className="flex flex-col justify-center items-center bg-gray-100 p-8 pb-2 rounded-2xl absolute top-60"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label
            className="text-2xl font-extrabold mb-6 mr-4"
            htmlFor="context"
          >
            New tweet!
          </label>
          <textarea
            className="text-xl font-bold mb-4 border-solid border-2 border-zinc-800r h-40 w-96"
            id="context"
            maxLength={200}
            placeholder=" What's happening?"
            {...register("context", { required: true })}
          />
          {errors.context && <span>Context required</span>}
          <input
            className="text-2xl font-extrabold  bg-orange-300 w-28 mx-auto rounded-lg mb-2"
            type="submit"
            value="Add"
          />
        </form>
      ) : null}
      <button
        className="text-xl font-extrabold  bg-orange-300 w-32 mx-auto rounded-lg mb-2 absolute right-4 top-40"
        type="submit"
        onClick={() => setNewTweet((prev) => !prev)}
      >
        New Tweet
      </button>
    </div>
  );
};

export default Home;
