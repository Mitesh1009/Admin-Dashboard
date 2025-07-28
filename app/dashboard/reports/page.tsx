"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  Assessment,
  DateRange,
  People,
  AttachMoney,
  ShoppingCart,
} from "@mui/icons-material";

const generateMockData = (startDate: Date, endDate: Date) => {
  const data = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dateStr = currentDate.toISOString().split("T")[0];
    const dayOfWeek = currentDate.getDay();

    const baseUsers = 100 + Math.random() * 200;
    const weekendMultiplier = dayOfWeek === 0 || dayOfWeek === 6 ? 0.7 : 1;
    const users = Math.floor(baseUsers * weekendMultiplier);

    const revenue = users * (20 + Math.random() * 80);
    const orders = Math.floor(users * (0.1 + Math.random() * 0.3));
    const pageViews = users * (3 + Math.random() * 7);

    data.push({
      date: dateStr,
      users,
      revenue: Math.floor(revenue),
      orders,
      pageViews: Math.floor(pageViews),
      conversionRate: Math.floor((orders / users) * 100 * 100) / 100,
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return data;
};

const categoryData = [
  { name: "Electronics", value: 35, color: "#3B82F6" },
  { name: "Clothing", value: 25, color: "#10B981" },
  { name: "Books", value: 20, color: "#F59E0B" },
  { name: "Home & Garden", value: 12, color: "#EF4444" },
  { name: "Sports", value: 8, color: "#8B5CF6" },
];

type DateRange = "7d" | "30d" | "90d" | "custom";

export default function ReportsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [dateRange, setDateRange] = useState<DateRange>("30d");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState<any[]>([]);

  const getDateRange = (range: DateRange) => {
    const end = new Date();
    const start = new Date();

    switch (range) {
      case "7d":
        start.setDate(end.getDate() - 7);
        break;
      case "30d":
        start.setDate(end.getDate() - 30);
        break;
      case "90d":
        start.setDate(end.getDate() - 90);
        break;
      case "custom":
        return { start: new Date(startDate), end: new Date(endDate) };
    }

    return { start, end };
  };

  useEffect(() => {
    const { start, end } = getDateRange(dateRange);
    if (dateRange === "custom" && (!startDate || !endDate)) return;

    const mockData = generateMockData(start, end);
    setData(mockData);
  }, [dateRange, startDate, endDate]);

  const metrics = useMemo(() => {
    if (!data.length)
      return {
        totalUsers: 0,
        totalRevenue: 0,
        totalOrders: 0,
        avgConversion: 0,
      };

    const totalUsers = data.reduce((sum, item) => sum + item.users, 0);
    const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
    const totalOrders = data.reduce((sum, item) => sum + item.orders, 0);
    const avgConversion =
      totalOrders > 0 ? (totalOrders / totalUsers) * 100 : 0;

    return {
      totalUsers,
      totalRevenue,
      totalOrders,
      avgConversion: Math.round(avgConversion * 100) / 100,
    };
  }, [data]);

  const handleApplyCustomRange = () => {
    if (startDate && endDate) {
      const { start, end } = getDateRange("custom");
      const mockData = generateMockData(start, end);
      setData(mockData);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const renderLineChart = () => {
    return (
      <LineChart
        data={data}
        margin={{ 
          top: 5, 
          right: isMobile ? 10 : 30, 
          left: isMobile ? 5 : 20, 
          bottom: 5 
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis
          dataKey="date"
          tickFormatter={formatDate}
          stroke="#9CA3AF"
          fontSize={isMobile ? 10 : 12}
          interval={isMobile ? 'preserveStartEnd' : 0}
        />
        <YAxis 
          stroke="#9CA3AF" 
          fontSize={isMobile ? 10 : 12}
          width={isMobile ? 40 : 60}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1F2937",
            border: "1px solid #374151",
            borderRadius: "8px",
            color: "#F9FAFB",
            fontSize: isMobile ? "12px" : "14px",
          }}
          formatter={(value: any, name: string) => [
            name === "revenue" ? formatCurrency(value) : value.toLocaleString(),
            name.charAt(0).toUpperCase() + name.slice(1),
          ]}
          labelFormatter={(label) => `Date: ${formatDate(label)}`}
        />
        <Legend 
          wrapperStyle={{ fontSize: isMobile ? "12px" : "14px" }}
        />
        <Line
          type="monotone"
          dataKey="users"
          stroke="#3B82F6"
          strokeWidth={isMobile ? 2 : 3}
          dot={{ fill: "#3B82F6", strokeWidth: 2, r: isMobile ? 3 : 4 }}
          name="Users"
        />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#10B981"
          strokeWidth={isMobile ? 2 : 3}
          dot={{ fill: "#10B981", strokeWidth: 2, r: isMobile ? 3 : 4 }}
          name="Revenue"
        />
      </LineChart>
    );
  };

  const renderPieChart = () => {
    return (
      <PieChart>
        <Pie
          data={categoryData}
          cx="50%"
          cy="50%"
          outerRadius={isMobile ? 60 : 80}
          paddingAngle={2}
          dataKey="value"
        >
          {categoryData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "#1F2937",
            border: "1px solid #374151",
            borderRadius: "8px",
            color: "#F9FAFB",
            fontSize: isMobile ? "12px" : "14px",
          }}
          formatter={(value: any) => [`${value}%`, "Share"]}
        />
        <Legend
          wrapperStyle={{ 
            color: "#D1D5DB", 
            paddingTop: "10px",
            fontSize: isMobile ? "11px" : "12px"
          }}
          formatter={(value) => value}
          layout="horizontal"
          align="center"
          verticalAlign="bottom"
        />
      </PieChart>
    );
  };

  return (
    <Box
      sx={{
        p: isMobile ? 2 : 3,
        backgroundColor: "#111827",
        minHeight: "100vh",
        maxWidth: "100vw",
        overflow: "hidden",
      }}
    >
      <Box sx={{ mb: isMobile ? 4 : 6 }}>
        <Box 
          sx={{ 
            display: "flex", 
            alignItems: "center", 
            gap: isMobile ? 2 : 3, 
            mb: 2,
            flexDirection: isSmall ? "column" : "row",
            textAlign: isSmall ? "center" : "left"
          }}
        >
          <Box className="p-3 bg-purple-600 rounded-lg">
            <Assessment sx={{ color: "white", fontSize: isMobile ? 24 : 32 }} />
          </Box>
          <Box>
            <Typography 
              variant={isMobile ? "h4" : "h3"} 
              className="font-bold text-white"
            >
              Analytics Reports
            </Typography>
            <Typography variant="body1" className="text-gray-400">
              Track performance metrics and distribution analytics
            </Typography>
          </Box>
        </Box>
      </Box>

      <Grid container spacing={isMobile ? 2 : 3} sx={{ mb: isMobile ? 4 : 6 }}>
        {[
          {
            title: "Total Users",
            value: metrics.totalUsers.toLocaleString(),
            icon: <People sx={{ fontSize: isMobile ? 20 : 28 }} />,
            bgColor: "bg-blue-600",
          },
          {
            title: "Total Revenue",
            value: formatCurrency(metrics.totalRevenue),
            icon: <AttachMoney sx={{ fontSize: isMobile ? 20 : 28 }} />,
            bgColor: "bg-green-600",
          },
          {
            title: "Total Orders",
            value: metrics.totalOrders.toLocaleString(),
            icon: <ShoppingCart sx={{ fontSize: isMobile ? 20 : 28 }} />,
            bgColor: "bg-yellow-600",
          },
          {
            title: "Conversion Rate",
            value: `${metrics.avgConversion}%`,
            icon: <TrendingUp sx={{ fontSize: isMobile ? 20 : 28 }} />,
            bgColor: "bg-purple-600",
          },
        ].map((metric, index) => (
          <Grid item xs={6} sm={6} md={3} key={index}>
            <Card
              sx={{
                backgroundColor: "#1F2937",
                border: "1px solid #374151",
                borderRadius: "12px",
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: isMobile ? "none" : "translateY(-4px)",
                },
                height: "100%",
              }}
            >
              <CardContent sx={{ p: isMobile ? 2 : 3 }}>
                <Box 
                  sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "space-between",
                    flexDirection: isSmall ? "column" : "row",
                    gap: isSmall ? 1 : 0,
                  }}
                >
                  <Box sx={{ textAlign: isSmall ? "center" : "left", minWidth: 0 }}>
                    <Typography
                      variant="body2"
                      sx={{ 
                        color: "#9CA3AF", 
                        mb: 1,
                        fontSize: isMobile ? "11px" : "14px",
                      }}
                    >
                      {metric.title}
                    </Typography>
                    <Typography
                      variant={isMobile ? "h6" : "h5"}
                      sx={{ 
                        color: "white", 
                        fontWeight: "bold",
                        fontSize: isMobile ? "16px" : "24px",
                        wordBreak: "break-all",
                      }}
                    >
                      {metric.value}
                    </Typography>
                  </Box>
                  <Box 
                    className={`p-2 ${metric.bgColor} rounded-lg`}
                    sx={{ 
                      flexShrink: 0,
                      ml: isSmall ? 0 : 2,
                    }}
                  >
                    {React.cloneElement(metric.icon, {
                      sx: { color: "white" },
                    })}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={isMobile ? 2 : 3}>
        <Grid item xs={12} lg={isMobile ? 12 : 7}>
          <Card
            sx={{
              backgroundColor: "#1F2937",
              border: "1px solid #374151",
              borderRadius: "12px",
              height: isMobile ? "auto" : 520,
              mb: isMobile ? 2 : 0,
            }}
          >
            <CardContent sx={{ p: isMobile ? 2 : 3, height: "100%" , minWidth: "300px"}}>
              <Box 
                sx={{ 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "space-between", 
                  mb: 3,
                  flexDirection: isMobile ? "column" : "row",
                  gap: isMobile ? 2 : 0,
                }}
              >
                <Typography
                  variant={isMobile ? "h6" : "h6"}
                  sx={{ 
                    color: "white", 
                    fontWeight: 600,
                    fontSize: isMobile ? "16px" : "18px",
                  }}
                >
                  Performance Trends
                </Typography>

                <FormControl size="small" sx={{ minWidth: isMobile ? "100%" : 140 }}>
                  <InputLabel
                    sx={{
                      color: "#9CA3AF",
                      "&.Mui-focused": {
                        color: "#3B82F6",
                      },
                    }}
                  >
                    Date Range
                  </InputLabel>
                  <Select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value as DateRange)}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          backgroundColor: "#1F2937",
                          border: "1px solid #374151",
                          "& .MuiMenuItem-root": {
                            color: "#F9FAFB",
                            fontSize: isMobile ? "14px" : "16px",
                            "&:hover": {
                              backgroundColor: "#374151",
                            },
                            "&.Mui-selected": {
                              backgroundColor: "#3B82F6",
                              "&:hover": {
                                backgroundColor: "#2563EB",
                              },
                            },
                          },
                        },
                      },
                    }}
                    sx={{
                      color: "white",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#374151",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#4B5563",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#3B82F6",
                      },
                      "& .MuiSvgIcon-root": {
                        color: "#9CA3AF",
                      },
                    }}
                  >
                    <MenuItem value="7d">Last 7 days</MenuItem>
                    <MenuItem value="30d">Last 30 days</MenuItem>
                    <MenuItem value="90d">Last 90 days</MenuItem>
                    <MenuItem value="custom">Custom Range</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {dateRange === "custom" && (
                <Box 
                  sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: 2, 
                    mb: 3,
                    flexDirection: isMobile ? "column" : "row",
                  }}
                >
                  <TextField
                    type="date"
                    label="From Date"
                    size="small"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    fullWidth={isMobile}
                    sx={{
                      "& .MuiInputLabel-root": {
                        color: "#9CA3AF",
                        "&.Mui-focused": {
                          color: "#3B82F6",
                        },
                      },
                      "& .MuiOutlinedInput-root": {
                        color: "white",
                        "& fieldset": { borderColor: "#374151" },
                        "&:hover fieldset": { borderColor: "#4B5563" },
                        "&.Mui-focused fieldset": { borderColor: "#3B82F6" },
                      },
                    }}
                  />
                  <TextField
                    type="date"
                    label="To Date"
                    size="small"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    fullWidth={isMobile}
                    sx={{
                      "& .MuiInputLabel-root": {
                        color: "#9CA3AF",
                        "&.Mui-focused": {
                          color: "#3B82F6",
                        },
                      },
                      "& .MuiOutlinedInput-root": {
                        color: "white",
                        "& fieldset": { borderColor: "#374151" },
                        "&:hover fieldset": { borderColor: "#4B5563" },
                        "&.Mui-focused fieldset": { borderColor: "#3B82F6" },
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={handleApplyCustomRange}
                    disabled={!startDate || !endDate}
                    fullWidth={isMobile}
                    sx={{
                      backgroundColor: "#3B82F6",
                      "&:hover": { backgroundColor: "#2563EB" },
                      "&:disabled": { backgroundColor: "#374151" },
                    }}
                  >
                    Apply
                  </Button>
                </Box>
              )}

              <Box sx={{ height: isMobile ? 300 : 350, width: "100%" }}>
                <ResponsiveContainer width="100%" height="100%">
                  {renderLineChart()}
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={isMobile ? 12 : 5}>
          <Card
            sx={{
              backgroundColor: "#1F2937",
              border: "1px solid #374151",
              borderRadius: "12px",
              height: isMobile ? "auto" : "100%",
            }}
          >
            <CardContent sx={{ p: isMobile ? 2 : 3, height: "100%", minWidth: "300px" }}>
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant={isMobile ? "h6" : "h6"}
                  sx={{ 
                    color: "white", 
                    fontWeight: 600,
                    textAlign: "center",
                    fontSize: isMobile ? "16px" : "18px",
                  }}
                >
                  Sales Distribution
                </Typography>
              </Box>

              <Box
                sx={{
                  height: isMobile ? 250 : 280,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 3,
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  {renderPieChart()}
                </ResponsiveContainer>
              </Box>

              <Box>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: "#9CA3AF", 
                    mb: 2,
                    fontSize: isMobile ? "12px" : "14px",
                  }}
                >
                  Category Breakdown:
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {categoryData.map((category, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        py: 0.5,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            backgroundColor: category.color,
                            borderRadius: "2px",
                            flexShrink: 0,
                          }}
                        />
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: "#D1D5DB",
                            fontSize: isMobile ? "12px" : "14px",
                          }}
                        >
                          {category.name}
                        </Typography>
                      </Box>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: "#9CA3AF",
                          fontSize: isMobile ? "12px" : "14px",
                        }}
                      >
                        {category.value}%
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}