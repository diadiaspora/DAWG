import * as hootService from "../../services/hootService";
import { useEffect, useState, useRef, useCallback } from "react";
import Header from "../../Components/Header/Header.jsx";
import SearchComponent from "../../Components/SearchComponent/SearchComponent.jsx";
import HootCard from "../../Components/HootCard/HootCard";
import Spinner from "../../Components/Spinner/Spinner";
import HootForm from "../../Components/HootForm/HootForm";
import "./HootInfinatePage.css";

export default function HootInfinatePage({ user, setUser }) {
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
    setShowForm(false);
    return createdHoot;
  };

  return (
    <>
      <section className="home">
      
        <div>
          <div style={{ marginLeft: "-3vw" }}>
            <Header user={user} setUser={setUser} />
          </div>
          <SearchComponent />
        </div>

        <div className="wide">
          <main className="mainly">
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
              <p style={{ textAlign: "center", color: "#888" }}>
                No more hoots.
              </p>
            )}
          </main>
          <div className="formerly">
            <HootForm handleAddHoot={handleAddHoot} />
          </div>
          </div>
        
      </section>
    </>
  );
}
