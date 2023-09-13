import { Stack } from "@mui/material";
import { categories } from "../utils/constants";

export default function Sidebar({ selectedCategory, setSelectedCategory }) {
  return (
    <Stack
      // Works horizontally on small screens and vertically on medium screens and above
      direction={{ xs: 'row', md: 'column' }}
      sx={{
        // Automatically show scrollbar when necessary
        overflowY: 'auto',
        height: { xs: 'auto', md: '95%' },
      }}
    >
      {/* Category list */}
      {categories.map((category) => (
        <button
          // Change to the selected category when clicked
          onClick={() => setSelectedCategory(category.name)}
          className="category-btn"
          style={{
            // Change background color for the selected category
            backgroundColor: category.name === selectedCategory ? '#FC1503' : 'transparent',
            // Text color
            color: category.name === selectedCategory ? 'white' : 'red',
            borderRadius: '20px',
            padding: '8px 16px',
            display: 'flex',
            alignItems: 'center',
            // Add hover effect to make it look interactive
            transition: 'background-color 0.3s, color 0.3s',
            cursor: 'pointer',
          }}
          key={category.name}
        >
          {/* Category icon */}
          <span style={{ fontSize: '24px', marginRight: '10px' }}>
            {category.icon}
          </span>

          {/* Category name */}
          <span style={{ color: 'white' }}>
            {category.name}
          </span>
        </button>
      ))}
    </Stack>
  );
}
