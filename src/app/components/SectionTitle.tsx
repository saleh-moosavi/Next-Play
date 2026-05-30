export default function SectionTitle({ title }: { title: string }) {
  return (
    <h3 className="border-b-2 w-fit mx-auto border-white dark:border-gray-900 text-white dark:text-gray-900 pb-2 my-5">
      {title}
    </h3>
  );
}
