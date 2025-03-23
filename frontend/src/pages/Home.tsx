import { useEffect, useState } from "react";
import { getUpcomingEvents, getPastEvents } from "../api/eventApi";
import EventFilter from "../components/EventFilter";
import { Container, Typography, Box, Card, CardContent, Grid } from "@mui/material";

interface Event {
  _id: string;
  title: string;
  date: string;
  location: string;
  category: string;
  eventType: string;
}

const Home = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [filters, setFilters] = useState<{ category?: string; eventType?: string }>({});

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const upcoming = await getUpcomingEvents(filters);
        const past = await getPastEvents(filters);
        setUpcomingEvents(upcoming);
        setPastEvents(past);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents(); // ✅ Correct async handling inside useEffect
  }, [filters]); // ✅ Ensures re-fetching when filters change

  return (
    <Container maxWidth="md">
      <Typography variant="h4" textAlign="center" gutterBottom>
        Event Timeline
      </Typography>

      {/* ✅ Event Filter Component */}
      <Box my={3}>
        <EventFilter onFilterChange={setFilters} />
      </Box>

      {/* ✅ Upcoming Events Section */}
      <Typography variant="h5" marginTop={3}>
        Upcoming Events
      </Typography>
      <Grid container spacing={2}>
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event._id}>
              <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6">{event.title}</Typography>
                  <Typography color="textSecondary">{new Date(event.date).toLocaleDateString()}</Typography>
                  <Typography color="textSecondary">{event.location}</Typography>
                  <Typography variant="body2">{event.category} | {event.eventType}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography color="textSecondary" textAlign="center" width="100%">
            No upcoming events found.
          </Typography>
        )}
      </Grid>

      {/* ✅ Past Events Section */}
      <Typography variant="h5" marginTop={3}>
        Past Events
      </Typography>
      <Grid container spacing={2}>
        {pastEvents.length > 0 ? (
          pastEvents.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event._id}>
              <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6">{event.title}</Typography>
                  <Typography color="textSecondary">{new Date(event.date).toLocaleDateString()}</Typography>
                  <Typography color="textSecondary">{event.location}</Typography>
                  <Typography variant="body2">{event.category} | {event.eventType}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography color="textSecondary" textAlign="center" width="100%">
            No past events found.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default Home;

