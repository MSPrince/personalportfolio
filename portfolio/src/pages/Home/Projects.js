import React from 'react';
import SectionTitle from '../../component/SectionTitle';
import { useSelector } from 'react-redux';

function Projects() {
      const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
      const { portfolioData } = useSelector((state) => state.root);

      const { projects } = portfolioData;
  return (
    <div>
      <SectionTitle title="Projects" />

      <div className="flex py-10 gap-20 sm:flex-col ">
        <div className="flex flex-col gap-5 border-l-2 border-[#135e4c82] w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full">
          {projects.map((projects, index) => (
            <div
              className="cursor-pointer"
              onClick={() => {
                setSelectedItemIndex(index);
              }}
            >
              <h1
                className={`text-xl px-5 ${
                  selectedItemIndex === index
                    ? "text-tertiary border-tertiary border-l-4 -ml-[3px] bg-[#1a7f5a41] py-3"
                    : "text-white"
                } sm:text-[15px]`}
              >
                {projects.title}
              </h1>
            </div>
          ))}
        </div>

        <div className='flex items-center justify-center gap-10 sm:flex-col'>
          <img src={projects[selectedItemIndex].image} alt="" className='h-60 w-72'/>

          <div className="flex flex-col gap-5">
            <h1 className="text-secondary text-xl ">
              {projects[selectedItemIndex].title}
            </h1>

            <p className="text-white text-xl text-justify">
              {projects[selectedItemIndex].description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects
