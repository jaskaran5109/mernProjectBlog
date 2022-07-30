import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };
const BlogDetail = () => {
  const navigate = useNavigate();
  const [blog, setblog] = useState();
  const id = useParams().id;
  const [inputs, setinputs] = useState({});
  const handleChange = (e) => {
    setinputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const fetchDetails = async () => {
    const response = await axios
      .get(`http://localhost:5000/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = response.data;
    return data;
  };
  useEffect(() => {
    fetchDetails().then((data) => {
      setblog(data.blog);
      setinputs({
        title: data.blog.title,
        description: data.blog.description,
        imageUrl: data.blog.image,
      });
    });
  }, [id]);
  // console.log(blog)

  const sendRequest = async () => {
    const response=await axios.put(`http://localhost:5000/api/blog/update/${id}`,{
      title:inputs.title,
      description:inputs.description
    }).catch((err)=>{
      console.log(err);
    })
    const data=await response.data;
    return data;

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(data=>console.log(data)).then(()=>navigate("/myblogs/"));
  };
  return (
    <div style={{ marginTop: "80px" }}>
      {inputs && (
        <form onSubmit={handleSubmit}>
          <Box
            border={3}
            borderColor="black"
            borderRadius={10}
            boxShadow="10px 10px 20px #ccc"
            padding={3}
            margin={"auto"}
            marginTop={3}
            display="flex"
            flexDirection="column"
            width={"70%"}
          >
            <Typography
              fontWeight="bold"
              color="grey"
              variant="h4"
              textAlign={"center"}
            >
              Add Your Blog
            </Typography>
            <InputLabel sx={labelStyles}>Title</InputLabel>
            <TextField
              value={inputs.title}
              name="title"
              onChange={handleChange}
              margin="normal"
              variant="outlined"
            />
            <InputLabel sx={labelStyles}>Description</InputLabel>
            <TextField
              value={inputs.description}
              name="description"
              onChange={handleChange}
              margin="normal"
              variant="outlined"
            />
            <Button
              sx={{ mt: 2, borderRadius: 4 }}
              variant="contained"
              color="primary"
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
};

export default BlogDetail;
