
import PlanBasicsForm from "../../Components/PlanBasicsForm/PlanBasicsForm.jsx";
import PlanWhereForm from "../../Components/PlanWhereForm/PlanWhereForm.jsx";
import PlanFlightForm from "../../Components/PlanFlightForm/PlanFlightForm.jsx";
import PlanScheduleForm from "../../Components/PlanScheduleForm/PlanScheduleForm.jsx";
import SearchComponent from "../../Components/SearchComponent/SearchComponent.jsx";
import { useState } from "react";

import "./PlanPage.css";

export default function PlanPage() {

    return (
      <>
        <section className="plan">
          <SearchComponent />
          <PlanBasicsForm />
          <PlanWhereForm />
          <PlanFlightForm />
          <PlanScheduleForm />
          <h3> Your Documents</h3>
          <h3> Your Services</h3>
          <h3> Weather</h3>
          <h3> Community</h3>
          <h3> Marketplace</h3>
          <h3> Articles</h3>
        </section>
      </>
    );
}
