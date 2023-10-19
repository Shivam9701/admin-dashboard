import { useGetPerformanceQuery } from "../state/api"
import { Box, useTheme } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import Header from "../components/Header";
import { useSelector } from "react-redux/es/hooks/useSelector";

const Performance = () => {

    const theme = useTheme();
    const userId = useSelector(state => state.global.userId);
    const { data, isLoading } = useGetPerformanceQuery(userId);
    console.log(data);
    const columns = [
        { field: '_id', headerName: 'ID', flex: 1, },
        { field: 'userId', headerName: 'Name', flex: 1 },
        { field: 'createdAt', headerName: 'Created At', flex: 1 },
        { field: 'products', headerName: 'No. of Products', flex: 0.5, sortable: false, renderCell: (params) => params.value.length },
        {
            field: 'cost', headerName: 'Cost', flex: 1,
            renderCell: (params) => `$${Number(params.value).toFixed(2)}`
        },
    ];

    return (
        <Box m="1.5rem 2.5rem">

            <Header title="Performance" subtitle="Track your Affiliate Sales Performance" />

            {isLoading && <div>Loading...</div>}

            <Box mt="75px" height="75vh" sx={{

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
                    color: theme.palette.secondary[200],
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

                "& .MuiDataGrid-toolBarContainer .MuiButton.text": {
                    color: `${theme.palette.secondary[100]} !important`,
                },

            }}>
                {data &&
                    <DataGrid
                        loading={isLoading || !data}
                        getRowId={(row) => row._id}
                        rows={data.sales || []}
                        columns={columns}
                    />
                }


            </Box>



        </Box>
    )
}

export default Performance