import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Alert,
  CircularProgress,
  Button,
} from "@mui/material";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface Event {
  _id: string;
  title: string;
  date: string;
}

function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Function to Fetch Admin Data
  const fetchAdminData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Unauthorized: No token found");
      }

      const headers = { Authorization: `Bearer ${token}` };

      // ✅ Fetch users & events from backend
      const [usersRes, eventsRes] = await Promise.all([
        axios.get("https://event-management-xc6u.onrender.com/api/admin/users", { headers }),
        axios.get("https://event-management-xc6u.onrender.com/api/admin/events", { headers }),
      ]);

      console.log("Users:", usersRes.data);
      console.log("Events:", eventsRes.data);

      setUsers(usersRes.data);
      setEvents(eventsRes.data);
      setError(null); // ✅ Clear previous errors
    } catch (error) {
      console.error("❌ Error fetching admin data:", error);
      setError("Failed to load admin data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Fetch Data on Mount & When `eventCreated` Changes
  useEffect(() => {
    fetchAdminData();

    // ✅ Check if a new event was created and refresh data
    const eventCreated = localStorage.getItem("eventCreated");
    if (eventCreated === "true") {
      fetchAdminData();
      localStorage.removeItem("eventCreated"); // ✅ Clear flag after refresh
    }
  }, [fetchAdminData]);

  return (
    <Container maxWidth="md">
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
        <Card sx={{ width: "100%", padding: 3, boxShadow: 3, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h4" textAlign="center" gutterBottom>
              Admin Dashboard
            </Typography>

            {loading ? (
              <Box display="flex" justifyContent="center">
                <CircularProgress />
              </Box>
            ) : error ? (
              <Alert severity="error">{error}</Alert>
            ) : (
              <>
                {/* ✅ Users Section */}
                <Typography variant="h5" gutterBottom>
                  Registered Users
                </Typography>
                {users.length > 0 ? (
                  <List>
                    {users.map((user) => (
                      <ListItem key={user._id}>
                        <ListItemText primary={user.name} secondary={user.email} />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography color="textSecondary">No users found.</Typography>
                )}

                {/* ✅ Events Section */}
                <Typography variant="h5" gutterBottom>
                  Created Events
                </Typography>
                {events.length > 0 ? (
                  <List>
                    {events.map((event) => (
                      <ListItem key={event._id}>
                        <ListItemText primary={event.title} secondary={`Date: ${event.date}`} />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography color="textSecondary">No events found.</Typography>
                )}

                {/* ✅ Button to Manually Refresh Data */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={fetchAdminData} // ✅ Manual Refresh
                  sx={{ marginTop: 2 }}
                >
                  Refresh Data
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default AdminDashboard;
