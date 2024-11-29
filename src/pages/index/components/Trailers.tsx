import TrailerBottom from "./TrailerBottom";
import TrailerTop from "./TrailerTop";
import trailers from "../../../db/trailers.json";
import Button from "../../../components/Button";

export default function Trailers() {
  return (
    <div className="pb-10 px-5 pt-5 lg:px-0 text-center">
      <h3 className="border-b-2 w-fit mx-auto border-white text-white pb-2 my-5">
        تریلر بازی ها
      </h3>
      <section className="w-full flex flex-col items-center gap-5">
        <TrailerTop />
        <article className="w-full grid grid-cols-2 lg:grid-cols-4 gap-5 justify-items-center items-center">
          {trailers.map((item: any) => (
            <TrailerBottom data={item} />
          ))}
        </article>
      </section>
      <Button />
    </div>
  );
}
