import React, { useEffect, useState } from "react";
import ProjectDetails from "./ProjectDetails";

const Project = ({
  title,
  description,
  subDescription,
  href,
  image,
  tags,
  setPreview,
  isMobile,
  onDetailsToggle,
}) => {
  const [isHidden, setIsHidden] = useState(false);
  useEffect(() => {
    onDetailsToggle(isHidden);
  }, [isHidden, onDetailsToggle]);
  return (
    <>
      <div
        className="flex-wrap items-center justify-between py-10 sm:flex"
        onMouseEnter={() => setPreview(image)}
        onMouseLeave={() => setPreview(null)}
      >
        <div className="mb-0">
          <p className="text-2xl">{title}</p>
          <div className="flex gap-2 mt-2 text-sky-300">
            {tags.map((tag) => (
              // <span key={tag.id}>{tag.name}</span>
              <img
                key={tag.id}
                src={tag.path}
                alt={tag.name}
                className="rounded-lg size-10 hover-animation"
              />
            ))}
          </div>
        </div>
        {isMobile && <img className="my-5 rounded-2xl" src={image} />}
        <button
          onClick={() => setIsHidden(true)}
          className="flex items-center gap-1 cursor-pointer hover-animation"
        >
          Read More
          <img src="assets/arrow-right.svg" className="w-5" />
        </button>
      </div>
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full" />
      {isHidden && (
        <ProjectDetails
          title={title}
          description={description}
          subDescription={subDescription}
          image={image}
          tags={tags}
          href={href}
          closeModal={() => setIsHidden(false)}
        />
      )}
    </>
  );
};

export default Project;
