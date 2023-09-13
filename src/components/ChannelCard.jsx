import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { demoProfilePicture } from "../utils/constants";
import { CheckCircle } from "@mui/icons-material";

export default function ChannelCard({ channelDetail, marginTop, smallImage }) {
    
    // 숫자를 "천", "만"과 같은 단위로 포맷팅하는 함수
    function formatNumberWithUnit(count) {
        if (!count) {
            return '';
        }
    
        count = parseInt(count);
    
        if (count >= 10000) {
            if (count % 10000 === 0) {
                // 만 단위로 정확하게 나누어 떨어지면 "X만" 형식으로 표시
                return (count / 10000) + '만';
            } else {
                // 만 단위로 정확하게 나누어 떨어지지 않으면 소수점 첫째 자리까지 표시
                return (count / 10000).toFixed(1) + '만';
            }
        } else if (count >= 1000) {
            // 천 단위로 "X천" 형식으로 표시
            if (count % 1000 === 0) {
                return (count / 1000) + '천';
            } else {
                // 천 단위로 정확하게 나누어 떨어지지 않으면 소수점 첫째 자리까지 표시
                return (count / 1000).toFixed(1) + '천';
            }
        } else {
            // 그 외의 경우는 그냥 숫자 표시
            return count.toString();
        }
    }
    
    
    return (
        <Box
            sx={{
                boxShadow: 'none',
                borderRadius: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: { xs: '356px', md: '320px' },
                height: '326px',
                margin: 'auto',
                marginTop: marginTop,
            }}
        >
            <Link to={`/channel/${channelDetail?.id?.channelId}`}>
                {/* 채널 컨테이너 */}
                <CardContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        textAlign: 'center',
                        color: '#fff'
                    }}
                >
                    {/* 채널 이미지 */}
                    <CardMedia
                        image={channelDetail?.snippet?.thumbnails?.high?.url || demoProfilePicture}
                        alt={channelDetail?.snippet?.title}
                        sx={smallImage ? { borderRadius: '50%', height: '50px', width: '50px' } : { borderRadius: '50%', height: '180px', width: '180px' }}
                    />
                    {/* 채널 이름 */}
                    <Typography variant='h6'>
                        {channelDetail?.snippet?.title}
                        <CheckCircle sx={{ fontSize: 14, color: 'gray', ml: '5px' }} />
                    </Typography>
                    {/* 구독자 수 */}
                    {channelDetail?.statistics?.subscriberCount && (
                        <Typography>
                            구독자 {formatNumberWithUnit(channelDetail?.statistics?.subscriberCount)}명
                        </Typography>
                    )}
                    {channelDetail?.statistics?.videoCount && (
                        <Typography>
                           동영상 {formatNumberWithUnit(channelDetail?.statistics?.videoCount)}개
                        </Typography>
                    )}
                </CardContent>
            </Link>
        </Box>
    )
}
