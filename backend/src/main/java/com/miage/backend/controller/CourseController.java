package com.miage.backend.controller;

import com.miage.backend.entity.Course;
import com.miage.backend.enums.CourseStatus;
import com.miage.backend.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    // Création d'un cours (statut par défaut : "PENDING")
    @PostMapping
    public ResponseEntity<Course> createCourse(
            @RequestBody Course course,
            @RequestParam UUID teacherId // ✅ Ajout du teacherId comme paramètre
    ) {
        Course createdCourse = courseService.createCourse(course, teacherId);
        return ResponseEntity.ok(createdCourse);
    }


    //  Récupérer tous les cours
    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getAllCourses() {
        List<Map<String, Object>> courses = courseService.getAllCourses();
        return ResponseEntity.ok(courses);
    }

    //  Récupérer un cours par ID
    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable UUID id) {
        Optional<Course> course = courseService.getCourseById(id);
        return course.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    //  Mise à jour du statut d'un cours
    @PutMapping("/{courseId}/update-status")
    public ResponseEntity<Course> updateCourseStatus(@PathVariable UUID courseId, @RequestParam String status) {
        Course updatedCourse = courseService.updateCourseStatus(courseId, CourseStatus.valueOf(status));
        return ResponseEntity.ok(updatedCourse);
    }

    //  Supprimer un cours
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable UUID id) {
        courseService.deleteCourse(id);
        return ResponseEntity.noContent().build();
    }

    //  Récupérer les cours d'un étudiant
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Course>> getCoursesByStudent(@PathVariable UUID studentId) {
        List<Course> courses = courseService.getCoursesByStudentId(studentId);
        return ResponseEntity.ok(courses);
    }

    //  Ajouter un étudiant à un cours
    @PostMapping("/{courseId}/students/{studentId}")
    public ResponseEntity<Course> addStudentToCourse(@PathVariable UUID courseId, @PathVariable UUID studentId) {
        Course updatedCourse = courseService.addStudentToCourse(courseId, studentId);
        return ResponseEntity.ok(updatedCourse);
    }

    //  Supprimer un étudiant d'un cours
    @DeleteMapping("/{courseId}/students/{studentId}")
    public ResponseEntity<Course> removeStudentFromCourse(@PathVariable UUID courseId, @PathVariable UUID studentId) {
        Course updatedCourse = courseService.removeStudentFromCourse(courseId, studentId);
        return ResponseEntity.ok(updatedCourse);
    }

    //  Récupérer les cours d'un enseignant
    @GetMapping("/teacher/{teacherId}")
    public ResponseEntity<List<Course>> getCoursesByTeacher(@PathVariable UUID teacherId) {
        List<Course> courses = courseService.getCoursesByTeacherId(teacherId);
        return ResponseEntity.ok(courses);
    }

}
