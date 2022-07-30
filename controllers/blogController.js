import mongoose from "mongoose";
import Blog from "../model/Blog";
import User from "../model/User";

export const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find().populate("user");
  } catch (err) {
    console.log(err);
  }
  if (!blogs) {
    return (
      res.status(404),
      json({
        message: "No Blog found",
      })
    );
  }
  return res.status(200).json({
    blogs,
  });
};

export const addBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body;
  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (err) {
    console.log(err);
  }
  if (!existingUser) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const blog = new Blog({
    title,
    description,
    image,
    user,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({
      session,
    });
    existingUser.blogs.push(blog);
    await existingUser.save({
      session,
    });
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err,
    });
  }
  return res.status(200).json({
    blog,
  });
};

export const updateBlog = async (req, res, next) => {
  const { title, description } = req.body;
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(req.params.id, {
      title,
      description,
    });
  } catch (err) {
    console.log(err);
  }
  if (!blog) {
    return res.status(500).json({
      message: "Blog not found",
    });
  }
  return res.status(200).json({
    blog,
  });
};

export const getBlogById = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!blog) {
    return res.status(500).json({
      message: "Blog not found",
    });
  }
  return res.status(200).json({
    blog,
  });
};

export const deleteBlog = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndRemove(id).populate('user');
    await blog.user.blogs.pull(blog);
    await blog.user.save()
  } catch (err) {
    console.log(err);
  }
  if (!blog) {
    return res.status(500).json({
      message: "Blog not found",
    });
  }
  return res.status(200).json({
    message: "Blog Deleted Successfully",
  });
};

export const getByUserId=async(req,res,next)=>{
    const userId=req.params.id;
    let userBlogs;
    try{
        userBlogs = await User.findById(userId).populate("blogs");
    }catch(err){
        console.log(err);
    }
    if(!userBlogs){
        return res.status(404).json({
            message: "Blogs not found",
        })
    }
    return res.status(200).json({
        user:userBlogs
    })
}