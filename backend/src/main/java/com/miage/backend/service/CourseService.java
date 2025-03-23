package com.miage.backend.service;

import com.miage.backend.entity.Course;
import com.miage.backend.entity.Promotion;
import com.miage.backend.entity.User;
import com.miage.backend.enums.CourseStatus;
import com.miage.backend.exception.ResourceNotFoundException;
import com.miage.backend.repository.CourseRepository;
import com.miage.backend.repository.PromotionRepository;
import com.miage.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.hibernate.Hibernate;
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

    @Transactional
    public Course createCourse(Course course, UUID teacherId) {
        course.setStatus(CourseStatus.PENDING);

        // ✅ Vérifie si le professeur existe
        User teacher = userRepository.findById(teacherId)
                .orElseThrow(() -> new ResourceNotFoundException("Enseignant non trouvé avec l'ID : " + teacherId));

        // ✅ Associe l'enseignant à l'entité Course
        course.setTeacher(teacher);
        System.out.println("👨‍🏫 Professeur associé au cours : " + teacher.getFirstName() + " " + teacher.getLastName());

        // ✅ Vérification des promotions
        Set<Promotion> selectedPromotions = new HashSet<>();
        if (course.getPromotions() != null) {
            for (Promotion promo : course.getPromotions()) {
                Promotion existingPromotion = promotionRepository.findById(promo.getId())
                        .orElseThrow(() -> new ResourceNotFoundException("Promotion non trouvée : " + promo.getId()));
                Hibernate.initialize(existingPromotion.getStudents());
                selectedPromotions.add(existingPromotion);
            }
        }
        course.setPromotions(selectedPromotions);

        // ✅ Ajout des étudiants
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

    public List<Map<String, Object>> getAllCourses() {
        List<Course> courses = courseRepository.findAll();

        return courses.stream().map(course -> {
            Map<String, Object> simplifiedCourse = new HashMap<>();
            simplifiedCourse.put("id", course.getId());
            simplifiedCourse.put("title", course.getTitle());
            simplifiedCourse.put("date", course.getDate());
            simplifiedCourse.put("status", course.getStatus());

            // Récupérer seulement les IDs des étudiants (évite d'envoyer les passwords)
            List<Map<String, String>> studentList = course.getStudents().stream()
                    .map(student -> {
                        Map<String, String> simpleStudent = new HashMap<>();
                        simpleStudent.put("id", student.getId().toString());
                        simpleStudent.put("firstName", student.getFirstName());
                        simpleStudent.put("lastName", student.getLastName());
                        return simpleStudent;
                    })
                    .toList();
            simplifiedCourse.put("students", studentList);

            // Récupérer seulement les noms des promotions
            List<Map<String, String>> promotionList = course.getPromotions().stream()
                    .map(promotion -> {
                        Map<String, String> simplePromotion = new HashMap<>();
                        simplePromotion.put("id", promotion.getId().toString());
                        simplePromotion.put("name", promotion.getName());
                        return simplePromotion;
                    })
                    .toList();
            simplifiedCourse.put("promotions", promotionList);

            return simplifiedCourse;
        }).toList();
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

    public List<Course> getCoursesByTeacherId(UUID teacherId) {
        return courseRepository.findByTeacherId(teacherId);
    }

}
