import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './Message.css';
import { format } from "timeago.js";

const Message = ({ message, own }) => {
  const { user} = useContext(AuthContext);
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={user?.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"}
          alt=""
        />
        <p className='messageText'>{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
};

export default Message;
