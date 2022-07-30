import React, { useState } from "react";
import { AppBar, Button, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [value, setvalue] = useState();
  return (
    <AppBar
      sx={{
        background:
          "linear-gradient(90deg, rgba(19,5,255,1) 0%, rgba(205,62,209,1) 48%, rgba(130,119,194,1) 100%);",
      }}
    >
      <Toolbar>
        <Typography variant="h5">Blogs</Typography>
        {isLoggedIn && (
          <Box display="flex" marginLeft={"auto"} marginRight={"auto"}>
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(e, val) => setvalue(val)}
            >
              <Tab LinkComponent={Link} to="/blogs" label="All Blogs" />
              <Tab LinkComponent={Link} to="/myblogs" label="My Blogs" />
              <Tab LinkComponent={Link} to="/blogs/add" label="Add Blog" />
            </Tabs>
          </Box>
        )}
        <Box display="flex" marginLeft="auto">
          {!isLoggedIn && (
            <>
              <Button
                LinkComponent={Link}
                to="/login"
                variant="contained"
                sx={{
                  margin: 1,
                  color: "white",
                  borderRadius: 10,
                  backgroundColor: "black",
                }}
              >
                Login
              </Button>
              <Button
                LinkComponent={Link}
                to="/login"
                variant="contained"
                sx={{
                  margin: 1,
                  color: "white",
                  borderRadius: 10,
                  backgroundColor: "black",
                }}
              >
                SignUp
              </Button>
            </>
          )}
          {isLoggedIn && (
            <Button
              onClick={() => dispatch(authActions.logout())}
              LinkComponent={Link}
              to="/login"
              variant="contained"
              sx={{
                margin: 1,
                color: "white",
                borderRadius: 10,
                backgroundColor: "black",
              }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
