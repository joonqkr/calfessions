import "./share.css";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useRef, useState } from "react";
import axios from "axios";
import { FaBook, FaRegHeart } from 'react-icons/fa';

export default function Share() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const description = useRef();

  const [file, setFile] = useState(null);

  const [listOfItems, setListOfItems] = useState([
    {name: 'classes', isChecked: false, icon: FaBook},
    {name: 'roommates', isChecked: false, icon: FaRegHeart},
    {name: 'clubs', isChecked: false, icon: FaRegHeart},
    {name: 'housing', isChecked: false, icon: FaRegHeart},
    {name: 'relationships', isChecked: false, icon: FaRegHeart},
    {name: 'food', isChecked: false, icon: FaRegHeart},
    {name: 'travel', isChecked: false, icon: FaRegHeart},
    {name: 'fun', isChecked: false, icon: FaRegHeart},
    {name: 'advice', isChecked: false, icon: FaRegHeart},
    {name: 'life', isChecked: false, icon: FaRegHeart},
    {name: 'thirst', isChecked: false, icon: FaRegHeart},
    {name: 'rant', isChecked: false, icon: FaRegHeart},
    {name: 'wholesome', isChecked: false, icon: FaRegHeart},
    {name: 'sad', isChecked: false, icon: FaRegHeart},
    {name: 'miscellaneous', isChecked: false, icon: FaRegHeart},
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

  const returnTag = (tagInfo, index) => {
    const Icon = tagInfo.icon;
    return (
      <span className={`${tagInfo.isChecked ? "selected" : ""} tagButton`}>
        <Icon></Icon>
        <input type="button" className="buttonInside" value={tagInfo.name} onClick={() => updateListOfItems(index, !tagInfo.isChecked)}/>
      </span>
    );
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <input
            placeholder={`Share an anonymous confession...`}
            className="shareInput"
            ref={description}
          />
        </div>
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="tagLabel">
            ADD TAGS:
          </div>
          <div className="listContainer">
            {listOfItems.map((item, index) => (
              returnTag(item, index)
            ))}
          </div>
          <div className="buttonContainer">
            <button className="shareButton" type="submit">
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

