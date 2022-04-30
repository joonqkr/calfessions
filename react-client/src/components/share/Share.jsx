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
  const { user } = useContext(AuthContext);
  const description = useRef();

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

const nameToIcon = new Map([
  ['classes', FaBook],
  ['roommates', BsFillPeopleFill],
  ['clubs', FaBasketballBall],
  ['housing', BsHouseDoorFill],
  ['relationships', FaHeart],
  ['food', BiDish],
  ['travel', FaPlane],
  ['fun', GiPartyPopper],
  ['advice', IoEarSharp],
  ['life', BsPenFill],
  ['thirst', MdWaterDrop],
  ['rant', GiTeapot],
  ['wholesome', BsStars],
  ['sad', ImSad2],
  ['miscellaneous', BsThreeDots]
])

  const updateListOfItems = (itemIndex, newsChecked) => {
      const updatedListOfItems = [...listOfItems];
      updatedListOfItems[itemIndex].isChecked = newsChecked;
      setListOfItems(updatedListOfItems);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const tagArray = [];
    listOfItems.forEach(tagObject => {
      if (tagObject.isChecked) {
        tagArray.push(tagObject.name);
      }
    });

    const newPost = {
      userId: user._id,
      description: description.current.value,
      tags: tagArray,
    };

    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const returnTag = (tagInfo, index) => {
    const Icon = nameToIcon.get(tagInfo.name);
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
          <textarea
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

