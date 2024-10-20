import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Uploading: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");
  const navigate = useNavigate();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name); // Display file name
    }
  };

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); // Show loading state
    const formData = new FormData();
    
    if (file) {
      formData.append('file', file);
    }
    formData.append('text', text);

    try {
      const response = await axios.post('http://localhost:5000/api/arena', formData); // Removed custom headers
      console.log('File and text uploaded successfully', response.data);
      // Optionally clear form after submission
      setFile(null);
      setText("");
      setFileName("");

      navigate('/');
    } catch (error) {
      console.error('Error uploading the file and text', error);
    } finally {
      setIsSubmitting(false); // Remove loading state
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form} encType="multipart/form-data">
        {/* File Upload */}
        <div style={styles.uploadArea}>
          <input type="file" onChange={handleFileChange} style={styles.fileInput} />
          <p style={styles.uploadText}>Upload an image or video</p>
          {fileName && <p style={styles.fileName}>Selected file: {fileName}</p>}
        </div>

        {/* Separator line */}
        <div style={styles.separatorLine}></div>

        {/* Text Input */}
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Describe your media (This podcast is about...)"
          style={styles.textInput}
        />

        {/* Submit Button */}
        <button type="submit" style={styles.submitButton} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Simulate Results'}
        </button>
      </form>
    </div>
  );
};

// Styling
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  form: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: '20px',
  },
  uploadArea: {
    border: '2px dashed #ccc',
    padding: '40px',
    borderRadius: '8px',
    textAlign: 'center' as 'center',
    backgroundColor: '#fafafa',
    position: 'relative' as 'relative',
  },
  fileInput: {
    opacity: 0,
    position: 'absolute' as 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    cursor: 'pointer',
  },
  uploadText: {
    fontSize: '16px',
    color: '#888',
  },
  fileName: {
    fontSize: '14px',
    color: '#444',
    marginTop: '10px',
  },
  separatorLine: {
    height: '1px',
    backgroundColor: '#ddd',
    margin: '20px 0',
  },
  textInput: {
    width: '100%',
    padding: '20px',
    fontSize: '16px',
    border: '2px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#fafafa',
    minHeight: '100px',
    resize: 'none' as 'none',
  },
  submitButton: {
    padding: '12px 20px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default Uploading;
