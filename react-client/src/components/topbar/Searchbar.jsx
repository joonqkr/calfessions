import TextField from "@mui/material/TextField";
import Feed from "../feed/Feed";
import "./searchbar.css";

function Searchbar() {
  return (
    <div className="main">
      <div className="search">
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          label="Search"
        />
      </div>
      {/* <Feed /> */}
    </div>
  );
}

export default Searchbar;