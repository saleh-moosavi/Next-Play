export default function AuthWrapper({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <p className="text-center dark:text-gray-900 text-xl font-bold mb-4">
        {title}
      </p>
      {children}
    </>
  );
}
