"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  TextField,
  IconButton,
  Avatar,
  Chip,
  Typography,
  Box,
  InputAdornment,
} from "@mui/material";
import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  Search,
  People,
  FirstPage,
  LastPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: {
    name: string;
  };
}

type SortField = "name" | "email" | "phone" | "company";
type SortDirection = "asc" | "desc";

export default function UserTable({ users }: { users: User[] }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.phone.toLowerCase().includes(search.toLowerCase()) ||
      user.company.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let aValue: string;
    let bValue: string;

    switch (sortField) {
      case "name":
        aValue = a.name;
        bValue = b.name;
        break;
      case "email":
        aValue = a.email;
        bValue = b.email;
        break;
      case "phone":
        aValue = a.phone;
        bValue = b.phone;
        break;
      case "company":
        aValue = a.company.name;
        bValue = b.company.name;
        break;
      default:
        aValue = a.name;
        bValue = b.name;
    }

    return sortDirection === "asc"
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  useEffect(() => {
    setPage(0);
  }, [search]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return (
        <KeyboardArrowUp
          sx={{ color: "rgba(255,255,255,0.3)", fontSize: 18 }}
        />
      );
    }
    return sortDirection === "asc" ? (
      <KeyboardArrowUp sx={{ color: "#60a5fa", fontSize: 18 }} />
    ) : (
      <KeyboardArrowDown sx={{ color: "#60a5fa", fontSize: 18 }} />
    );
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <div className="mt-8 space-y-6 px-2 md:px-0">
      <Box className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <Box className="flex items-center space-x-3">
          <Box className="p-2 bg-blue-600 rounded-lg">
            <People sx={{ color: "white", fontSize: 24 }} />
          </Box>
          <Box>
            <Typography variant="h5" className="font-bold text-white">
              Users Directory
            </Typography>
            <Typography variant="body2" className="text-gray-400">
              Manage and browse user information
            </Typography>
          </Box>
        </Box>
        <Typography
          variant="body2"
          className="text-gray-400 text-sm md:text-base"
        >
          {sortedUsers.length} {sortedUsers.length === 1 ? "user" : "users"}{" "}
          found
        </Typography>
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search by name, email, phone, or company..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search sx={{ color: "#9ca3af" }} />
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#374151",
            borderRadius: "12px",
            "& fieldset": { borderColor: "#4b5563" },
            "&:hover fieldset": { borderColor: "#6b7280" },
            "&.Mui-focused fieldset": {
              borderColor: "#3b82f6",
              borderWidth: "2px",
            },
            "& input": {
              color: "white",
              "&::placeholder": { color: "#9ca3af", opacity: 1 },
            },
          },
        }}
      />

      <Paper
        sx={{
          backgroundColor: "#374151",
          borderRadius: "12px",
          border: "1px solid #4b5563",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Box sx={{ overflowX: "auto" }}>
          <TableContainer className="max-w-[330px] sm:max-w-none">
            <Table sx={{ minWidth: 600 }}>
              <TableHead sx={{ backgroundColor: "#111827" }}>
                <TableRow>
                  {[
                    { key: "name" as SortField, label: "Name" },
                    { key: "email" as SortField, label: "Email" },
                    { key: "phone" as SortField, label: "Phone" },
                    { key: "company" as SortField, label: "Company" },
                  ].map(({ key, label }) => (
                    <TableCell
                      key={key}
                      sx={{
                        color: "#d1d5db",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        cursor: "pointer",
                        padding: "12px",
                        whiteSpace: "nowrap",
                        "&:hover": { backgroundColor: "#374151" },
                        transition: "background-color 0.15s ease",
                      }}
                      onClick={() => handleSort(key)}
                    >
                      <Box className="flex items-center space-x-2">
                        <span>{label}</span>
                        <SortIcon field={key} />
                      </Box>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user, index) => (
                    <TableRow
                      key={user.id}
                      sx={{
                        "&:hover": { backgroundColor: "#4b5563" },
                        transition: "background-color 0.15s ease",
                        animation: `fadeIn 0.3s ease-out ${index * 50}ms both`,
                        borderBottom: "1px solid #4b5563",
                      }}
                    >
                      <TableCell sx={{ padding: "12px" }}>
                        <Box className="flex items-center">
                          <Avatar
                            sx={{
                              width: 32,
                              height: 32,
                              marginRight: 1,
                              background:
                                "linear-gradient(135deg, #60a5fa 0%, #a855f7 100%)",
                              fontSize: "0.75rem",
                              fontWeight: 600,
                            }}
                          >
                            {getInitials(user.name)}
                          </Avatar>
                          <Typography
                            variant="body2"
                            sx={{ color: "white", fontWeight: 500 }}
                          >
                            {user.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ padding: "12px" }}>
                        <Typography variant="body2" sx={{ color: "#d1d5db" }}>
                          {user.email}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ padding: "12px" }}>
                        <Typography variant="body2" sx={{ color: "#d1d5db" }}>
                          {user.phone}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ padding: "12px" }}>
                        <Chip
                          label={user.company.name}
                          size="small"
                          sx={{
                            backgroundColor: "#1e3a8a",
                            color: "#bfdbfe",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {sortedUsers.length === 0 && (
          <Box className="text-center py-12">
            <People sx={{ fontSize: 48, color: "#4b5563", marginBottom: 2 }} />
            <Typography variant="h6" sx={{ color: "#9ca3af", marginBottom: 1 }}>
              No users found
            </Typography>
            <Typography variant="body2" sx={{ color: "#6b7280" }}>
              Try adjusting your search criteria
            </Typography>
          </Box>
        )}

        {sortedUsers.length > 0 && (
          <TablePagination
            component="div"
            count={sortedUsers.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 50]}
            sx={{
              backgroundColor: "#111827",
              color: "#d1d5db",
              borderTop: "1px solid #4b5563",
              "& .MuiTablePagination-toolbar": {
                padding: "16px 24px",
              },
              "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
                {
                  color: "#9ca3af",
                  fontSize: "0.875rem",
                },
              "& .MuiSelect-select": {
                color: "#d1d5db",
              },
              "& .MuiIconButton-root": {
                color: "#9ca3af",
                "&:hover": {
                  backgroundColor: "#374151",
                },
                "&.Mui-disabled": {
                  color: "#4b5563",
                },
              },
            }}
            ActionsComponent={({ count, page, rowsPerPage, onPageChange }) => (
              <Box className="flex items-center space-x-1">
                <IconButton
                  onClick={(e) => onPageChange(e, 0)}
                  disabled={page === 0}
                  size="small"
                >
                  <FirstPage />
                </IconButton>
                <IconButton
                  onClick={(e) => onPageChange(e, page - 1)}
                  disabled={page === 0}
                  size="small"
                >
                  <KeyboardArrowLeft />
                </IconButton>
                <IconButton
                  onClick={(e) => onPageChange(e, page + 1)}
                  disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                  size="small"
                >
                  <KeyboardArrowRight />
                </IconButton>
                <IconButton
                  onClick={(e) =>
                    onPageChange(
                      e,
                      Math.max(0, Math.ceil(count / rowsPerPage) - 1)
                    )
                  }
                  disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                  size="small"
                >
                  <LastPage />
                </IconButton>
              </Box>
            )}
          />
        )}
      </Paper>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
