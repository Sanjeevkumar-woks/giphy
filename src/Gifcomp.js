import { Gif, Grid } from "@giphy/react-components";
import React, { useEffect, useState } from "react";
import "./GifComp.css";

export default function GifComp() {
  const [search, setSearch] = useState("");
  const [gif, setGif] = useState([]);
  const [selectedGif, setSelectedGif] = useState({});

  const URL = `https://api.giphy.com/v1/gifs/search?api_key=HJW0NzhZ2BeNuXFLN3QDIiDWb0NcaEtB&q=${
    search ? search : "love"
  }&limit=25&offset=0&rating=g&lang=en`;
  const getGif = () => {
    fetch(`${URL}`, { method: "GET" })
      .then((data) => data.json())
      .then((x) => setGif(x.data));
  };
  useEffect(getGif, []);
  return (
    <div>
      <form>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="messageSender_input"
          placeholder={`Search Gif.......`}
        />
      </form>
      <button onClick={getGif}>Search</button>
      <div className="gif-display">
        {gif
          ? gif.map((gifi, index) => (
              <div
                className="gif"
                key={index}
                onClick={() => setSelectedGif(gifi)}
              >
                <Gif
                  gif={gifi}
                  width={100}
                  onGifClick={() => setSelectedGif(gifi)}
                />
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}
