import { useEffect, useState } from "react";
import { getBanner } from "../api/bannerApi";
import { Container, Typography, Box } from "@mui/material";
const Banner = () => {
  const [banner, setBanner] = useState({ title: "", description: "", image: "" });
  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const data = await getBanner();
        setBanner(data);
      } catch (error) {
        console.error("Error fetching banner:", error);
      }
    };
    fetchBanner();
  }, []);
  return (
    <Container>
      <Box sx={{ textAlign: "center", padding: 3, backgroundImage: `url(${banner.image})`, backgroundSize: "cover" }}>
        <Typography variant="h3" color="white" sx={{ fontWeight: "bold",color:"#1a1a1a",textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",opacity: 1,letterSpacing: "1px" }}>
          {banner.title}
        </Typography>
        <Typography variant="h6"  color="#1a1a1a">
          {banner.description}
        </Typography>
      </Box>
    </Container>
  );
};
export default Banner;
