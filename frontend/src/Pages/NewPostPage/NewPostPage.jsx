import { useState } from "react";
import * as formBasicService from "../../services/formBasicService";

export default function PLanBasicsForm() {
  const [month, setMonth] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [submittedBasicForm, setSubmittedBasicForm] = useState(null); // New state

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      // Assuming formBasicService.create expects an object with a 'month' property
      const formBasic = await formBasicService.create({ month });
      setSubmittedBasicForm(formBasic); // Save the response and show the card
      setMonth(""); // Clear the month input on successful submission
      setErrorMsg(""); // Clear any previous error messages
    } catch (err) {
      console.error("Adding Plan Failed:", err); // Log the actual error for debugging
      setErrorMsg("Adding Plan Failed"); // More descriptive error message
    }
  }

  function handleNewPlan() { // Renamed for consistency with "Plan"
    setSubmittedBasicForm(null);
    setMonth("");
    setErrorMsg("");
  }

  return (
    <>
      <h2>{submittedBasicForm ? "Plan Submitted" : "Add Plan"}</h2>

      {submittedBasicForm ? (
        <div className="completed-card">
          <p>
            <strong>Month:</strong> {submittedBasicForm.month}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(submittedBasicForm.createdAt).toLocaleString()}
          </p>
          {/* Changed to "Create Another Plan" for consistency */}
          <button onClick={handleNewPlan}>Create Another Plan</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="month">Month</label> {/* Added htmlFor for accessibility */}
          <input
            id="month" // Added id to link with label
            type="text"
            value={month} // Corrected: `value` should be `month`
            onChange={(evt) => setMonth(evt.target.value)} // Corrected: `setContent` should be `setMonth`
            required
          />
          <button type="submit">ADD PLAN</button> {/* Changed to "ADD PLAN" */}
        </form>
      )}

      <p className="error-message">&nbsp;{errorMsg}</p>
    </>
  );
}