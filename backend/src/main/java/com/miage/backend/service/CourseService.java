package com.miage.backend.service;

import com.miage.backend.entity.Course;
import com.miage.backend.entity.Promotion;
import com.miage.backend.entity.User;
import com.miage.backend.enums.CourseStatus;
import com.miage.backend.exception.ResourceNotFoundException;
import com.miage.backend.repository.CourseRepository;
import com.miage.backend.repository.PromotionRepository;
import com.miage.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PromotionRepository promotionRepository;

    // ✅ Création d'un cours avec promotions
    public Course createCourse(Course course) {
        course.setStatus(CourseStatus.PENDING); // Toujours "À venir" au départ

        // Vérification des promotions
        Set<Promotion> selectedPromotions = new HashSet<>();
        if (course.getPromotions() != null) {
            for (Promotion promo : course.getPromotions()) {
                Promotion existingPromotion = promotionRepository.findById(promo.getId())
                        .orElseThrow(() -> new ResourceNotFoundException("Promotion non trouvée : " + promo.getId()));
                selectedPromotions.add(existingPromotion);
            }
        }
        course.setPromotions(selectedPromotions);

        // Ajout des étudiants des promotions dans le cours
        Set<User> students = new HashSet<>();
        for (Promotion promo : selectedPromotions) {
            students.addAll(promo.getStudents());
        }
        course.setStudents(students);

        return courseRepository.save(course);
    }

    // ✅ Mise à jour du statut d'un cours
    public Course updateCourseStatus(UUID courseId, CourseStatus newStatus) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Cours non trouvé pour l'ID : " + courseId));

        course.setStatus(newStatus);
        return courseRepository.save(course);
    }

    // ✅ Suppression d'un cours
    public void deleteCourse(UUID courseId) {
        if (!courseRepository.existsById(courseId)) {
            throw new ResourceNotFoundException("Cours non trouvé pour l'ID : " + courseId);
        }
        courseRepository.deleteById(courseId);
    }

    // ✅ Récupération de tous les cours
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    // ✅ Récupérer un cours par ID
    public Optional<Course> getCourseById(UUID courseId) {
        return courseRepository.findById(courseId);
    }

    // ✅ Ajouter un étudiant à un cours
    public Course addStudentToCourse(UUID courseId, UUID studentId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Cours non trouvé pour l'ID : " + courseId));
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Étudiant non trouvé pour l'ID : " + studentId));

        course.getStudents().add(student);
        return courseRepository.save(course);
    }

    // ✅ Supprimer un étudiant d'un cours
    public Course removeStudentFromCourse(UUID courseId, UUID studentId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Cours non trouvé pour l'ID : " + courseId));
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Étudiant non trouvé pour l'ID : " + studentId));

        course.getStudents().remove(student);
        return courseRepository.save(course);
    }

    // ✅ Récupérer les cours d'un étudiant
    public List<Course> getCoursesByStudentId(UUID studentId) {
        return courseRepository.findByStudents_Id(studentId);
    }
}
