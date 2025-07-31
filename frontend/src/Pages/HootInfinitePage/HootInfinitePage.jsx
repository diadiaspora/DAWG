import * as hootService from "../../services/hootService";
import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegComment } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaHeart } from "react-icons/fa6";

import HootCard from "../../Components/HootCard/HootCard"; // Make this reusable
import Spinner from "../../Components/Spinner/Spinner";
import HootForm from "../../Components/HootForm/HootForm"; // Optional loading indicator

export default function HootInfinatePage({ user,  setUser }) {
  const [hoots, setHoots] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

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

  return (
    <div style={{ display: "flex", width: "1012px" }}>
      <main
        style={{ maxWidth: "662px", marginLeft: "42px", marginRight: "42px", marginTop: "100px" }}
      >
        {/* <h2 style={{ marginBottom: "24px" }}>All Hoots</h2> */}
        {hoots.map((hoot, index) => {
          if (index === hoots.length - 1) {
            return (
              <HootCard
                hoot={hoot}
                user={user}
                setUser={setUser}
                ref={lastHootRef}
                key={hoot._id}
              />
            );
          } else {
            return <HootCard key={hoot._id} hoot={hoot} user={user} />;
          }
        })}
        {loading && <Spinner />}
        {!hasMore && (
          <p style={{ textAlign: "center", color: "#888" }}>No more hoots.</p>
        )}
      </main>
      <div style={{marginTop: "100px"}}> <HootForm /></div>
    </div>
  );
}
