import { useState, useEffect } from "react";
import * as postService from "../../services/postService";
import { NavLink } from "react-router-dom";
import Header from "../../Components/Header/Header.jsx";
import SearchComponent from "../../Components/SearchComponent/SearchComponent.jsx";
import HootFeature from "../../Components/HootFeature/HootFeature";
import HootForm from "../../Components/HootForm/HootForm";
import HootList from "../../Components/HootList/HootList";
import * as hootService from "../../services/hootService";
import "./PostListPage.css";

export default function PostListPage(props) {
  const { user, setUser, hoots } = props;
  
    const handleAddHoot = async (newHootData) => {
      const createdHoot = await hootService.create(newHootData);
      console.log("New hoot created:", createdHoot);
      navigate("/"); // or refresh the list, or update props.hoots
    };
  
  return (
    <>
      <div>
        <div className="top">
          {/* <Header user={user} setUser={setUser} />
          <SearchComponent /> */}
        </div>
        <HootFeature hoots={hoots} user={user} setHoots={props.setHoots} />
        <HootList
          user={user}
          setUser={setUser}
          hoots={hoots}
          handleAddHoot={handleAddHoot}
        />
      </div>
    </>
  );
}
