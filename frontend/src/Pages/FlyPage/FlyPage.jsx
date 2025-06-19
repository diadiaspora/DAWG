import Header from "../../Components/Header/Header.jsx";
import SearchComponent from "../../Components/SearchComponent/SearchComponent.jsx";
import { NavLink } from "react-router-dom";




export default function FlyPage({ user, setUser }) {
  // const [isHome, setIsHome] = useState(true);

  return (
    <>
      <section className="home">
        <Header user={user} setUser={setUser} />
        <SearchComponent />

      </section>
    </>
  );
}
