import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function Navbar() {
  return (
    <nav
      className="px-20 py-5  text-[#fff] fixed h-[70px] w-full z-50 bg-[#00000050] backdrop-blur-[5px]"
    >
      <div className="flex items-center gap-2 justify-between">
        <a href="#home" className="flex items-center gap-2">
          <p className="font-semibold text-lg ">Jarvis</p>
        </a>
        <ul className="flex gap-10">
          {[
            { title: "About", id: "about" },
            { title: "Demo", id: "demo" },
            { title: "Technology", id: "technology" },
          ].map((item) => {
            return (
              <li>
                <a href={`#${item.id}`}>{item.title}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
