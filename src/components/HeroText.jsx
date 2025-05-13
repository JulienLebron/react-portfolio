import { FlipWords } from "./FlipWords";
import { motion as Motion } from "motion/react";

const words = ["Secure", "Modern", "Scalable"];

const HeroText = () => {
  const variants = {
    hidden: {
      opacity: 0,
      x: -50,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  };
  return (
    <div className="z-10 mt-20 text-left md:mt-40 md:text-left rounded-3xl bg-clip-text">
      {/* Desktop View */}
      <div className="flex-col hidden md:flex c-space">
        <Motion.h1
          className="text-4xl font-medium"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
        >
          Hi I'm Julien
        </Motion.h1>
        <div className="flex flex-col items-start">
          <Motion.p
            className="text-4xl font-medium text-neutral-300"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.2 }}
          >
            A Developer Dedicated to Crafting
          </Motion.p>
          <Motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.5 }}
          >
            <FlipWords
              words={words}
              className="font-black text-sky-300 text-8xl"
            />
          </Motion.div>
          <Motion.p
            className="text-4xl font-medium text-neutral-300"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.8 }}
          >
            Web Solutions
          </Motion.p>
        </div>
      </div>
      {/* Mobile View */}
      <div className="flex flex-col space-y-2 md:hidden">
        <Motion.p
          className="text-4xl font-medium"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
        >
          Hi, I'm Julien
        </Motion.p>
        <div>
          <Motion.p
            className="text-3xl font-black text-neutral-300"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.2 }}
          >
            A Developer Dedicated to Crafting
          </Motion.p>
          <Motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.5 }}
          >
            <FlipWords
              words={words}
              className="font-bold text-sky-300 text-5xl"
            />
          </Motion.div>
          <Motion.p
            className="text-3xl font-black text-neutral-300"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.8 }}
          >
            Web Applications
          </Motion.p>
        </div>
      </div>
    </div>
  );
};

export default HeroText;
