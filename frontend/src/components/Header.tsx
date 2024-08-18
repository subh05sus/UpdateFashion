import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import PopupMenu from "./PopupMenu";
import { BsCart } from "react-icons/bs";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (<>
    <header className="pb-6 bg-white lg:pb-0">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 ">
        <nav className="flex items-center justify-between h-16 lg:h-20 bg-white border-b border-gray-200">
          <div className="flex-shrink-0">
            <Link to="/" title="" className="flex items-center">
              <img className="w-auto h-8 lg:h-10" src="update.png" alt="Logo" />
              <span className="mt-1 -ml-1 text-xl md:text-xl lg:text-3xl font-bold poppins-semibold text-[#282828]">
                pdate <span className="text-orange-600">Fashion</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center">
            {!isLoggedIn ? (
              <div className="flex items-center space-x-6 ">
                <Link className="text-base font-medium text-black transition duration-200 hover:text-orange-600 hidden lg:block " to="/register">Sign up</Link>
                <Link className="text-base font-medium text-black transition duration-200 landscape:hover:text-orange-600 portrait:bg-orange-600 portrait:text-white rounded portrait:px-4 portrait:py-2 " to="/sign-in">Sign in</Link>
              </div>
            ) : (
              <div className="flex items-center space-x-6">
                {isLoggedIn && <Link to="/" className="text-2xl flex gap-1 items-center text-black transition duration-200 rounded-full hover:text-orange-600 focus:text-orange-600">
                  <BsCart /><span className="text-lg hidden lg:block"> Cart</span>
                </Link>}
                <PopupMenu isLoggedIn={isLoggedIn} />
              </div>
            )}

          </div>
        </nav>

      </div >
    </header >




  </>
  );
};

export default Header;
