import React, {useState} from 'react';
import { makeStyles } from '@mui/styles';

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

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0].name);
  }
  
  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <input
          type="file"
          className={classes.dropdown}
          onChange={handleFileChange}
        />
      </div>
      <div className={classes.box}>
        <input className={classes.input} placeholder="Type something..." />
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