import React from "react";

function LeftSider() {
  return (
    <div className="fixed left-0 bottom-0 px-10 sm:static">
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="https://www.facebook.com/share/dhp7iiisCt2fYXic/?mibextid=qi2Omg"
            target="_blank"
          >
            <i className="ri-facebook-line text-gray-400 text-2xl"></i>
          </a>
          <a href="mailto:help@adoctorsdiary.com" target="_blank">
            <i className="ri-mail-line text-gray-400 text-2xl"></i>
          </a>
          <a href="https://www.instagram.com/m.s.prins/" target="_blank">
            <i className="ri-instagram-line text-gray-400 text-2xl"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/m-s-prince-m1a9n0s4e9e7/"
            target="_blank"
          >
            <i className="ri-linkedin-line text-gray-400 text-2xl"></i>
          </a>
          <a href="https://github.com/MSPrince" target="_blank">
            <i className="ri-github-line text-gray-400 text-2xl"></i>
          </a>
          <a href="https://www.adoctorsdiary.com/" target="_blank">
            <i className="ri-pages-fill text-gray-400 text-2xl"></i>
          </a>
        </div>
        <div className="w-[1px] h-32 bg-[#125f63] sm:hidden"></div>
      </div>
    </div>
  );
}

export default LeftSider;
