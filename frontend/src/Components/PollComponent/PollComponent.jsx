import React, { useState, useEffect } from "react";

const countries = ["Mexico City", "Berlin", "Santiago"];

const questions = [
  "How friendly are they?",
  "How mean are they?",
  "How safe did you feel?",
];

// Helper to normalize country names (e.g., "Mexico City" -> "MexicoCity")
const normalizeCountryName = (name) => name.replace(/\s+/g, "");

// Function to get initial empty results for a single country
const getInitialCountryResults = () => questions.map(() => []);

export default function PollComponent({ location }) {
  // Normalize country prop for matching
  const normalizedCountry = location ? normalizeCountryName(location) : "";

  // State to hold all poll results, loaded from localStorage
  // This state will manage results for ALL countries, keyed by their normalized names.
  const [allPollResults, setAllPollResults] = useState(() => {
    try {
      const storedResults = localStorage.getItem("pollResults");
      return storedResults ? JSON.parse(storedResults) : {};
    } catch (error) {
      console.error("Error parsing stored results from localStorage:", error);
      return {}; // Return empty object on error
    }
  });

  // State for the current country's votes (user's input)
  const [currentCountryVotes, setCurrentCountryVotes] = useState(
    Array(questions.length).fill(0)
  );

  // State to track if the user has voted for the *current* country
  const [hasVotedForCountry, setHasVotedForCountry] = useState(false);

  // Effect to manage loading/saving results from/to localStorage
  useEffect(() => {
    // Save results to localStorage whenever allPollResults changes
    try {
      localStorage.setItem("pollResults", JSON.stringify(allPollResults));
    } catch (error) {
      console.error("Error saving results to localStorage:", error);
    }
  }, [allPollResults]);

  // Effect to reset/load state when the 'country' prop changes
  useEffect(() => {
    // Reset votes for the new country
    setCurrentCountryVotes(Array(questions.length).fill(0));

    // Check if the user has already voted for this specific country
    // A simple way to track this is to save a flag in localStorage or based on existing results
    const countryData = allPollResults[normalizedCountry];
    if (countryData && countryData.every((qResults) => qResults.length > 0)) {
      // If results exist for all questions for this country, assume voted
      // This is a simplistic check; a dedicated 'hasVoted' flag per country in localStorage is better
      setHasVotedForCountry(true);
    } else {
      setHasVotedForCountry(false);
    }
  }, [normalizedCountry, allPollResults]); // Depend on normalizedCountry and allPollResults for re-evaluation

  // Get results for the currently selected country, or an empty structure if none exist
  const currentCountryResults =
    allPollResults[normalizedCountry] || getInitialCountryResults();

  // Determine if there's any poll data for the current country to display results
  const hasPollData = currentCountryResults.some((arr) => arr.length > 0);

  const handleVote = () => {
    if (!normalizedCountry) return; // Prevent voting if no country is selected/valid

    const updatedAllPollResults = { ...allPollResults };

    // Ensure the country exists in the results object, initialize if not
    if (!updatedAllPollResults[normalizedCountry]) {
      updatedAllPollResults[normalizedCountry] = getInitialCountryResults();
    }

    // Update the results for the specific questions based on currentCountryVotes
    updatedAllPollResults[normalizedCountry] = updatedAllPollResults[
      normalizedCountry
    ].map((arr, idx) => {
      if (currentCountryVotes[idx] > 0) {
        // Only add if a valid vote (non-zero)
        return [...arr, currentCountryVotes[idx]];
      }
      return arr;
    });

    setAllPollResults(updatedAllPollResults); // Update the main state
    setHasVotedForCountry(true); // Mark as voted for the current country
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
