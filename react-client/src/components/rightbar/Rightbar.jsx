import "./rightbar.css";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";
import { FaBook, FaHeart, FaPlane, FaBasketballBall } from 'react-icons/fa';
import { BsFillPeopleFill, BsHouseDoorFill, BsThreeDots, BsStars, BsPenFill } from "react-icons/bs";
import { ImSad2 } from "react-icons/im";
import { MdWaterDrop } from "react-icons/md";
import { GiPartyPopper, GiTeapot } from "react-icons/gi";
import { IoEarSharp } from "react-icons/io5";
import { BiDish } from "react-icons/bi";

export default function Rightbar({ user }) {
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

const [trueTags, setTrueTags] = useState([]);

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

    // Update tags list.
    if (newsChecked) {
      trueTags.push(listOfItems[itemIndex].name)
      setTrueTags(trueTags);
    } else {
      trueTags.splice(trueTags.indexOf(listOfItems[itemIndex].name), 1);
      setTrueTags(trueTags);
    }

    // Parent callback function. Set true tags back to Home.
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

  const HomeRightbar = () => {
    return (
      <>
        <div className="tagsWrapper">
        <b className="filter">Filter by</b>
            {/* <button className="tagButtonRight" type="submit" id='classesTag'>
          <div className="tagsContainer">
            <b>Tags</b>
            <button className="tagButtonRight" type="submit" id='classesTag'>
              Classes
            </button>
            <button className="tagButtonRight" type="submit">
              Roommates
            </button>
            <button className="tagButtonRight" type="submit">
              Clubs
            </button>
            <button className="tagButtonRight" type="submit">
              Housing
            </button> */}
              <div className="tagsContainer">
                {listOfItems.map((item, index) => (
                returnTag(item, index)
              ))}
              </div>
              
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <HomeRightbar />
      </div>
    </div>
  );
}