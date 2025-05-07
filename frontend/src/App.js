import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function HomePage() {
  const [message, setMessage] = useState("Jokinator 5000");
  const [joke, setJoke] = useState("");

  //const apiUrl = process.env.REACT_APP_API_URL;
  //const apiUrl = window.REACT_APP_API_URL;
  const apiUrl = '/api/joke'
  console.log("apiUrl: ", apiUrl)

  useEffect(() => {
    fetch(apiUrl) // NEED TO UPDATE TO BE DYNAMIC !!!
      .then(response => response.text())
      .then(data => setJoke(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

const fetchJoke = async () => {
    console.log("fetchJoke frontend function called! API URL: ", apiUrl)

    try {
      //const response = await fetch("http://localhost:8080/api/joke");
      //const response = await fetch('${apiUrl}/joke'); // NEED TO UPDATE TO BE DYNAMIC !!!
      const response = await fetch('/api/joke');
      const data = await response.json();
      console.log("Joke API Response:", data);
  
      if (data.setup && data.punchline) {
        setJoke(`${data.setup} - ${data.punchline}`);
      } else {
        console.log("data.setup: ", data.setup)
        console.log("data.punchline: ", data.punchline)
        setJoke("Unexpected joke format received.");
      }
    } catch (error) {
      console.error("Error fetching joke:", error);
      setJoke("Failed to load joke");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{message}</h1>
      <button onClick={fetchJoke}>Get a Joke</button>
      <p>{joke}</p>
      <button onClick={() => window.location.href = "/about"}>Go to About Page</button>
    </div>
  );
}

function AboutPage() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>About Page</h1>
      <p>This is a new page!</p>
      <Link to="/">Go Back</Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

export default App;