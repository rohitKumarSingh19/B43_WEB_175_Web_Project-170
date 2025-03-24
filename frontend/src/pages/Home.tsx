
// import { useEffect, useState } from "react";
// import { getUpcomingEvents, getPastEvents } from "../api/eventApi";
// import { getBanner } from "../api/bannerApi"; // ✅ Import banner API
// import EventFilter from "../components/EventFilter";
// import { Container, Typography, Box, Card, CardContent, Grid } from "@mui/material";

// interface Event {
//   _id: string;
//   title: string;
//   date: string;
//   location: string;
//   category: string;
//   eventType: string;
// }

// interface Banner {
//   title: string;
//   description: string;
//   image: string;
// }

// const Home = () => {
//   const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
//   const [pastEvents, setPastEvents] = useState<Event[]>([]);
//   const [filters, setFilters] = useState<{ category?: string; eventType?: string }>({});
//   const [banner, setBanner] = useState<Banner | null>(null);
//   const [loadingBanner, setLoadingBanner] = useState(true);

//   useEffect(() => {
//     // ✅ Fetch Banner
//     const fetchBanner = async () => {
//       try {
//         const bannerData = await getBanner();
//         setBanner(bannerData);
//       } catch (error) {
//         console.error("❌ Error fetching banner:", error);
//       } finally {
//         setLoadingBanner(false);
//       }
//     };

//     // ✅ Fetch Events
//     const fetchEvents = async () => {
//       try {
//         const upcoming = await getUpcomingEvents(filters);
//         const past = await getPastEvents(filters);
//         setUpcomingEvents(upcoming);
//         setPastEvents(past);
//       } catch (error) {
//         console.error("❌ Error fetching events:", error);
//       }
//     };

//     fetchBanner(); // ✅ Fetch banner on mount
//     fetchEvents(); // ✅ Fetch events when filters change
//   }, [filters]);

//   return (
//     <Container maxWidth="md">
//       {/* ✅ Banner Section */}
//       <Box sx={{ textAlign: "center", my: 3 }}>
//         {loadingBanner ? (
//           <Typography variant="h5">Loading Banner...</Typography>
//         ) : banner ? (
//           <>
//             <Typography variant="h3" fontWeight="bold">
//               {banner.title}
//             </Typography>
//             <Typography variant="h6" color="textSecondary" sx={{ mt: 1 }}>
//               {banner.description}
//             </Typography>
//             <Box sx={{ mt: 2 }}>
//               <img
//                 src={`http://localhost:5000${banner.image}`} // ✅ Adjust backend path if needed
//                 alt="Event Banner"
//                 style={{
//                   width: "100%",
//                   maxHeight: "400px",
//                   objectFit: "cover",
//                   borderRadius: "10px",
//                 }}
//               />
//             </Box>
//           </>
//         ) : (
//           <Typography variant="h5" color="error">
//             No Banner Available
//           </Typography>
//         )}
//       </Box>

//       <Typography variant="h4" textAlign="center" gutterBottom>
//         Event Timeline
//       </Typography>

//       {/* ✅ Event Filter Component */}
//       <Box my={3}>
//         <EventFilter onFilterChange={setFilters} />
//       </Box>

//       {/* ✅ Upcoming Events Section */}
//       <Typography variant="h5" marginTop={3}>
//         Upcoming Events
//       </Typography>
//       <Grid container spacing={2}>
//         {upcomingEvents.length > 0 ? (
//           upcomingEvents.map((event) => (
//             <Grid item xs={12} sm={6} md={4} key={event._id}>
//               <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
//                 <CardContent>
//                   <Typography variant="h6">{event.title}</Typography>
//                   <Typography color="textSecondary">{new Date(event.date).toLocaleDateString()}</Typography>
//                   <Typography color="textSecondary">{event.location}</Typography>
//                   <Typography variant="body2">{event.category} | {event.eventType}</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))
//         ) : (
//           <Typography color="textSecondary" textAlign="center" width="100%">
//             No upcoming events found.
//           </Typography>
//         )}
//       </Grid>

//       {/* ✅ Past Events Section */}
//       <Typography variant="h5" marginTop={3}>
//         Past Events
//       </Typography>
//       <Grid container spacing={2}>
//         {pastEvents.length > 0 ? (
//           pastEvents.map((event) => (
//             <Grid item xs={12} sm={6} md={4} key={event._id}>
//               <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
//                 <CardContent>
//                   <Typography variant="h6">{event.title}</Typography>
//                   <Typography color="textSecondary">{new Date(event.date).toLocaleDateString()}</Typography>
//                   <Typography color="textSecondary">{event.location}</Typography>
//                   <Typography variant="body2">{event.category} | {event.eventType}</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))
//         ) : (
//           <Typography color="textSecondary" textAlign="center" width="100%">
//             No past events found.
//           </Typography>
//         )}
//       </Grid>
//     </Container>
//   );
// };

// export default Home;


import { useEffect, useState } from "react";
import { getUpcomingEvents, getPastEvents } from "../api/eventApi";
import { getBanner } from "../api/bannerApi";
import EventFilter from "../components/EventFilter";
import Banner from '../components/Banner';
import { Container, Typography, Box, Card, CardContent, Grid } from "@mui/material";

interface Event {
  _id: string;
  title: string;
  date: string;
  location: string;
  category: string;
  eventType: string;
}

interface Banner {
  title: string;
  description: string;
  image: string;
}

const Home = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [filters, setFilters] = useState<{ category?: string; eventType?: string }>({});
  const [banner, setBanner] = useState<Banner | null>(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const bannerData = await getBanner();
        setBanner(bannerData);
      } catch (error) {
        console.error("❌ Error fetching banner:", error);
      }
    };

    const fetchEvents = async () => {
      try {
        const upcoming = await getUpcomingEvents(filters);
        const past = await getPastEvents(filters);
        setUpcomingEvents(upcoming);
        setPastEvents(past);
      } catch (error) {
        console.error("❌ Error fetching events:", error);
      }
    };

    fetchBanner(); // ✅ Fetch Banner Once
    fetchEvents(); // ✅ Fetch Events
  }, [filters]); // ✅ Ensure updates when filters change

  return (
    <Container maxWidth="md">
      {/* ✅ Fix Double Rendering of Banner */}
      {banner && (
        <Box sx={{ textAlign: "center", my: 3 }}>
          <Typography variant="h3" fontWeight="bold">
            {banner.title}
          </Typography>
          <Typography variant="h6" color="textSecondary" sx={{ mt: 1 }}>
            {banner.description}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <img
              src={`https://event-management-xc6u.onrender.com${banner.image}`} // ✅ Ensure Correct Image Path
              alt="Event Banner"
              style={{
                width: "100%",
                maxHeight: "400px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          </Box>
        </Box>
      )}

      {/* ✅ Ensure "Event Timeline" is Not Duplicated */}
      <Typography variant="h4" textAlign="center" gutterBottom sx={{ mt: 4 }}>
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
