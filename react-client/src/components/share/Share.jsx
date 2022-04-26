import "./share.css";
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
              <input type="button" value={item.name} className={`${item.isChecked ? "selected" : ""} tagButton`} onClick={() => updateListOfItems(index, !item.isChecked)}/>
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

