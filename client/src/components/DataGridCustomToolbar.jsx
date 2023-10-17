/* eslint-disable react/prop-types */
import { Search } from "@mui/icons-material"
import { IconButton, InputAdornment, TextField } from "@mui/material"
import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport } from "@mui/x-data-grid"
import FlexBetween from "./FlexBetween"

const DataGridCustomToolbar = ({searchInput,setSearchInput,setSearch}) => {

    return (
        <GridToolbarContainer>

            <FlexBetween width="100%">

                <FlexBetween>
                    <GridToolbarColumnsButton />
                    <GridToolbarDensitySelector />
                    <GridToolbarExport />
                </FlexBetween>

                <TextField
                    label="Search ..."
                    size="small"
                    sx={{
                        width: "15rem",
                        mb: "0.5rem",
                    }}
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setSearch(searchInput)}
                                    size="small"
                                >
                                    <Search />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

            </FlexBetween>


        </GridToolbarContainer>
    )
}

export default DataGridCustomToolbar