import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Feed from "../feed/Feed";
import "./searchbar.css";

export default function Searchbar() {
  const useStyles = makeStyles(() => ({
    input1: {
      height: 10
    }
  }));
  const classes = useStyles();
  
   return (
    <div className="main">
      <div className="search">
        <TextField
          id="outlined-basic"
          variant="outlined"
          size="small"
          margin="none" 
          style={{ height: 20 }}
          fullWidth
          label="Search"
          // InputProps={{ classes: { input: classes.input1 } }}
        />
      </div>
      {/* <Feed /> */}
    </div>
  );
}


// export default Searchbar;