package com.miage.backend.service;

import com.miage.backend.entity.*;
import com.miage.backend.enums.Role;
import com.miage.backend.exception.ResourceNotFoundException;
import com.miage.backend.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
public class ExamTemplateService {

    @Autowired
    private ExamTemplateRepository examTemplateRepository;

    @Autowired
    private ExamRepository examRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PromotionRepository promotionRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private NotificationService notificationService;

    public List<ExamTemplate> getAllTemplates() {
        return examTemplateRepository.findAll();
    }

    @Transactional
    public Exam createExamFromTemplate(UUID templateId, LocalDateTime date, UUID teacherId, UUID courseId, UUID promotionId) {
        // 🔍 Vérifie si un examen existe déjà pour ce cours et cette date
        if (examRepository.existsByCourseIdAndDate(courseId, date)) {
            throw new IllegalStateException("Un examen existe déjà pour ce cours à cette date !");
        }

        // ✅ Récupération des entités requises
        ExamTemplate template = examTemplateRepository.findById(templateId)
                .orElseThrow(() -> new ResourceNotFoundException("Modèle d'examen introuvable"));

        User teacher = userRepository.findById(teacherId)
                .orElseThrow(() -> new ResourceNotFoundException("Enseignant non trouvé"));

        Promotion promotion = promotionRepository.findById(promotionId)
                .orElseThrow(() -> new ResourceNotFoundException("Promotion non trouvée"));

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Cours non trouvé"));

        // ✅ Création de l'examen
        Exam exam = new Exam();
        String baseTitle = template.getTitle().replaceAll("(?i)Modèle\\s*", "").trim();
        String prefix = baseTitle.matches("^[AEIOUYaeiouy].*") ? "d’" : "de ";
        exam.setTitle("Examen " + prefix + baseTitle);
        exam.setDate(date);
        exam.setTeacher(teacher);
        exam.setCourse(course);
        exam.setExamTemplate(template);
        exam.getPromotions().add(promotion);

        Set<User> students = promotion.getStudents();
        exam.getStudents().addAll(students);

        exam = examRepository.save(exam);

        Set<User> studentsToNotify = promotion.getStudents(); // promotion est déjà récupéré plus haut
        notificationService.sendNotificationToUsers(
                studentsToNotify,
                "📢 Un nouvel examen '" + template.getTitle() + "' a été ajouté pour votre promotion !"
        );

        Set<Question> copiedQuestions = new HashSet<>();
        for (Question q : template.getQuestions()) {
            Question newQuestion = new Question();
            newQuestion.setQuestionText(q.getQuestionText());
            newQuestion.setOption1(q.getOption1());
            newQuestion.setOption2(q.getOption2());
            newQuestion.setOption3(q.getOption3());
            newQuestion.setOption4(q.getOption4());
            newQuestion.setRightAnswer(q.getRightAnswer());
            copiedQuestions.add(newQuestion);
        }

        copiedQuestions = new HashSet<>(questionRepository.saveAll(copiedQuestions));

        // ✅ Étape 2 : Associer les questions à l'examen et sauvegarde finale
        exam.setQuestions(copiedQuestions);
        exam = examRepository.save(exam);

        // ✅ Notification envoyée aux admins
        notificationService.sendNotificationToRole(
                Role.ADMIN,
                "📝 Un nouvel examen '" + exam.getTitle() + "' a été créé par " +
                        teacher.getFirstName() + " " + teacher.getLastName() + "."
        );

        return exam;
    }






}
