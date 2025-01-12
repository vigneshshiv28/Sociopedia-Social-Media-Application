import {Box,useTheme,Typography,useMediaQuery} from "@mui/material";
import Form from "./Form";

export default function LoginPage (){
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    return(
    <Box>
        <Box
            width="100%"
            backgroudColor={theme.palette.background.alt}
            p="1rem 6%"
            textAlign="center"
        >
            <Typography fontWeight="bold" fontsize = "32px" color="primary">
                Sociapedia
            </Typography>
        </Box>
        <Box
            width={isNonMobileScreens ? "50%" :"93%"}
            p="2rem"
            m="2rem auto"
            border="1.5rem"
            backgroundColor={theme.palette.background.alt}
        >
            <Typography fontWeight={500} variant="h5" sx={{ mb:"1.5 rem"}}>
                Welcome to Sociapedia, the Social Media for SociaPaths!
            </Typography>
            <Form/>
        </Box>
    </Box>
)} 