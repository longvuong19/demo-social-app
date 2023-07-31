import { Box, useMediaQuery } from "@mui/material";
import Navbar from "../navbar";
import { useSelector } from "react-redux";
import UserWidget from "../widgets/UserWidget";


const Homepage = () => {
   const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
   const { _id, picturePath } = useSelector(state => state.user);

   return (
      <Box>
         <Navbar />
         <Box
            width="100%"
            padding="32px 6%"
            display={isNonMobileScreens ? "flex" : "block"}
            gap="8px"
            justifyContent="space-between"
         >
            <Box flexBasis={isNonMobileScreens ? "24%" : undefined}>
               <UserWidget userId={_id} picturePath={picturePath} />
            </Box>
            <Box
               flexBasis={isNonMobileScreens ? "44%" : undefined}
               marginTop={isNonMobileScreens ? undefined : "32px"}
            >

            </Box>
            {isNonMobileScreens && (<Box flexBasis="24%"></Box>)}
         </Box>
      </Box>
   )
}

export default Homepage;