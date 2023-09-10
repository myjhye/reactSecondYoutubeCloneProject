// 카테고리 목록, 선택한 카테고리 표시

import { Stack } from "@mui/material";
import { categories } from "../utils/constants";

const selectedCategory = 'New';

export default function Sidebar({ selectedCategory, setSelectedCategory }) {

    return (
        <Stack
            // 작은 화면에서는 가로로, 중간 크기 화면 이상부터는 세로로 배치
            direction='row'
            sx={{
                // 필요한 경우 자동으로 스크롤바 표시
                overflowY: 'auto',
                height: { sx: 'auto', md: '95%' },
                flexDirection: { md: 'column' },
            }}
        >
            {/* 카테고리 목록 */}
            {categories.map((category) => (
                <button
                    // 클릭 시 선택한 카테고리로 변경 => selectedCategory에 클릭한 카테고리 이름이 할당되는 곳 
                    onClick={() => setSelectedCategory(category.name)}
                    className="category-btn"
                    style={{
                        // 선택된 카테고리의 배경 색상 변경
                        background: category.name === selectedCategory && '#FC1503',
                        // 글자 색상
                        color: 'white'
                    }}
                    key={category.name}
                >
                    
                    {/* 카테고리 아이콘 */}
                    <span
                        // 선택된 카테고리 아이콘: white, 그 외: red 
                        style={{ color: category.name === selectedCategory ? 'white' : 'red',
                        marginRight: '15px',
                    }}>
                        {category.icon}
                    </span>

                    {/* 카테고리 이름 */}
                    <span
                        // 선택된 카테고리만 텍스트 표시
                        style={{ opacity: category.name === selectedCategory ? '1' : '0' }}
                    >
                        {category.name}
                    </span>
                </button>
            ))}
        </Stack>
    )
}