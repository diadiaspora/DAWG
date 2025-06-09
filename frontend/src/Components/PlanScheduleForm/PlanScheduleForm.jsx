import { useState } from "react";

const PlanScheduleForm = (props) => {
  const [formData, setFormData] = useState({
    date: "",
    plan: "",
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  return (
    <div>
      <div>
        <h3> Monday</h3>
        <form>
          <label htmlFor="date"> Date </label>
          <input
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <label htmlFor="plan"> Plan </label>
          <input
            id="plan"
            name="plan"
            value={formData.plan}
            onChange={handleChange}
            required
          />

          <button type="submit">edit</button>
        </form>
      </div>

      <div>
        <h3> Monday</h3>
        <form>
          <label htmlFor="date"> Date </label>
          <input
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <label htmlFor="plan"> Plan </label>
          <input
            id="plan"
            name="plan"
            value={formData.plan}
            onChange={handleChange}
            required
          />

          <button type="submit">edit</button>
        </form>
      </div>

      <div>
        <h3> Monday</h3>
        <form>
          <label htmlFor="date"> Date </label>
          <input
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <label htmlFor="plan"> Plan </label>
          <input
            id="plan"
            name="plan"
            value={formData.plan}
            onChange={handleChange}
            required
          />

          <button type="submit">edit</button>
        </form>
      </div>
    </div>
  );
};

export default PlanScheduleForm;
