import { Link, useLocation } from "react-router-dom";
import { CiCircleChevRight, CiCircleChevLeft } from "react-icons/ci";
import { useEffect, useState } from "react";
import { INavBarProps } from "./types";
import { TfiClose } from "react-icons/tfi";
import { FaAlignLeft } from "react-icons/fa";

function NavBar({
  items,
  onMinimizeToggle,
}: {
  items: INavBarProps[];
  onMinimizeToggle: (minimized: boolean) => void;
}) {
  const [minimized, setMinimized] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const [openNav, setOpenNav] = useState(false);

  const location = useLocation();

  const toggleMinimize = () => {
    const newMinimized = !minimized;
    setMinimized(newMinimized);
    onMinimizeToggle(newMinimized);
  };

  const isCurrentRoute = (link: string) => {
    return location.pathname.startsWith(link);
  };

  const toggleMobileView = () => {
    setMobileView(true);
    setOpenNav(!openNav);
  };

  const handleItemClick = () => {
    if (mobileView) {
      setOpenNav(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setMobileView(true);
      } else {
        setMobileView(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`${
        mobileView
          ? `h-16 w-[20%] ${openNav ? "bg-slate-950" : "bg-[#EFEFEF]"}`
          : "h-screen bg-slate-950"
      } ${
        minimized ? "w-[10%]" : "w-[20%]"
      } fixed left-0 z-50 text-white flex flex-col items-start transition-all duration-500 ease-in
      `}
    >
      {mobileView && (
        <div
          className={`cursor-pointer m-auto flex flex-col items-center justify-center`}
        >
          <div className="w-full h-full">
            <h1
              className={`text-base font-bold text-center tracking-widest ${
                openNav ? "text-white" : "text-slate-950"
              }`}
            >
              KCHDS
            </h1>
          </div>

          <div className="">
            {openNav ? (
              <TfiClose
                size={20}
                onClick={toggleMobileView}
                className={`p-1 rounded ${
                  openNav
                    ? "bg-white text-slate-950"
                    : "bg-slate-950 text-white"
                }`}
              />
            ) : (
              <FaAlignLeft
                size={20}
                onClick={toggleMobileView}
                className={`p-1 rounded ${
                  openNav
                    ? "bg-white text-slate-950"
                    : "bg-slate-950 text-white"
                }`}
              />
            )}
          </div>
        </div>
      )}

      {mobileView && openNav && (
        <div
          className={`flex flex-col gap-10 p-5 mt-2 pb-12 z-50 fixed top-12 rounded-r-xl w-[15rem] bg-slate-950 transition-all duration-500 ease-in`}
        >
          {items.map((item, index) => (
            <Link to={item.link} key={index} onClick={handleItemClick}>
              <div
                className={`flex gap-5 p-3 font-bold rounded-md hover:text-[#DEB889] hover:bg-white cursor-pointer`}
              >
                {item.icon}
                {item.text}
              </div>
            </Link>
          ))}
        </div>
      )}

      {!mobileView && (
        <>
          <div
            className={`flex w-full justify-center items-center h-16 text-3xl font-serif`}
          >
            <h1>KCHDS</h1>
          </div>

          <div className="flex flex-col gap-10 w-full justify-between h-screen pt-10">
            <div className="flex flex-col gap-10 w-full pl-5">
              {items.map((item, index) => (
                <div key={index} className="">
                  <Link to={item.link} key={index}>
                    <div
                      className={`flex hover:border-white border-y border-l border-slate-950
                      ${
                        minimized
                          ? `justify-center
                          ${
                            isCurrentRoute(`${item.link}`)
                              ? "rounded-l-md text-[#D7A022] bg-white "
                              : " rounded-l-md"
                          }
                          `
                          : `justify-start
                          ${
                            isCurrentRoute(`${item.link}`)
                              ? "rounded-l-md hover:text-[#D7A022] text-[#D7A022] bg-white w-full"
                              : "rounded-l-md"
                          }
                          `
                      } gap-5 w-full p-3 font-bold cursor-pointer 
                      `}
                    >
                      {minimized ? (
                        item.icon
                      ) : (
                        <>
                          {item.icon}
                          {item.text}
                        </>
                      )}
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            <div
              className={`${
                minimized ? "pl-14" : "pl-8"
              } py-3 cursor-pointer flex items-center gap-2 text-lg transition-all duration-500 ease-in`}
              onClick={toggleMinimize}
            >
              {minimized ? (
                <CiCircleChevRight size={32} />
              ) : (
                <>
                  <CiCircleChevLeft size={32} />
                  Close
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default NavBar;
