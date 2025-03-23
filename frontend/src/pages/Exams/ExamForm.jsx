import React, { useContext, useEffect, useState } from "react";
import { createExam } from "../../services/exam/examService";
import {
  createExamFromTemplate,
  getExamTemplates,
} from "../../services/exam/templeteService";
import { getPromotions } from "../../services/promotion/promotionService";
import "./ExamForm.scss"; // Importation du style
import { getAllTeachers } from "../../services/user/userService";
import { AuthContext } from "../../context/AuthContext";
import { getAllCourses } from "../../services/course/courseService";
import {
  HomeIcon,
  CalendarDaysIcon,
  UsersIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  ClipboardDocumentListIcon,
  DocumentDuplicateIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import Sidebar from "../../components/UI/Sidebar";
import logo from "../../../src/assets/images/logo.png";
import { useNavigate } from "react-router-dom";

const ExamForm = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedPromotion, setSelectedPromotion] = useState("");
  const [examTitle, setExamTitle] = useState("");
  const [examDate, setExamDate] = useState("");
  const [message, setMessage] = useState(""); // Pour afficher un message de confirmation
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(""); // ✅ Stocke l'enseignant sélectionné
  const [teacherId, setTeacherId] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const teacherMenuItems = [
    {
      label: "Accueil",
      icon: HomeIcon,
      onClick: () => navigate("/dashboard"),
    },
    {
      label: "Cours",
      icon: ClipboardDocumentListIcon,
      onClick: () => navigate("/courses"),
    },
    {
      label: "Créer un cours",
      icon: PlusCircleIcon,
      onClick: () => navigate("/create-course"),
    },
    {
      label: "Examens",
      icon: CalendarDaysIcon,
      onClick: () => navigate("/QuizExamsPage"),
    },
    {
      label: "Créer un examen",
      icon: PencilSquareIcon,
      onClick: () => navigate("/create-exam"),
    },
    {
      label: "Créer un quiz",
      icon: DocumentDuplicateIcon,
      onClick: () => navigate("/create-quiz"),
    },
    {
      label: "Étudiants",
      icon: UsersIcon,
      onClick: () => navigate("/students"),
    },
    {
      label: "Notes",
      icon: AcademicCapIcon,
      onClick: () => navigate("/grades"),
    },
  ];

  useEffect(() => {
    if (user && user.role === "TEACHER") {
      setTeacherId(user.id);
      console.log("👨‍🏫 Professeur connecté :", user);
    }
  }, [user]); // ✅ Met à jour teacherId lorsque user change

  useEffect(() => {
    async function fetchData() {
      try {
        const courseData = await getAllCourses();
        setCourses(courseData);

        const templateData = await getExamTemplates();
        console.log("📌 Templates bruts reçus :", templateData);

        // ✅ Vérifie si questions existe avant d'appeler map()
        const cleanedTemplates = templateData.map((template) => ({
          id: template.id,
          title: template.title,
          questions: Array.isArray(template.questions)
            ? template.questions.map((q) => ({
                id: q.id,
                questionText: q.questionText,
                option1: q.option1,
                option2: q.option2,
                option3: q.option3,
                option4: q.option4,
                rightAnswer: q.rightAnswer,
                type: q.type,
              }))
            : [], // ⚠️ Si `questions` est `undefined`, mettre un tableau vide
        }));

        console.log("📌 Templates nettoyés :", cleanedTemplates);
        setTemplates(cleanedTemplates);

        const promotionData = await getPromotions();
        setPromotions(promotionData);

        const teacherData = await getAllTeachers();
        setTeachers(teacherData);
      } catch (error) {
        console.error("❌ Erreur lors de la récupération des données :", error);
      }
    }
    fetchData();
  }, []);

  // 🆕 Mise à jour automatique du titre de l'examen lorsqu'un modèle est sélectionné
  useEffect(() => {
    if (selectedTemplate) {
      const foundTemplate = templates.find(
        (template) => template.id === selectedTemplate
      );
      if (foundTemplate) {
        setExamTitle(foundTemplate.title);
      }
    } else {
      setExamTitle(""); // Si aucun modèle sélectionné, vider le champ
    }
  }, [selectedTemplate, templates]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPromotion || !selectedCourse) {
      setMessage("⚠️ Veuillez choisir une promotion et un cours !");
      return;
    }

    if (!teacherId) {
      setMessage("⚠️ Problème avec l'enseignant connecté !");
      console.error("❌ Erreur : teacherId est vide !");
      return;
    }

    try {
      console.log("📤 Envoi de la requête avec :", {
        selectedTemplate,
        examDate,
        teacherId,
        selectedCourse,
        selectedPromotion,
      });

      if (selectedTemplate) {
        await createExamFromTemplate(
          selectedTemplate,
          examDate,
          teacherId,
          selectedCourse,
          selectedPromotion
        );
        setMessage("✅ Examen créé à partir d'un modèle !");
      } else {
        await createExam({
          title: examTitle,
          date: examDate,
          teacherId,
          courseId: selectedCourse,
          promotionId: selectedPromotion,
        });
        setMessage("✅ Examen personnalisé créé !");
      }

      // ✅ Réinitialisation du formulaire après soumission
      setSelectedTemplate("");
      setSelectedPromotion("");
      setSelectedCourse("");
      setExamTitle("");
      setExamDate("");
    } catch (error) {
      setMessage(
        "❌ Une erreur s'est produite lors de la création de l'examen."
      );
      console.error("Erreur lors de la création de l'examen :", error);
    }
  };

  return (
    <div className={`dashboard-container ${isSidebarOpen ? "shifted" : ""}`}>
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        logoSrc={logo}
        menuItems={teacherMenuItems}
      />
      <div className="exam-form">
        <div className="exam-title">Créer un examen</div>

        <form onSubmit={handleSubmit}>
          {/* Choix du modèle */}
          <div className="form-group">
            <label className="form-label">Utiliser un modèle :</label>
            <select
              className="form-input"
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              required
            >
              <option value="">-- Sélectionnez un modèle --</option>
              {templates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.title}
                </option>
              ))}
            </select>
          </div>

          {/* Choix de la promotion */}
          <div className="form-group">
            <label className="form-label">Associer à une promotion :</label>
            <select
              className="form-input"
              value={selectedPromotion}
              onChange={(e) => setSelectedPromotion(e.target.value)}
            >
              <option value="">-- Sélectionnez une promotion --</option>
              {promotions.map((promotion) => (
                <option key={promotion.id} value={promotion.id}>
                  {promotion.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sélection du cours */}
          <div className="form-group">
            <label className="form-label">Associer à un cours :</label>
            <select
              className="form-input"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              required
            >
              <option value="">-- Sélectionnez un cours --</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>

          {/* Saisie manuelle du titre */}
          <div className="form-group">
            <label className="form-label">Titre de l'examen :</label>
            <input
              className="form-input"
              type="text"
              value={examTitle}
              onChange={(e) => setExamTitle(e.target.value)}
              disabled={!!selectedTemplate} // Désactiver si un modèle est choisi
            />
          </div>

          {/* Sélection de la date */}
          <div className="form-group">
            <label className="form-label">Date de l'examen :</label>
            <input
              className="form-input"
              type="datetime-local"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
            />
          </div>

          {/* Bouton de soumission */}
          <button type="submit" className="submit-btn">
            Créer l'examen
          </button>

          {/* Affichage des messages d'erreur ou succès */}
          {message && (
            <p className={message.includes("✅") ? "success" : "error"}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ExamForm;
