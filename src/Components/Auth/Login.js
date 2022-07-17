import React, { useState } from "react";
import { Box, TextField, Button } from "@material-ui/core";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (!email || !password) {
      return toast.error("Please fill all the Fields");
    }

    try {
      await signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
          toast.success(`Login successful.Welcome ${result.user.email}`);
          handleClose();
        })
        .catch((e) => {
          if (e.code === "auth/wrong-password") {
            return toast.error("Password is Incorrect");
          } else if (e.code === "auth/user-not-found") {
            return toast.error("User Doesn't exist");
          } else {
            return toast.error("auth error " + e.toString());
          }
        });
    } catch (error) {
      return toast.error(error);
    }
  };

  return (
    <Box
      p={3}
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        type="password"
        label="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "white" }}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
