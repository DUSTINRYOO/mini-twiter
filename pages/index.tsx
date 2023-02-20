import { NextPage } from "next";
import useUser from "../lib/client/useUser";

const Home: NextPage = () => {
  const { user } = useUser();
  return (
    <div className="flex flex-col justify-center items-center p-36">
      <h1 className="text-4xl font-extrabold mb-12 border-b-4 border-b-orange-300 pb-2">
        Hello, {user?.name}!
      </h1>
    </div>
  );
};

export default Home;
