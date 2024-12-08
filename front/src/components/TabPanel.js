import { Box } from "@mui/material";

export const TabPanel = ({ children, value, index }) => {
    return (
        <div role="tabpanel" hidden={value !== index}>
            {value === index && <Box sx={{ height: "520px", p: 2 }}>{children}</Box>}
        </div>
    );
};