import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LoginPage.scss";

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // 🔥 Nouvel état pour le chargement

  // ✅ Simuler un temps de chargement pour les images/styles
  useEffect(() => {
    const img = new Image();
    img.src = "src/assets/images/login1.jpg"; // 🔥 Charge l'image en arrière-plan
    img.onload = () => setIsLoading(false); // Quand l'image est chargée, désactive le loading

    return () => {
      img.onload = null; // Nettoyage si le composant est démonté
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
      console.error("Échec de connexion :", error);
      setError("Identifiants incorrects, veuillez réessayer.");
    }
  };

  return (
    <main className="login-container d-flex align-items-center justify-content-center min-vh-100">
      <div className="container d-flex justify-content-center">
        {isLoading ? ( // 🔥 Affiche un loader tant que la page n'est pas prête
          <div className="loader">Chargement...</div>
        ) : (
          <motion.div
            className="card login-card shadow-lg mx-auto"
            style={{ maxWidth: "850px" }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="row no-gutters align-items-center">
              <div className="col-md-6 d-none d-md-block">
                <img
                  src="src/assets/images/login1.jpg"
                  alt="login"
                  className="login-card-img img-fluid"
                />
              </div>
              <div className="col-md-6 p-4">
                <div className="card-body text-center">
                  <div className="brand-wrapper mb-3">
                    <img
                      src="src/assets/images/logo.png"
                      alt="logo"
                      className="logo"
                    />
                  </div>
                  <h3 className="text-center mb-3 fw-bold">Connexion</h3>
                  {error && (
                    <p className="error-message alert alert-danger">{error}</p>
                  )}
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <input
                        type="text"
                        name="username"
                        className="form-control"
                        placeholder="Nom d'utilisateur"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Mot de passe"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-block login-btn">
                      Se connecter
                    </button>
                  </form>
                  <p className="forgot-password-link mt-3">
                    Mot de passe oublié ?
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
};

export default LoginPage;
