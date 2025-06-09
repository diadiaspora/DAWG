import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { getUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import PostListPage from "../PostListPage/PostListPage";
import NewPostPage from "../NewPostPage/NewPostPage";
import SignUpPage from "../SignUpPage/SignUpPage";
import LogInPage from "../LogInPage/LogInPage";
import NavBar from "../../Components/NavBar/NavBar";
import FlightInfoPage from "../FlightInfoPage/FlightInfoPage";
import DocumentPage from "../DocumentPage/DocumentPage";
import AirlineInfoPage from "../AirlineInfoPage/AirlineInfoPage";
import ServicesInfoPage from "../ServicesInfoPage/ServicesInfoPage";
import PlanPage from "../PlanPage/PlanPage";
import MarketplacePage from "../MarketplacePage/MarketplacePage.jsx";
import BlogPage from "../BlogPage/BlogPage.jsx";
import UserProfilePage from "../UserProfilePage/UserProfilePage.jsx";
import Header from "../../Components/Header/Header";

import "./App.css";

export default function App() {
  const [user, setUser] = useState(getUser());
  const location = useLocation();

  const showHeaderOn = ["/", "/flights", "/plan", "/profile"];

  const shouldShowHeader = showHeaderOn.includes(location.pathname);

  return (
    <>
      <main className="App">
        <NavBar user={user} setUser={setUser} />
        {shouldShowHeader && <Header user={user} setUser={setUser} />}
        <section id="main-section">
          {user ? (
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/posts" element={<PostListPage />} />
              <Route path="/posts/new" element={<NewPostPage />} />
              <Route path="*" element={null} />
              <Route path="/flights" element={<FlightInfoPage />} />
              <Route path="/docs" element={<DocumentPage />} />
              <Route path="/airlines" element={<AirlineInfoPage />} />
              <Route path="/services" element={<ServicesInfoPage />} />
              <Route path="/plan" element={<PlanPage />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/profile" element={<UserProfilePage />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/signup"
                element={<SignUpPage setUser={setUser} />}
              />
              <Route path="/login" element={<LogInPage setUser={setUser} />} />
              <Route path="*" element={null} />
            </Routes>
          )}
        </section>
      </main>
    </>
  );
}
