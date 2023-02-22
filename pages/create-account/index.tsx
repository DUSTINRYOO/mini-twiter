import { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

type createForm = {
  email: string;
  name: string;
};

const createAccount: NextPage = () => {
  const router = useRouter();

  const onValid = async (data: createForm) => {
    const created = await fetch("/api/create-account", {
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
      resetField("email");
      alert("Same email already exist!");
      return router.replace("/create-account");
    } else {
      alert("Account successfully created! Please log in!");
      router.replace("/log-in");
    }
  };

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<createForm>();

  const onSubmit = (data: createForm) => onValid(data);

  return (
    <div className="flex flex-col justify-center items-center p-36">
      <h1 className="text-4xl font-extrabold mb-12 border-b-4 border-b-orange-300 pb-2">
        Create New Account
      </h1>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="text-2xl font-extrabold mr-4" htmlFor="email">
            Email:
          </label>
          <input
            className="text-2xl font-extrabold mb-4 border-solid border-2 border-zinc-800r"
            type="email"
            {...register("email", { required: true })}
          />
        </div>
        {errors.email && <span>Email required</span>}
        <div>
          <label className="text-2xl font-extrabold  mr-4" htmlFor="name">
            Name:
          </label>
          <input
            className="text-2xl font-extrabold mb-4 border-solid border-2 border-zinc-800r"
            type="text"
            {...register("name", { required: true })}
          />
        </div>
        {errors.name && <span>Name required</span>}

        <input
          className="text-2xl font-extrabold mt-8 bg-orange-300 w-32 mx-auto rounded-lg"
          type="submit"
          value="Create"
        />

        <a
          href="/log-in"
          className="text-xl font-extrabold  mt-4 mx-auto  text-center border-b-2 "
        >
          Already have an account!
        </a>
      </form>
    </div>
  );
};

export default createAccount;
