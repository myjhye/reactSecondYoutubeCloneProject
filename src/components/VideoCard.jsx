import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { demoThumbnailUrl, demoVideoUrl, demoVideoTitle, demoChannelUrl, demoChannelTitle } from "../utils/constants";
import { CheckCircle } from "@mui/icons-material";


export default function VideoCard({ video: { id: { videoId }, snippet } }) {

    // &#39; => ' 변환 
    function decodeHTML(html) {
        var txt = document.createElement('textarea');
        
        // 디코딩 처리
        txt.innerHTML = html;

        // 디코딩된 텍스트 반환
        return txt.value;
    }

    return (
        // 카드 스타일 설정
        <Card 
            // 화면 크기에 따라 너비 조정
            sx={{ width: { md: '320px', xs: '100%' },
            // 그림자 없음
            boxShadow: 'none',
            // 테두리 없음
            borderRadius: 0,
        }}>
            <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
                {/* 비디오 썸네일 */}
                <CardMedia 
                    image={snippet?.thumbnails?.high?.url}
                    alt={snippet?.title}
                    sx={{ width: 358, height: 180 }}
                />
            </Link>
            <CardContent sx={{ backgroundColor: '#1e1e1e', height: '106px' }}>
                <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
                    {/* 비디오 제목 */}
                    <Typography
                        variant='subtitle1'
                        fontweight='bold'
                        color='#FFF'
                    >
                        {decodeHTML(snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60))}
                    </Typography>
                </Link>
                <Link to={snippet ?.channelId ? `/channel/${snippet?.channelId}` : demoVideoUrl}>
                    {/* 채널 제목 & 인증 뱃지 */}
                    <Typography
                        variant='subtitle2'
                        fontweight='bold'
                        color='gray'
                    >
                        {snippet?.channelTitle || demoChannelTitle}
                        <CheckCircle sx={{ fontSize: 12, color: 'gray', ml: '5px' }} />
                    </Typography>
                </Link>
            </CardContent>
        </Card>
    )
}