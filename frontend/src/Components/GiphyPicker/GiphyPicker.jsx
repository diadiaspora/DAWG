import { useState } from "react";

const GIPHY_API_KEY = "EA7ScWRmcUUO6FmUfpw2whDLnjNL0EmQ";

export default function GiphyPicker({ onSelect }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [gifs, setGifs] = useState([]);
  const [selectedGif, setSelectedGif] = useState(null);

  const handleSearch = async () => {
    const res = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${searchTerm}&limit=20`
    );
    const data = await res.json();
    setGifs(data.data);
  };

  const handleSelect = (gif) => {
    setSelectedGif(gif.id);
    onSelect(gif.images.original.url);
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
          flexDirection: "row",
          gap: "8px",
          marginTop: "10px",
          maxHeight: "200px",
          overflowX: "auto",
          overflowY: "hidden",
          paddingBottom: "8px",
        }}
      >
        {gifs.map((gif) => (
          <img
            key={gif.id}
            src={gif.images.fixed_height.url}
            alt="gif"
            style={{
              height: "150px",
              borderRadius: "6px",
              cursor: "pointer",
              flexShrink: 0,
              border:
                selectedGif === gif.id
                  ? "4px solid #1E3769"
                  : "2px solid transparent",
              boxShadow:
                selectedGif === gif.id
                  ? "0 0 8px rgba(30,55,105,0.6)"
                  : "0 0 4px rgba(0,0,0,0.1)",
            }}
            onClick={() => handleSelect(gif)}
          />
        ))}
      </div>
    </div>
  );
}
