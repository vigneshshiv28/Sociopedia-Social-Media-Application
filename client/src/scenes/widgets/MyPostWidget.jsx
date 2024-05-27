import {
   
    
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    
} from "@mui/icons-material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
    useMediaQuery,
    Icon
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WidgetWrapper from "components/WidgetWrapper";
import { setPost } from "state";
import { useFetcher } from "react-router-dom";

export default function MyPostWidget({picturePath}) {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const[image, setImage] = useState(null);
    const [post,setPost] = useState("");
    const {palette} = useTheme();
    const {_id} = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreen = useMediaQuery("(mid-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;

    const handlePost = async() =>{
        const formData = new FormData();
        formData.append("userId",_id);
        formData.append("description",post);
        if(image){
            formData.append("picture",image);
            formData.append("picturePath",image.name);
        }

        const response = await fetch(`http://localhost:3000/posts`,{
            method: "POST",
            headers: { Authorization: `Bearer ${token}`},
            body: formData,
        });
        const post = await response.json();
        dispatch(setPost({post}));
        setImage(null);
        setPost(""); 

        return(
            <WidgetWrapper>
                <FlexBetween gap="1.5rem">
                    <UserImage img={picturePath}/>
                    <InputBase
                        placeholder="What's on your mind?"
                        onChange={(e) => setPost(e.target.value)}
                        value={post}
                        sx={{
                            width: "100%",
                            backgroundColor: palette.neutral.light,
                            borderRadius: "2rem",
                            padding: "1rem 2rem"
                        }}
                    />
                </FlexBetween>
                {isImage && (
                    <Box
                        border={`1px solid ${medium}`}
                        borderRadius="5px"
                        mt="1rem"
                        p="1rem"
                    >
                        <Dropzone
                            acceptedFiles=".jpg,.png,.jpeg"
                            multiple={false}
                            onDrop={(acceptedFiles)=>{
                                setImage("picture",acceptedFiles[0])
                            }}
                        >
                            {({getRootProps,getInputProps})=>(
                                <FlexBetween>
                                <Box
                                    {...getRootProps()}
                                    border={`2px dashed ${palette.primary.main}`}
                                    p="1rem"
                                    width="100%"
                                    sx={{"&:hover":{cursor:"pointer"}}}
                                >
                                    <input {...getInputProps()}/>
                                        {!image ? (
                                        <p>Add image Here</p>
                                        ):(
                                        <FlexBetween>
                                            <Typography>{image.name}</Typography>
                                            <EditOutlinedIcon/>
                                        </FlexBetween>
                                        )}
                                </Box>
                                {image && (
                                    <IconButton
                                        onClick={() => setImage(null)}
                                        sx={{ width: "15%"}}
                                    >
                                        <DeleteOutlinedIcon/>
                                    </IconButton>
                                )}
                    
                                
                                </FlexBetween>
                            )}
                        </Dropzone>
                    </Box>
                )}
                <Divider sx={{ margin: "1.25rem 0"}}/>
                    <FlexBetween>
                        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
                            <ImageOutlined sx={{ color: mediumMain}}/>
                            <Typography
                                color={mediumMain}
                                sx={{"&:hover":{ cursor: "pointer", color:medium}}}
                            >
                                Image
                            </Typography>
                        </FlexBetween>
                        {isNonMobileScreen ? (
                        <>
                            <FlexBetween gap="0.25rem">
                                <GifBoxOutlined sx={{ color: mediumMain}}/>
                                <Typography color={mediumMain}>Clip</Typography>
                            </FlexBetween>

                            <FlexBetween gap="0.25rem">
                                <AttachFileOutlined sx={{ color: mediumMain}}/>
                                <Typography color={mediumMain}>Attachment</Typography>
                            </FlexBetween>

                            <FlexBetween gap="0.25rem">
                                <MicOutlined sx={{ color: mediumMain}}/>
                                <Typography color={mediumMain}>Audio</Typography>
                            </FlexBetween>

                                
                        </>):(
                            <FlexBetween gap="0.25rem">
                                <MoreHorizOutlinedIcon sx={{ color: mediumMain}}/>
                            </FlexBetween>
                        )}
                        <Button 
                            disabled={!post}
                            onClick={handlePost}
                            sx={{
                                color: palette.neutral.alt,
                                backgroundColor: palette.primary.main,
                                borderRadius: "3rem",
                            }}
                        >
                            Post
                        </Button>
                    </FlexBetween>
            </WidgetWrapper>
        )
    }
}