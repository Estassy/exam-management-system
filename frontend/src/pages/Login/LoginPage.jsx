import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./LoginPage.scss";

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.classList.add("login-page");

    const timer = setTimeout(() => {
      setLoading(false);
    }, 150); // Réduction du délai pour un affichage plus rapide

    return () => {
      clearTimeout(timer);
      document.body.classList.remove("login-page");
    };
  }, []);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await loginUser(credentials.username, credentials.password);
      navigate("/dashboard");
    } catch (error) {
      setError("Identifiants incorrects, veuillez réessayer.");
    }
  };

  return (
    <main className="login-container">
      <div
        className="login-card"
        style={{
          opacity: loading ? 0 : 1,
          transform: loading ? "translateY(20px)" : "translateY(0)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}
      >
        {/* Image Section */}
        <div className="login-card-img-container">
          <img
            src="src/assets/images/login1.jpg"
            alt="login"
            className="login-card-img"
          />
        </div>

        {/* Login Form Section */}
        <div className="login-card-body">
          <div className="brand-wrapper">
            <img
              src="src/assets/images/logo.png"
              alt="logo"
              className="brand-logo"
            />
          </div>
          <h3 className="login-title">Connexion</h3>
          {error && <p className="login-error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="login-form-group">
              <input
                type="text"
                name="username"
                className="login-form-control"
                placeholder="Nom d'utilisateur"
                onChange={handleChange}
                required
              />
            </div>
            <div className="login-form-group">
              <input
                type="password"
                name="password"
                className="login-form-control"
                placeholder="Mot de passe"
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="login-button">
              Se connecter
            </button>
          </form>
          <a href="#" className="login-forgot-link">
            Mot de passe oublié ?
          </a>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
