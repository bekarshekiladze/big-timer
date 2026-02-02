"use client";

import { IoMdInformationCircleOutline, IoIosSettings } from "react-icons/io";
import { AiOutlineFullscreenExit, AiOutlineFullscreen } from "react-icons/ai";
import { FaBlogger } from "react-icons/fa";
import { useEffect, useState } from "react";
import Switch from "./Switch";

function Header() {
  const [fullScreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  };

  useEffect(() => {
    const onChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);
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
          <Switch />
        </span>
        <span className="flex items-center gap-2 text-bigtimer-yellow capitalize nav-item">
          <span className="nav-text">fullscreen</span>{" "}
          <div
            onClick={toggleFullscreen}
            className="flex items-center gap-2 nav-item"
            aria-label="Toggle fullscreen"
          >
            {fullScreen && <AiOutlineFullscreenExit />}
            {!fullScreen && <AiOutlineFullscreen />}
          </div>
        </span>
      </div>
    </header>
  );
}
export default Header;
