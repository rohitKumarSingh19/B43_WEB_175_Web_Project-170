import { Box, Container, Typography, Link } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        textAlign: "center",
        padding: "15px 0",
        marginTop: "20px",
      }}
    >
      <Container>
        <Typography variant="body1">© {new Date().getFullYear()} Event Management</Typography>
        <Typography variant="body2">
          Built with ❤️ by{" "}
          <Link href="https://github.com/rohitKumarSingh19/B43_WEB_175_Web_Project-170" target="_blank" color="inherit" underline="hover">
            Rohit Kumar Singh
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
