import { Box } from "@mui/material";

export default function UserImage({ image , size ="60px"}){
    return(
        <Box width={size} height={size}>
        <img
            style={{ objectFit: "conver", borderRadius: "50%"}}
            width={size}
            height={size}
            alt="user"
            src={`http://localhost:3001/assets/${image}`}
        />
        </Box>

    );
}