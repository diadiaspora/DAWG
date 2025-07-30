// src/Pages/AllHootsPage/AllHootsPage.jsx

import { useEffect, useState, useRef, useCallback } from "react";
import * as hootService from "../../services/hootService";
import HootCard from "../../Components/HootCard/HootCard"; // Make this reusable
import Spinner from "../../Components/Spinner/Spinner"; // Optional loading indicator

export default function AllHootsPage({ user }) {
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
        setHoots((prev) => [...prev, ...data]);
        setHasMore(more);
      } catch (err) {
        console.error("Failed to load hoots", err);
      }
      setLoading(false);
    };

    fetchHoots();
  }, [page]);

  return (
    <main style={{ maxWidth: "720px", margin: "100px auto" }}>
      <h2 style={{ marginBottom: "24px" }}>All Hoots</h2>
      {hoots.map((hoot, index) => {
        if (index === hoots.length - 1) {
          return (
            <div ref={lastHootRef} key={hoot._id}>
              <HootCard hoot={hoot} user={user} />
            </div>
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
  );
}
