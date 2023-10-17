/* eslint-disable react/prop-types */
import { Box, Typography, useTheme } from "@mui/material"

const Header = ({title, subtitle}) => {

    const theme = useTheme();

    return (
        <Box>

            <Typography variant="h2" sx={{ color: theme.palette.secondary[100], fontWeight: 'bold', mb: '5px' }}>
                {title}
            </Typography>

            <Typography variant="h5" sx={{ color: theme.palette.secondary[300] }}>
                {subtitle}
            </Typography>


        </Box>
    )
}

export default Header