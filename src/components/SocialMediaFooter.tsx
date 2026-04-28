import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";
import { FaPinterestP } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { FaCommentDots } from "react-icons/fa6";

const SocialMediaFooter = () => {
  return (
    <div className="mx-auto max-w-screen-2xl">
      <div className="bg-secondaryBrown flex justify-center items-center flex-col py-9 gap-3 mt-24 mx-5 max-[400px]:mx-3">
        <p className="text-base text-white font-light">Follow us on:</p>
        <div className="flex gap-3">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noreferrer"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <FaFacebookF className="text-lg" />
          </a>
          <a
            href="https://www.instagram.com/bana_manasrah.3.7/"
            target="_blank"
            rel="noreferrer"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <FaInstagram className="text-lg" />
          </a>
          <a
            href="https://www.tiktok.com"
            target="_blank"
            rel="noreferrer"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <FaTiktok className="text-lg" />
          </a>
          <a
            href="mailto:info@eyeon.com"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <FaCommentDots className="text-lg" />
          </a>
          <a
            href="https://www.pinterest.com"
            target="_blank"
            rel="noreferrer"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <FaPinterestP className="text-lg" />
          </a>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noreferrer"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <FaYoutube className="text-lg" />
          </a>
        </div>
      </div>
    </div>
  );
};
export default SocialMediaFooter;