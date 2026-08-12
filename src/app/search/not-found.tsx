export default function NotFoundPage() {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center">
      <div className="text-center p-8 bg-white/10 backdrop-blur-md rounded-2xl max-w-md mx-4">
        <h2 className="text-2xl font-bold text-white dark:text-gray-900 mb-2">
          نتیجه‌ای پیدا نشد.
        </h2>
        <p className="text-sm text-gray-400 dark:text-gray-500">
          پیشنهاد می‌کنیم از کلمات کلیدی دیگری استفاده کنید.
        </p>
      </div>
    </div>
  );
}
