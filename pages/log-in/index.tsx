import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

type loginForm = {
  email: string;
};

const logIn: NextPage = () => {
  const router = useRouter();

  const onValid = async (data: loginForm) => {
    const verified = await fetch("/api/log-in", {
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
    if (!verified.ok) {
      resetField("email");
      alert("Email doesn't exist");
    }
    return router.push("/");
  };

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<loginForm>();
  const onSubmit = (data: loginForm) => onValid(data);

  return (
    <div className="flex flex-col justify-center items-center p-36">
      <h1 className="text-4xl font-extrabold mb-12 border-b-4 border-b-orange-300 pb-2">
        Log In
      </h1>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="text-2xl font-extrabold mb-12 mr-4" htmlFor="email">
            Email:
          </label>
          <input
            className="text-2xl font-extrabold mb-12 border-solid border-2 border-zinc-800r"
            type="email"
            {...register("email", { required: true })}
          />
          {errors.email && <span>Email required</span>}
        </div>
        <input
          className="text-2xl font-extrabold  bg-orange-300 w-32 mx-auto rounded-lg"
          type="submit"
          value="Login"
        />
        <Link legacyBehavior href="/create-account">
          <a className="text-xl font-extrabold  mt-4 mx-auto  text-center border-b-2 ">
            I don't have an account!
          </a>
        </Link>
      </form>
    </div>
  );
};

export default logIn;
