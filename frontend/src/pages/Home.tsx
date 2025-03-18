import { Link } from "react-router-dom";
import { Button } from "@mui/material";
function Home() {
  return (
    <div>
      <h1>Event Management</h1>
      <Button variant="contained" color="primary" component={Link} to="/create">
        Create Event
      </Button>
    </div>
  );
}
export default Home;
