import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import ReactEcharts from 'echarts-for-react';
import BarChart from './BarChart'; // Path might vary based on your file structure
import ReactJson from 'react-json-view'; // Import this


const useStyles = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '0rem',
    height: '150vh',
    padding: '1rem',
    alignItems: 'start',
    gridRowGap: '10px',
  },
  box: {
    border: '1px solid darkblue',
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
    gridRow: '1 / 2',
    gridColumn: '1 / 2',
    backgroundColor: '#f0f0f0',
    padding: '1rem',
    fontFamily: 'Arial, sans-serif',
    width: '70%', // Adjust to control the width
    height: '7vh', // Adjust to control the height
    
  },
  description2: {
    gridRow: '2 / 3',
    gridColumn: '1 / 2',
    backgroundColor: '#f0f0f0',
    padding: '1rem',
    fontFamily: 'Arial, sans-serif',
    width: '70%', // Adjust to control the width
    height: '7vh', // Adjust to control the height
  },
  description3: {
    gridRow: '3 / 4',
    gridColumn: '1 / 2',
    backgroundColor: '#f0f0f0',
    padding: '1rem',
    fontFamily: 'Arial, sans-serif',
    width: '70%', // Adjust to control the width
    height: '7vh', // Adjust to control the height
  },
  description4: {
    gridRow: '4 / 5',
    gridColumn: '1 / 2',
    backgroundColor: '#f0f0f0',
    padding: '1rem',
    fontFamily: 'Arial, sans-serif',    
    width: '70%', // Adjust to control the width
    height: '7vh', // Adjust to control the height
  },
  description5: {
    gridRow: '1 / 2',
    gridColumn: '2 / 3',
    backgroundColor: '#f0f0f0',
    padding: '1rem',
    fontFamily: 'Arial, sans-serif',    
    width: '100%', // Adjust to control the width
    height: '10vh', // Adjust to control the height
  },
  description6: {
    gridRow: '2 / 3',
    gridColumn: '2 / 3',
    backgroundColor: '#f0f0f0',
    padding: '1rem',
    fontFamily: 'Arial, sans-serif',    
    width: '100%',
    height: '30vh', // Increase height
    overflow: 'auto',
    whiteSpace: 'pre-wrap',
    fontSize: '0.8rem', // Decrease font size
    color: 'darkblue' // Change color
  },
  description7: {
    gridRow: '3 / 4',
    gridColumn: '2 / 3',
    backgroundColor: '#f0f0f0',
    padding: '1rem',
    fontFamily: 'Arial, sans-serif',    
    width: '100%', // Adjust to control the width
    height: '60vh', // Adjust to control the height
  },
  description8: {
    gridRow: '4 / 5',
    gridColumn: '2 / 3',
    backgroundColor: '#f0f0f0',
    padding: '1rem',
    fontFamily: 'Arial, sans-serif',    
    width: '100%', // Adjust to control the width
    height: '7vh', // Adjust to control the height
    marginBottom: '10vh',
  },

});

function DataCenter() {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState(null);
  const [jsonContent, setJsonContent] = useState("");
  const [apiData, setApiData] = useState(null);
  const [fineTuned, setfineTuned] = useState("");

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
        return response;
      })
      .catch(error => {
        console.error('There was an handleFileUpload error!', error);
      });
  };

  const handleFileChange = (event) => {
    const fineTuned = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
      setfineTuned(event.target.result);
    };
    reader.readAsText(fineTuned);

    console.log("File selected");
    setSelectedFile(event.target.files[0]);
    handleFileUpload(event.target.files[0]);}

  

  useEffect(() => {
    fetch('http://127.0.0.1:5001')
      .then(response => response.json())
      .then(data => {
        console.log("going to print data next")
        console.log(data);
        // setApiData(data);
      });
  }, []);

  function extractEmotion(response, sentence) {
    let emotions = "";
    for (let i = 0 ; i < response["json_output"].length; i ++) {
        if (sentence+"." == response["json_output"][i]["text"]) {
          emotions = "(" + response["json_output"][i]["top_5_emotions"] + ")";
          console.log(emotions);
          return emotions;
        }
    }
    return "(neutral sentence)."

  }

  function fineTunePrompt(response, fileContent) {
    let sentences = fileContent.split(". ");

    for (let j = 0; j < response['json_output'].length; j ++ ){
      for (let i = 0; i < sentences.length; i++) {
        if (response['json_output'][j]["text"] == sentences[i] + ".") {
          const changed = extractEmotion(response, sentences[i]);
          const fineTunedSentence = sentences[i] + changed;
          sentences[i] = fineTunedSentence;
        }
      }
  }
  const final = sentences.join('. ') + '.';
  return final;
}
  
  return (
    <div className={classes.container}>

      <textarea className={classes.description1} readOnly value="Upload Your File" />
      <textarea className={classes.description2} readOnly value="JSON file from Hume.ai" />
      <textarea className={classes.description3} readOnly value="Illustration" />
      <textarea className={classes.description4} readOnly value="Adjusted Prompt" />

      {/* <textarea className={classes.description5} readOnly value="Function of Dropdown..." /> */}
      <div className={classes.description5}>
        <input
          type="file"
          className={classes.dropdown}
          onChange={handleFileChange}
          onClick={() => console.log("Clicked")}
        />
      </div>

      {/* <textarea className={classes.description6} readOnly value="Function of Input..." /> */}
     
      {/* <div className={classes.description6}>
        <pre>{JSON.stringify(apiData, null, 2)}</pre>
      </div> */}

      <div className={classes.description6}>
        {apiData && <ReactJson src={apiData} theme="solarized" />}
      </div>

      {/* <textarea className={classes.description7} readOnly value="Function of Image..." /> */}
      <div className={classes.description7}>
        {apiData && apiData.bar_chart_5_emotions && <BarChart data={apiData.bar_chart_5_emotions} />}
      </div>

      {/* <textara className={classes.description8} readOnly value="Function of Output..." /> */}

      <div className={classes.description8}>
        {apiData && fineTunePrompt(apiData, fineTuned)}
      </div>


    </div>
  );
}

export default DataCenter;