import React, { useEffect, useState } from 'react'
import { Container, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button } from '@mui/material'
import axios from 'axios'

export default function Products(){
  const [products, setProducts] = useState([])

  useEffect(() => { fetchProducts() }, [])

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get((import.meta.env.VITE_API_URL || '') + '/api/products')
      setProducts(data.items || data)
    } catch (err) { console.error(err) }
  }

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token')
      await axios.delete((import.meta.env.VITE_API_URL || '') + '/api/products/' + id, { headers: { Authorization: `Bearer ${token}` } })
      fetchProducts()
    } catch (err) { console.error(err) }
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Products</Typography>
      <Button variant="contained" sx={{ mb: 2 }}>Create Product</Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map(p => (
              <TableRow key={p._id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>${p.price}</TableCell>
                <TableCell>{p.countInStock}</TableCell>
                <TableCell>
                  <Button size="small" sx={{ mr: 1 }}>Edit</Button>
                  <Button size="small" color="error" onClick={() => handleDelete(p._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}
