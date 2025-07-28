"use client";

import React, { useState } from "react";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import {
  AccountCircle,
  Visibility,
  VisibilityOff,
  Email,
  Lock,
} from "@mui/icons-material";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fakeToken = "abc123";

    document.cookie = `token=${fakeToken}; path=/; max-age=${60 * 30}`;
    sessionStorage.setItem("user", JSON.stringify(formData));

    window.location.href = "/dashboard";
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "url('/images/banner.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        px: 3,
      }}
    >
      <Paper
        elevation={24}
        sx={{
          width: "100%",
          maxWidth: 400,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          borderRadius: 3,
          p: 4,
          color: "white",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <AccountCircle sx={{ fontSize: 50, color: "white", mb: 1 }} />
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: 600, mb: 1 }}
          >
            Sign In
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "rgba(255, 255, 255, 0.7)" }}
          >
            Enter your credentials to continue
          </Typography>
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <TextField
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Email"
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
                </InputAdornment>
              ),
              sx: {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                color: "white",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255, 255, 255, 0.3)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255, 255, 255, 0.5)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#2196f3",
                },
              },
            }}
            InputLabelProps={{
              sx: { color: "rgba(255, 255, 255, 0.7)" },
            }}
            sx={{
              "& .MuiInputBase-input::placeholder": {
                color: "rgba(255, 255, 255, 0.7)",
                opacity: 1,
              },
            }}
          />

          <TextField
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Password"
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    edge="end"
                    sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                color: "white",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255, 255, 255, 0.3)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255, 255, 255, 0.5)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#2196f3",
                },
              },
            }}
            InputLabelProps={{
              sx: { color: "rgba(255, 255, 255, 0.7)" },
            }}
            sx={{
              "& .MuiInputBase-input::placeholder": {
                color: "rgba(255, 255, 255, 0.7)",
                opacity: 1,
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{
              py: 1.5,
              backgroundColor: "#1976d2",
              "&:hover": {
                backgroundColor: "#1565c0",
              },
              fontWeight: 600,
              borderRadius: 2,
            }}
          >
            Sign In
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
