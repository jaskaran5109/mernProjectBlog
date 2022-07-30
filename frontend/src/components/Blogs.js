import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import './Blogs.css'
const Blogs = () => {
  const [blogs, setblogs] = useState();

  const sendRequest = async () => {
    const response = await axios
      .get("http://localhost:5000/api/blog")
      .catch((err) => console.log(err));
    const data = response.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setblogs(data.blogs));
  }, []);
  console.log(blogs);
  return (
    <div
    className="blog-wrapper"
    >
      {blogs &&
        blogs.map((blog, index) => (
            <Blog
              className="blogContainer"
              id={blog._id}
              isUser={localStorage.getItem("userId") === blog.user._id}
              key={index}
              title={blog.title}
              description={blog.description}
              imageUrl={blog.image}
              userName={blog.user.name}
            />
        ))}
    </div>
  );
};

export default Blogs;
