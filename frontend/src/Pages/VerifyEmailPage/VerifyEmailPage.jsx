import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUser } from "../../services/authService"; 

export default function VerifyEmailPage({ setUser }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      const token = searchParams.get("token");
      if (!token) {
        toast.error("Invalid or missing token.");
        return;
      }

      try {
        const res = await fetch(`/api/auth/verify-email?token=${token}`);
        const data = await res.json();

        if (res.ok) {
          if (data.token) {
            localStorage.setItem("token", data.token);
            setUser(getUser()); 
          }
          toast.success("Welcome! You're now logged in.");
          navigate("/"); 
        } else {
          toast.error(data.message || "Verification failed.");
        }
      } catch (err) {
        console.error(err);
        toast.error("Verification failed.");
      }
    };

    verify();
  }, [searchParams, navigate, setUser]);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <p>Verifying your email...</p>
    </div>
  );
}
