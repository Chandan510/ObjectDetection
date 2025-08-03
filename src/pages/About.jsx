import React from "react";
import aboutimg from "../assets/images/about_wall.jpg";
import one from "../assets/images/1.svg";
import two from "../assets/images/2.svg";
import three from "../assets/images/3.svg";
import four from "../assets/images/4.svg";
import five from "../assets/images/5.svg";
import six from "../assets/images/6.svg";
import seven from "../assets/images/7.svg";
import eight from "../assets/images/8.svg";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import scrollTrigger from "gsap/all";

function About() {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".images",
        // markers:true,
        scrub: true,
        start: "top 80%",
        end: "bottom 30%",
      },
    });

    tl.to(".images", {
      xPercent: -50,

      duration: 10,
      ease: "none",
    });
  }, []);

  return (
    <section
      className="h-[100vh] w-full text-white mt-30 pt-20 box-border px-20"
      id="about"
    >
      <div className="flex w-[100%] ">
        <div className="  flex-1 text-[50px] flex flex-col ">
          <span className="opacity-40">Find </span>Anything, Instantly
          <br />
          Using AI
          <div className="w-[80%]">
            <p className="text-lg mt-10 opacity-80">
              From misplaced phones to tracking vehicles — detect objects in
              real-time using YOLO's powerful vision capabilities.
            </p>
          </div>
        </div>

        <img src={aboutimg} className="w-[30%] rounded-xl" />
      </div>

      <div className="w-[100%] h-[15%]   mt-30   overflow-x-hidden imagedrawer ">
        <div className="images flex gap-10 h-full">
          {[
            one,
            two,
            three,
            four,
            five,
            six,
            seven,
            eight,
            one,
            two,
            three,
            four,
            five,
            six,
            seven,
            eight,
          ].map((src, idx) => (
            <img key={idx} src={src} className="h-full object-contain" />
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
