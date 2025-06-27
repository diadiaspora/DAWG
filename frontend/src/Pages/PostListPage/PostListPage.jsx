import { useState, useEffect } from "react";
import * as postService from "../../services/postService";
import { NavLink } from "react-router-dom";

import HootForm from "../../Components/HootForm/HootForm";
import HootList from "../../Components/HootList/HootList";
import * as hootService from "../../services/hootService";

export default function PostListPage(props) {
  const { user, setUser, hoots } = props;
  
    const handleAddHoot = async (newHootData) => {
      const createdHoot = await hootService.create(newHootData);
      console.log("New hoot created:", createdHoot);
      navigate("/"); // or refresh the list, or update props.hoots
    };
  
  return (
    <>
      <HootList
        user={user}
        setUser={setUser}
        hoots={hoots}
        handleAddHoot={handleAddHoot}
      />
      
    </>
  );
}
