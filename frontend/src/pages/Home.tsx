import { useEffect, useState } from "react";
import { getEvents } from "../api/eventApi";
import { Container, Typography, Card, CardContent } from "@mui/material";

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
}

function Home() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Upcoming Events</Typography>
      {events.length > 0 ? (
        events.map((event) => (
          <Card key={event._id} sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h6">{event.title}</Typography>
              <Typography variant="body2">{event.description}</Typography>
              <Typography variant="body2" color="textSecondary">
                📅 {new Date(event.date).toLocaleDateString()} | 📍 {event.location}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography>No events available.</Typography>
      )}
    </Container>
  );
}

export default Home;
