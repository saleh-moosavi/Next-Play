import {
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-linear-90 from-purple-700 to-purple-500 text-white flex flex-col justify-center items-center gap-5 p-5">
      <div className="flex gap-x-3 *:size-6 *:hover:scale-110 *:hover:text-orange-500 *:hover:-translate-y-1 *:transition-all *:duration-300 *:cursor-pointer md:order-3">
        <FaInstagram />
        <FaWhatsapp />
        <FaLinkedin />
        <FaTwitter />
      </div>
    </footer>
  );
}
