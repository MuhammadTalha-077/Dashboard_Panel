import React, { useEffect, useState } from 'react'
import { Container, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material'
import axios from 'axios'

export default function Orders(){
  const [orders, setOrders] = useState([])

  useEffect(() => { fetchOrders() }, [])

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token')
      const { data } = await axios.get((import.meta.env.VITE_API_URL || '') + '/api/orders', { headers: { Authorization: `Bearer ${token}` } })
      setOrders(data)
    } catch (err) { console.error(err) }
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Orders</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map(o => (
              <TableRow key={o._id}>
                <TableCell>{o._id}</TableCell>
                <TableCell>{o.user?.name}</TableCell>
                <TableCell>${o.totalPrice}</TableCell>
                <TableCell>{new Date(o.createdAt).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}
