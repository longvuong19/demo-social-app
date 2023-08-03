import { Box, useMediaQuery } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../navbar";
import FriendListWidget from "../widgets/FriendListWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import UserWidget from "../widgets/UserWidget";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="32px 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="32px"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "24%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box margin="32px 0" />
          <FriendListWidget userId={userId} />
          {console.log(userId)}
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "44%" : undefined}
          marginTop={isNonMobileScreens ? undefined : "32px"}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <Box margin="32px 0" />
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
