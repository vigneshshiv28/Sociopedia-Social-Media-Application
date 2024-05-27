import { Typography } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import {useTheme} from "@mui/material";


export default function AdvertWidget(){
    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;
    
    return (
        <WidgetWrapper>
            <FlexBetween>
                <Typography color={dark} variant="h5" fontWeight="500">
                    Sponsored
                </Typography>
                <Typography color={medium}>
                Create Ad
                </Typography>
            </FlexBetween>
            <img
                width="100%"
                height="100%"
                alt="Advert"
                src="https://images.unsplash.com/photo-1634179129477-8b7b7b5b6b0a?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNnx8fGVufDB8fHx8&ixlib=rb-1.2.1"
                style={{ borderRadius:"0.75rem", margin:"0.75rem 0"}}
            />
           
        </WidgetWrapper>
    )
}