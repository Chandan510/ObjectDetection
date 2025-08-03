import Home from "./pages/Home";
import About from "./pages/About";
import Demo from "./pages/Demo";
import Technology from "./pages/Technology";
import Navbar from "./components/Navbar";
import { ScrollTrigger, SplitText } from "gsap/all";

import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger, SplitText);
 



function App() {
  return (
    <>
      <div className="box-border w-100vw bg-[#141414]">
        <Navbar />
        <Home />
        <About/>
        <Demo />
        <Technology />
      </div>
    </>
  );
}

export default App;
