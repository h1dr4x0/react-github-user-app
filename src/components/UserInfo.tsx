import { useEffect, useState } from "react";
import "../assets/UserInfo.css";
import { FaStar, FaCodeFork } from "react-icons/fa6";

interface Props {
  data: Array<any>;
}

function UserInfo({ data }: Props) {
  const userInfo = data[0]?.owner;
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch("https://api.github.com/users/" + userInfo?.login)
      .then((response) => response.json())
      .then((userData) => setUser(userData))
      .catch((error) => alert("Error fetching user data: " + error));
  }, [data]);
  return (
    <div className="user-info">
      {user ? (
        <>
          <div className="user-profile">
            <h1>{user.login}'s Profile</h1>
            <div className="user-card">
              <img
                src={user.avatar_url}
                alt="User Avatar"
                className="user-avatar"
              />
              <p>
                <strong>
                  {user.name === null
                    ? user.login
                    : user.login + " - " + user.name}
                </strong>
              </p>
              <p>{user.bio || "No bio."}</p>
              <p>
                <strong>Email</strong> - {user.email || "No email."}
              </p>
              <p>
                <strong>Location</strong> - {user.location || "No location."}
              </p>
              <p>
                <strong>Public Repos</strong> - {user.public_repos}
              </p>
              <p>
                <strong>Public Gists</strong> - {user.public_gists}
              </p>

              <div className="followers">
                <p>{user.followers} followers</p>
                <p>{user.following} following</p>
              </div>
            </div>
          </div>
          <div className="user-repos">
            <h1>{user.login}'s Repositories</h1>
            <div className="repo-list">
              {data.map((repo: any) => (
                <div key={repo.id} className="repo-card">
                  <h3>{repo.name}</h3>
                  <p>{repo.description || "No description."}</p>
                  <p>
                    <strong>Language</strong> -{" "}
                    {repo.language || "No language."}
                  </p>
                  <p>
                    <strong>Open Issues</strong> - {repo.open_issues_count}
                  </p>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn"
                  >
                    View on GitHub
                  </a>
                  <div className="utility">
                    <div className="star-count">
                      <FaStar />
                      {repo.stargazers_count}
                    </div>
                    <div className="fork-count">
                      <FaCodeFork />
                      {repo.forks_count}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}
export default UserInfo;
