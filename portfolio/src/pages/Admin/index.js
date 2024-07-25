import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Tabs } from "antd";
import Header from "../../component/Header";
import Adminintro from "./Adminintro";
import AdminAbout from "./AdminAbout";
import AdminExperiences from "./AdminExperiences";
import AdminProjects from "./AdminProjects";
import AdminCourses from "./AdminCourses";
import AdminContact from "./AdminContact";

function Admin() {
  const { portfolioData } = useSelector((state) => state.root);



useEffect(() => {
  if(!localStorage.getItem('token')){
    window.location.href = '/admin-login'
  }
}, []);





  const tabItems = [
    {
      key: "1",
      label: "Intro",
      children: <Adminintro />,
    },
    {
      key: "2",
      label: "About",
      children: <AdminAbout />,
    },
    {
      key: "3",
      label: "Experiences",
      children: <AdminExperiences />,
    },
    {
      key: "4",
      label: "Projects",
      children: <AdminProjects />,
    },
    {
      key: "5",
      label: "Courses",
      children: <AdminCourses />,
    },
    {
      key: "6",
      label: "Contacts",
      children: <AdminContact />,
    },
  ];

  return (
    <div>
      <Header />
      <div className="flex gap-10 items-center px-5 py-2 justify-between">
        <div className="flex gap-10 items-center">
          <h1 className="text-4xl text-primary font-bold">PortFolio Admin</h1>
          <div className="w-60 h-[1px] bg-gray-500"></div>
        </div>
        <h1 className="underline text-primary text-xl cursor-pointer"
        onClick={()=>{
          localStorage.removeItem("token");
          window.location.href = "/admin-login";
        }}
        >Logout</h1>
      </div>

      {portfolioData ? (
        <div className="mt-2 px-5">
          <Tabs defaultActiveKey="1" items={tabItems} tabPosition="left" />
        </div>
      ) : (
        <div>Loading...</div> // or some other loading indicator
      )}
    </div>
  );
}

Admin.propTypes = {
  portfolioData: PropTypes.object,
};

export default Admin;
