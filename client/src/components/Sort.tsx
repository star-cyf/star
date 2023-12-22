import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import { consistentBgColor } from "../themes/ConsistentStyles";
import { SortProps } from "../types/components";

const Sort = ({ sort, setSort }: SortProps) => {
  return (
    <FormControl
      variant="filled"
      size="small"
      sx={{
        width: "180px",
        bgcolor: consistentBgColor,
      }}>
      <InputLabel id="sort" sx={{ color: "white" }}>
        Sort
      </InputLabel>
      <Select
        id="sort"
        value={sort}
        label="Sort"
        onChange={(event) => setSort(event.target.value)}>
        <MenuItem value="popular" sx={{ color: "black" }}>
          Most Popular
        </MenuItem>
        <MenuItem value="recentlyCreated" sx={{ color: "black" }}>
          Recently Created
        </MenuItem>
        <MenuItem value="recentlyUpdated" sx={{ color: "black" }}>
          Recently Updated
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default Sort;
