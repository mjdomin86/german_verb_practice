import React, { useState } from 'react';
import axios from 'axios';

const ImportVerbs = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
    setError('');
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a CSV file.');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    try {
      await axios.post('http://localhost:8080/api/verbs/import', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('Verbs imported successfully!');
      setError('');
    } catch (err) {
      setError('Failed to import verbs.');
      setMessage('');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Import Verbs from CSV</h2>
      <form onSubmit={handleUpload}>
        <input type="file" accept=".csv" onChange={handleFileChange} className="mb-4" />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Upload</button>
      </form>
      {message && <p className="text-green-600 mt-2">{message}</p>}
      {error && <p className="text-red-600 mt-2">{error}</p>}
      <div className="mt-4 text-sm text-gray-600">
        <p><b>CSV format:</b></p>
        <p>Column A: Verb, Column B: Preposition, Column C: Case (Akkusativ/Dativ), Column D: Meaning</p>
      </div>
    </div>
  );
};

export default ImportVerbs;
