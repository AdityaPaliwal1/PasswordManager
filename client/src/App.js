import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [passwordList, setPasswordList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/showpasswords").then((response) => {
      setPasswordList(response.data);
    });
  }, []);
  const addpassword = () => {
    axios.post("http://localhost:5000/addpasswords", {
      password: password,
      title: title,
    });
  };

  const decryptpassword = (encryption) => {
    axios
      .post("http://localhost:5000/decryptpassword", {
        password: encryption.password,
        iv: encryption.iv,
      })
      .then((response) => {
        setPasswordList(
          passwordList.map((val) => {
            return val.id == encryption.id
              ? {
                  id: val.id,
                  title: response.data,
                  passwords: val.passwords,
                  iv: val.iv,
                }
              : val;
          })
        );
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

      <div className="passwords">
        {passwordList.map((val, key) => {
          return (
            <div
              className="password"
              onClick={() => {
                decryptpassword({
                  password: val.passwords,
                  iv: val.iv,
                  id: val.id,
                });
              }}
              key={key}
            >
              <h3>{val.title}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
