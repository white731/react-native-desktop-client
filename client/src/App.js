import './App.css';
import {useState, useEffect} from "react"
import axios from "axios"

function App() {
  const [things, setThings] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] =useState(true)


  useEffect(()=>{
    getThings()
  },[])

  const getThings = async () =>{
    try {
      let res = await axios.get("http://localhost:3001/api/things")
      setThings(res.data)
      setLoading(false)
      setError(null)
    } catch (error) {
      setError(true)
    }
  }

  const renderThings = () => {
    return things.map((x)=>{
      return (
        <div>
          <h3>{x.name}</h3>
          <p>{x.likes}</p>
        </div>
      )
    })
  }

  const renderContent = () => {
  if (loading) {return <p>Loading</p>}
  if (error) {return <p>Loading</p>}
  return renderThings()
  }

  return (
    <div className="App">
      {renderContent()}
    </div>
  );
}

export default App;
