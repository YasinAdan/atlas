import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Navbar from "../../Navbar/Navbar";
import Rightbar from "../../Rightbar/Rightbar";
import Sidebar from "../../Sidebar/Sidebar";
import Feed from "../../Feed/Feed";
import "./Profile.scss";

const Profile = () => {
  const username = useParams().username;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, []);
  return (
    <React.Fragment>
      <Navbar />
      <div className="profile">
        <Sidebar />
        <div className="profile-right">
          <div className="profile-right-top">
            <div className="profile-cover">
              <img
                className="profile-cover-img"
                src={user.coverPicture || PF + "/person/default-cover.png"}
                alt=""
              />
              <img
                className="profile-user-picture"
                src={user.coverPicture || PF + "/person/default-photo.jpg"}
                alt=""
              />
            </div>
            <div className="profile-info">
              <h1 className="profile-info-name">{user.username}</h1>
              <span className="profile-info-desc">{user?.description}</span>
            </div>
          </div>
          <div className="profile-right-bottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
