import "./share.css";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useRef, useState } from "react";
import axios from "axios";
import { FaBook, FaHeart, FaPlane, FaBasketballBall } from 'react-icons/fa';
import { BsFillPeopleFill, BsHouseDoorFill, BsThreeDots, BsStars, BsPenFill } from "react-icons/bs";
import { ImSad2 } from "react-icons/im";
import { MdWaterDrop } from "react-icons/md";
import { GiPartyPopper, GiTeapot } from "react-icons/gi";
import { IoEarSharp } from "react-icons/io5";
import { BiDish } from "react-icons/bi";

export default function Share() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const description = useRef();

  const [file, setFile] = useState(null);

  const [listOfItems, setListOfItems] = useState([
    {name: 'classes', isChecked: false, icon: FaBook},
    {name: 'roommates', isChecked: false, icon: BsFillPeopleFill},
    {name: 'clubs', isChecked: false, icon: FaBasketballBall},
    {name: 'housing', isChecked: false, icon: BsHouseDoorFill},
    {name: 'relationships', isChecked: false, icon: FaHeart},
    {name: 'food', isChecked: false, icon: BiDish},
    {name: 'travel', isChecked: false, icon: FaPlane},
    {name: 'fun', isChecked: false, icon: GiPartyPopper},
    {name: 'advice', isChecked: false, icon: IoEarSharp},
    {name: 'life', isChecked: false, icon: BsPenFill},
    {name: 'thirst', isChecked: false, icon: MdWaterDrop},
    {name: 'rant', isChecked: false, icon: GiTeapot},
    {name: 'wholesome', isChecked: false, icon: BsStars},
    {name: 'sad', isChecked: false, icon: ImSad2},
    {name: 'miscellaneous', isChecked: false, icon: BsThreeDots},
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

