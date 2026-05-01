import { HiBars3 } from "react-icons/hi2";
import { HiOutlineUser } from "react-icons/hi2";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Link } from "react-router-dom";
import logoIcon from "../assets/websiteIcon.png";
import SidebarMenu from "./SidebarMenu";
import { useState } from "react";

const Header = () => {
  const [ isSidebarOpen, setIsSidebarOpen ] = useState(false);
  const [ isSearchOpen, setIsSearchOpen ] = useState(false);
  return (
    <>
    <header className="max-w-screen-2xl flex text-center justify-between items-center py-4 px-5 text-black mx-auto max-sm:px-5 max-[400px]:px-3">
      <div className="flex-1 flex justify-start">
        <HiBars3 className="text-2xl max-sm:text-xl cursor-pointer" onClick={() => setIsSidebarOpen(true)} />
      </div>
      <Link
        to="/"
        className="flex-1 flex items-center justify-center shrink-0"
      >
        <img src={logoIcon} alt="Logo" className="h-10 w-20 max-sm:h-8 max-sm:w-16 object-contain" />
      </Link>
      <div className="flex-1 flex justify-end gap-4 items-center max-sm:gap-2">
        {isSearchOpen ? (
          <div className="relative flex items-center">
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-8 pr-3 py-1 rounded-full border border-gray-400 outline-none w-48 max-sm:w-32 bg-white"
              autoFocus
              onBlur={() => setIsSearchOpen(false)}
            />
            <HiOutlineMagnifyingGlass className="absolute left-2 text-gray-500 text-lg" />
          </div>
        ) : (
          <HiOutlineMagnifyingGlass 
            className="text-2xl max-sm:text-xl cursor-pointer" 
            onClick={() => setIsSearchOpen(true)} 
          />
        )}
        <Link to="/login">
          <HiOutlineUser className="text-2xl max-sm:text-xl" />
        </Link>
        <Link to="/cart">
          <HiOutlineShoppingBag className="text-2xl max-sm:text-xl" />
        </Link>
      </div>
    </header>
    <SidebarMenu isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
    </>
  );
};
export default Header;
