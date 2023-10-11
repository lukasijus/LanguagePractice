import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Snackbar } from '@mui/material';
import Practice from './components/Practice';

function App() {
  const [finnish, setFinnish] = useState('');
  const [english, setEnglish] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');


  const handleAddPhrase = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://localhost:3002/addPhrase', { finnish, english });
        
        // Set a message for the snackbar and open it
        setSnackbarMessage("Phrase added successfully!");
        setSnackbarOpen(true);

        // Clear input fields after successful submission
        setFinnish('');
        setEnglish('');
    } catch (error) {
        console.error("Error adding phrase:", error);
        
        // You can also show an error message via the snackbar
        setSnackbarMessage("Error adding phrase. Please try again.");
        setSnackbarOpen(true);
    }
};


  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        Finnish-English Phrases
      </Typography>

      <form onSubmit={handleAddPhrase}>
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          label="Finnish"
          value={finnish}
          onChange={(e) => setFinnish(e.target.value)}
          autoComplete="off"
        />

        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          label="English"
          value={english}
          onChange={(e) => setEnglish(e.target.value)}
          autoComplete="off"
        />

        <Button variant="contained" color="primary" type="submit" style={{ marginTop: '20px' }}>
          Add Phrase
        </Button>
      </form>

      <Practice />

      <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      />

    </Container>
  );
}

export default App;
