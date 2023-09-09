import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { demoProfilePicture } from "../utils/constants";
import { CheckCircle } from "@mui/icons-material";

export default function ChannelCard({ channelDetail }) {

    return (
        <Box
            sx={{
                boxShadow: 'none',
                borderRadius: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: { xs: '356px', md: '320px'},
                height: '326px',
                margin: 'auto',
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
                        sx={{ 
                            borderRadius: '50%', 
                            height: '180px', 
                            width: '180px',
                            mb: 2,
                            border: '1px solid #e3e3e3'
                        }}
                    />
                    {/* 채널 이름 */}
                    <Typography variant='h6'>
                        {channelDetail?.snippet?.title}
                        <CheckCircle sx={{ fontSize: 14, color: 'gray', ml: '5px' }} />
                    </Typography>
                    {/* 구독자 수 */}
                    {channelDetail?.statistics?.subscriberCount && (
                        <Typography>
                            {parseInt(channelDetail?.statistics?.subscriberCount).toLocaleString()}
                        </Typography>
                    )}
                </CardContent>
            </Link>
        </Box>
    )
}