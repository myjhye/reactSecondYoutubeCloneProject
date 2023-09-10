import { Box, Stack } from "@mui/material";
import { VideoCard, ChannelCard } from './';

export default function Videos({videos, direction}) {

    // 선택한 카테고리의 비디오 데이터가 없을 경우 'loading' 반환
    if(!videos?.length) {
        return 'loading..'
    };

    return (
        <Stack 
            // 비디오, 채널카드 가로 배치 => 관련 비디오에서는 세로(column) 배치 => direction
            direction={direction || 'row'}
            // 컨테이너 내에서 아이템들을 줄 바꿈 할 수 있음
            flexWrap='wrap'
            // 아이템들을 왼쪽에서 오른쪽으로 설정
            justifyContent='start'
            // 아이템 사이의 간격
            gap={2}
        >
            {videos.map((item, index) => (
                <Box key={index}>
                    {/* 비디오 카드 */}
                    {item.id.videoId && (
                        <VideoCard video={item} />
                    )}
                    {/* 채널 카드 */}
                    {item.id.channelId && (
                        <ChannelCard channelDetail={item} />
                    )}
                </Box>
            ))}
        </Stack>
    )
}