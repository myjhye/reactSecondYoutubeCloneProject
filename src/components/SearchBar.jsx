import { IconButton, Paper } from "@mui/material";
import Search from '@mui/icons-material/Search';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {

    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const onhandleSubmit = (e) => {
        e.preventDefault();

        if(searchTerm) {
            navigate(`/search/${searchTerm}`);
        }
    }

    return (
        <Paper
            component='form'
            onSubmit={onhandleSubmit}
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <IconButton type='submit' sx={{ p: '10px', color: 'red' }}>
                <Search />
            </IconButton>
        </Paper>
    )
}