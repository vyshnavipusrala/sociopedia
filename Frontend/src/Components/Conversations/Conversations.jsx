import { useEffect, useState } from 'react';
import './Conversations.css';
import axios from 'axios';

const Conversations = ({ conversation, currentuser }) => {
  const [user, setUser] = useState(null);
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find(m => m !== currentuser._id);
    const getUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/users?userId=${friendId}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentuser, conversation]);

  return (
    <div className='conversation'>
      <img
        className="conversationImg"
        src={user?.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"}
        alt=""
      />
      <span className="conversationName">{user ? user.username : "Unknown User"}</span>
    </div>
  );
};

export default Conversations;
