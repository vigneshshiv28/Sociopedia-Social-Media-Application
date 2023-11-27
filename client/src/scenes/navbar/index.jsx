import { useState } from "react";
import{
    Box,
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery,
    Input
} from "@mui/material";

import {
    Search,
    Message,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Menu,
    Close
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode,setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";


export default function Navbar (){
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light ;
    const dark = theme.palette.neutral.dark ;
    const background = theme.palette.background.default ;
    const primaryLight  = theme.palette.primary.light ;
    const alt = theme.palette.background.alt ;

    //const fullName = `${user.firstName} ${user.lastName}` ;
    const fullName = "John Doe" ;

    return<FlexBetween padding = "1rem 6%" background = {alt}>
        <FlexBetween gap="1.75 rem">
            <Typography
                fontWeight="bold"
                fontsize = "clamp(1rem,2rem,2.25rem)"
                color="primary"
                onClick={()=> navigate("/home")}
                sx={{
                "&:hover": {
                color: primaryLight,
                cursor: "pointer",
                },
                }}
            >
              Sociapedia
            </Typography>
            {isNonMobileScreens && (
                <FlexBetween 
                    backgroundColor={neutralLight} 
                    borderRadius="9px"
                    gap="3rem"
                    padding="0.1rem 1.5rem"
                >
                    <InputBase placeholder="Search"/>
                    <IconButton>
                        <Search/>
                    </IconButton>
                </FlexBetween>
            )}
        </FlexBetween>
        {/*Desktop Nav*/}
        {isNonMobileScreens ?(
        <FlexBetween gap="2rem">
            <IconButton onClick={()=> dispatch(setMode())}>
                {theme.palette.mode === "dark" ? (<DarkMode sx={{fontsize:"25rem"}}/>
                ) :(
                    <LightMode sx={{color:dark, fontsize:"25rem"}}/>
                    )}
            </IconButton>
            <Message sx={{fontsize:"25rem"}}/>
            <Notifications sx={{fontsize:"25rem"}}/>
            <Help sx={{fontsize:"25rem"}}/>
            <FormControl varian="standard" value={fullName} />
            <Select 
                value={fullName}
                sx={{
                    backgroundColor: neutralLight,
                    width: "150px",
                    borderRadius : "0.25rem",
                    p: "0.25rem 1rem",
                    "& .MuiSelect-icon:focus": {
                        backgroundColor: "neutralLight"
                    }
                }}
                input={<Input/>}
            >
                <MenuItem value={fullName}>
                    <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={()=>dispatch(setLogout())}>Logout</MenuItem>
            </Select>
        </FlexBetween>
        ):(
        <IconButton
            onClick={()=> setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
            <Menu/>
        </IconButton>
        )} 

        {/*Mobile Nav*/}
        {!isNonMobileScreens && isMobileMenuToggled && (
            <Box
                position="fixed"
                right="0"
                bottom="0"
                height="100%"
                zIndex="10"
                maxWidth="500px"
                minWidth="300px"
                backgroundColor={background}
            >
                {/*CLOSE ICON*/}
                <Box>
                    <IconButton
                        onClick={()=> setIsMobileMenuToggled(!isMobileMenuToggled)}
                    >
                        <Close/>
                    </IconButton>
                </Box>
                {/*Menu Items*/}
                <FlexBetween display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="3rem">
                    <IconButton onClick={()=> dispatch(setMode())} sx={{fontsize:"25rem"}}>
                        {theme.palette.mode === "dark" ? (<DarkMode sx={{fontsize:"25rem"}}/>
                        ) :(
                            <LightMode sx={{color:dark, fontsize:"25rem"}}/>
                            )}
                    </IconButton>
                    <Message sx={{fontsize:"25rem"}}/>
                    <Notifications sx={{fontsize:"25rem"}}/>
                    <Help sx={{fontsize:"25rem"}}/>
                    <FormControl varian="standard" value={fullName} />
                    <Select 
                        value={fullName}
                        sx={{
                            backgroundColor: neutralLight,
                            width: "150px",
                            borderRadius : "0.25rem",
                            p: "0.25rem 1rem",
                            "& .MuiSelect-icon:focus": {
                                backgroundColor: "neutralLight"
                            }
                        }}
                        input={<Input/>}
                    >
                        <MenuItem value={fullName}>
                            <Typography>{fullName}</Typography>
                        </MenuItem>
                        <MenuItem onClick={()=>dispatch(setLogout())}>Logout</MenuItem>
                    </Select>
                </FlexBetween>

            </Box>
        )}
    </FlexBetween>;
}