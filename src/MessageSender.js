import React, { useState } from "react";
import "./MessageSender.css";
import ReactGiphySearchbox from "react-giphy-searchbox";
import Avatar from "@mui/material/Avatar";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GifBoxIcon from "@mui/icons-material/GifBox";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { Button } from "@mui/material";
import { URL } from "./App";
import { Gif } from "@giphy/react-components";

function MessageSender({ getposts }) {
  const [giphy, setGiphy] = useState("");
  const [showgif, SetShowgif] = useState(false);
  const [input, setInput] = useState("");
  const [user, setUser] = useState("sanjeev");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e) => {
    var today = new Date();

    var date =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();

    e.preventDefault();
    let newPost = {
      profilePic:
        "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-674010.jpg&fm=jpg",
      image: imageUrl,
      gif: giphy,
      username: "sanjeev",
      timestamp: date,
      message: input,
    };
    console.log(newPost);
    fetch(`${URL}/posts`, {
      method: "POST",
      body: JSON.stringify(newPost),
      headers: { "Content-Type": "application/json" },
    })
      .then((post) => post.json())
      .then(getposts)
      .catch((e) => console.log(e));

    setInput("");
    setImageUrl("");
    setGiphy("");
  };

  return (
    <div className="messageSender">
      <div className="messageSender_top">
        <Avatar
          src={
            "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-674010.jpg&fm=jpg"
          }
        />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="messageSender_input"
            placeholder={`What's on your mind, ${user}?`}
          />

          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Image URL (Optioanl)"
          />
        </form>
      </div>

      {giphy ? (
        <div style={{ marginLeft: "400px" }}>
          {" "}
          <Gif gif={giphy} width={500} />{" "}
        </div>
      ) : (
        ""
      )}

      <div style={{ display: showgif ? "" : "none", marginLeft: "400px" }}>
        <ReactGiphySearchbox
          apiKey="HJW0NzhZ2BeNuXFLN3QDIiDWb0NcaEtB"
          onSelect={(item) => {
            setGiphy(item);
            SetShowgif(false);
          }}
          masonryConfig={[
            { columns: 2, imageWidth: 110, gutter: 5 },
            { mq: "700px", columns: 3, imageWidth: 120, gutter: 5 },
          ]}
        />
      </div>
      <div className="messageSender_bottom">
        <div className="messageSender_option">
          <PersonAddAlt1Icon style={{ color: "blue" }} />
          <h3>Tag Friends</h3>
        </div>

        <div className="messageSender_option">
          <LocationOnIcon style={{ color: "red" }} />
          <h3>Check in</h3>
        </div>
      </div>
      <div className="messageSender_bottom">
        <Button
          className="messageSender_option"
          onClick={() => SetShowgif(!showgif)}
        >
          <GifBoxIcon style={{ color: "orange" }} />
          <h3>GIF</h3>
        </Button>
        <Button className="messageSender_option">
          <InsertEmoticonIcon style={{ color: "orange" }} />
          Feeling/Activity
        </Button>
      </div>
      <Button variant="contained" onClick={handleSubmit}>
        Post
      </Button>
    </div>
  );
}

export default MessageSender;
