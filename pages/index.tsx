import { NextPage } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";

import useUser from "../lib/client/useUser";

type createTweetForm = {
  context: string;
};

const Home: NextPage = () => {
  const { user } = useUser();
  const [newTweet, setNewTweet] = useState(true);
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
    <div className="flex flex-col justify-center items-center relative p-36 w-[40rem]  mx-auto bg-red-200">
      <h1 className="text-4xl font-extrabold mb-12 border-b-4 border-b-orange-300 pb-2">
        Hello, {user?.name}!
      </h1>
      {newTweet ? (
        <form
          className="flex flex-col justify-center items-center bg-gray-100 p-8 pb-2 rounded-2xl"
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
        className="text-xl font-extrabold  bg-orange-300 w-32 mx-auto rounded-lg mb-2 absolute right-4 top-48"
        type="submit"
        onClick={() => setNewTweet((prev) => !prev)}
      >
        New Tweet
      </button>
    </div>
  );
};

export default Home;
