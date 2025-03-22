import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from "@mui/material";

interface FilterProps {
  onFilterChange: (filters: { category?: string; eventType?: string }) => void;
}

const EventFilter = ({ onFilterChange }: FilterProps) => {
  // ✅ Fix `onChange` event typing for MUI `<Select>`
  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    onFilterChange({ [name]: value });
  };

  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      {/* ✅ Category Filter */}
      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel>Category</InputLabel>
        <Select name="category" onChange={handleFilterChange} defaultValue="">
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Music">Music</MenuItem>
          <MenuItem value="Tech">Tech</MenuItem>
          <MenuItem value="Sports">Sports</MenuItem>
          <MenuItem value="Business">Business</MenuItem>
        </Select>
      </FormControl>

      {/* ✅ Event Type Filter */}
      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel>Event Type</InputLabel>
        <Select name="eventType" onChange={handleFilterChange} defaultValue="">
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Public">Public</MenuItem>
          <MenuItem value="Private">Private</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default EventFilter;
