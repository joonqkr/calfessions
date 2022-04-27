import "./post.css";
import { useContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { AuthContext } from "../../context/AuthContext";
import { FaRegHeart } from 'react-icons/fa';
import { FaBook, FaHeart, FaPlane, FaBasketballBall } from 'react-icons/fa';
import { BsFillPeopleFill, BsHouseDoorFill, BsThreeDots, BsStars, BsPenFill } from "react-icons/bs";
import { ImSad2 } from "react-icons/im";
import { MdWaterDrop } from "react-icons/md";
import { GiPartyPopper, GiTeapot } from "react-icons/gi";
import { IoEarSharp } from "react-icons/io5";
import { BiDish } from "react-icons/bi";

export default function Post({ post }) {
  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user: currentUser } = useContext(AuthContext); // unwrap the user value to alias currentUser

  // check if the post is already liked by the viewing user

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [post.likes, currentUser._id]);

  // get the post author's user

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  // increase the like and update in DB based on states

  const likeHandler = () => {
    try {
      axios.put(`/posts/${post._id}/like`, { userId: currentUser._id });
    } catch (error) {
      console.log(error);
    }
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

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

  const returnTag = (tagInfo) => {
    const Icon = nameToIcon.get(tagInfo.name);
    return (
      <span className={`${tagInfo.isChecked ? "selected" : ""} tagElement`}>
        <Icon></Icon>
        <input type="button" className="buttonInside" value={tagInfo.name}/>
      </span>
    );
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
          <div className="tagsContainer">
            {post.tags.map((tag, index) => (
              tag.isChecked ? returnTag(tag) : null
            ))}
          </div>
          </div>
          <div className="postTopRight">
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.description}</span>
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            {isLiked ? <FaHeart className="likeIcon" onClick={likeHandler}/> : <FaRegHeart className="likeIcon" onClick={likeHandler}/>}
            <span className="postLikeCounter">{likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
