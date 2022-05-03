import "./topbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import Logout from "../topbar/Logout";
import Searchbar from "../topbar/Searchbar";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <div className="logoWrapper">
          <Link to="/" style={{ textDecoration: "none" }}>
          <div className="topLeftWrapper">
            <img src={
              PF + "logo.png"
            }
            alt="" className="logo"/>
            <span className="logo">Calfessions</span>
          </div>
          
          </Link>
        </div>
        <div className="search"><Searchbar /></div>
      </div>
      
      

      <div className="topbarRight">
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
        
        <Logout />
        
      </div>
    </div>
  );
}
