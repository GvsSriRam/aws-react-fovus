import "./App.css";
import React, { useState, useRef } from "react";
import {upload} from './uploadFile.ts';
import {dbInsert} from './dbPut.ts';
import { createEC2Instance, terminateEC2Instance } from './vmFunc.ts';

const App= () => {
  const [textInput, setTextInput] = useState("");
  const [fileInput, setFileInput] = useState(null);
  const fileInputRef = useRef(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (fileInput && textInput) {
      const fileKey = fileInput.name
      try {
        await upload(fileKey, fileInput);
        const { nanoid } = require('nanoid');
        const id = nanoid();
        await dbInsert({
                        id: id,
                        input_text: textInput,
                        input_file_path: "fovus-gvs/"+fileKey,
                      });

        setTextInput('');
        setFileInput(null);
        event.target.reset();

        const instanceId = await createEC2Instance(id);
        console.log(`Instance ID: ${instanceId}`);

        await terminateEC2Instance(instanceId);

      } catch (error) {
        console.error('Error uploading file or saving data', error);
      }
    } else {
      console.error('Both text input and file must be provided');
    }
  };

  return (
    <div className="fovus-app">
      <form onSubmit={handleSubmit}>
      <div className="text-input-container container">
        <span>
          Text input: 
        </span>
        <input type="text"
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}/>
      </div>
      <div className="file-input-container container">
      <span>
          File input: 
        </span>
        <input type="file"
        ref={fileInputRef}
        onChange={(e) => setFileInput(e.target.files[0])}/>
      </div>
      
      <input type="submit"/>
      </form>
    </div>
  );
}

export default App;
