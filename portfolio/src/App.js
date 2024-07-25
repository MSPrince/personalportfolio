import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Loader from "./component/Loader";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading, setPortfolioData, ReloadData } from "./redux/rootSlice";
import Admin from "./pages/Admin";
import Login from "./pages/Admin/Login";

function App() {
  const { loading , portFolioData , reloadData} = useSelector((state) => state.root);
  const dispatch = useDispatch();

  const getPortfolioData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/portfolio/get-portfolio-data");
      dispatch(setPortfolioData(response.data));
      dispatch(ReloadData(false));
      dispatch(hideLoading());
    } catch {
      dispatch(hideLoading());
    }
  };




  useEffect(() => {
    getPortfolioData();
  }, []); 


useEffect(() =>{
  if(reloadData){
    getPortfolioData();
  }
}, [reloadData])

  return (
    <BrowserRouter>
      {loading ? <Loader/> : null}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/admin-login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
