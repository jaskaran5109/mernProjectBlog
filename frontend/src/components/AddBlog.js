import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };
const AddBlog = () => {
  const dispatch =useDispatch();
  const navigate = useNavigate();
  const [inputs, setinputs] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });
  const sendRequest=async () => {
    const response=await axios.post("http://localhost:5000/api/blog/add",{
      title:inputs.title,
      description:inputs.description,
      image:inputs.imageUrl,
      user:localStorage.getItem("userId")
    }).catch((error)=>console.log(error));
    const data=await response.data;
    return data; 
  }
  const handleChange = (e) => {
    setinputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault()
    sendRequest().then(()=>navigate("/myblogs"))
  }

  return (
    <div style={{ marginTop: "80px" }}>
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
          <InputLabel sx={labelStyles}>ImageUrl</InputLabel>
          <TextField
            value={inputs.imageUrl}
            name="imageUrl"
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          <Button sx={{mt:2,borderRadius:4}}  variant="contained" color="primary"
           type="submit">Submit</Button>
        </Box>
      </form>
    </div>
  );
};

export default AddBlog;
