import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { getUser } from "../../services/authService";
import * as profileService from "../../services/profileService";

import { useNavigate } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import PostListPage from "../PostListPage/PostListPage";
import NewPostPage from "../NewPostPage/NewPostPage";
import SignUpPage from "../SignUpPage/SignUpPage";
import LogInPage from "../LogInPage/LogInPage";
import NavBar from "../../Components/NavBar/NavBar";
import FlightInfoPage from "../FlightInfoPage/FlightInfoPage";
import DocumentInfoPage from "../DocumentInfoPage/DocumentInfoPage.jsx";
import AirlineInfoPage from "../AirlineInfoPage/AirlineInfoPage";
import ServicesInfoPage from "../ServicesInfoPage/ServicesInfoPage";
import PlanPage from "../PlanPage/PlanPage";
// import MarketplacePage from "../MarketplacePage/MarketplacePage.jsx";
import NewBlogPage from "../NewBlogPage/NewBlogPage.jsx";
import UserProfilePage from "../UserProfilePage/UserProfilePage.jsx";
import ShowPlanPage from "../ShowPlanPage/ShowPlanPage.jsx";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import BlogList from "../../Components/BlogList/BlogList";
import ViewBlogsPage from "../ViewBlogsPage/ViewBlogsPage.jsx";
import BlogDetail from "../../Components/BlogDetail/BlogDetail.jsx";
import PlanBasicUpdate from "../../Components/PlanBasicUpdate/PlanBasicUpdate.jsx";

import "./App.css";

export default function App() {
  const [user, setUser] = useState(getUser());
  const [profile, setProfile] = useState(null);
  const location = useLocation();

  // const showHeaderOn = [
  //   "/",
  //   "/flights",
  //   "/plans",
  //   "/profile",
  //   "/plans",
  //   "/plans/:id"
  // ];

  // const shouldShowHeader = showHeaderOn.includes(location.pathname);

  useEffect(() => {
    async function fetchProfile() {
      if (user) {
        try {
          const profiles = await profileService.index();

          const userProfile = profiles.find((p) => p.user === user._id);
          if (userProfile) {
            setProfile(userProfile);
          }
        } catch (err) {
          console.error("Failed to fetch profile", err);
        }
      }
    }
    fetchProfile();
  }, [user]);

  return (
    <>
      <main className="App">
        <NavBar user={user} setUser={setUser} />

        <section id="main-section">
          {user ? (
            <Routes>
              <Route
                path="/profiles"
                element={
                  <UserProfilePage
                    user={user}
                    profile={profile}
                    setProfile={setProfile}
                  />
                }
              />
              <Route path="/" element={<HomePage />} />
              <Route path="/posts" element={<PostListPage />} />
              <Route path="/posts/new" element={<NewPostPage />} />
              <Route path="*" element={null} />
              <Route path="/flights" element={<FlightInfoPage />} />
              <Route
                path="/documents/:from/:to"
                element={<DocumentInfoPage />}
              />
              <Route
                path="/airlines/:airline/:location"
                element={<AirlineInfoPage />}
              />
              <Route
                path="/services/:service/:location"
                element={<ServicesInfoPage />}
              />
              <Route path="/plans" element={<PlanPage />} />
              {/* <Route path="/marketplace" element={<MarketplacePage />} /> */}
              <Route path="/write" element={<NewBlogPage />} />
              <Route path="/plans/:id" element={<ShowPlanPage />} />
              <Route path="/blogs" element={<ViewBlogsPage />} />
              <Route
                path="/profiles"
                element={<UserProfilePage user={user} setUser={setUser} />}
              />
              <Route path="/blogs/:id" element={<BlogDetail />} />
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
        <Footer />
      </main>
    </>
  );
}
