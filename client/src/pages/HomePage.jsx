import React from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axois.js";
import Sidebar from "../components/Sidebar.jsx";
import PostCreation from "../components/PostCreation.jsx";
import Post from "../components/Post.jsx";
import { Users } from "lucide-react";
import RecommendedUser from "../components/RecommendedUser.jsx";

export default function HomePage() {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const { data: recommendedUsers } = useQuery({
    queryKey: ["recommendedUsers"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users/suggestions");
      // console.log("API response for recommended users:", res.data);
      return res.data;
    },
  });
  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/posts");
      return res.data;
    },
  });

  // console.log("recommendedUsers", recommendedUsers);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="hidden lg:block lg:col-span-1">
        <Sidebar user={authUser} />
      </div>
      <div className="col-span-1 lg:col-span-2 order-first lg:order-none">
        <PostCreation user={authUser} />
        {Array.isArray(posts) &&
          posts.map((post) => <Post key={post._id} post={post} />)}

        {posts?.length === 0 && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="mb-6">
              <Users size={64} className="mx-auto text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              No Posts Yet
            </h2>
            <p className="text-gray-600 mb-6">
              Connect with others to start seeing posts in your feed
            </p>
          </div>
        )}
      </div>
      {Array.isArray(recommendedUsers) && recommendedUsers.length > 0 ? (
        <div className="col-span-1 lg:col-span-1 ">
          <div className="bg-secondary rounded-lg shadow p-4">
            <h2 className="font-semibold mb-4">People you may know</h2>
            {recommendedUsers.map((user) => (
              <RecommendedUser key={user._id} user={user} />
            ))}
          </div>
        </div>
      ) : (
        <div>No recommendations available</div>
      )}
    </div>
  );
}
