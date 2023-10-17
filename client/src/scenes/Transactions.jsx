import { DataGrid } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import { useGetTransactionsQuery } from "../state/api"
import Header from "../components/Header"
import { useTheme, Box } from "@mui/material"
import DataGridCustomToolbar from "../components/DataGridCustomToolbar"

const Transactions = () => {
    const theme = useTheme();

    //values to be sent to the backend

    const [paginationModel, setPaginationModel] =
        useState({ page: 0, pageSize: 20, sortModel: [] });
    const [rowCount, setRowCount] = useState(0);
    
    const [sortModel, setSortModel] = useState([]);
    
    const [search, setSearch] = useState("");

    const [searchInput, setSearchInput] = useState("");

    const { data, isLoading } =
        useGetTransactionsQuery({ page:paginationModel.page, pageSize :paginationModel.pageSize, 
        sort: JSON.stringify(sortModel[0]), 
        search });

    
    //update the row count when the data changes
    useEffect(() => {
        if (data) {
            setRowCount(prevRowCount =>
                rowCount !== data.total ? data.total : prevRowCount
            );
        }
    }, [rowCount, setRowCount,data]);

    //columns for the data grid
    const columns = [

        { field: "_id", headerName: "Transaction ID", flex: 1 },
        { field: "userId", headerName: "Customer", flex: 1 },
        { field: "createdAt", headerName: "Date", flex: 1 },
        {
            field: "products", headerName: "# of Products", flex: 0.5,
            renderCell: (params) => params.value.length
        },
        {
            field: "cost", headerName: "Cost", flex: 0.5,
            renderCell: (params) => `$${Number(params.value).toFixed(2)}`
        },

    ];

    //render

    return (
        <Box m="1.5rem 2.5rem">

            <Header title="Transactions" subtitle="Entire list of Transactions" />

            <Box mt="75px" height="80vh" sx={{

                "& .MuiDataGrid-root": {
                    border: 'none',
                    borderRadius: '0.5rem',
                    boxShadow: `1px 1px 10px ${theme.palette.primary[100]}}`,
                },

                "& .MuiDataGrid-cell": {
                    borderBottom: 'none',
                },

                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: theme.palette.background.alt,
                    color: theme.palette.secondary[100],
                    borderBottom: `none`,
                },

                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: theme.palette.primary.alt,
                },

                "& .MuiDataGrid-footerContainer": {
                    fontWeight: 'bold',
                    backgroundColor: theme.palette.primary.alt,
                    color: theme.palette.secondary[100],
                    borderTop: `none`,
                },

                "& .css-1cnti9d-MuiButtonBase-root-MuiButton-root, & .css-vecwy4-MuiButtonBase-root-MuiButton-root"
                
                : {
                    color: `${theme.palette.secondary[400]} !important`,
                },

            }}>

                <DataGrid
                    loading={isLoading || !data}
                    rows={(data && data.transactions) || []}
                    columns={columns}
                    getRowId={(row) => row._id}
                    rowCount={rowCount}
                    paginationMode="server"
                    paginationModel={paginationModel}
                    onPaginationModelChange={(params) => setPaginationModel(params)}
                    pageSizeOptions={[20, 50, 100]}
                    sortingMode="server"
                    sortModel={sortModel}
                    onSortModelChange={(params) => setSortModel(params)}
                    components={{ Toolbar: DataGridCustomToolbar }}
                    componentsProps={{
                        toolbar: {
                            searchInput,
                            setSearchInput,
                            setSearch,
                        },
                    }}
                />


            </Box>



        </Box>
    )
}

export default Transactions
