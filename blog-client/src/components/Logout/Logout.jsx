import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router";

export default function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return <button onClick={handleLogout}>Logout</button>;
}
