import { useRef } from "react";
import Card from "../components/Card";
import CopyEmailButton from "../components/CopyEmailButton";
import { Frameworks } from "../components/Frameworks";
import useIsMobile from "../hooks/useIsMobile";

const About = () => {
  const isMobile = useIsMobile();
  const grid2Container = useRef();
  return (
    <section className="c-space section-spacing" id="about">
      <h2 className="text-heading">About Me</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12">
        {/* Grid 1 */}
        <div className="flex items-end grid-default-color grid-1">
          <img
            src="assets/coding-pov.png"
            className="absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5]"
          />
          <div className="z-10">
            <p className="headtext">Hi, I'm Julien Lebron</p>
            <p className="subtext">
              Over the last 4 years, I have developed my frontend and backend
              development skills to deliver dynamic and robust web applications.
            </p>
          </div>
          <div className="absolute inset-x-0 pointer-events-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-indigo" />
        </div>
        {/* Grid 2 */}
        <div className="grid-default-color grid-2">
          <div
            ref={grid2Container}
            className="flex items-center justify-center w-full h-full"
          >
            <p className="flex items-end text-5xl text-gray-500">
              CODE IS CRAFT
            </p>
            {!isMobile ? (
              <>
                <Card
                  style={{ rotate: "50deg", top: "30%", left: "20%" }}
                  text="GRASP"
                  containerRef={grid2Container}
                />
                <Card
                  style={{ rotate: "-30deg", top: "60%", left: "45%" }}
                  text="SOLID"
                  containerRef={grid2Container}
                />
                <Card
                  style={{ rotate: "30deg", bottom: "30%", left: "70%" }}
                  text="Design Patterns"
                  containerRef={grid2Container}
                />
                <Card
                  style={{ rotate: "-45deg", top: "55%", left: "0%" }}
                  text="Design Principles"
                  containerRef={grid2Container}
                />
                <Card
                  style={{ rotate: "20deg", top: "10%", left: "38%" }}
                  text="SRP"
                  containerRef={grid2Container}
                />
                <Card
                  style={{ rotate: "30deg", top: "70%", left: "70%" }}
                  image="assets/logos/javascript.svg"
                  containerRef={grid2Container}
                />
                <Card
                  style={{ rotate: "-45deg", top: "70%", left: "25%" }}
                  image="assets/logos/react.svg"
                  containerRef={grid2Container}
                />
                <Card
                  style={{ rotate: "-45deg", top: "5%", left: "10%" }}
                  image="assets/logos/vitejs.svg"
                  containerRef={grid2Container}
                />
              </>
            ) : (
              <>
                <Card
                  style={{ rotate: "50deg", top: "30%", left: "40%" }}
                  text="GRASP"
                  containerRef={grid2Container}
                />
                <Card
                  style={{ rotate: "-30deg", top: "60%", left: "45%" }}
                  text="SOLID"
                  containerRef={grid2Container}
                />
                <Card
                  style={{ rotate: "-45deg", top: "55%", left: "0%" }}
                  text="Design Principles"
                  containerRef={grid2Container}
                />
              </>
            )}
          </div>
        </div>
        {/* Grid 3 */}
        <div className="flex items-end grid-black-color grid-3">
          <img
            src="assets/sky.jpg"
            alt=""
            className="absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5]"
          />
          <img
            src="assets/globe.png"
            className="absolute scale-[1] top-[0rem] left-50"
          />
          <div className="z-10 w-[50%]">
            <p className="headtext">Time Zone</p>
            <p className="subtext">
              Based in Spain, I'm open to remote opportunities worldwide.
            </p>
            {/* <figure className="absolute left-[40%] top-[0%]">
              <Globe lowPerformanceMode={true} />
            </figure> */}
          </div>
          <div className="absolute inset-x-0 pointer-events-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-indigo" />
        </div>
        {/* Grid 4 */}
        <div className="grid-special-color grid-4">
          <div className="flex flex-col items-center justify-center gap-4 size-full">
            <p className="text-center headtext">
              Ready to start a project together? Let’s build something great!
            </p>
            <CopyEmailButton />
          </div>
        </div>
        {/* Grid 5 */}
        <div className="grid-default-color grid-5">
          <div className="z-10 w-[50%]">
            <p className="headtext">Teck Stack</p>
            <p className="subtext">
              My expertise spans multiple languages, frameworks, and development
              tools, allowing me to create scalable and high-performance
              applications.
            </p>
          </div>
          <div className="absolute inset-y-0 md:inset-y-9 w-full h-full start-[50%] md:scale-125">
            <Frameworks />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
