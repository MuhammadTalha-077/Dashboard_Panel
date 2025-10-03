import React, { useState } from 'react'
import { Container, TextField, Button, Box, Typography, Alert } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('pass123')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const submit = async () => {
    setError(null)
    try {
  const { data } = await axios.post((import.meta.env.VITE_API_URL || '') + '/api/auth/login', { email, password })
  localStorage.setItem('token', data.token)
  // store role for client-side UI decisions
  if (data.role) localStorage.setItem('role', data.role)
  navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    }
  }

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>Admin Login</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
        <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button variant="contained" onClick={submit}>Login</Button>
      </Box>
    </Container>
  )
}
