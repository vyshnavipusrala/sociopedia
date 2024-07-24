import "./Topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { logoutCall } from "../../context/AuthActions";

const Topbar = () => {
    const PF = import.meta.env.VITE_PUBLIC_FOLDER;
    const { user, dispatch } = useContext(AuthContext);
    const Navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const handleLogout = () => {
        logoutCall(dispatch);
        Navigate('/login');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim() !== '') {
            Navigate(`/profile/${searchQuery}`);
            setSearchQuery('');
        }
    };

    return (
        <div className="topbarContainer">
            {/* Left part with the app name */}
            <div className="topbarLeft">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className="logo">Sociopedia</span>
                </Link>
            </div>

            {/* Center part with the search functionality */}
            <div className="topbarCenter">
                <form onSubmit={handleSearch}>
                    <div className="searchbar">
                        <Search className="searchIcon" />
                        <input
                            placeholder="Search for friend, post or video"
                            className="searchInput"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </form>
            </div>

            {/* Right part with links and icons */}
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">Timeline</span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat />
                        <span className="topbarIconBadge">2</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications />
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>
                {user ? (
                    <div className="topbarUser">
                        <Link to={`/profile/${user.username}`}>
                            <img
                                src={
                                    user.profilePicture
                                        ? PF + user.profilePicture
                                        : PF + "person/noAvatar.png"
                                }
                                alt=""
                                className="topbarImg"
                            />
                        </Link >

                        <button className="topbarLogoutButton" onClick={handleLogout}>
                            Logout
                        </button>

                    </div>
                ) : (
                    <Link to="/login" className="topbarLoginButton">
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Topbar;