"use client";

import React, { useState, useRef, useEffect } from "react";
import { users, initialMessages } from "@/app/_constants/chatUsers";
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Badge,
  InputAdornment,
  Card,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Send,
  Chat,
  Search,
  MoreVert,
  AttachFile,
  EmojiEmotions,
  Call,
  VideoCall,
  Info,
  Circle,
  ArrowBack,
} from "@mui/icons-material";

interface Message {
  id: number;
  senderId: number;
  senderName: string;
  message: string;
  timestamp: string;
  isOwn: boolean;
}

export default function ChatPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showChat, setShowChat] = useState(!isMobile);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    setShowChat(!isMobile);
  }, [isMobile]);

  const handleUserSelect = (user: (typeof users)[0]) => {
    setSelectedUser(user);
    if (isMobile) {
      setShowChat(true);
    }
  };

  const handleBackToUsers = () => {
    setShowChat(false);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        senderId: 0,
        senderName: "You",
        message: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
        isOwn: true,
      };

      setMessages([...messages, message]);
      setNewMessage("");

      setTimeout(() => {
        const responses = [
          "Got it! Thanks for letting me know.",
          "Sounds good to me!",
          "I'll take care of that right away.",
          "Perfect! Let me know if you need anything else.",
          "That works for me. Thanks!",
        ];

        const randomResponse =
          responses[Math.floor(Math.random() * responses.length)];
        const responseMessage: Message = {
          id: messages.length + 2,
          senderId: selectedUser.id,
          senderName: selectedUser.name,
          message: randomResponse,
          timestamp: new Date().toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          }),
          isOwn: false,
        };

        setMessages((prev) => [...prev, responseMessage]);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "#10B981";
      case "away":
        return "#F59E0B";
      case "offline":
        return "#6B7280";
      default:
        return "#6B7280";
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="p-6"
      style={{
        backgroundColor: "#111827",
        minHeight: "100vh",
        padding: isMobile ? "16px" : "24px",
      }}
    >
      <Box className="mb-6">
        <Box className="flex items-center space-x-3">
          <Box className="p-3 bg-blue-600 rounded-lg">
            <Chat sx={{ color: "white", fontSize: isMobile ? 24 : 32 }} />
          </Box>
          <Box>
            <Typography
              variant={isMobile ? "h4" : "h3"}
              className="font-bold text-white"
            >
              User Chat
            </Typography>
            <Typography variant="body1" className="text-gray-400">
              Connect and communicate with your team
            </Typography>
          </Box>
        </Box>
      </Box>

      <Card
        sx={{
          backgroundColor: "#1F2937",
          border: "1px solid #374151",
          borderRadius: "16px",
          height: isMobile ? "calc(100vh - 140px)" : "75vh",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: "100%",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <Box
            sx={{
              width: isMobile ? "100%" : 350,
              height: isMobile ? (showChat ? 0 : "100%") : "100%",
              borderRight: isMobile ? "none" : "1px solid #374151",
              borderBottom: isMobile ? "1px solid #374151" : "none",
              backgroundColor: "#111827",
              display: isMobile && showChat ? "none" : "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <Box sx={{ p: 2 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: "#9CA3AF", fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#374151",
                    borderRadius: "10px",
                    "& fieldset": {
                      borderColor: "#4B5563",
                    },
                    "&:hover fieldset": {
                      borderColor: "#6B7280",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#3B82F6",
                    },
                    "& input": {
                      color: "white",
                      fontSize: "14px",
                      "&::placeholder": {
                        color: "#9CA3AF",
                        opacity: 1,
                      },
                    },
                  },
                }}
              />
            </Box>

            <Box sx={{ flex: 1, overflow: "auto" }}>
              {filteredUsers.map((user) => (
                <Box
                  key={user.id}
                  onClick={() => handleUserSelect(user)}
                  sx={{
                    p: 2,
                    cursor: "pointer",
                    backgroundColor:
                      selectedUser.id === user.id ? "#374151" : "transparent",
                    borderLeft:
                      selectedUser.id === user.id
                        ? "3px solid #3B82F6"
                        : "3px solid transparent",
                    "&:hover": {
                      backgroundColor: "#1F2937",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  <Box className="flex items-center space-x-3">
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      badgeContent={
                        <Circle
                          sx={{
                            color: getStatusColor(user.status),
                            fontSize: 12,
                          }}
                        />
                      }
                    >
                      <Avatar
                        sx={{
                          width: 45,
                          height: 45,
                          background:
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          fontSize: "16px",
                          fontWeight: 600,
                        }}
                      >
                        {user.avatar}
                      </Avatar>
                    </Badge>

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Box className="flex items-center justify-between">
                        <Typography
                          variant="body1"
                          sx={{
                            color: "white",
                            fontWeight: 500,
                            fontSize: "15px",
                          }}
                        >
                          {user.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "#9CA3AF", fontSize: "12px" }}
                        >
                          {user.timestamp}
                        </Typography>
                      </Box>

                      <Box className="flex items-center justify-between mt-1">
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#9CA3AF",
                            fontSize: "13px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: isMobile ? "200px" : "180px",
                          }}
                        >
                          {user.lastMessage}
                        </Typography>
                        {user.unreadCount > 0 && (
                          <Chip
                            label={user.unreadCount}
                            size="small"
                            sx={{
                              backgroundColor: "#3B82F6",
                              color: "white",
                              fontSize: "11px",
                              height: "20px",
                              minWidth: "20px",
                            }}
                          />
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          <Box
            sx={{
              flex: 1,
              display: isMobile && !showChat ? "none" : "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Box
              sx={{
                p: 2,
                borderBottom: "1px solid #374151",
                backgroundColor: "#1F2937",
              }}
            >
              <Box className="flex items-center justify-between">
                <Box className="flex items-center space-x-3">
                  {isMobile && (
                    <IconButton
                      onClick={handleBackToUsers}
                      sx={{ color: "white", mr: 1 }}
                    >
                      <ArrowBack />
                    </IconButton>
                  )}

                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    badgeContent={
                      <Circle
                        sx={{
                          color: getStatusColor(selectedUser.status),
                          fontSize: 12,
                        }}
                      />
                    }
                  >
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        fontSize: "16px",
                        fontWeight: 600,
                      }}
                    >
                      {selectedUser.avatar}
                    </Avatar>
                  </Badge>

                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ color: "white", fontWeight: 600, fontSize: "16px" }}
                    >
                      {selectedUser.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#9CA3AF", fontSize: "13px" }}
                    >
                      {selectedUser.lastSeen}
                    </Typography>
                  </Box>
                </Box>

                <Box className="flex items-center space-x-1">
                  <IconButton sx={{ color: "#9CA3AF" }}>
                    <Call fontSize="small" />
                  </IconButton>
                  <IconButton sx={{ color: "#9CA3AF" }}>
                    <VideoCall fontSize="small" />
                  </IconButton>
                  {!isMobile && (
                    <>
                      <IconButton sx={{ color: "#9CA3AF" }}>
                        <Info fontSize="small" />
                      </IconButton>
                      <IconButton sx={{ color: "#9CA3AF" }}>
                        <MoreVert fontSize="small" />
                      </IconButton>
                    </>
                  )}
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                p: 2,
                backgroundColor: "#111827",
              }}
            >
              {messages.map((message) => (
                <Box
                  key={message.id}
                  sx={{
                    display: "flex",
                    justifyContent: message.isOwn ? "flex-end" : "flex-start",
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: isMobile ? "85%" : "70%",
                      display: "flex",
                      flexDirection: message.isOwn ? "row-reverse" : "row",
                      alignItems: "flex-end",
                      gap: 1,
                    }}
                  >
                    {!message.isOwn && (
                      <Avatar
                        sx={{
                          width: 28,
                          height: 28,
                          background:
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          fontSize: "12px",
                          fontWeight: 600,
                        }}
                      >
                        {selectedUser.avatar}
                      </Avatar>
                    )}

                    <Box>
                      <Paper
                        sx={{
                          p: 2,
                          backgroundColor: message.isOwn
                            ? "#3B82F6"
                            : "#374151",
                          color: "white",
                          borderRadius: message.isOwn
                            ? "16px 16px 4px 16px"
                            : "16px 16px 16px 4px",
                          fontSize: "14px",
                          lineHeight: 1.4,
                        }}
                      >
                        <Typography variant="body2">
                          {message.message}
                        </Typography>
                      </Paper>

                      <Typography
                        variant="caption"
                        sx={{
                          color: "#9CA3AF",
                          fontSize: "11px",
                          display: "block",
                          textAlign: message.isOwn ? "right" : "left",
                          mt: 0.5,
                          px: 1,
                        }}
                      >
                        {message.timestamp}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
              <div ref={messagesEndRef} />
            </Box>

            <Box
              sx={{
                p: 2,
                borderTop: "1px solid #374151",
                backgroundColor: "#1F2937",
              }}
            >
              <Box className="flex items-end space-x-2">
                {!isMobile && (
                  <IconButton sx={{ color: "#9CA3AF" }}>
                    <AttachFile fontSize="small" />
                  </IconButton>
                )}

                <TextField
                  fullWidth
                  multiline
                  maxRows={3}
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#374151",
                      borderRadius: "12px",
                      "& fieldset": {
                        borderColor: "#4B5563",
                      },
                      "&:hover fieldset": {
                        borderColor: "#6B7280",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#3B82F6",
                      },
                      "& textarea": {
                        color: "white",
                        fontSize: "14px",
                        "&::placeholder": {
                          color: "#9CA3AF",
                          opacity: 1,
                        },
                      },
                    },
                  }}
                />

                {!isMobile && (
                  <IconButton sx={{ color: "#9CA3AF" }}>
                    <EmojiEmotions fontSize="small" />
                  </IconButton>
                )}

                <IconButton
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  sx={{
                    backgroundColor: newMessage.trim() ? "#3B82F6" : "#374151",
                    color: "white",
                    "&:hover": {
                      backgroundColor: newMessage.trim()
                        ? "#2563EB"
                        : "#4B5563",
                    },
                    "&:disabled": {
                      color: "#9CA3AF",
                    },
                    width: 40,
                    height: 40,
                  }}
                >
                  <Send fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Card>
    </div>
  );
}
