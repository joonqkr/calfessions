import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useState } from "react";
import "./home.css";

export default function Home() {
  // Array of tags selected.
  const [tags, setTags] = useState([]);

  // Set parent callback function. (Set tags.)
  const updateTags = (newTags) => {
    setTags(newTags);
  }

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Feed />
        <Rightbar />
      </div>
    </>
  );
}


 
