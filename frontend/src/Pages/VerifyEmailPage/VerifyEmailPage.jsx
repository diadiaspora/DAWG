// pages/VerifyEmail.jsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Verifying...");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const verify = async () => {
      const token = searchParams.get("token");
      if (!token) {
        setError(true);
        setMessage("Invalid or missing token.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/auth/verify-email?token=${token}`);
        const data = await res.json();

        if (res.ok) {
          setMessage(data.message || "Email verified successfully!");
        } else {
          setError(true);
          setMessage(data.message || "Verification failed.");
        }
      } catch (err) {
        console.error("Verification error:", err);
        setError(true);
        setMessage("An error occurred while verifying your email.");
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [searchParams]);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      {loading ? (
        <p>Verifying your email...</p>
      ) : (
        <p style={{ color: error ? "red" : "green" }}>{message}</p>
      )}
    </div>
  );
}
