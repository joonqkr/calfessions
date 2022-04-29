import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Toggle from "../../components/toggle/Toggle";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useRef } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const [file, setFile] = useState(null);
  const { dispatch } = useContext(AuthContext);
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users?username=${username}`);
        setUser(res.data);
      } catch (error) {
        window.location.href = "/";
      }
    };
    fetchUser();
  }, [username]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const updateFields = {
      userId: user._id,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      console.log(fileName);
      updateFields.profilePicture = fileName;
      dispatch({ type: "UPDATE_PROFILE", payload: fileName });
      try {
        await axios.post("/upload", data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      await axios.put(`/users/${user._id}`, updateFields);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
              <h1>Your Confessions</h1>
          </div>
          <div className="toggleWrapper"><Toggle /></div>
          <div className="profileRightBottom">
            <Feed username={username} />
          </div>
        </div>
      </div>
    </>
  );
}
