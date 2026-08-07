export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ text?: string }> | { text?: string };
}) {
  const resolvedParams = await searchParams;
  const text = resolvedParams?.text;

  return <div className="min-h-[80vh] flex justify-center items-center">You Searched {text}</div>;
}
