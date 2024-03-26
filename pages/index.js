import React, { useState } from 'react';
import axios from 'axios';

const IndexPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

 const handleSubmit = async () => {
    try {
        const response = await axios.post('https://ts73oepboe.execute-api.eu-central-1.amazonaws.com/polly', { text: inputValue });

        const audioData = atob(response.data);
        // Convertir les données en tableau d'octets
        const byteArray = new Uint8Array(audioData.length);
        for (let i = 0; i < audioData.length; i++) {
            byteArray[i] = audioData.charCodeAt(i);
        }

        // Créer une URL pour le fichier audio
        const audioUrl = URL.createObjectURL(new Blob([byteArray], { type: 'audio/mpeg' }));

        // Jouer l'audio
        const audio = new Audio(audioUrl);
        audio.play();
    } catch (error) {
        setError(error);
    }
};


const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="container">
      <h1 className="mt-5">Ecrivez ce que vous voulez</h1>
      <p>L'IA vous lira le texte, validez avec la touche ↩️</p>
      <div className="input-group mb-3">
        <textarea className="form-control" placeholder="Saisissez vos données" value={inputValue} onChange={handleChange} onKeyDown={handleKeyDown} />
      </div>
      {responseData && (
        <div className="alert alert-info" role="alert">
          Ce que vous dites est {JSON.stringify(responseData, null, 2)}
        </div>
      )}
      {error && <div className="alert alert-danger" role="alert">Error: {error.message}</div>}
    </div>
  );
};

export default IndexPage;
