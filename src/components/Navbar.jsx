import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { logo } from "../utils/constants";
import SearchBar from "./SearchBar";

export default function Navbar() {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      p={2}
      sx={{
        position: "sticky",
        background: "000",
        top: 0,
      }}
    >
      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
        <img src={logo} alt="logo" height={45} />
        <Typography
            variant="h5"
            fontWeight="bold"
            ml={2}
            sx={{
                textDecoration: "none", // Remove underline
                color: "white", // Set text color to white
            }}
        >
            NotPremium
        </Typography>
      </Link>
      <SearchBar />
    </Stack>
  );
}
