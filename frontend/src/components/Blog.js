import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
const Blog = ({ title, description, imageUrl, userName, isUser, id }) => {
  const navigate = useNavigate();
  const handleEdit = (e) => {
    navigate(`/myblogs/${id}`);
  };
  const deleteRequest = async () => {
    const response = await axios
      .delete(`http://localhost:5000/api/blog/${id}`)
      .catch((err) => console.error(err));
    const data = await response.data;
    return data;
  };
  const handleDelete = (e) => {
    deleteRequest()
      .then(() => navigate("/"))
      .then(() => navigate("/blogs"));
  };

  return (
    <Card
      sx={{
        margin: 2,
        padding: 2,
        boxShadow: "5px 5px 10px #ccc",
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
        borderRadius: "30px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "black",fontSize: "10px" }} aria-label="recipe">
              <b>{userName}</b>
            </Avatar>
          }
          title={title}
        />
        {isUser && (
          <Box display="flex">
            <IconButton sx={{ marginLeft: "auto" }} onClick={handleEdit}>
              <ModeEditOutlineIcon color="warning" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteIcon color="error" />
            </IconButton>
          </Box>
        )}
      </div>
      <CardMedia component="img" height="194" image={imageUrl} alt={title} />

      <CardContent>
        <hr></hr>
        <br />
        <Typography variant="body2" color="text.secondary">
          <b>
            {userName}
            {" : "}
          </b>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Blog;
