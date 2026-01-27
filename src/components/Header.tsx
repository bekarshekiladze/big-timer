import { IoMdInformationCircleOutline, IoIosSettings } from "react-icons/io";
import { AiOutlineFullscreenExit } from "react-icons/ai";
import { FaBlogger } from "react-icons/fa";

function Header() {
  return (
    <header className="absolute inset-0 flex justify-between items-center h-16 center">
      <div className="flex gap-8 nav-items">
        <span className="flex items-center gap-2 text-bigtimer-yellow capitalize nav-item">
          <IoMdInformationCircleOutline />
          <span className="nav-text">info</span>
        </span>
        <span className="flex items-center gap-2 text-bigtimer-yellow capitalize nav-item">
          <IoIosSettings /> <span className="nav-text">preferences</span>
        </span>
        <span className="flex items-center gap-2 text-bigtimer-yellow capitalize nav-item">
          <FaBlogger /> <span className="nav-text">blog</span>
        </span>
      </div>
      <div className="flex gap-8 nav-items">
        <span className="flex items-center gap-2 text-bigtimer-yellow capitalize nav-item">
          <span className="nav-text">repeat</span>
        </span>
        <span className="flex items-center gap-2 text-bigtimer-yellow capitalize nav-item">
          <span className="nav-text">fullscreen</span>{" "}
          <AiOutlineFullscreenExit />
        </span>
      </div>
    </header>
  );
}
export default Header;
