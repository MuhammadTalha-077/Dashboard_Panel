import React from 'react'
import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function TopBar(){
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>Admin</Typography>
        {token ? (
          <>
            <Button color="inherit" onClick={() => navigate('/products')}>Products</Button>
            <Button color="inherit" onClick={() => navigate('/orders')}>Orders</Button>
            <Button color="inherit" onClick={() => navigate('/users')}>Users</Button>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
        )}
      </Toolbar>
    </AppBar>
  )
}
