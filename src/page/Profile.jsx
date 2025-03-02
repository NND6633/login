import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    phone: user?.phone || "",
    language: user?.language || "",
    country: user?.country || "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`https://json-server-8ruu.onrender.com/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Profile updated successfully!");
        setEditing(false);
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="p-6 max-w-md w-full shadow-lg bg-white rounded-2xl">
        <div className="flex items-center space-x-4">
          <img
            src="https://source.unsplash.com/100x100/?portrait"
            alt="Profile"
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="text-xl font-semibold">{user.username}</h2>
            <p className="text-gray-500">{user.email || "N/A"}</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="mt-6 space-y-4">
          <Input
            name="username"
            placeholder="Full Name"
            value={formData.username}
            onChange={handleChange}
            disabled={!editing}
          />
          <Input
            name="phone"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleChange}
            disabled={!editing}
          />
          <Input
            name="language"
            placeholder="Language"
            value={formData.language}
            onChange={handleChange}
            disabled={!editing}
          />
          <Input
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            disabled={!editing}
          />
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-between">
          {editing ? (
            <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600">
              Save
            </Button>
          ) : (
            <Button onClick={() => setEditing(true)} className="bg-purple-500 hover:bg-purple-600">
              Edit
            </Button>
          )}
          <Button onClick={logout} className="bg-red-500 hover:bg-red-600">
            Logout
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
