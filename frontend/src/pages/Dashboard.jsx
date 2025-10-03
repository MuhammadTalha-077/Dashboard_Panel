import React, { useEffect, useState } from 'react'
import { Container, Typography, Grid, Paper } from '@mui/material'
import axios from 'axios'

export default function Dashboard(){
  const [summary, setSummary] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        const token = localStorage.getItem('token')
        const { data } = await axios.get((import.meta.env.VITE_API_URL || '') + '/api/stats/summary', { headers: { Authorization: `Bearer ${token}` } })
        setSummary(data)
      } catch (err) {
        console.error(err)
      }
    }
    fetch()
  }, [])

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1">Total Products</Typography>
            <Typography variant="h5">{summary?.productsCount ?? '-'}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1">Total Orders</Typography>
            <Typography variant="h5">{summary?.summary?.numOrders ?? '-'}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1">Total Sales</Typography>
            <Typography variant="h5">${summary?.summary?.totalSales?.toFixed(2) ?? '0.00'}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
