import { Box, Stack, Typography } from "@mui/material";
import { Sidebar, Videos } from './';
import { useEffect, useState } from "react";
import { fetchFromAPI } from '../utils/fetchFromAPI';

export default function Feed() {

    // 선택한 카테고리
    const [selectedCategory, setSelectedCategory] = useState('New');
    
    // 비디오 목록
    const [videos, setVideos] = useState([]);


    // 선택한 카테고리가 변경될 때마다 해당 카테고리에 맞는 비디오 데이터를 불러옴
    useEffect(() => {
        // 선택한 카테고리의 비디오 데이터 => 해당 카테고리를 검색어로 사용해서 나오는 데이터
        fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
            .then((data) => setVideos(data.items))
    }, [selectedCategory]);

    return (
        <Stack
            // 화면 크기에 따라 레이아웃을 조정
            sx={{ flexDirection: {
                        // 작은 화면부터는 세로 배치
                        sx: 'column',
                        // 중간 크기 화면부터는 가로 배치 
                        md: 'row'
                    } 
                }}
        >
            {/*---- 사이드바 ----*/}
            <Box 
                sx={{ height: {
                        // 작은 화면부터는 자동 높이
                        sx: 'auto',
                        // 중간 크기 화면부터는 화면 높이의 92% 차지
                        md: '92vh'                        
                      },

                      // 오른쪽 테두리 설정
                      borderRight: '1px solid #3d3d3d',

                      // 가로 여백 설정
                      px: { sx: 0, md: 2 }
                    }}
            >
                {/* 사이드바 */}
                <Sidebar 
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />

                {/* 저작권 정보 */}
                <Typography className="copyright" variant='body2' sx={{ mt: 1.5, color: '#fff' }} >
                    Copyright 2023
                </Typography>
            </Box>

            {/*---- 본문 ----*/}
            <Box p={2} sx={{ overflowY: 'auto', height: '90vh', flex: 2 }}>
                
                {/* 선택한 카테고리 텍스트*/}
                <Typography variant='h4' fontWeight='bold' mb={2} sx={{color: 'white'}}>
                    {selectedCategory} <span style={{ color: '#F31503'}}>videos</span>
                </Typography>

                {/* 비디오 목록 */}
                <Videos videos={videos} />
            </Box>
        </Stack>
    )
}