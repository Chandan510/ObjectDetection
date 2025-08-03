import React from "react";
import landing_page_main from "../assets/images/landing_page_main.svg";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function Home() {
  useGSAP(() => {
    const tl = gsap.timeline();

    const charSplit = new SplitText(".subheading", {
      type: "chars,words",
      aria: "hidden",
    });

    gsap.from(charSplit.chars, {
      opacity: 0,
      stagger: 0.02,
      ease: "expo.out",
    });
  }, []);

  return (
    <section
      id="home"
      className="h-[100vh] w-full text-white pt-[80px] box-border  relative  "
    >
      <div className="  absolute inset-0  bg-[url(/images/noise.png)] opacity-20 "></div>
      <div className="heading   tracking-wide text-center mt-8 flex px-20 flex-col justify-center items-center gap-5">
        <p className=" font-[inter] text-[40px]">Object Detection</p>
        <p className="w-[40%] font-[inter-light]   text-center subheading ">
          <span className="opacity-40">
            Detect, classify, and track objects in real-time using one of the{" "}
          </span>
          <span className="opacity-100">fastest </span>{" "}
          <span className="opacity-40"> and most reliable</span>{" "}
          <span className="opacity-100"> deep learning models</span>.
        </p>
      </div>

      <div className="w-full h-[45%] left-0 right-0 absolute    bottom-0 box-border">
        <img src={landing_page_main} className="h-[100%] mx-auto" />
      </div>
    </section>
  );
}

export default Home;
