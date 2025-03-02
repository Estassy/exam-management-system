import React from "react";
import "./Notification.scss";

interface NotificationProps {
  message: string;
  type: "success" | "warning" | "error";
}

const Notification: React.FC<NotificationProps> = ({ message, type }) => {
  return <div className={`notification ${type}`}>{message}</div>;
};

export default Notification;