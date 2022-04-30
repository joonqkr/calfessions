import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
const qs = require('qs');

export default function Feed(props) {
  const [posts, setPosts] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      let res;
      if (props.username) {
        if (props.likes) {
          res = await axios.get(`/posts/likes/${props.username}`);
        } else {
          res = await axios.get(`/posts/profile/${props.username}`);
        }
      } else if (props.tags.length > 0) {
        res = await axios.get("/posts/timeline/tags", {
            params:{
              tags: props.tags
            },
            paramsSerializer: function(params) {
              return qs.stringify(params, {arrayFormat: 'repeat'})
            }
        });
      } else {
        res = await axios.get(`/posts/timeline`);
      }
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [props.username, user._id, props.tags, props.likes]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(props.username === user.username || !props.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
