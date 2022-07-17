import React, { useState } from "react";
import { Box, TextField, Button } from "@material-ui/core";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { async } from "@firebase/util";

const Register = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    if (password != confirmPassword) {
      return toast.error("Passwords doesn't Match");
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
          return toast.success(
            `Sign Up successful.Welcome ${result.user.email}`
          );
          handleClose();
        })
        .catch((e) => {
          if (e.code === "auth/weak-password") {
            return toast.error("The password provided is too weak.");
          } else if (e.code === "auth/email-already-in-use") {
            return toast.error("The account already exists for that email.");
          } else if (e.code === "auth/operation-not-allowed") {
            return toast.error(
              "There is a problem with auth service config :/"
            );
          } else if (e.code === "auth/weak-password") {
            return toast.error("Please type stronger password");
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
      <TextField
        variant="outlined"
        type="password"
        label="Enter Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "white" }}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default Register;
