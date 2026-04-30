import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiXMark } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { setLoginStatus } from "../features/auth/authSlice";
import { store } from "../store";

const SidebarMenu = ({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (prev: boolean) => void;
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const { loginStatus } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const logout = () => {
    toast.error("Logged out successfully");
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    store.dispatch(setLoginStatus(false));
    navigate("/login");
  };

  useEffect(() => {
    if (isSidebarOpen) {
      setIsAnimating(true);
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300); // Match the transition duration
      return () => clearTimeout(timer);
    }
  }, [isSidebarOpen]);

  const menuItemClass =
    "py-3 px-7 rounded-full bg-secondaryBrown/10 text-black font-medium w-full max-w-[240px] text-center transition duration-200 hover:bg-secondaryBrown/20";

  return (
    <>
      {(isSidebarOpen || isAnimating) && (
        <div
          className={
            isSidebarOpen
              ? "fixed top-0 left-0 w-64 z-50 h-full transition-transform duration-300 ease-in-out bg-white shadow-lg transform border-r border-black translate-x-0"
              : "fixed top-0 left-0 w-64 z-50 h-full transition-transform duration-300 ease-in-out bg-white shadow-lg transform border-r border-black -translate-x-full"
          }
        >
          <div className="flex justify-end mr-1 mt-1">
            <HiXMark
              className="text-3xl cursor-pointer"
              onClick={() => setIsSidebarOpen(false)}
            />
          </div>
          <div className="flex justify-center mt-2">
            <Link
              to="/"
              className="text-4xl font-light tracking-[1.08px] max-sm:text-3xl max-[400px]:text-2xl"
            >
              EyeOn
            </Link>
          </div>
          <div className="flex flex-col items-center gap-3 mt-7 px-3">
            <Link to="/" className={menuItemClass}>
              Home
            </Link>
            <Link to="/shop" className={menuItemClass}>
             Services
            </Link>
            <Link to="/search" className={menuItemClass}>
              Search
            </Link>
            {loginStatus ? (
              <button onClick={logout} className={menuItemClass}>
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className={menuItemClass}>
                  Sign in
                </Link>
                <Link to="/register" className={menuItemClass}>
                  Sign up
                </Link>
              </>
            )}
            <Link to="/cart" className={menuItemClass}>
              Cart
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
export default SidebarMenu;