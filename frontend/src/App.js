import Header from "./components/Header";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Blogs from "./components/Blogs";
import UserBlog from "./components/UserBlog";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store";

function App() {
  const dispatch=useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  useEffect(() => {
    if(localStorage.getItem("userId"))
    {
      dispatch(authActions.login())
    }
  }, [dispatch])
  
  return (
    <React.Fragment>
      <Header />
      <Routes>
        {!isLoggedIn ? (
          <Route path="/login" element={<Login />} />
        ) : (
          <>
          <Route path="/" element={<Blogs />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/add" element={<AddBlog />} />
            <Route path="/myblogs" element={<UserBlog />} />
            <Route path="/myblogs/:id" element={<BlogDetail />} />
          </>
        )}
      </Routes>
    </React.Fragment>
  );
}

export default App;
