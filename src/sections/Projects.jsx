import { useState } from "react";
import Project from "../components/Project";
import { myProjects } from "../constants";
import { motion as Motion, useMotionValue, useSpring } from "motion/react";
import useIsMobile from "../hooks/useIsMobile";

const Projects = () => {
  const isMobile = useIsMobile();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 10, stiffness: 50 });
  const springY = useSpring(y, { damping: 10, stiffness: 50 });

  const [preview, setPreview] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleMouseMove = (e) => {
    if (!isMobile) {
      x.set(e.clientX + 20);
      y.set(e.clientY + 20);
    }
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative c-space section-spacing"
      id="projects"
    >
      <h2 className="text-heading">My Selected Projects</h2>
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-12 h-[1px] w-full" />

      {myProjects.map((project) => (
        <Project
          key={project.id}
          {...project}
          setPreview={setPreview}
          isMobile={isMobile}
          onDetailsToggle={setIsDetailsOpen}
        />
      ))}

      {!isMobile && preview && !isDetailsOpen && (
        <Motion.img
          className="fixed top-0 left-0 z-50 object-contain h-60 rounded-lg shadow-lg pointer-events-none"
          src={preview}
          style={{ x: springX, y: springY }}
        />
      )}
    </section>
  );
};

export default Projects;
