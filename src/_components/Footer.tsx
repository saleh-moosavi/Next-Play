import {
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <article className="bg-orange-400 text-white flex flex-col justify-center items-center gap-5 p-5">
      <p className="text-sm font-semibold select-none order-1">
        کپی از مطالب تنها با کسب مجوز امکان پذیر است
      </p>
      <div className="flex gap-x-3 *:size-5 *:hover:scale-110 *:transition-all *:duration-300 *:cursor-pointer md:order-3">
        <FaInstagram />
        <FaWhatsapp />
        <FaLinkedin />
        <FaTwitter />
      </div>
    </article>
  );
}
