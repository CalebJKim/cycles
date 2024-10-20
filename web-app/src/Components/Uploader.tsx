import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import './Uploader.css'
import { upload } from "@testing-library/user-event/dist/upload";

const fileTypes = ["CSV"];

export default function Upload(props: any) {
  // FileUploader handles file type, so techinically, no error should be thrown.
  const [error, setError] = useState(null);
  const handleError = (error: any) => {
    setError(error);
  };
  return (
    <div className="Uploader">
      <FileUploader
        multiple={false}
        handleChange={props.setFile}
        name="file"
        label="Upload or drop a file right here."
        hoverTitle="Drop here."
        types={fileTypes}
        fileOrFiles={null}
        onTypeError={setError}
      />
      {/* <p>{props.file ? File name: ${props.file["name"]} : "No files uploaded yet."}</p> */}
    </div>
  );
}


// get the text and upload
// create a form HTML tag off of it
// call the handleSubmit function