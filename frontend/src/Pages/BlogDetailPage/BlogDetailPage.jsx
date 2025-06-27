import BlogDetail from "../../Components/BlogDetail/BlogDetail";
import {NavLink} from "react-router-dom";

export default function BlogDetailPage({ user, setUser }) {
  return (
    <>
      <section>
        <BlogDetail user={user} setUser={setUser} />
      </section>
    </>
  );
}
