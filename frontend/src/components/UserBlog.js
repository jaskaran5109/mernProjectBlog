import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Blog from './Blog';
import './Blogs.css'
const UserBlog = () => {

  const [user, setuser] = useState()

  const id=localStorage.getItem('userId');
  const sendRequest = async ()=>{
    const response=await axios.get(`http://localhost:5000/api/blog/user/${id}`)
    .catch((err)=>{
      console.log(err)
    })

    const data=response.data;
    return data;
  }
  useEffect(() => {
    sendRequest().then((data)=>setuser(data.user))
  }, [])
  return (
    <div className="blog-wrapper">
      {user && user.blogs &&
        user.blogs.map((blog, index) => (
          <Blog
          className="blogContainer"
            id={blog._id}
            isUser={true}
            key={index}
            title={blog.title}
            description={blog.description}
            imageUrl={blog.image}
            userName={user.name}
          />
        ))}
    </div>
  )
}

export default UserBlog