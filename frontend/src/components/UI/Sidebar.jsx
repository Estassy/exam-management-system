import React from "react";
// import "./Sidebar.scss"; // Tu peux copier le style de l'ancienne sidebar ici

const Sidebar = ({ isOpen, toggleSidebar, logo2Src = 'src/assets/images/logo2.png', menuItems }) => {
  return (
    <>
      <button className="menu-button" onClick={toggleSidebar}>
        {isOpen ? "✖ Fermer" : "☰ Menu"}
      </button>

      <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="sidebar-logo">
          <img src={logo2Src} alt="Logo" className="logo-image" />
        </div>
        <ul className="sidebar-menu">
          {menuItems.map((item, index) => (
            <li key={index} className="sidebar-item" onClick={item.onClick}>
              <item.icon className="sidebar-icon" />
              {item.label}
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
