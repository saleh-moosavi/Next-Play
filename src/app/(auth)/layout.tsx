export default function Authlayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex justify-center items-center min-h-[85vh]">
        <section className="bg-gray-700 dark:bg-white text-white dark:text-black rounded-xl shadow-lg overflow-hidden p-5">
          {children}
        </section>
      </div>
    </>
  );
}
