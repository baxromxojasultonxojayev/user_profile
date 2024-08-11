import React, { FC, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import "./index.scss";

const UserPhoto: FC<Props> = ({ isModalOpen }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploading(true);
      try {
        // Convert file to base64 string
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            const base64String = reader.result as string;
            setSelectedImage(base64String);
            localStorage.setItem("user-photo", base64String); // Save to local storage
          }
        };
        console.log(reader);

        reader.readAsDataURL(file);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  // Load photo from local storage on component mount
  useEffect(() => {
    const storedImage = localStorage.getItem("user-photo");
    if (storedImage) {
      setSelectedImage(storedImage);
    }
  }, []);

  return (
    <div className="avatar">
      <img
        src={selectedImage || "https://picsum.photos/id/1/200/300"}
        className="user-photo"
        onError={(e) => {
          console.error("Image failed to load", e);
        }}
        alt="user-photo"
      />
      {isModalOpen && (
        <div className="icon-wrapper">
          <label
            className="photo-input"
            htmlFor="photo-input"
            data-testid="pencil-icon"
          >
            <FontAwesomeIcon data-testid="photo-label" icon={faPencilAlt} />
          </label>
          <input
            type="file"
            id="photo-input"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>
      )}
      {uploading && <p>Uploading...</p>}
    </div>
  );
};

type Props = {
  isModalOpen: boolean;
};

export default UserPhoto;
