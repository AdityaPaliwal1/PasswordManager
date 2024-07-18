import "./App.css";
import { useState } from "react";
import axios from "axios";
function App() {
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");

  const addpassword = () => {
    axios.post("http://localhost:5000/addpasswords", {
      password: password,
      title: title,
    });
  };
  return (
    <div className="App">
      <div className="Addingpassword">
        <input
          type="text"
          placeholder="Enter your password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Ex. Facebook"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <button onClick={addpassword}>Add Password</button>
      </div>
    </div>
  );
}

export default App;
