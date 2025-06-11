import { useState} from "react";

const UserInfoForm = (props) => {
  const [formData, setFormData] = useState({
    bio: "",
    plan: "",
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  return (
    <div>
      <div>
        <h3> |username| and |petname| </h3>
        <form>
          <label htmlFor="bio"> Bio </label>
          <input
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            required
          />

          <button type="submit">edit</button>
        </form>
      </div>
    </div>
  );
};

export default UserInfoForm;
