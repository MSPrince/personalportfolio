import React from "react";
import SectionTitle from "./../../component/SectionTitle";
import { useSelector } from "react-redux";

function Contact() {
  const { portfolioData } = useSelector((state) => state.root);

  // Check if portfolioData and contact exist
  const{ contact }= portfolioData;
 

  return (
    <div>
      <SectionTitle title="Say Hello" />

      <div className="flex sm:flex-col items-center justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-white text-2xl font-bold">{"{"}</p>
          <div className="flex flex-col ml-5">
            {Object.keys(contact).length > 0 ? (
              Object.keys(contact).map((key) => (
                key !== '_id' && 
                <h1 key={key} className="text-tertiary text-lg">
                  <span className="font-semibold">{key}:</span> {contact[key]}
                </h1>
              ))
            ) : (
              <p className="text-white text-lg">
                No contact information available.
              </p>
            )}
          </div>
          <p className="text-white text-2xl font-bold">{"}"}</p>
        </div>

        <div className="h-[400px]">
          <lottie-player
            src="https://lottie.host/fafa3bc6-7ce7-45bf-b8e1-1b6fc261e020/Tp8JnMPeEJ.json"
            background="transparent" // Fixed background color
            speed="1"
            loop
            autoplay
            direction="1"
            mode="normal"
            aria-label="Contact animation" // Added aria-label for accessibility
          ></lottie-player>
        </div>
      </div>
    </div>
  );
}

export default Contact;
