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
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const [currentFriends, setCurrentFriends] = useState([]);
  const [followed, setFollowed] = useState(false);
  const { user: currentUser, dispatch } = useContext(AuthContext);

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

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendsList = await axios.get(`/users/friends/${user?._id}`);
        setFriends(friendsList.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, [user?._id]);

  useEffect(() => {
    const getCurrentFriends = async () => {
      try {
        const currentFriendsList = await axios.get(
          `/users/friends/${currentUser._id}`
        );
        setCurrentFriends(currentFriendsList.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCurrentFriends();
  }, [currentUser._id]);

  useEffect(() => {
    const checkFollowed = async () => {
      const isFollowed = await currentUser.following.includes(user?._id);
      setFollowed(isFollowed);
    };
    checkFollowed();
  }, [currentUser, user?._id]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
    } catch (error) {
      console.log(error);
    }
    setFollowed(!followed);
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
        <ul className="rightbarFollowingsHome">
          {currentFriends.map((u) => (
            <Online key={u._id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = ({ followed }) => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City: </span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Taken"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              key={friend._id}
              to={`/profile/${friend.username}`}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar followed={followed} /> : <HomeRightbar />}
      </div>
    </div>
  );
}