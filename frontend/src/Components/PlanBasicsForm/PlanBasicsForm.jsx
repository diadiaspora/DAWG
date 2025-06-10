// src/components/PLanBasicsForm/PLanBasicsForm.jsx
import { useState } from "react";
import * as formBasicService from "../../services/formBasicService"; // Make sure this path is correct

export default function PLanBasicsForm() {
  // State variables for each input field
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [destination, setDestination] = useState("");
  const [notes, setNotes] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [submittedBasicForm, setSubmittedBasicForm] = useState(null);

  async function handleSubmit(evt) {
    evt.preventDefault(); // Prevent default form submission behavior
    try {
      // Create an object with all the form data
      const formData = {
        month,
        day,
        year,
        destination,
        notes,
      };

      // Call the service to create the new plan
      const formBasic = await formBasicService.create(formData);
      setSubmittedBasicForm(formBasic); // Save the response to display the submitted card

      // Clear all form fields after successful submission
      setMonth("");
      setDay("");
      setYear("");
      setDestination("");
      setNotes("");
      setErrorMsg(""); // Clear any previous error messages
    } catch (err) {
      console.error("Adding Plan Failed:", err); // Log the actual error for debugging
      // Provide a more specific error message based on the error if possible
      setErrorMsg(
        "Adding Plan Failed. Please check your network and try again."
      );
    }
  }

  function handleNewPlan() {
    setSubmittedBasicForm(null); // Reset the state to show the form again
    // Clear all form fields when creating a new plan
    setMonth("");
    setDay("");
    setYear("");
    setDestination("");
    setNotes("");
    setErrorMsg(""); // Clear any error messages
  }

  return (
    <>
      <h2>{submittedBasicForm ? "Plan Submitted!" : "Add New Plan"}</h2>

      {submittedBasicForm ? (
        // Display submitted plan details if submittedBasicForm is not null
        <div className="completed-card">
          <p>
            <strong>Month:</strong> {submittedBasicForm.month}
          </p>
          <p>
            <strong>Day:</strong> {submittedBasicForm.day}
          </p>
          <p>
            <strong>Year:</strong> {submittedBasicForm.year}
          </p>
          <p>
            <strong>Destination:</strong> {submittedBasicForm.destination}
          </p>
          <p>
            <strong>Notes:</strong> {submittedBasicForm.notes}
          </p>
          {/* Display creation timestamp if available */}
          {submittedBasicForm.createdAt && (
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(submittedBasicForm.createdAt).toLocaleString()}
            </p>
          )}
          <button onClick={handleNewPlan}>Create Another Plan</button>
        </div>
      ) : (
        // Display the form if no plan has been submitted
        <form onSubmit={handleSubmit}>
          <label htmlFor="month">Month:</label>
          <input
            id="month"
            type="text"
            value={month}
            onChange={(evt) => setMonth(evt.target.value)}
            required
          />

          <label htmlFor="day">Day:</label>
          <input
            id="day"
            type="text"
            value={day}
            onChange={(evt) => setDay(evt.target.value)}
            required
          />

          <label htmlFor="year">Year:</label>
          <input
            id="year"
            type="text"
            value={year}
            onChange={(evt) => setYear(evt.target.value)}
            required
          />

          <label htmlFor="destination">Destination:</label>
          <input
            id="destination"
            type="text"
            value={destination}
            onChange={(evt) => setDestination(evt.target.value)}
            required
          />

          <label htmlFor="notes">Notes:</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(evt) => setNotes(evt.target.value)}
            required
          ></textarea>

          <button type="submit">ADD PLAN</button>
        </form>
      )}

      <p className="error-message">&nbsp;{errorMsg}</p>
    </>
  );
}
// const PlanBasicsForm = (props) => {

// const [formData, setFormData] = useState({
//   month: "",
//   day: "",
//   year: "",
//   destination: "",
//   notes: "",
// });

// const handleChange = (evt) => {
//   setFormData({ ...formData, [evt.target.name]: evt.target.value });
// };

//   return (
//     <div className="divbody">
//       <aside>
//         <h3>Create a plan </h3>
//         <p>Add your Photos here</p>
//       </aside>

//       <main>Calander</main>

//       <div className="aside">
//         <div>
//           <form>
//             <label htmlFor="month"> Month </label>
//             <input
//               id="month"
//               name="month"
//               value={formData.month}
//               onChange={handleChange}
//               required
//             />
//             <label htmlFor="day"> Day </label>
//             <input
//               id="day"
//               name="day"
//               value={formData.day}
//               onChange={handleChange}
//               required
//             />
//             <label htmlFor="year"> Year </label>
//             <input
//               id="year"
//               name="year"
//               value={formData.year}
//               onChange={handleChange}
//             />
//             <label htmlFor="destination"> Destination </label>
//             <input
//               id="destination"
//               name="destination"
//               value={formData.destination}
//               onChange={handleChange}
//             />
//             <label htmlFor="notes"> Notes </label>
//             <input
//               id="notes"
//               name="notes"
//               value={formData.notes}
//               onChange={handleChange}
//             />
//             <button type="submit">Add New Pet</button>
//           </form>
//         </div>
//       </div>

//       <div className="main">
//         <div>
//           <img src="./calander.png" className="calander" alt="calander"></img>
//         </div>
//       </div>
//     </div>
//   );

// }

// export default PlanBasicsForm;
