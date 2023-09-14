import { IconButton, InputBase, Paper, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowClockwise } from 'react-icons/bs';


// 쿠키 이름, 값(검색 단어)을 가지고 쿠키 생성
function setCookie(name, value, days) {
  
  // 현재 날짜
  const date = new Date();
  
  // (밀리초로 변환된) 현재 날짜에 유효기간(days)을 밀리초로 변환해서 더함 => 현재 날짜로부터 유효 기간이 얼마나 남았나 계산
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  
  // 쿠키 만료 날짜 설정 => 유효 기간 후의 날짜와 시간
  const expires = "expires=" + date.toUTCString();
  
  // 쿠키를 브라우저에 설정 => 쿠키 이름, 값(검색 단어), 쿠키 만료 날짜
  document.cookie = name + "=" + value + "; " + expires + "; path=/";

}




// 가져올 쿠키 값 반환
function getCookie(name) {

  // 모든 쿠키를 문자열로 가져와서 ;로 분리
  const cookies = document.cookie.split("; ");
  
  // 모든 쿠키를 순회하며 name에 해당하는 쿠키 찾음
  for (let i = 0; i < cookies.length; i++) {
    
    const cookie = cookies[i].split("=");
    
    // name과 일치하는 쿠키를 찾으면 해당 값 반환
    if (cookie[0] === name) {
      return cookie[1];
    }
  }

  // name에 해당하는 쿠키 찾지 못하면 빈 문자열 반환
  return "";
}




export default function SearchBar() {

  // 검색 단어
  const [searchTerm, setSearchTerm] = useState("");
  
  // 검색 기록
  const [searchHistory, setSearchHistory] = useState([]);

  // 검색 기록 창 열림 여부
  const [isSearchHistoryOpen, setIsSearchHistoryOpen] = useState(false);
  
  const navigate = useNavigate();

  // input element 참조
  const inputRef = useRef(null);



  // 쿠키에서 검색 기록 로드
  const loadSearchHistory = () => {
    
    // searchHistory 이름의 쿠키 가져옴 
    const storedHistory = getCookie("searchHistory");
    
    // 가져온 쿠키가 존재하면 아래 기능 실행
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
    // Add the new search term to the existing search history
    const updatedHistory = [...searchHistory, searchTerm];

    // Save the updated search history to cookies
    setCookie("searchHistory", updatedHistory.join(","), 30); // Store for 30 days

    // Update the search history state
    setSearchHistory(updatedHistory);

    // Output search history to the console
    console.log("Search History:", updatedHistory);

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