import { useState } from "react";
import { FaGithub, FaGoogle, FaTwitter } from "react-icons/fa";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("Form submitted");
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-[90vh] bg-cover bg-center bg-[url('https://preview.redd.it/gaming-wallpapers-3840-x-2160-uhd-v0-fr4m7cy20whd1.jpg?width=1080&crop=smart&auto=webp&s=97c6b3f7c1861af7235d329ed3d3676920d32a85')]">
        <div className="w-80 bg-gray-800 p-8 rounded-lg text-gray-100">
          <p className="text-center text-xl font-bold mb-4">
            ورود به حساب کاربری
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label htmlFor="username" className="text-sm text-gray-400">
                نام کاربری
              </label>
              <input
                type="text"
                id="username"
                placeholder="نام کاربری خود را وارد کنید"
                className="w-full text-xs px-4 py-3 bg-gray-900 border border-transparent focus:border-orange-600 rounded-md text-gray-100 focus:outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="password" className="text-sm text-gray-400">
                رمز عبور
              </label>
              <input
                type="password"
                id="password"
                placeholder="رمر عبور خود را وارد کنید"
                className="w-full text-xs px-4 py-3 bg-gray-900 border border-transparent focus:border-orange-600 rounded-md text-gray-100 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="mt-2 block">
                <a href="#" className="text-xs text-gray-400 hover:underline">
                  رمز عبور خود را فراموش کرده اید ؟
                </a>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-800 to-purple-600 text-gray-900 rounded-md font-semibold hover:bg-indigo-600 focus:outline-none"
            >
              ورود
            </button>
          </form>

          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-gray-600"></div>
            <p className="px-4 text-sm text-gray-400">ورود با</p>
            <div className="flex-1 h-px bg-gray-600"></div>
          </div>

          <div className="flex justify-center gap-x-4 items-center">
            <button className="group p-2 rounded-md bg-transparent border border-gray-600 hover:bg-gray-700">
              <FaGoogle className="group-hover:text-purple-500" />
            </button>
            <button className="group p-2 rounded-md bg-transparent border border-gray-600 hover:bg-gray-700">
              <FaTwitter className="group-hover:text-purple-500" />
            </button>
            <button className="group p-2 rounded-md bg-transparent border border-gray-600 hover:bg-gray-700">
              <FaGithub className="group-hover:text-purple-500" />
            </button>
          </div>

          <p className="text-center text-xs text-gray-400 mt-4">
            هنوز ثبت نام نکرده اید ؟
            <a href="#" className="text-indigo-400 hover:underline mx-2">
              ثبت نام
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
