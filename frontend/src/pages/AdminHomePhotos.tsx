/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { addHomePhoto, getHomePhotos, deleteHomePhoto, uploadPicture } from "../api-client";

const AdminHomePhotos = () => {
  const [banners, setBanners] = useState<any[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [photoTitle, setPhotoTitle] = useState("");

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const banners = await getHomePhotos();
      setBanners(banners);
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };

  const handleaddHomePhoto = async () => {
    if (!imageFile) {
      console.error("No image file selected");
      return;
    }

    try {
      // Upload the image first
      const imageUrl = await uploadPicture(imageFile);

      // Then add the banner with the uploaded image URL
      const newBanner = await addHomePhoto(imageUrl, photoTitle);
      setBanners([...banners, newBanner]);
      setImageFile(null);
      setPhotoTitle("");
    } catch (error) {
      console.error("Error adding banner:", error);
    }
  };

  const handledeleteHomePhoto = async (id: string) => {
    try {
      await deleteHomePhoto(id);
      setBanners(banners.filter(banner => banner._id !== id));
    } catch (error) {
      console.error("Error deleting banner:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Banners</h1>
      
      <div className="mb-6">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="photoTitle"
          value={photoTitle}
          onChange={(e) => setPhotoTitle(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={handleaddHomePhoto} className="bg-blue-500 text-white p-2 rounded">
          Add Banner
        </button>
      </div>

      <div className="grid lg:grid-cols-3 grid-cols-1 gap-3">
        {banners.map((banner) => (
          <div key={banner._id} className="flex flex-col justify-between items-center mb-4 gap-3 p-3 border shadow-md rounded-lg bg-orange-100">
            <img src={banner.imageUrl} alt="Banner" className="h-56 w-auto object-cover rounded-md" />
            <button onClick={() => handledeleteHomePhoto(banner._id)} className="bg-red-500 text-white p-2 rounded w-full hover:bg-red-600">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHomePhotos;
