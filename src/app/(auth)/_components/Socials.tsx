import { FaGithub, FaGoogle, FaTwitter } from "react-icons/fa";

export default function Socials() {
  return (
    <div className="flex justify-center gap-x-4 items-center">
      <button className="group p-2 rounded-md bg-transparent border border-gray-600 hover:bg-gray-700 dark:bg-gray-200 dark:hover:bg-gray-300 dark:border-gray-400">
        <FaGoogle className="group-hover:text-purple-500 dark:text-gray-700" />
      </button>
      <button className="group p-2 rounded-md bg-transparent border border-gray-600 hover:bg-gray-700 dark:bg-gray-200 dark:hover:bg-gray-300 dark:border-gray-400">
        <FaTwitter className="group-hover:text-purple-500 dark:text-gray-700" />
      </button>
      <button className="group p-2 rounded-md bg-transparent border border-gray-600 hover:bg-gray-700 dark:bg-gray-200 dark:hover:bg-gray-300 dark:border-gray-400">
        <FaGithub className="group-hover:text-purple-500 dark:text-gray-700" />
      </button>
    </div>
  );
}
