import "./HootForm.css";
import GiphyPicker from "../GiphyPicker/GiphyPicker"; 
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HootForm = (props) => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    category: "General",
    gifUrl: "", 
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    console.log("formData", formData);

    try {
      const createdHoot = await props.handleAddHoot(formData);
      setFormData({
        title: "",
        text: "",
        category: "General",
        gifUrl: "",
      });

      requestAnimationFrame(() => {
        navigate(`/hoots/${createdHoot._id}`);
      });
    } catch (err) {
      console.error("Error submitting hoot:", err);
    }
  };

  return (
    <main>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "320px",
          backgroundColor: "#1e37691f",
          borderRadius: "7px",
          padding: "20px",
          height: "46vw",
        }}
      >
        <p style={{ marginBottom: "0px", marginTop: "0px" }}>Create a Post</p>

        <label htmlFor="title-input">Title</label>
        <input
          required
          type="text"
          name="title"
          id="title-input"
          value={formData.title}
          onChange={handleChange}
          className="custom-input"
        />

        <label htmlFor="text-input">Text</label>
        <textarea
          required
          name="text"
          id="text-input"
          value={formData.text}
          onChange={handleChange}
          className="custom-input"
        />

        <label htmlFor="category-input">Category</label>
        <select
          required
          name="category"
          id="category-input"
          value={formData.category}
          onChange={handleChange}
          className="custom-input"
        >
          <option value="General">General</option>
          <option value="Airlines">Airlines</option>
          <option value="Argentina">Argentina</option>
          <option value="Australia">Australia</option>
          <option value="Bali">Bali</option>
          <option value="Berlin">Berlin</option>
          <option value="Brazil">Brazil</option>
          <option value="Canada">Canada</option>
          <option value="Chile">Chile</option>
          <option value="Colombia">Colombia</option>
          <option value="Costa Rica">Costa Rica</option>
          <option value="Egypt">Egypt</option>
          <option value="France">France</option>
          <option value="Greece">Greece</option>
          <option value="Guatemala">Guatemala</option>
          <option value="India">India</option>
          <option value="Italy">Italy</option>
          <option value="Mexico">Mexico</option>
          <option value="New Zealand">New Zealand</option>
          <option value="Peru">Peru</option>
          <option value="Philippines">Philippines</option>
          <option value="South Africa">South Africa</option>
          <option value="Spain">Spain</option>
          <option value="Thailand">Thailand</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="USA">USA</option>
          <option value="LGBTQ">LGBTQ</option>
          <option value="BIPOC">BIPOC</option>
        </select>

        <GiphyPicker
          onSelect={(url) => setFormData({ ...formData, gifUrl: url })}
        />

        {/* {formData.gifUrl && (
          <div style={{ marginTop: "12px" }}>
            <img
              src={formData.gifUrl}
              alt="Selected GIF"
              style={{
                maxWidth: "100%",
                borderRadius: "6px",
                boxShadow: "0 0 6px rgba(0,0,0,0.15)",
              }}
            />
          </div>
        )} */}

        <button
          type="submit"
          style={{
            backgroundColor: "#1E3769",
            height: "44px",
            borderWidth: "0px",
            color: "#fff",
            borderRadius: "6px",
            marginTop: "16px",
          }}
        >
          SUBMIT
        </button>
      </form>
    </main>
  );
};

export default HootForm;
