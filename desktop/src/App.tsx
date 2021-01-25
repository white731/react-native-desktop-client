import React, { useState, useEffect } from 'react';
import axios from 'axios';
function App() {
  const [things, setThings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      getThings();
    }, 2000);
  }, []);
  
  const getThings = async () => {
    try {
      let res = await axios.get('http://localhost:3001/api/things');
      setThings(res.data);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError('Error Occured');
      setLoading(false);
    }
  };
  const renderThings = () => {
    return things.map((thing) => {
      return (
        <div>
          <h3>{thing.name}</h3>
          <p>likes: {thing.likes}</p>
        </div>
      );
    });
  };
  const renderContent = () => {
    if (loading) return <p>loading</p>;
    if (error) return <p>error occured</p>;
    return renderThings();
  };
  return <div className="App">{renderContent()}</div>;
}
export default App;