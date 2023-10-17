/* eslint-disable react/prop-types */

import { Box, Card, CardActions, CardContent, Collapse, Button, Typography, Rating, useTheme, useMediaQuery } from '@mui/material'
import { useState } from 'react'
import { useGetProductsQuery } from '../state/api'
import Header from '../components/Header'

const Product = ({ _id, name, description, price, rating, category, supply, stat }) => {

  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  console.log(stat[0].yearlySalesTotal)

  return (
    <Card sx={{
      backgroundColor: theme.palette.background.alt,
      borderRadius: "0.55rem", backgroundImage: "none"
    }}>

      <CardContent>

        <Typography gutterBottom sx={{ fontSize: 14 }} color={theme.palette.secondary[300]}>
          {category}
        </Typography>

        <Typography variant="h5" component="div">
          {name}
        </Typography>

        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>

          ${Number(price).toFixed(2)}

        </Typography>

        <Rating value={rating} readOnly />

        <Typography variant="body2" >
          {description}
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small" variant="primary" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "Hide" : "Show"} Details
        </Button>
      </CardActions>

      <Collapse in={isExpanded} timeout="auto" unmountOnExit sx={{
        color:
          theme.palette.neutral[300]
      }}>

        <CardContent>

          <Typography>ID : {_id}</Typography>
          <Typography>Supply Left : {supply}</Typography>
          <Typography>Yearly Sales this year : {stat[0].yearlySalesTotal}</Typography>
          <Typography>Yearly Sold Units this year : {stat[0].yearlyTotalSoldUnits}</Typography>
        </CardContent>

      </Collapse>



    </Card>
  )
}

const Products = () => {

  const { data, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  return (
    <Box m="1.5rem 2.5rem">

      <Header title="PRODUCTS" subtitle="See your List of products" />

      {data || !isLoading ?
        (
          <Box mt="20px" display="grid"
            gridTemplateColumns="repeat(4, minmax(0,1fr))"
            justifyContent="space-between" rowGap="20px"
            columnGap="1.33%"
            sx={{
              "& >div": { gridColumn: isNonMobile ? undefined : "span 4" }
            }}
          >

            {data.map((product) => (
              <Product key={product._id} {...product} />
            ))}

          </Box>
        ) : <>Loading...</>}

    </Box>
  )
}

export default Products