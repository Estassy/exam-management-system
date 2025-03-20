import React, { useEffect, useState } from "react";
import {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../../services/user/userService";
import {
  HomeIcon,
  CalendarDaysIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { getPromotions } from "../../services/promotion/promotionService";
import { useNavigate } from "react-router-dom";
import "./UserManagement.scss";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("Tous");

  const [isAddingUser, setIsAddingUser] = useState(false);
  const [isEditingUser, setIsEditingUser] = useState(null); // Stocke l'utilisateur en cours d'édition
  const [promotions, setPromotions] = useState([]);

  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);


  const [newUser, setNewUser] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    role: "STUDENT",
    promotion: "",
  });

  useEffect(() => {
    async function fetchUsers() {
      const usersData = await getAllUsers();
      console.log("✅ Utilisateurs reçus :", usersData);
      const promotionData = await getPromotions();
      console.log("✅ Promotions reçues :", promotionData);
      setPromotions(promotionData);
      setUsers(usersData);
      setFilteredUsers(usersData);
    }
    fetchUsers();
  }, []);

  // 🔍 Filtrage des utilisateurs selon la recherche et le rôle
  useEffect(() => {
    let updatedUsers = users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterRole !== "Tous") {
      updatedUsers = updatedUsers.filter((user) => user.role === filterRole);
    }

    setFilteredUsers(updatedUsers);
  }, [searchTerm, filterRole, users]);

  // 🆕 Ajouter un utilisateur
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await createUser(newUser);

      // ✅ Rafraîchir la liste des utilisateurs après ajout
      const updatedUsers = await getAllUsers();
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);

      setIsAddingUser(false);

      // ✅ Réinitialiser le formulaire après l'ajout
      setNewUser({
        username: "",
        firstName: "",
        lastName: "",
        password: "",
        role: "STUDENT",
        promotion: "",
      });
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur :", error);
    }
  };

  // ✏️ Fonction pour gérer l'édition d'un utilisateur
  const handleEditUserClick = (user) => {
    setIsEditingUser(user.id);
    setNewUser({
      username: user.username || "",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      password: user.lastName || "", // Ne pas pré-remplir le mot de passe pour des raisons de sécurité
      role: user.role || "STUDENT",
      promotion: user.promotion ? user.promotion.id : "",
    });
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    console.log("Données envoyées pour modification :", newUser); // Debug
    try {
      await updateUser(isEditingUser, newUser);

      // ✅ Recharger la liste complète des utilisateurs après modification
      const updatedUsers = await getAllUsers();
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);

      setIsEditingUser(null);
      setNewUser({
        username: "",
        firstName: "",
        lastName: "",
        password: "",
        role: "STUDENT",
        promotion: "",
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
    }
  };

  // ❌ Supprimer un utilisateur
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?"))
      return;
    try {
      await deleteUser(userId);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
    }
  };

  return(
    <div
          className={`manage-exams-dashboard-container ${
            isSidebarOpen ? "shifted" : ""
          }`}
        >
          {/* Bouton Menu / Fermer */}
          <button className="menu-button" onClick={toggleSidebar}>
            {isSidebarOpen ? "✖ Fermer" : "☰ Menu"}
          </button>

            {/* Sidebar */}
            <aside
              className={`user-management-sidebar ${
                isSidebarOpen ? "open" : "closed"
              }`}
            >
              <div className="user-management-sidebar-logo">
                <img
                  src="src/assets/images/logo.png"
                  alt="Logo"
                  className="user-management-logo-image"
                />
              </div>
              <ul className="user-management-sidebar-menu">
                <li
                  className="user-management-sidebar-item"
                  onClick={() => navigate("/dashboard")}
                >
                  <HomeIcon className="user-management-sidebar-icon" />
                  Accueil
                </li>
                <li
                  className="user-management-sidebar-item"
                  onClick={() => navigate("/exams/manage")}
                >
                  <CalendarDaysIcon className="user-management-sidebar-icon" />
                  Examens
                </li>
                <li
                  className="user-management-sidebar-item"
                  onClick={() => navigate("/users/manage")}
                >
                  <UsersIcon className="user-management-sidebar-icon" />
                  Utilisateurs
                </li>
              </ul>
            </aside>
    <div className="user-management">
      <h2>Gestion des utilisateurs</h2>

      {/* 🔍 Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher un utilisateur..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* 📌 Filtre par rôle */}
      <select onChange={(e) => setFilterRole(e.target.value)}>
        <option value="Tous">Tous</option>
        <option value="STUDENT">Étudiants</option>
        <option value="TEACHER">Professeurs</option>
      </select>

      {/* 📋 Tableau des utilisateurs */}
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Rôle</th>
            <th>Promotion</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.lastName}</td>
              <td>{user.firstName}</td>
              <td>{user.role === "STUDENT" ? "Étudiant" : "Professeur"}</td>
              <td>
                {user.role === "STUDENT" && user.promotion
                  ? user.promotion.name // ✅ Afficher seulement le nom au lieu de l'objet entier
                  : "Aucune"}
              </td>

              <td>
                <button
                  className="edit"
                  onClick={() => handleEditUserClick(user)}
                >
                  ✏️ Modifier
                </button>
                <button
                  className="delete"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  ❌ Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ➕ Ajouter un utilisateur */}
      <button className="add-user-btn" onClick={() => setIsAddingUser(true)}>
        ➕ Ajouter un utilisateur
      </button>

      {/* Formulaire d'ajout / édition */}
      {(isAddingUser || isEditingUser) && (
        <div className="add-user-form">
          <h3>
            {isEditingUser
              ? "Modifier l'utilisateur"
              : "Ajouter un utilisateur"}
          </h3>
          <form onSubmit={isEditingUser ? handleEditUser : handleAddUser}>
            <input
              type="text"
              placeholder="Nom"
              value={newUser.lastName || ""}
              onChange={(e) =>
                setNewUser({ ...newUser, lastName: e.target.value })
              }
              required
            />

            <input
              type="text"
              placeholder="Prénom"
              value={newUser.firstName || ""}
              onChange={(e) =>
                setNewUser({ ...newUser, firstName: e.target.value })
              }
              required
            />

            <input
              type="text"
              placeholder="Username"
              value={newUser.username || ""}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
              required
            />

            <input
              type="password"
              placeholder="Mot de passe"
              value={newUser.password || ""}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              required
            />

            <select
              value={newUser.role || "STUDENT"}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <option value="STUDENT">Étudiant</option>
              <option value="TEACHER">Professeur</option>
            </select>

            {/* 🎓 Sélection de la promotion (visible seulement si Étudiant) */}
            {newUser.role === "STUDENT" && (
              <select
                value={newUser.promotion || ""}
                onChange={(e) =>
                  setNewUser({ ...newUser, promotion: e.target.value })
                }
              >
                <option value="">-- Sélectionnez une promotion --</option>
                {promotions.map((promo) => (
                  <option key={promo.id} value={promo.id}>
                    {promo.name}
                  </option>
                ))}
              </select>
            )}
            <button type="submit" className="user-management-submit-button">
              {isEditingUser ? "Modifier" : "Créer"}
            </button>
            <button
              type="button"
              className="user-management-cancel-button"
              onClick={() => {
                setIsAddingUser(false);
                setIsEditingUser(null);
              }}
            >
              Annuler
            </button>
          </form>
        </div>
      )}
    </div>
    </div>
  );
};

export default UserManagement;
