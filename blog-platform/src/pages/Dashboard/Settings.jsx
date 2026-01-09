import { useState } from "react";
import "./Settings.css";
import { useAuth } from "../../hooks/useAuth";
import { authors } from "../../data/mockAuthors";

function Settings() {
  const { user, updateUser } = useAuth();
  const author = authors.find((a) => a.id === user?.id);

  const [formData, setFormData] = useState({
    name: author?.name || "",
    email: author?.email || "",
    bio: author?.bio || "",
    avatar: author?.avatar || "",
    twitter: author?.socialLinks?.twitter || "",
    github: author?.socialLinks?.github || "",
    linkedin: author?.socialLinks?.linkedin || "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    if (!formData.name.trim()) return "Імʼя обовʼязкове";
    if (!formData.email.includes("@")) return "Некоректний email";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    const updatedUser = {
      ...user,
      ...formData,
      socialLinks: {
        twitter: formData.twitter,
        github: formData.github,
        linkedin: formData.linkedin,
      },
    };

    updateUser(updatedUser);
    setSuccess("Зміни збережено ✅");
  };

  return (
    <form className="settings-form" onSubmit={handleSubmit}>
      <h2>Налаштування профілю</h2>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <input
        name="name"
        placeholder="Ім'я"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />

      <textarea
        name="bio"
        placeholder="Біографія"
        value={formData.bio}
        onChange={handleChange}
      />

      <input
        name="avatar"
        placeholder="URL аватара"
        value={formData.avatar}
        onChange={handleChange}
      />

      <h3>Соціальні мережі</h3>

      <input
        name="twitter"
        placeholder="Twitter URL"
        value={formData.twitter}
        onChange={handleChange}
      />

      <input
        name="github"
        placeholder="GitHub URL"
        value={formData.github}
        onChange={handleChange}
      />

      <input
        name="linkedin"
        placeholder="LinkedIn URL"
        value={formData.linkedin}
        onChange={handleChange}
      />

      <button type="submit">Зберегти зміни</button>
    </form>
  );
}

export default Settings;
