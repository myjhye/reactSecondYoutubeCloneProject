import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Box } from "@mui/material";
import ChannelCard from "./ChannelCard";
import { Videos } from ".";

export default function ChannelDetail() {
    // url에서 파라미터 'id' 가져옴
    const { id } = useParams();

    // 채널 정보
    const [channelDetail, setChannelDetail] = useState(null);

    // 채널의 비디오 목록
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        // 채널 정보 데이터
        fetchFromAPI(`channels?id=${id}`)
            .then((data) => setChannelDetail(data?.items[0]));

        // 채널 비디오 목록 데이터
        fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
            .then((data) => setVideos(data?.items));
    }, [id]);

    return (
        <Box minHeight="95vh">
            {/* 채널 카드 */}
            <Box>
                <div
                    style={{
                        height: '300px',
                        zIndex: 10,
                    }}
                >
                    {channelDetail && (
                        <img
                            src={channelDetail.brandingSettings.image.bannerExternalUrl}
                            alt="Banner"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                    )}
                </div>
                <ChannelCard
                    channelDetail={channelDetail}
                    marginTop="-110px"
                />
            </Box>

            {/* 비디오 목록 */}
            <Box display="flex" p="2">
                <Box sx={{ mr: { sm: '100px' } }} />
                <Videos videos={videos} />
            </Box>
        </Box>
    );
}
