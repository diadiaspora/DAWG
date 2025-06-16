import { useState, useEffect } from 'react';
import * as planService from '../../services/planService';

export default function ReceiptPage() {
    const [plans, setPlans] = useState([]);

    useEffect(() => {
      async function fetchPlans() {
        const plans = await planService.index();
        setPlans(plans);
      }
      fetchPlans();
    }, []);
  
    return (
      <>
        <h1>Your Recipt</h1>
        <img src={plans.receipt} alt="Post Image" />
      </>
    );
    

 
}
