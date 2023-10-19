import FlexBetween from '../components/FlexBetween'
import Header from '../components/Header'
import { DownloadOutlined, Email, PersonAdd, PointOfSale, Traffic } from '@mui/icons-material'
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import BreakdownChart from '../components/BreakdownChart'
import OverviewChart from '../components/OverviewChart'
import { useGetDashboardQuery } from '../state/api'
import StatBox from '../components/StatBox'


const Dashboard = () => {

  const theme = useTheme();
  const isNonMediumScreen = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetDashboardQuery();
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

  return (
    <Box m="1.5rem 2rem">

      <FlexBetween>
        <Header title="Dashboard" subtitle="Overview of your business" />
        <Box>
          <Button sx={{
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.background.alt,
            fontSize: '14px',
            fontWeight: 'bold',
            padding: '10px 20px',
          }}>
            <DownloadOutlined sx={{ mr: '10px' }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      <Box mt="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreen ? undefined : "span 12" },
        }}
        display="grid"
        gridTemplateColumns={"repeat(12,1fr)"} gridAutoRows="160px" gap="20px">

        {/* Row 1 */}

        <StatBox title="Total Customers"
          value={data && data.totalCustomers}
          increase="+14%"
          description="Since last month"
          icon={
            <Email sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />
          } />

        <StatBox title="Sales Today"
          value={data && data.todayStats.totalSales}
          increase="+21%"
          description="Since last month"
          icon={
            <PointOfSale sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />
          } />

        <Box gridColumn="span 8" gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <OverviewChart view="sales" isDashboard={true} />

        </Box>

        <StatBox title="Monthly Sales"
          value={data && data.thisMonthStats.totalSales}
          increase="+5%"
          description="Since last month"
          icon={
            <PersonAdd sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />
          } />

        <StatBox title="Yearly Sales"
          value={data && data.yearlySalesTotal}
          increase="+43%"
          description="Since last month"
          icon={
            <Traffic sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />
          } />

        {/* Row 2 */}
        <Box gridColumn="span 8"
          gridRow="span 3"
          sx={{

            "& .MuiDataGrid-root": {
              border: '1px',
             
            },

            "& .MuiDataGrid-cell": {
              borderBottom: 'none',
            },

            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: `none`,
              borderRadius: '.5rem',
            },

            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },

            "& .MuiDataGrid-footerContainer": {
              fontWeight: 'bold',
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: `none`,
            },

            "& .css-1cnti9d-MuiButtonBase-root-MuiButton-root, & .css-vecwy4-MuiButtonBase-root-MuiButton-root"

              : {
              color: `${theme.palette.secondary[400]} !important`,
            },

          }}
        >

          <DataGrid
            loading={isLoading || !data}
            rows={(data && data.transactions) || []}
            columns={columns}
            getRowId={(row) => row._id}
          />

        </Box>

        <Box gridColumn={"span 4"} gridRow={"span 3"}
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant='h6' sx={{ color: theme.palette.secondary[100] }}>
            Sales Breakdown
          </Typography>

          <BreakdownChart isDashboard={true} />

          <Typography p="0 0.2rem" fontSize="0.8rem" sx={{
            color: theme.palette.secondary[200]
          }}>
            Breakdown of sales via category and product
          </Typography>

        </Box>

      </Box>


    </Box>
  )
}

export default Dashboard