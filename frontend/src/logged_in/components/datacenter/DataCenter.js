import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import axios from 'axios';

const useStyles = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '1rem',
    height: '100vh',
    padding: '1rem',
    alignItems: 'start',
  },
  box: {
    border: '1px solid darkblue',
    borderRadius: '10px',
    backgroundColor: 'lightblue',
    padding: '10px',
    margin: '10px 0',
  },
  dropdown: {
    width: '50%',
  },
  input: {
    width: '50%',
  },
  description1: {
    borderRadius: '10px',
    gridRow: '1 / 2',
    backgroundColor: '#f0f0f0',
    padding: '1rem',
    fontFamily: 'Arial, sans-serif',
    width: '80%', // Adjust to control the width
    height: '5vh', // Adjust to control the height
    
  },
  description2: {
    borderRadius: '10px',
    gridRow: '2 / 3',
    backgroundColor: '#f0f0f0',
    padding: '1rem',
    fontFamily: 'Arial, sans-serif',
    width: '80%', // Adjust to control the width
    height: '5vh', // Adjust to control the height
  },
  description3: {
    borderRadius: '10px',
    gridRow: '3 / 4',
    backgroundColor: '#f0f0f0',
    padding: '1rem',
    fontFamily: 'Arial, sans-serif',
    width: '80%', // Adjust to control the width
    height: '5vh', // Adjust to control the height
  },
  description4: {
    borderRadius: '10px',
    gridRow: '4 / 5',
    backgroundColor: '#f0f0f0',
    padding: '1rem',
    fontFamily: 'Arial, sans-serif',    
    width: '80%', // Adjust to control the width
    height: '5vh', // Adjust to control the height
  },
});

function DataCenter() {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState(null);
  const [apiData, setApiData] = useState(null);

const handleFileChange = (event) => {
  console.log("File selected");
  setSelectedFile(event.target.files[0]);

  // Start upload immediately upon file selection
  handleFileUpload(event.target.files[0]);
}

const handleFileUpload = (file) => {
  console.log("Uploading file");
  
  // Create a new FormData object and append the file
  const formData = new FormData();
  formData.append('file', file);
  
  // Make a POST request to the Flask server
  axios.post('/txt_hume', formData)
    .then(response => {
      // Handle the response from the Flask server
      console.log(response.data);
      setApiData(response.data);
    })
    .catch(error => {
      console.error('There was an error!', error);
    });
};
  useEffect(() => {
    fetch('http://127.0.0.1:5001')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setApiData(data);
      });
  }, []);
  
  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <input
          type="file"
          className={classes.dropdown}
          onChange={handleFileChange}
          onClick={() => console.log("Clicked")}
        />
      </div>
      <div className={classes.box}>
        <input className={classes.input} placeholder="Emotion Results" />
      </div>
      <div className={classes.box}>
        <img className={classes.image} src="https://via.placeholder.com/150" alt="example" />
      </div>
      <div className={classes.box}>
        <div className={classes.output}>Output text...</div>
      </div>

      <textarea className={classes.description1} readOnly value="Function of Dropdown..." />
      <textarea className={classes.description2} readOnly value="Function of Input..." />
      <textarea className={classes.description3} readOnly value="Function of Image..." />
      <textarea className={classes.description4} readOnly value="Function of Output..." />
    </div>
  );
}

export default DataCenter;