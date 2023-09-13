import { IconButton, InputBase, Paper, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowClockwise } from 'react-icons/bs';

// Function to set a cookie with a given name and value
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + "; " + expires + "; path=/";
}

// Function to get the value of a cookie by name
function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split("=");
    if (cookie[0] === name) {
      return cookie[1];
    }
  }
  return "";
}

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [isSearchHistoryOpen, setIsSearchHistoryOpen] = useState(false); // Track visibility of the search history
  const navigate = useNavigate();

  const inputRef = useRef(null);

  // Function to load search history from cookies
  const loadSearchHistory = () => {
    const storedHistory = getCookie("searchHistory");
    if (storedHistory) {
      setSearchHistory(storedHistory.split(","));
    }
  };

  // Load search history from cookies when the component mounts
  useEffect(() => {
    loadSearchHistory();
  }, []);

  // Function to handle clicking on the input
  const handleInputClick = () => {
    setIsSearchHistoryOpen(true);
  };

  // Function to handle clicking outside the input to close the search history
  const handleOutsideClick = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setIsSearchHistoryOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  // Function to handle submitting the search
  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      // Save the search term to cookies
      setCookie("searchHistory", searchTerm, 30); // Store for 30 days

      // Update the search history state
      setSearchHistory([...searchHistory, searchTerm]);

      // Navigate to the search results page
      navigate(`/search/${searchTerm}`);

      // Clear the search term
      setSearchTerm("");

      // Close the search history box after submitting a search
      setIsSearchHistoryOpen(false);
    }
  };

  // Function to handle clicking on a search history item
  const handleHistoryClick = (term) => {
    setSearchTerm(term);
    handleSubmit();
  };

  // Function to handle deleting a single search history item
  const handleDeleteHistory = (term) => {
    const updatedHistory = searchHistory.filter((item) => item !== term);
    setSearchHistory(updatedHistory);
    setCookie("searchHistory", updatedHistory.join(","), 30); // Update the cookie
  };

  return (
    <div style={{ position: "relative" }}>
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          borderRadius: "24px",
          border: "1px solid #ccc",
          display: "flex",
          alignItems: "center",
          paddingLeft: "16px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          maxWidth: "500px",
          backgroundColor: "#fff", // 배경색 추가
        }}
      >
        <InputBase
          className="search-bar"
          placeholder="검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClick={handleInputClick} // Show search history when input is clicked
          inputRef={inputRef} // Reference to the input element
          sx={{
            flex: 1,
            marginLeft: "8px",
            padding: "8px 0",
          }}
        />
        <IconButton type="submit" sx={{ padding: "8px", color: "#606060" }}>
          <SearchIcon />
        </IconButton>
      </Paper>
      {isSearchHistoryOpen && searchHistory.length > 0 && (
        <div
            style={{
            position: "absolute",
            top: "100%",
            left: 0,
            zIndex: 1,
            background: "white",
            border: "1px solid #ccc",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            minWidth: "100%",
            }}
        >
            {searchHistory.map((term, index) => (
            <div
                key={index}
                style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 16px", // Add padding to the entire item container
                }}
            >
                <BsArrowClockwise />
                <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    flex: 1, // Make this container flex and take up available space
                }}
                >
                <Typography
                    variant="body2"
                    sx={{ cursor: "pointer", color: "blue" }}
                    onClick={() => handleHistoryClick(term)}
                >
                    {term}
                </Typography>
                </div>
                <IconButton
                    onClick={() => handleDeleteHistory(term)}
                    sx={{ padding: "4px" }}
                >
                <DeleteIcon />
                </IconButton>
            </div>
            ))}
        </div>
        )}
    </div>
  );
}