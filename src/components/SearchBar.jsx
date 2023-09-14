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




  // 쿠키에서 검색 기록 로드 => 검색 기록 쿠키 가져와서 배열에 추가
  const loadSearchHistory = () => {
    
    // searchHistory 이름의 쿠키 가져옴 
    const storedHistory = getCookie("searchHistory");
    
    if (storedHistory) {
      // 가져온 쿠키('검색어1, 검색어2, 검색어3')를 ,로 분리해서 검색 기록에 추가
      setSearchHistory(storedHistory.split(","));
    }

  };




  // 컴포넌트 마운트 될 때 loadSearchHistory 함수 실행 => 검색 기록 쿠키 가져와서 배열에 추가
  useEffect(() => {
    loadSearchHistory();
  }, []);




  // 검색 창 클릭 시 검색 기록 창 열기
  const handleInputClick = () => {
    setIsSearchHistoryOpen(true);
  };



  // 검색 창 외부 클릭 시 검색 기록 창 닫기
  const handleOutsideClick = (e) => {
    if (!inputRef.current || !inputRef.current.contains(e.target)) {
      setIsSearchHistoryOpen(false);
    }
  };
  



  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);



// 검색 실행
const handleSubmit = (e) => {
  e.preventDefault();

  if (searchTerm) {
    
    // 중복 검사 : 목록에 이미 있는 검색 단어인지 확인
    if(!searchHistory.includes(searchTerm)) {
      
      // 현재 검색어를 검색 기록에 추가 => 최근 검색 단어가 위로 가게
      const updatedHistory = [searchTerm, ...searchHistory];

      // 업데이트된 검색 기록을 쿠키에 30일 동안 저장 => ,로 여러 데이터를 한 배열에 넣음
      setCookie("searchHistory", updatedHistory.join(","), 30);

      // 새 검색 단어가 검색 기록에 추가된 것을 화면에 반영
      setSearchHistory(updatedHistory);
    
    }

    // 검색 결과 페이지로 이동
    navigate(`/search/${searchTerm}`);

    // 검색 기록 창 닫기
    setIsSearchHistoryOpen(false);
  }
};


  // 검색 기록 항목 클릭 시 해당 검색어로 검색 실행
  const handleHistoryClick = (term) => {
    
    setSearchTerm(term);
    navigate(`/search/${term}`);
  };


  // 단일 검색 기록 항목 삭제
  const handleDeleteHistory = (term, e) => {

    // 삭제 버튼 클릭 시에도 기록 창이 닫히지 않음
    e.stopPropagation();
    
    // 클릭한 항목 필터링 해서 제거
    const updatedHistory = searchHistory.filter((item) => item !== term);
    setSearchHistory(updatedHistory);

    // 업데이트 된 검색 기록 쿠키에 저장
    setCookie("searchHistory", updatedHistory.join(","), 30); 
  
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
          backgroundColor: "#fff", 
        }}
      >
        <InputBase
          className="search-bar"
          placeholder="검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClick={handleInputClick} // 클릭 시 검색 기록 창 열기 
          inputRef={inputRef} 
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
                className="history-item"
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 16px", 
                }}
            >
                <BsArrowClockwise 
                  style={{ cursor: "pointer" }}   
                  onClick={() => handleHistoryClick(term)} 
                />

                <div
                  style={{
                      display: "flex",
                      alignItems: "center",
                      flex: 1, 
                  }}
                >
                <Typography
                    variant="body2"
                >
                    {term}
                </Typography>
                </div>
                <Typography
                  onClick={(e) => handleDeleteHistory(term, e)}
                  sx={{ 
                      padding: "4px", 
                      color: "blue", 
                      cursor: 'pointer',
                      '&:hover': {
                        textDecoration: 'underline', // 마우스 커서를 가져갈 때 밑줄 스타일 추가
                      },
                    }}
                >
                  삭제
                </Typography>
            </div>
            ))}
        </div>
        )}
    </div>
  );
}