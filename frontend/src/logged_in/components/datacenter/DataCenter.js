import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '1rem',
    height: '100vh',
    padding: '1rem',
  },
  dropdown: {
    gridRow: '1 / 2',
  },
  input: {
    gridRow: '2 / 3',
  },
  image: {
    gridRow: '3 / 4',
  },
  output: {
    gridRow: '4 / 5',
  },
  button: {
    gridRow: '1 / 5',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});


function DataCenter() {
  const classes = useStyles();
  
  return (
    <div className={classes.container}>
      <select className={classes.dropdown}>
        <option>Select an option</option>
      </select>
      <input className={classes.input} placeholder="Type something..." />
      <img className={classes.image} src="https://via.placeholder.com/150" alt="example" />
      <div className={classes.output}>Output text...</div>
      
      <div className={classes.button}>
        <button>Button 1</button>
        <button>Button 2</button>
        <button>Button 3</button>
        <button>Button 4</button>
      </div>
    </div>
  );
}

export default DataCenter;
