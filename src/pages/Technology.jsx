import React, { useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import python from "../assets/images/python.png";

import techbanner from "../assets/images/technology_engineer.png";

function Technology() {
  const [pythonDown, setPythonDown] = useState(false);

  return (
    <section
      id="technology"
      className="font-[inter-light] px-20 h-screen text-white box-border mt-10 relative"
    >
      <div className="  absolute inset-0  bg-[url(/images/noise.png)] opacity-10 "></div>
      <div className="w-full h-full    flex gap-10 justify-center  ">
        <div className="flex-2 border-1 p-5">
          <h2 className="font-[inter-light] text-[35px]">Technology</h2>

          <div
            className="flex flex-col items-center mt-10 border-1 w-full p-10 mytechcard relative"
            onMouseEnter={() => setPythonDown(true)}
            onMouseLeave={() => setPythonDown(false)}
          >
            <div className="flex items-center mt-10   w-full">
              <h2 className="text-xl font-bold">PYTHON</h2>
              <p className="mx-auto text-3xl font-bold text-[#424242]">API's</p>
            </div>
            <p className={`h-[100px] w-full mt-5 ${pythonDown ? 'block' : 'hidden'}`}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero,
              adipisci. Obcaecati nihil assumenda sit. Totam, sint nostrum
              veritatis iste error voluptatem rem nemo laboriosam, blanditiis,
              praesentium quis inventore laborum modi fugiat id. Suscipit,
              dolor? Nostrum accusamus, corporis, voluptatibus reiciendis illo,
              amet totam asperiores voluptatem inventore assumenda nobis
              consequuntur perspiciatis obcaecati.
            </p>
          </div>
         
        </div>
        <div className="flex-1   flex items-center">
          <img src={techbanner} className="w-full object-cover   " />
        </div>
      </div>
    </section>
  );
}

export default Technology;
