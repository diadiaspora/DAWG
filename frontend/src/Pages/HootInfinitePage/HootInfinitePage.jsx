import * as hootService from "../../services/hootService";
import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegComment } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaHeart } from "react-icons/fa6";
import "./HootInfinatePage.css";

import HootCard from "../../Components/HootCard/HootCard"; // Make this reusable
import Spinner from "../../Components/Spinner/Spinner";
import HootForm from "../../Components/HootForm/HootForm"; // Optional loading indicator

export default function HootInfinatePage({ user,  setUser }) {
  const [hoots, setHoots] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const observer = useRef();

  const lastHootRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    const fetchHoots = async () => {
      setLoading(true);
      try {
        const { data, hasMore: more } = await hootService.getPaginated(page);
        setHoots((prev) => {
          const newHootIds = new Set(prev.map((h) => h._id));
          const deduped = data.filter((h) => !newHootIds.has(h._id));
          return [...prev, ...deduped];
        });
        setHasMore(more);
      } catch (err) {
        console.error("Failed to load hoots", err);
      }
      setLoading(false);
    };

    fetchHoots();
  }, [page]);

  const handleAddHoot = async (formData) => {

    const createdHoot = await hootService.create(formData);
    setHoots((prev) => [createdHoot, ...prev]);
    setShowForm(false); // Hide form after submit
    return createdHoot;
  };

  return (
    <div className="wide">
      <div className="mobile-create-rapper">
        <div
          className="mobile-text-create"
          style={{ cursor: "pointer" }}
          onClick={() => setShowForm((prev) => !prev)}
        >
          <h2 style={{ paddingTop: "20px", paddingLeft: "20px" }}>
            Create a Hoot
          </h2>
        </div>
        {showForm && (
          <div className="hootystyle">
            <HootForm handleAddHoot={handleAddHoot} />
          </div>
        )}
      </div>
      <main className="mainly">
        {/* <h2 style={{ marginBottom: "24px" }}>All Hoots</h2> */}
        {hoots.map((hoot, index) => {
          const isLast = index === hoots.length - 1;
          return (
            <div key={hoot._id} style={{ marginBottom: "42px" }}>
              <HootCard
                hoot={hoot}
                user={user}
                setUser={setUser}
                ref={isLast ? lastHootRef : null}
              />
            </div>
          );
        })}

        {loading && <Spinner />}
        {!hasMore && (
          <p style={{ textAlign: "center", color: "#888" }}>No more hoots.</p>
        )}
      </main>
      <div className="formerly">
        <HootForm />
      </div>
    </div>
  );
}
