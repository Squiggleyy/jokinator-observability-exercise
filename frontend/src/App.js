import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function HomePage() {
  const [message, setMessage] = useState("Luke's very simple Web app...");
  const [joke, setJoke] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/")
      .then(response => response.text())
      .then(data => setMessage(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

//   const fetchJoke = async () => {
//     try {
//       const response = await fetch("https://official-joke-api.appspot.com/random_joke");
//       const data = await response.json();
//       setJoke(`${data.setup} - ${data.punchline}`);
//     } catch (error) {
//       console.error("Error fetching joke:", error);
//       setJoke("Failed to load joke.");
//     }
//   };

const fetchJoke = async () => {
    console.log("fetchJoke frontend function called!")
    try {
      //const response = await fetch("http://localhost:8080/api/joke");
      const response = await fetch("http://192.168.49.2:31266/api/joke");
      const data = await response.json();
      console.log("Joke API Response:", data);  // Debugging output
  
      if (data.setup && data.punchline) {
        setJoke(`${data.setup} - ${data.punchline}`);
      } else {
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