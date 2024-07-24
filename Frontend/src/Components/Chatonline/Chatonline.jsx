import { useEffect, useState } from 'react';
import './Chatonline.css';
import axios from 'axios';

const Chatonline = ({ onlineUsers, currentId, setCurrentChat }) => {
  const [friends, setFriends] = useState([]);
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/users/friends/${currentId}`);
        setFriends(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [currentId]);

  const handleClick = async (friend) => {
    try {
      // Check if there's an existing conversation with this friend
      const existingConversationRes = await axios.get(`http://localhost:8800/api/conversations/find/${currentId}/${friend._id}`);
      let conversation = existingConversationRes.data;

      if (!conversation) {
        // If no existing conversation, create a new one
        const newConversationRes = await axios.post('http://localhost:8800/api/conversations/', {
          senderId: currentId,
          receiverId: friend._id,
        });
        conversation = newConversationRes.data;
      }

      setCurrentChat(conversation);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatOnline">
      {friends.map((friend) => (
        <div className="chatOnlineFriend" key={friend._id} onClick={() => handleClick(friend)}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={friend.profilePicture ? PF + friend.profilePicture : PF + "person/noAvatar.png"}
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{friend.username}</span>
        </div>
      ))}
    </div>
  );
};

export default Chatonline;
