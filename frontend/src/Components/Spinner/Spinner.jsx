// src/Components/Spinner/Spinner.jsx
export default function Spinner() {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <div className="loader"></div>
      <style>{`
          .loader {
            border: 6px solid #f3f3f3;
            border-top: 6px solid #3498db;
            border-radius: 50%;
            width: 36px;
            height: 36px;
            animation: spin 1s linear infinite;
            margin: 0 auto;
          }
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        `}</style>
    </div>
  );
}
