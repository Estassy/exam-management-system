package com.miage.backend.service;

import com.miage.backend.entity.*;
import com.miage.backend.enums.Role;
import com.miage.backend.exception.ResourceNotFoundException;
import com.miage.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class ExamService {

    @Autowired
    private ExamRepository examRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private ExamTemplateRepository examTemplateRepository;

    @Autowired
    private PromotionRepository promotionRepository;

    @Autowired
    private NotificationService notificationService;

    public Exam createExam(Exam exam) {
        Exam savedExam = examRepository.save(exam);

        //  Envoyer une notification aux admins
        if (exam.getTeacher() != null) {
            notificationService.sendNotificationToRole(
                    Role.ADMIN,
                    "📢 Un nouvel examen '" + exam.getTitle() + "' a été créé par " +
                            exam.getTeacher().getFirstName() + " " + exam.getTeacher().getLastName() + "."
            );
        } else {
            notificationService.sendNotificationToRole(
                    Role.ADMIN,
                    "📢 Un nouvel examen '" + exam.getTitle() + "' a été créé."
            );
        }

        Set<User> allStudents = new HashSet<>();
        for (Promotion promo : savedExam.getPromotions()) {
            Promotion existingPromo = promotionRepository.findById(promo.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Promotion non trouvée : " + promo.getId()));
            allStudents.addAll(existingPromo.getStudents());
        }

        notificationService.sendNotificationToUsers(
                allStudents,
                "📢 Un nouvel examen '" + savedExam.getTitle() + "' a été programmé. Consultez votre espace étudiant !"
        );


        return savedExam;
    }


    public Exam updateExam(UUID id, Exam updatedExam) {
        Exam exam = examRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exam not found"));
        exam.setTitle(updatedExam.getTitle());
        exam.setDate(updatedExam.getDate());
        exam.setTeacher(updatedExam.getTeacher());
        exam.setCourse(updatedExam.getCourse());
        // Mettez à jour d'autres champs si nécessaire
        return examRepository.save(exam);
    }

    public Exam addStudentToExam(UUID examId, UUID studentId) {
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new ResourceNotFoundException("Examen non trouvé pour l'ID : " + examId));
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Étudiant non trouvé pour l'ID : " + studentId));
        exam.getStudents().add(student);
        return examRepository.save(exam);
    }

    public Exam removeStudentFromExam(UUID examId, UUID studentId) {
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new ResourceNotFoundException("Examen non trouvé pour l'ID : " + examId));
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Étudiant non trouvé pour l'ID : " + studentId));
        exam.getStudents().remove(student);
        return examRepository.save(exam);
    }

    public Exam assignCourseToExam(UUID examId, UUID courseId) {
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new ResourceNotFoundException("Examen non trouvé pour l'ID : " + examId));
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Cours non trouvé pour l'ID : " + courseId));

        exam.setCourse(course);
        return examRepository.save(exam);
    }

    public void deleteExam(UUID id) {
        examRepository.deleteById(id);
    }

    public List<Exam> getAllExams() {
        return examRepository.findAll();
    }

    public Optional<Exam> getExamById(UUID id) {
        return examRepository.findById(id);
    }

    public Optional<Exam> getFirstExamByTeacher(UUID teacherId) {
        // Cherche l'enseignant par ID
        User teacher = userRepository.findById(teacherId)
                .orElseThrow(() -> new ResourceNotFoundException("Enseignant non trouvé avec l'ID : " + teacherId));

        // Recherche l'examen correspondant à cet enseignant
        return examRepository.findFirstByTeacherOrderByDateAsc(teacher);
    }

    public List<Exam> getUpcomingExams(UUID studentId) {
        return examRepository.findByStudentsIdAndDateAfter(studentId, LocalDateTime.now());
    }

}
