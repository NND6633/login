import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { Card } from "@/components/ui/card";  // ✅ Import ShadCN Card
import { Button } from "@/components/ui/button"; // ✅ Import ShadCN Button

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");  // ✅ Điều hướng về Sign In nếu chưa đăng nhập
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="p-6 max-w-md w-full shadow-lg bg-white rounded-xl">
        <h2 className="text-xl font-bold text-center text-gray-800">User Profile</h2>
        <p className="text-center mt-4 text-gray-700">
          <span className="font-semibold">Username:</span> {user.username}
        </p>
        <p className="text-center text-gray-700">
          <span className="font-semibold">Email:</span> {user.email || "N/A"}
        </p>
        <Button onClick={logout} className="mt-6 w-full bg-red-500 hover:bg-red-600">
          Logout
        </Button>
      </Card>
    </div>
  );
};

export default Profile;
