 
import "./Closefriend.css"
const Closefriend = ({user}) => {
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;
  return (
    <div>
      <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={PF+user.profilePicture} alt="" />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
    </div>
  )
}

export default Closefriend
