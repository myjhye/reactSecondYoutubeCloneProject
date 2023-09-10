import { Box, Stack, Typography } from "@mui/material";
import { Videos } from './';
import { useEffect, useState } from "react";
import { fetchFromAPI } from '../utils/fetchFromAPI';
import { useParams } from "react-router-dom";

export default function SearchFeed() {

    const [videos, setVideos] = useState(null);
    const { searchTerm } = useParams();

    useEffect(() => {
        fetchFromAPI(`search?part=snippet&q=${searchTerm}`)
            .then((data) => setVideos(data.items))
    }, [searchTerm]);

    return (
        <Box p={2} sx={{ overflowY: 'auto', height: '90vh', flex: 2 }}>
            {videos !== null ? ( // videos가 null이 아닌 경우에만 Videos 컴포넌트를 렌더링
                <Videos videos={videos} />
            ) : (
                <Typography>Loading...</Typography> // 데이터 로딩 중에 메시지 표시
            )}
        </Box>
    )
}
