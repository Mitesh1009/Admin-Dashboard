"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Avatar,
} from "@mui/material";
import { Settings, Person, Notifications, Palette } from "@mui/icons-material";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");

  return (
    <div
      className="p-6"
      style={{ backgroundColor: "#111827", minHeight: "100vh" }}
    >
      <Box className="mb-6">
        <Box className="flex items-center space-x-3">
          <Box className="p-3 bg-gray-600 rounded-lg">
            <Settings sx={{ color: "white", fontSize: 28 }} />
          </Box>
          <Box>
            <Typography variant="h4" className="font-bold text-white">
              Settings
            </Typography>
            <Typography variant="body2" className="text-gray-400">
              Manage your preferences
            </Typography>
          </Box>
        </Box>
      </Box>

      <Card
        sx={{
          backgroundColor: "#1F2937",
          border: "1px solid #374151",
          borderRadius: "12px",
          mb: 3,
        }}
      >
        <CardContent>
          <Box className="flex items-center space-x-3 mb-4">
            <Person sx={{ color: "#3B82F6", fontSize: 20 }} />
            <Typography variant="h6" sx={{ color: "white" }}>
              Profile
            </Typography>
          </Box>
          <Box className="flex items-center space-x-3 mb-4">
            <Avatar
              sx={{
                width: 50,
                height: 50,
                background: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
              }}
            >
              JD
            </Avatar>
            <Typography variant="h6" sx={{ color: "white" }}>
              John Doe
            </Typography>
          </Box>
          <Box className="space-y-3">
            <TextField
              fullWidth
              size="small"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{
                "& .MuiInputLabel-root": { color: "#9CA3AF" },
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": { borderColor: "#374151" },
                  "&:hover fieldset": { borderColor: "#4B5563" },
                  "&.Mui-focused fieldset": { borderColor: "#3B82F6" },
                },
              }}
            />
            <TextField
              fullWidth
              size="small"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                "& .MuiInputLabel-root": { color: "#9CA3AF" },
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": { borderColor: "#374151" },
                  "&:hover fieldset": { borderColor: "#4B5563" },
                  "&.Mui-focused fieldset": { borderColor: "#3B82F6" },
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>

      <Card
        sx={{
          backgroundColor: "#1F2937",
          border: "1px solid #374151",
          borderRadius: "12px",
          mb: 3,
        }}
      >
        <CardContent>
          <Box className="flex items-center space-x-3 mb-4">
            <Notifications sx={{ color: "#10B981", fontSize: 20 }} />
            <Typography variant="h6" sx={{ color: "white" }}>
              Preferences
            </Typography>
          </Box>
          <Box className="space-y-2">
            <FormControlLabel
              control={
                <Switch
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": { color: "#3B82F6" },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#3B82F6",
                    },
                  }}
                />
              }
              label={
                <Typography sx={{ color: "white" }}>Notifications</Typography>
              }
            />
            <FormControlLabel
              control={
                <Switch
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": { color: "#3B82F6" },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#3B82F6",
                    },
                  }}
                />
              }
              label={<Typography sx={{ color: "white" }}>Dark Mode</Typography>}
            />
          </Box>
        </CardContent>
      </Card>

      <Button
        variant="contained"
        sx={{
          backgroundColor: "#3B82F6",
          "&:hover": { backgroundColor: "#2563EB" },
          px: 4,
        }}
      >
        Save Changes
      </Button>
    </div>
  );
}
