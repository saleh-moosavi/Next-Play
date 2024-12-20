import { useState } from "react";
import { Link } from "react-router-dom";

export default function ResetPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("Form submitted");
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-[90vh] bg-cover bg-center bg-[url('https://preview.redd.it/gaming-wallpapers-3840-x-2160-uhd-v0-fr4m7cy20whd1.jpg?width=1080&crop=smart&auto=webp&s=97c6b3f7c1861af7235d329ed3d3676920d32a85')]">
        <div className="w-80 bg-gray-800 p-8 rounded-lg text-gray-100">
          <p className="text-center text-xl font-bold mb-4">ثبت نام در سایت</p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm text-gray-400">
                ایمیل
              </label>
              <input
                type="email"
                id="email"
                placeholder="ایمیل خود را وارد کنید"
                className="w-full text-xs px-4 py-3 bg-gray-900 border border-transparent focus:border-orange-600 rounded-md text-gray-100 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-800 to-purple-600 hover:shadow-[0_0_5px_#FFF] text-gray-200 rounded-md font-semibold focus:outline-none transition-all duration-300"
            >
              تایید
            </button>
          </form>

          <hr className="border-gray-400 mt-5" />

          <p className="text-center text-xs text-gray-400 mt-4">
            <Link
              to={"/login"}
              className="text-indigo-400 hover:underline mx-2"
            >
              برگشت به صفحه ورود
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
