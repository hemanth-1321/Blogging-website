import { useParams } from "react-router-dom";

export const ProfilePage = () => {
  const { username } = useParams();

  return (
    <div>
      <h1>Welcome to {username}'s Profile Page!</h1>
    </div>
  );
};
