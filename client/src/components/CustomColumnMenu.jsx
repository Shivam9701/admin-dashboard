/* eslint-disable react/prop-types */
import { GridColumnMenu} from "@mui/x-data-grid"

const CustomColumnMenu = (props) => {

    const { hideMenu, currentColumn, open } = props;

    return (
        <GridColumnMenu
            hideMenu={hideMenu}
            currentColumn={currentColumn}
            open={open}
        >


        </GridColumnMenu>
    )
}

export default CustomColumnMenu