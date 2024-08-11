import { useState } from "react";
import "./index.scss";
import Button from "../../components/FormElements/Button";
import UserPhoto from "../../components/UserPhoto";
import Modal from "../../components/Modal";
import { useQuery } from "@tanstack/react-query";

type User = {
  id: number;
  name: string;
  email: string;
  bio: string;
  location: string;
};

const fetchUser = async () => {
  const response = await fetch("/api/user");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const UserProfile = () => {
  const { data, isLoading } = useQuery<User, Error>({
    queryKey: ["user"], // Wrapping the key in an array is recommended
    queryFn: fetchUser, // Function that fetches the data
    staleTime: 5000, // Optional configuration
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="user-profile">
      {!isLoading ? (
        <div className="container">
          <div className="header-profile">
            <UserPhoto isModalOpen={isModalOpen} />
            <div className="user-name">
              <p className="name">{data?.name}</p>
              <p className="email">{data?.email}</p>
            </div>
          </div>
          <div className="profile-info">
            <div className="peson-info">
              <p className="title">Name</p>
              <p className="title-name">{data?.name}</p>
            </div>
            <div className="peson-info">
              <p className="title">Email</p>
              <p className="title-name">{data?.email}</p>
            </div>
            <div className="peson-info">
              <p className="title">BIO</p>
              <p className="title-name">{data?.bio}</p>
            </div>
            <div className="peson-info">
              <p className="title">Location</p>
              <p className="title-name">{data?.location}</p>
            </div>
          </div>
          <Button onClick={openModal} mode={"edit"} />
          <Modal userData={data} isOpen={isModalOpen} onClose={closeModal} />
        </div>
      ) : (
        <p className="loading-message">"Ma'lumotlar Yangilanmoqda"</p>
      )}
    </div>
  );
};

export default UserProfile;
