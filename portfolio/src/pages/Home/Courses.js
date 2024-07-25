import React from "react";
import SectionTitle from "../../component/SectionTitle";
import { useSelector } from "react-redux";

function Courses() {
    const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
    const { portfolioData } = useSelector((state) => state.root);

    const { courses } = portfolioData;
  return (
    <div>
      <SectionTitle title="Courses" />

      <div className="flex py-10 gap-20 sm:flex-col ">
        <div className="flex flex-col gap-5 border-l-2 border-[#135e4c82] w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full">
          {courses.map((courses, index) => (
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
                {courses.title}
              </h1>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-10 sm:flex-col">
          <div className="flex flex-col gap-5">
            <h1 className="text-secondary text-xl ">
              {courses[selectedItemIndex].title}
            </h1>

            <p className="text-white text-xl text-justify">
              {courses[selectedItemIndex].description}
            </p>
          </div>

          <img
            src={courses[selectedItemIndex].image}
            alt=""
            className="h-52 w-80"
          />
        </div>
      </div>
    </div>
  );
}

export default Courses;
