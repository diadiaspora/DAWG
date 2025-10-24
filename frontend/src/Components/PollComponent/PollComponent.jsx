import React, { useState, useEffect } from "react";

const countries = ["Mexico City", "Berlin", "Santiago"];

const questions = [
  "How friendly are they?",
  "How mean are they?",
  "How safe did you feel?",
];


const normalizeCountryName = (name) => name.replace(/\s+/g, "");

const getInitialCountryResults = () => questions.map(() => []);

export default function PollComponent({ location }) {

  const normalizedCountry = location ? normalizeCountryName(location) : "";


  const [allPollResults, setAllPollResults] = useState(() => {
    try {
      const storedResults = localStorage.getItem("pollResults");
      return storedResults ? JSON.parse(storedResults) : {};
    } catch (error) {
      console.error("Error parsing stored results from localStorage:", error);
      return {}; 
    }
  });

  const [currentCountryVotes, setCurrentCountryVotes] = useState(
    Array(questions.length).fill(0)
  );

  const [hasVotedForCountry, setHasVotedForCountry] = useState(false);

 
  useEffect(() => {

    try {
      localStorage.setItem("pollResults", JSON.stringify(allPollResults));
    } catch (error) {
      console.error("Error saving results to localStorage:", error);
    }
  }, [allPollResults]);


  useEffect(() => {
 
    setCurrentCountryVotes(Array(questions.length).fill(0));

  
    const countryData = allPollResults[normalizedCountry];
    if (countryData && countryData.every((qResults) => qResults.length > 0)) {

      setHasVotedForCountry(true);
    } else {
      setHasVotedForCountry(false);
    }
  }, [normalizedCountry, allPollResults]); 


  const currentCountryResults =
    allPollResults[normalizedCountry] || getInitialCountryResults();


  const hasPollData = currentCountryResults.some((arr) => arr.length > 0);

  const handleVote = () => {
    if (!normalizedCountry) return; 

    const updatedAllPollResults = { ...allPollResults };


    if (!updatedAllPollResults[normalizedCountry]) {
      updatedAllPollResults[normalizedCountry] = getInitialCountryResults();
    }

    updatedAllPollResults[normalizedCountry] = updatedAllPollResults[
      normalizedCountry
    ].map((arr, idx) => {
      if (currentCountryVotes[idx] > 0) {
      
        return [...arr, currentCountryVotes[idx]];
      }
      return arr;
    });

    setAllPollResults(updatedAllPollResults); 
    setHasVotedForCountry(true); 
  };

  const handleInput = (i, value) => {
    const updated = [...currentCountryVotes];
    updated[i] = parseInt(value);
    setCurrentCountryVotes(updated);
  };

  const average = (arr) => {
    if (!arr.length) return "No votes yet";
    const sum = arr.reduce((a, b) => a + b, 0);
    return (sum / arr.length).toFixed(1);
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h2>Country Poll: {location}</h2>

      {hasPollData && (
        <div>
          <h3>Results for {location}</h3>
          {questions.map((q, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <strong>{q}</strong>
              <div>Avg score: {average(currentCountryResults[i])} / 5</div>
            </div>
          ))}

          <hr style={{ margin: "30px 0" }} />
        </div>
      )}

      {!hasVotedForCountry && (
        <>
          <h3>{hasPollData ? "Your Vote" : "Be the first to vote!"}</h3>
          {questions.map((q, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <label>
                {q}
                <br />
                <select
                  value={currentCountryVotes[i]}
                  onChange={(e) => handleInput(i, e.target.value)}
                  style={{ padding: 4, fontSize: 16 }}
                >
                  <option value={0}>Select</option>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          ))}

          <button
            type="button"
            onClick={handleVote}
            style={{
              padding: 10,
              fontSize: 16,
              background: "#1E3769",
              color: "white",
              border: "none",
              borderRadius: 6,
            }}
          >
            Submit Vote
          </button>
        </>
      )}

      {hasVotedForCountry && (
        <p style={{ marginTop: 20 }}>Thanks for voting!</p>
      )}
    </div>
  );
}
