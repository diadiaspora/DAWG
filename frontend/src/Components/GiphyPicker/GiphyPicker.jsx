// src/components/GiphyPicker.jsx
import { useState } from "react";

const GIPHY_API_KEY = "EA7ScWRmcUUO6FmUfpw2whDLnjNL0EmQ"; // replace with your real API key

export default function GiphyPicker({ onSelect }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [gifs, setGifs] = useState([]);

  const handleSearch = async () => {
    const res = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${searchTerm}&limit=9`
    );
    const data = await res.json();
    setGifs(data.data);
  };

  return (
    <div style={{ marginTop: "12px" }}>
      <label>Search GIFs</label>
      <div style={{ display: "flex", gap: "8px" }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Type a keyword"
          style={{ flex: 1 }}
        />
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginTop: "10px",
        }}
      >
        {gifs.map((gif) => (
          <img
            key={gif.id}
            src={gif.images.fixed_height_small.url}
            alt="gif"
            style={{ width: "100px", cursor: "pointer", borderRadius: "6px" }}
            onClick={() => onSelect(gif.images.original.url)}
          />
        ))}
      </div>
    </div>
  );
}
