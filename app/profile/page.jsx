"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { MdLogout, MdEdit } from "react-icons/md";

const Profile = () => {
  const storedUser = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user")) : null;

  const [name, setName] = useState(storedUser?.name || "Foydalanuvchi");
  const [email, setEmail] = useState(storedUser?.email || "email@example.com");
  const [profileImage, setProfileImage] = useState(storedUser?.image || "/default-avatar.png");
  const [isEditing, setIsEditing] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
        localStorage.setItem("user", JSON.stringify({ name, email, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    const updatedUser = { name, email, image: profileImage };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    alert("Profil yangilandi!");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login"; 
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-96 text-center">
        <h2 className="text-2xl font-semibold mb-4">Profil Sahifasi</h2>
        
        <div className="relative w-24 h-24 mx-auto">
          <Image src={profileImage} alt="Profile" width={96} height={96} className="rounded-full border-4 border-gray-300 dark:border-gray-600" />
          {isEditing && (
            <label className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white cursor-pointer">
              <MdEdit size={20} />
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          )}
        </div>

        <div className="mt-4">
          <label className="block text-sm text-gray-600 dark:text-gray-400">Ismingiz</label>
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
            />
          ) : (
            <p className="text-lg font-medium">{name}</p>
          )}
        </div>

        <div className="mt-4">
          <label className="block text-sm text-gray-600 dark:text-gray-400">Email</label>
          <p className="text-lg font-medium">{email}</p>
        </div>

        <div className="mt-6 flex justify-between">
          {isEditing ? (
            <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">Saqlash</button>
          ) : (
            <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">Tahrirlash</button>
          )}
          <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-lg flex items-center space-x-2 hover:bg-red-600 transition">
            <MdLogout /> <span>Chiqish</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
