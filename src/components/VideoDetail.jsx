import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ReactPlayer from 'react-player';
import { Link, useParams } from "react-router-dom";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { CheckCircle } from "@mui/icons-material";
import Videos from "./Videos";
import VideoComment from "./VideoComment";

export default function VideoDetail() {
    const { id } = useParams();
    const [videoDetail, setVideoDetail] = useState(null);
    const [relatedVideos, setRelatedVideos] = useState();
    const [comment, setComment] = useState([]);

    useEffect(() => {
        // 영상 관련 데이터들 => title, channelId, channelTitle, viewCount
        fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
            .then((data) => setVideoDetail(data.items[0]));

        // 연관 비디오 데이터
        fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}`)
            .then((data) => setRelatedVideos(data.items));

        // 채널의 댓글을 가져오도록 수정
        fetchFromAPI(`commentThreads?videoId=${id}`)
            .then((data) => setComment(data?.items));

    }, [id]);

    if (!videoDetail?.snippet) {
        return 'loading..';
    }

    const {
        snippet: { title, channelId, channelTitle },
        statistics: { viewCount }
    } = videoDetail;

    return (
        <Box minHeight="95vh">
            <Stack direction={{ xs: "column", md: "row" }}>
                <Box flex={1}>
                    <Box sx={{ width: "100%", position: "sticky", top: "0" }}>
                        {/* 영상 플레이어 */}
                        <div style={{ position: "relative", paddingTop: "56.25%" }}>
                            <ReactPlayer
                                url={`https://www.youtube.com/watch?v=${id}`}
                                controls
                                width="100%"
                                height="100%"
                                style={{ position: "absolute", top: "0", left: "0" }}
                            />
                        </div>

                        {/* 영상 제목 */}
                        <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
                            {title}
                        </Typography>

                        <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff" }} py={1} px={2}>
                            <Link to={`/channel/${channelId}`}>
                                {/* 업로드한 채널 이름 */}
                                <Typography variant={{ sm: "subtitle1", md: 'h6' }} color="#fff" >
                                    {channelTitle}
                                    <CheckCircle sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
                                </Typography>
                            </Link>

                            <Stack direction="row" gap="20px" alignItems="center">
                                {/* 영상 조회수 */}
                                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                                    {parseInt(viewCount).toLocaleString()} views
                                </Typography>
                            </Stack>
                        </Stack>
                    </Box>
                </Box>
                <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center">
                    {/* 관련 영상 */}
                    <Videos videos={relatedVideos} direction="column" />
                </Box>
            </Stack>
            <Box px={2} py={2} sx={{ backgroundColor: 'white' }}>
                {/* 댓글 */}
                <VideoComment comment={comment} />
            </Box>
        </Box>
    );
}
