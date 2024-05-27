import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    ShareOutlined,
} from "@mui/icons-material";
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friends";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import {useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

export default function PostWidget({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
  }) {
    const [isComments,setIsComments] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;
    
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;
    const primary = palette.primary.main;

    const patchLike = async() => {
        const response = await fetch(`http://localhost:3001/posts/${postId}/like`,{
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({userId : loggedInUserId}),
        });
        const updatedPost = await response.json();
        dispatch(setPost({post: updatedPost}));
    }
    return(
        <WidgetWrapper m="2rem 0">
            <Friend 
                friendID={postUserId}
                name={name}
                subtitle={location}
                picturePath={userPicturePath}
            />
            <Typography color={main} sx={{ mt:"1rem"}}>
                {description}
            </Typography>
            {picturePath && (
                <img
                    width="100%"
                    src={`http://localhost:3001/assets/${picturePath}`}
                />
            )}
            <FlexBetween mt="0.25rem">
                <FlexBetween gap="1rem">

                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={patchLike}>
                            {isLiked ?(<FavoriteOutlinedIcon sx={{ color: primary }} />)
                            :(<FavoriteBorderOutlined />)}
                        </IconButton>
                        <Typography color={medium}>{likeCount}</Typography>
                    </FlexBetween>

                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={() => setIsComments(!isComments)}>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                        <Typography color={medium}>{comments.length}</Typography>    
                    </FlexBetween>

                </FlexBetween>
                <IconButton>
                    <ShareOutlined />
                </IconButton>
            </FlexBetween>
            {isComments && (
                <Box mt="0.5rem">
                    {comments.map((comment,i) => (
                        <Box key={`${name}-${i}`}>
                            <Divider />
                            <Typography sx={{color:main,m:"0.5rem 0",pl:"rem"}}>
                                comment
                            </Typography>
                        </Box>
                    ))}
                </Box>
            )

            }
        </WidgetWrapper>
    )
}