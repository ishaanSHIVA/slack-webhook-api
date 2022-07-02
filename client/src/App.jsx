import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [text, setText] = useState("random text");

  const sendMessagetoSlack = async () => {
    console.log("start");
    const response = await axios.post("http://localhost:8000/", { text });
    if (!response) {
      console.error("Problem");
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    sendMessagetoSlack();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label for="exampleInputEmail1" className="form-label">
          Text to Send to Slack
        </label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default App;
