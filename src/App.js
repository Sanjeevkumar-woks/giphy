import { useEffect, useState } from "react";
import "./App.css";
import Feed from "./Feed";
import MessageSender from "./MessageSender";

export const URL = "https://62d0dbb8d9bf9f17058e78af.mockapi.io";

function App() {
  const [posts, setPosts] = useState([]);

  const getposts = () => {
    fetch(`${URL}/posts`, { method: "GET" })
      .then((data) => data.json())
      .then((x) => setPosts(x));
  };
  useEffect(getposts, []);
  return (
    <div className="App">
      <header className="App-header">
        <MessageSender getposts={getposts} />
        <Feed posts={posts} />
      </header>
    </div>
  );
}

export default App;
