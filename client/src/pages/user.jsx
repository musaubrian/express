import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const User = () => {
  const [userPosts, setUserPosts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user.username;
  const bio = user.bio;
  const id = user.id;

  if (user === null) {
    console.log("user is null");
  }

  useEffect(() => {
    fetch(`http://localhost:5500/users/${id}/posts/live`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUserPosts(data);
      });
  }, []);
  return (
    <>
      <Navbar />
      <div className="flex flex-col w-full">
        {user && (
          <div className="px-10">
            <div className="flex flex-col items-center border-b-2 p-5 mb-10 border-slate-400">
              <img
                src="https://github.com/musaubrian/newspulse/blob/main/assets/images/notfound.png?raw=true"
                alt=""
                className="h-24 w-24 mb-5 rounded-full shadow-lg object-cover"
              />
              <span className="font-semibold">username:</span>{" "}
              <h1 className="font-semibold text-3xl">{username}</h1>
              <p className="text-gray-800 text-lg">
                <span className="font-semibold">Bio:</span>{" "}
                {bio === null ? (
                  <span>Nothing here yet ☹️</span>
                ) : (
                  <span>{bio}</span>
                )}
              </p>
            </div>
            <div>
              <h1 className="font-semibold text-3xl capitalize">your posts:</h1>
              <div className="flex flex-col md:flex-row justify-around flex-wrap ">
                {userPosts.map((post) => (
                  <div
                    key={post.id}
                    className="w-full md:w-2/6 bg-slate-50 rounded-md shadow-lg my-5"
                  >
                    <Link to={`/user/post/${post.id}`}>
                      <div className="w-full block">
                        <div>
                          <img
                            src="https://github.com/musaubrian/newspulse/blob/main/assets/images/notfound.png?raw=true"
                            alt=""
                            className="h-32 w-full object-cover"
                          />
                        </div>
                        <div className="p-5">
                          <h1 className="text-2xl font-semibold text-center capitalize">
                            {post.title}
                          </h1>
                          <p className="text-center text-gray-600">
                            {post.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default User;
