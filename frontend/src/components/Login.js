import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignUp, setisSignUp] = useState(false);
  const [inputs, setinputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setinputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async (type = "login") => {
    const response = await axios
      .post(`http://localhost:5000/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log(err));

    const data = await response.data;
    console.log(data);
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      sendRequest("signup")
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"))
        .then((data) => console.log(data));
    } else {
      sendRequest()
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"))
        .then((data) => console.log(data));
    }
  };
  return (
    <div style={{ marginTop: "60px" }}>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          boxShadow="10px 10px 20px #000"
          justifyContent="center"
          padding={3}
          margin="auto"
          marginTop={12}
          maxWidth={400}
          borderRadius={5}
        >
          <Typography variant="h3" padding={3} textAlign="center">
            {!isSignUp ? "Login" : "SignUp"}
          </Typography>
          {isSignUp && (
            <TextField
              name="name"
              margin="normal"
              placeholder="Name"
              value={inputs.name}
              onChange={handleChange}
            />
          )}
          <TextField
            name="email"
            type={"email"}
            margin="normal"
            placeholder="Email"
            value={inputs.email}
            onChange={handleChange}
          />
          <TextField
            name="password"
            type={"password"}
            margin="normal"
            placeholder="Password"
            value={inputs.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            sx={{ borderRadius: 3, marginTop: 3 }}
            color="warning"
            variant="contained"
          >
            Submit
          </Button>
          <Button
            sx={{ borderRadius: 3, marginTop: 3 }}
            color="success"
            variant
            onClick={() => setisSignUp(!isSignUp)}
          >
            Change to {!isSignUp ? "SignUp" : "Login"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Login;
