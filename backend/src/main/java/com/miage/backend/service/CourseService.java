package com.miage.backend.service;

import com.miage.backend.entity.Course;
import com.miage.backend.entity.User;
import com.miage.backend.exception.ResourceNotFoundException;
import com.miage.backend.repository.CourseRepository;
import com.miage.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private UserRepository userRepository;

    public Course createCourse(Course course) {
        return courseRepository.save(course);
    }

    public Course updateCourse(UUID courseId, Course updatedCourse) {
        Course existingCourse = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Cours non trouvé pour l'ID : " + courseId));

        existingCourse.setTitle(updatedCourse.getTitle());
        return courseRepository.save(existingCourse);
    }

    public void deleteCourse(UUID courseId) {
        if (!courseRepository.existsById(courseId)) {
            throw new ResourceNotFoundException("Cours non trouvé pour l'ID : " + courseId);
        }
        courseRepository.deleteById(courseId);
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Optional<Course> getCourseById(UUID courseId) {
        return courseRepository.findById(courseId);
    }

    public Optional<Course> getCourseByTitle(String title) {
        return courseRepository.findByTitle(title);
    }

    public Course addStudentToCourse(UUID courseId, UUID studentId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Cours non trouvé pour l'ID : " + courseId));
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Étudiant non trouvé pour l'ID : " + studentId));

        course.getStudents().add(student);
        return courseRepository.save(course);
    }

    public Course removeStudentFromCourse(UUID courseId, UUID studentId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Cours non trouvé pour l'ID : " + courseId));
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Étudiant non trouvé pour l'ID : " + studentId));

        course.getStudents().remove(student);
        return courseRepository.save(course);
    }

    /*public List<Course> getCoursesByTeacherId(UUID teacherId) {
        return courseRepository.findByExams_Teacher_Id(teacherId);
    }*/

    public List<Course> getCoursesByStudentId(UUID studentId) {
        return courseRepository.findByStudents_Id(studentId);
    }
}
