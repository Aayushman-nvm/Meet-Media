import { useSelector } from "react-redux";
import User from "./widgets/User";
import PostBlock from "./widgets/PostBlock";
import AllPosts from "./widgets/AllPosts";
import FriendList from "./widgets/FriendList";

function HomePage() {
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <main className="container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 mt-10">
      {/* Sidebar */}
      <aside className="lg:col-span-3 space-y-6">
        <User userId={_id} picturePath={picturePath} />
        <FriendList userId={_id} />
      </aside>

      {/* Feed */}
      <section className="lg:col-span-6 space-y-6">
        <PostBlock picturePath={picturePath} />
        <AllPosts userId={_id} isProfile={false} />
      </section>

      {/* Right Sidebar (optional) */}
      <aside className="hidden lg:col-span-3 lg:block">
        {/* Future widgets, ads, trends */}
      </aside>
    </main>
  );
}

export default HomePage;
