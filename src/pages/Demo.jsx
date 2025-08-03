import React, { useState, useEffect } from "react";
import cs from "../assets/images/cs.svg";

function Demo() {
  const [projection, setProjection] = useState(false);
  const [classNames, setClassNames] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource(
      "http://localhost:8000/api/getclassnames/"
    );

    eventSource.onmessage = (event) => {
      const newItem = event.data;
      setClassNames((prevItems) => {
        if (prevItems.includes(newItem)) return prevItems;
        return [...prevItems, newItem];
      });
      console.log(newItem);
    };
    return () => {
      eventSource.close();
    };
  }, [classNames]);

  const handleVideoFrames = () => {
    if (projection) {
      // Camera is ON
      fetch("http://127.0.0.1:8000/api/stopframes", {
        method: "GET",
      }).then(() => {
        console.log("Frames Stopped");
        setProjection(false);
      });
    } else {
      // Camera is OFF
      fetch("http://127.0.0.1:8000/api/getframes", {
        method: "GET",
      }).then(() => {
        console.log("Frames Stopped");

        setProjection(true);
      });
    }
  };

  return (
    <section
      id="demo"
      className="h-[100vh] font-[inter-light] px-20 text-white mt-20  "
    >
      <div className="text-[35px] flex gap-5">
        <div>
          <img src={cs} className="h-30px] inline" />
        </div>
        <p>Experience</p>
      </div>

      <div className="w-full h-[60%]   mt-5 flex gap-5 relative">
        <div className="absolute -left-10 top-5 w-[80%] -bottom-10  bg-gradient-to-tr from-pink-400 to-purple-500 rounded-full blur-2xl opacity-30 z-0 animate-pulse"></div>
        <div className="flex-2 rounded-3xl bg-gradient-to-b from-[#a8c0ff] relative to-[#3f2b96] p-[2px]  ">
          <div
            className="bg-[#141414] box-border p-10 rounded-3xl h-full text-center flex justify-center items-center z-10 select-none w-full"
            onClick={handleVideoFrames}
          >
            {projection ? (
              <img
                className="h-full w-full object-fill"
                src="http://127.0.0.1:8000/api/getframes"
                alt="Streaming"
              />
            ) : (
              <p>Click here to start</p>
            )}
          </div>
        </div>{" "}
        <div className="flex-1 rounded-3xl bg-gradient-to-b from-[#C6FFDD] to-[#f7797d] p-[2px] z-10">
          <div className="bg-[#141414] box-border p-10 rounded-3xl h-full ">
            <h2 className="opacity-60">Objects Detected</h2>
            <ul className="list-disc px-5 mt-5">
              {classNames.map((value, index) => (
                <li key={index}>{value}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Demo;
