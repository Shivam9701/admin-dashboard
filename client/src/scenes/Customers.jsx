import { useGetCustomersQuery } from "../state/api.js";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../components/Header.jsx";
import CustomColumnMenu from "../components/CustomColumnMenu.jsx";


const Customers = () => {
  const { data, isLoading } = useGetCustomersQuery();
  const theme = useTheme();

  const columns = [
    { field: '_id', headerName: 'ID', flex: 1, },
    { field: 'name', headerName: 'Name', flex: 0.5 },
    { field: 'email', headerName: 'Email', flex: 1 },
    {
      field: 'phoneNumber', headerName: 'Phone', flex: 0.5,
      renderCell: (params) => (
        params.value.replace(/^(\d{3})(\d{3})(\d{4})/, '+($1)$2-$3')
      )
    },
    { field: 'occupation', headerName: 'Occupation', flex: 1 },
    { field: 'city', headerName: 'City', flex: 0.5 },
    { field: 'country', headerName: 'Country', flex: 0.4 },
    { field: 'role', headerName: 'Role', flex: 0.5 },

  ];

  return (
    <Box m="1.5rem 2.5rem">

      <Header title="CUSTOMERS" subtitle="List of Customers" />

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

        "& .MuiDataGrid-toolBarContainer .MuiButton.text": {
          color: `${theme.palette.secondary[100]} !important`,
        },

      }}>

        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
          slots={{
            columnMenu : CustomColumnMenu,
          }}
        />

      </Box>



    </Box>
  )
}

export default Customers 