import ReviewItem from "./ReviewItem";
import reviews from "../../../db/reviews.json";
import Button from "../../../components/Button";

export default function Reviews() {
  return (
    <div className="pb-10 px-5 pt-5 lg:px-0 text-center">
      <h3 className="border-b-2 w-fit mx-auto border-white dark:border-gray-900 text-white dark:text-gray-900 pb-2 my-5">
        نقد و بررسی ها
      </h3>
      <section className="grid sm:grid-cols-3 items-center justify-items-center gap-5 mt-10">
        {reviews.map((item: any) => (
          <ReviewItem key={item.id} data={item} />
        ))}
      </section>
      <Button />
    </div>
  );
}
