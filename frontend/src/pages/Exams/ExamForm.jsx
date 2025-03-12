import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ExamForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState({ title: "", date: "", courseId: "" });
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Récupérer la liste des cours disponibles
    axios.get("http://localhost:8080/courses")
      .then((response) => setCourses(response.data))
      .catch((error) => console.error("Erreur chargement cours", error));

    // Si on modifie un examen, récupérer ses données
    if (id) {
      axios.get(`http://localhost:8080/exams/${id}`)
        .then((response) => setExam(response.data))
        .catch((error) => console.error("Erreur chargement examen", error));
    }
  }, [id]);

  const handleChange = (e) => {
    setExam({ ...exam, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = id
      ? axios.put(`http://localhost:8080/exams/${id}`, exam)  // Modifier examen
      : axios.post("http://localhost:8080/exams", exam);      // Créer examen

    request
      .then(() => navigate("/"))
      .catch((error) => console.error("Erreur soumission", error));
  };

  return (
    <div className="exam-form">
      <h2>{id ? "Modifier" : "Créer"} un Examen</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Titre:
          <input type="text" name="title" value={exam.title} onChange={handleChange} required />
        </label>

        <label>
          Date:
          <input type="datetime-local" name="date" value={exam.date} onChange={handleChange} required />
        </label>

        <label>
          Cours:
          <select name="courseId" value={exam.courseId} onChange={handleChange} required>
            <option value="">Sélectionner un cours</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>{course.name}</option>
            ))}
          </select>
        </label>

        <button type="submit">{id ? "Mettre à jour" : "Créer"}</button>
      </form>
      <button onClick={() => navigate("/")}>Annuler</button>
    </div>
  );
};

export default ExamForm;
