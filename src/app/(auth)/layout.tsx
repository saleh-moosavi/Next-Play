import Image from "next/image";

export default function Authlayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <article className="w-screen h-screen fixed inset-0 -z-50">
        <Image
          fill
          src="/authBG.webp"
          alt="background image"
          className="w-full h-full object-cover blur-md scale-105"
        />
      </article>
      <div className="flex justify-center items-center min-h-[90vh]">
        <div className="w-80 bg-gray-800 dark:bg-gray-100 p-8 rounded-lg text-gray-100">
          {children}
        </div>
      </div>
    </>
  );
}
