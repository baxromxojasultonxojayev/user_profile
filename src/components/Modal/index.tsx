import React, { FC, useEffect, useState } from "react";
import "./index.scss";
import AvatarPhoto from "../AvatarPhoto";
import Button from "../FormElements/Button";
import FormInput from "../FormElements/FromInput";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface FormData {
  name: string;
  email: string;
  bio: string;
  location: string;
}

type User = {
  id: number;
  name: string;
  email: string;
  bio: string;
  location: string;
};

export const fetchUser = async (): Promise<User> => {
  const response = await fetch("/api/user");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const updateUser = async (user: User) => {
  const response = await fetch(`/api/user/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error(`Failed to update user: ${response.statusText}`);
  }

  return response.json();
};

const Modal: FC<Props> = ({ userData, isOpen, onClose }) => {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    bio: "",
    location: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const { data } = useQuery<User, Error>({
    queryKey: ["user"],
    queryFn: fetchUser,
    staleTime: 5000,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = () => {
    let errors: Partial<FormData> = {};

    // Name validation
    if (!formData.name.trim()) {
      errors.name = "Iltimos ismingizni kiriting.";
    } else if (formData.name.length < 2) {
      errors.name = "Ism kamida 3 ta harfdan iborat bo'lishi kerak.";
    }

    // // Email validation
    if (!formData.email) {
      errors.email = "Pochtangizni kriiting.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Pochta xato kiritildi.";
    }

    if (!formData.bio.trim()) {
      errors.bio = "Iltimos BIO ni kiriting.";
    }

    if (!formData.location.trim()) {
      errors.location = "Iltimos manzilingizni kiriting.";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const mutation = useMutation<unknown, Error, User>({
    mutationFn: updateUser, // The actual function performing the mutation
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rates"] });
    },
    onError: (error: any) => {
      console.error("Update failed:", error);
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validate()) {
      if (validate() && data) {
        mutation.mutate({ ...formData, id: data.id });
        setTimeout(() => {
          window.location.reload();
          onClose();
        }, 1000);
      }
      console.log("Form submitted successfully:", formData);
    }
  };

  const cancelBtn = () => {
    onClose();
    setErrors({});
  };

  const modaForm = () => {
    return (
      <form onSubmit={handleSubmit} className="form">
        <div>
          <FormInput
            name="name"
            error={errors}
            label="Fullname:"
            type="text"
            value={formData.name}
            onChange={handleChange}
            onBlur={validate}
          />
          {errors.name && (
            <p style={{ color: "red", padding: 0, margin: 0 }}>{errors.name}</p>
          )}
        </div>
        <div>
          <FormInput
            name="email"
            error={errors}
            label="Email:"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={validate}
          />
          {errors.email && (
            <p style={{ color: "red", padding: 0, margin: 0 }}>
              {errors.email}
            </p>
          )}
        </div>
        <div>
          <FormInput
            name="bio"
            error={errors}
            label="BIO:"
            type="text"
            value={formData.bio}
            onChange={handleChange}
            onBlur={validate}
          />
          {errors.bio && (
            <p style={{ color: "red", padding: 0, margin: 0 }}>{errors.bio}</p>
          )}
        </div>
        <div>
          <FormInput
            name="location"
            error={errors}
            label="Location:"
            type="text"
            value={formData.location}
            onChange={handleChange}
            onBlur={validate}
          />
          {errors.location && (
            <p style={{ color: "red", padding: 0, margin: 0 }}>
              {errors.location}
            </p>
          )}
        </div>
        <div className="action-buttons">
          <Button type="submit" mode={"save"} />
          <Button onClick={cancelBtn} mode={"cancel"} />
        </div>
      </form>
    );
  };

  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isOpen ? "show" : ""}`}>
      <div className={`modal-content ${isOpen ? "show" : ""}`}>
        <div className="header-profile">
          <AvatarPhoto isModalOpen={isOpen} />
          <div className="user-name">
            <p className="name">{data?.name}</p>
            <p className="email">{data?.email}</p>
          </div>
        </div>

        <div className="form-elements">{modaForm()}</div>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
};

type Props = {
  userData?: undefined | User;
  isOpen: boolean;
  onClose: () => void;
};

export default Modal;
