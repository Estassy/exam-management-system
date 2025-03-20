package com.miage.backend.service;

import com.miage.backend.entity.Course;
import com.miage.backend.entity.Grade;
import com.miage.backend.entity.User;
import com.miage.backend.entity.Exam;
import com.miage.backend.exception.ResourceNotFoundException;
import com.miage.backend.repository.CourseRepository;
import com.miage.backend.repository.GradeRepository;
import com.miage.backend.repository.UserRepository;
import com.miage.backend.repository.ExamRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class GradeService {

    @Autowired
    private GradeRepository gradeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ExamRepository examRepository;

    @Autowired
    private CourseRepository courseRepository;



    @Transactional
    public Grade addGrade(UUID studentId, UUID courseId, UUID examId, double score) {
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Étudiant non trouvé"));

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Cours non trouvé"));

        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new ResourceNotFoundException("Examen non trouvé"));

        // Vérifier si une note existe déjà
        Optional<Grade> existingGrade = gradeRepository.findByStudentAndCourse(student, course);
        if (existingGrade.isPresent()) {
            throw new IllegalStateException("Une note existe déjà pour cet étudiant et ce cours !");
        }

        Grade grade = new Grade();
        grade.setStudent(student);
        grade.setExam(exam);
        grade.setCourse(course);
        grade.setScore(score);

        return gradeRepository.save(grade);
    }

    // Récupérer toutes les notes d'un étudiant
    public List<Grade> getGradesByStudent(UUID studentId) {
        return gradeRepository.findByStudentId(studentId);
    }

    // Modifier une note existante
    public Grade updateGrade(UUID gradeId, double newScore) {
        Grade grade = gradeRepository.findById(gradeId)
                .orElseThrow(() -> new RuntimeException("Note non trouvée"));
        grade.setScore(newScore);
        return gradeRepository.save(grade);
    }

    public List<Grade> getStudentResults(UUID studentId) {
        return gradeRepository.findByStudentId(studentId);
    }
}
