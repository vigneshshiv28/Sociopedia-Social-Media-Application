import {Box, useMediaQuery} from '@mui/material';
import { useEffect,useState } from 'react';
import {useSelector} from "react-redux";
import { useParams } from 'react-router-dom';
import Navbar from 'scenes/navbar';
import FriendListWidget from 'scenes/widgets/FriendListWidget';
import MyPostWidget from 'scenes/widgets/MyPostWidget';
import PostWidget from 'scenes/widgets/PostWidget';
import UserWidget from 'scenes/widgets/UserWidget';

export default function ProfilePage (){
    const [user,setUser] = useState(null);
    const {userId} = useParams();
    const token = useSelector((state) => state.token);
    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
    
    const getUser = async()=>{
        const response = await fetch(`http://localhost:3001/users/${userId}`,{
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        const data = await response.json();
        setUser(data);
    }
    useEffect(()=>{
        getUser();
    },[]);

    if(!user) return null;

    return (
        <Box>
            <Navbar/>
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreen ? "flex" : "block"}
                gap="2rem"
                justifyContent="center"
            >
                <Box flexBasis={isNonMobileScreen? "26%": undefined}>
                    <UserWidget userId={userId} picturePath={user.picturePath}/>
                    <Box m="2rem 0"/>
                    <FriendListWidget userId={userId}/>
                </Box>
                <Box
                    flexBasis={isNonMobileScreen? "42%": undefined}
                    mt={isNonMobileScreen? undefined: "2rem"}
                >
                    <MyPostWidget picturePath={user.picturePath}/>
                    <PostWidget userId={userId}/>
                </Box>
            </Box>
        </Box>
    )
}