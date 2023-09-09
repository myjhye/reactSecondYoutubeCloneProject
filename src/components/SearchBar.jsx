import { IconButton, Paper } from "@mui/material";
import Search from '@mui/icons-material/Search';

export default function SearchBar() {
    return (
        <Paper
            component='form'
            sx={{
                borderRadius: 20,
                border: '1px solid #e3e3e3',
                pl: 2,
                boxShadow: 'none',
                mr: { sm: 5 },
            }}
        >
            <input
                className='search-bar'
                placeholder='검색'
                value=''
                onChange={() => {}}
            />
            <IconButton type='submit' sx={{ p: '10px', color: 'red' }}>
                <Search />
            </IconButton>
        </Paper>
    )
}