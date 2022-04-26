import "./share.css";
import { PermMedia } from "@material-ui/icons";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useRef, useState } from "react";
import axios from "axios";

export default function Share() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const description = useRef();

  const [file, setFile] = useState(null);

  const [listOfItems, setListOfItems] = useState([
    {name: 'classes', isChecked: false},
    {name: 'roommates', isChecked: false},
    {name: 'clubs', isChecked: false},
    {name: 'housing', isChecked: false},
    {name: 'relationships', isChecked: false},
    {name: 'food', isChecked: false},
    {name: 'travel', isChecked: false},
    {name: 'fun', isChecked: false},
    {name: 'advice', isChecked: false},
    {name: 'life', isChecked: false},
    {name: 'thirst', isChecked: false},
    {name: 'rant', isChecked: false},
    {name: 'wholesome', isChecked: false},
    {name: 'sad', isChecked: false},
    {name: 'miscellaneous', isChecked: false},
]);

  const updateListOfItems = (itemIndex, newsChecked) => {
      const updatedListOfItems = [...listOfItems];
      updatedListOfItems[itemIndex].isChecked = newsChecked;
      setListOfItems(updatedListOfItems);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      description: description.current.value,
      tags: listOfItems,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.image = fileName;
      try {
        await axios.post("/upload", data);
      } catch (error) {
        console.log(error);
      }
    }

    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
          />
          <input
            placeholder={`What's on your mind ${user.username}?`}
            className="shareInput"
            ref={description}
          />
        </div>
        <hr className="shareHr" />
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png, .jpeg, .jpg"
                onChange={(e) => setFile(e.target.files[0])} // build this hook
              />
            </label>
          </div>
          <div className="listContainer">
            {listOfItems.map((item, index) => (
              <div class="listElement">
                <input type="checkbox" checked={item.isChecked} onChange={() => updateListOfItems(index, !item.isChecked)}/>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
