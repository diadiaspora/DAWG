import { useState, useEffect } from "react";
import * as postService from "../../services/pllanService";

export default function ShowPlanPage() {
  


  return (
    <>
      <h1>The Plan</h1>
      <div>
        <div>
          <h4>
            {formData.month} {formData.day}, {formData.year}
          </h4>
          <p>
            <strong>Destination:</strong> {formData.destination}
          </p>
          <p>
            <strong>Notes:</strong> {formData.notes}
          </p>
          <button onClick={handleEditClick}>Update</button>
        </div>
      </div>
      <planWhereForm />
      <planFlightForm />
    </>
  );
}
