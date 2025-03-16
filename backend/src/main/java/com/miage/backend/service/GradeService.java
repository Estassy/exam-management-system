package com.miage.backend.service;

import com.miage.backend.entity.Grade;
import com.miage.backend.entity.User;
import com.miage.backend.entity.Exam;
import com.miage.backend.repository.GradeRepository;
import com.miage.backend.repository.UserRepository;
import com.miage.backend.repository.ExamRepository;
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

    // Ajouter une note à un étudiant
    public Grade addGrade(UUID studentId, UUID examId, double score) {
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Étudiant non trouvé"));
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new RuntimeException("Examen non trouvé"));

        Grade grade = new Grade(student, exam, score);
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
