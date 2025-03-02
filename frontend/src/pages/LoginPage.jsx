
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(username, password);
      console.log("data", data);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Erreur lors de la connexion. Veuillez vérifier vos identifiants.");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom d'utilisateur :</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default LoginPage;
