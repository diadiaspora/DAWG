// VerifyPage.jsx
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function VerifyPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.get("verified") === "true") {
      alert("Your account has been verified! Please log in.");
      navigate("/login");
    }
  }, []);

  return <div>Verifying...</div>;
}
