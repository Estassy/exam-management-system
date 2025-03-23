import React, { createContext, useState, useEffect, ReactNode, useContext } from "react";
import { fetchNotifications } from "../services/notification/notificationService";
import { AuthContext } from "./AuthContext";

// Définition du type Notification
type NotificationType = {
  message: string;
  type: "success" | "warning" | "error";
};

// Définition du contexte
interface NotificationContextProps {
  notifications: NotificationType[];
  addNotification: (message: string, type?: "success" | "warning" | "error") => void;
}

// Création du contexte avec une valeur initiale
export const NotificationContext = createContext<NotificationContextProps | null>(null);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const { user } = useContext(AuthContext); // Récupère l'utilisateur connecté

  // Charger les notifications depuis l'API Backend
  useEffect(() => {
    if (user && user.username) {
      fetchNotifications().then((data) => {
        if (data.length > 0) {
          setNotifications((prev) => [...prev, ...data]);
        }
      }).catch(error => {
        console.error("❌ Erreur lors de la récupération des notifications :", error);
      });
    } else {
      console.warn("⚠️ Impossible de récupérer les notifications, `user.username` est undefined.");
    }
  }, [user]);

  // Ajouter une notification locale
  const addNotification = (message: string, type: "success" | "warning" | "error" = "success") => {
    setNotifications((prev) => [...prev, { message, type }]);

    // Supprimer automatiquement après 5s
    setTimeout(() => {
      setNotifications((prev) => prev.slice(1));
    }, 5000);
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

// 🔹 Vérifier que l'export est bien structuré
const useNotifications = (): NotificationContextProps => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications doit être utilisé avec NotificationProvider");
  }
  return context;
};

export { useNotifications };
export default NotificationProvider;
