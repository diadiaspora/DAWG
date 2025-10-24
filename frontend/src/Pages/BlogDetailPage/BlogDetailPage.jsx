import BlogDetail from "../../Components/BlogDetail/BlogDetail";

export default function BlogDetailPage({ user, setUser }) {
  return (
    <>
      <section>
        <BlogDetail user={user} setUser={setUser} />
      </section>
    </>
  );
}
