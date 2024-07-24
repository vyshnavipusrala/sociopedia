import "./Feed.css";
import Post from "../Post/Post";
import Share from "../Share/Share";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);


  useEffect(() => {
    const fetchPosts = async () => {
      if (!user) return;

      try {
        const res = username
          ? await axios.get(`http://localhost:8800/api/posts/profile/${username}`)
          : await axios.get(`http://localhost:8800/api/posts/timeline/${user._id}`);
        
        console.log("Fetched posts:", res.data); // Debug log to check fetched posts
        setPosts(
          res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [username, user]);

  return (
    <div className="feed">
      <div className="feedWrapper">
      {(!username || username === user.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
