package com.miage.backend.service;

import com.miage.backend.dto.GradeDTO;
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
import java.util.stream.Collectors;

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


        Optional<Grade> existingGrade = gradeRepository.findByStudentAndExam(student, exam);
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

    public List<GradeDTO> getStudentResults(UUID studentId) {
        List<Grade> grades = gradeRepository.findByStudentId(studentId);

        return grades.stream().map(grade -> {
            GradeDTO dto = new GradeDTO();

            dto.setExamId(grade.getExam().getId());
            dto.setExamTitle(grade.getExam().getTitle());
            dto.setScore(grade.getScore());

            // TODO: Calcul réel si tu veux afficher la progression
            dto.setTrend(0);

            // ✅ Moyenne de la promotion pour l'examen concerné
            if (grade.getStudent().getPromotion() != null) {
                UUID promoId = grade.getStudent().getPromotion().getId();
                double promoAvg = getPromotionAverageForExam(grade.getExam().getId(), promoId);
                dto.setPromotionAverage(promoAvg);
            } else {
                dto.setPromotionAverage(0); // ou null si tu préfères
            }

            return dto;
        }).toList();
    }



    public double getStudentAverage(UUID studentId) {
        return gradeRepository.findByStudentId(studentId).stream()
                .mapToDouble(Grade::getScore)
                .average()
                .orElse(0.0);
    }

    public double getPromotionAverageForExam(UUID examId, UUID promotionId) {
        List<Grade> grades = gradeRepository.findByExamId(examId);
        List<Grade> filtered = grades.stream()
                .filter(g -> g.getStudent().getPromotion() != null
                        && g.getStudent().getPromotion().getId().equals(promotionId))
                .toList();

        return filtered.stream()
                .mapToDouble(Grade::getScore)
                .average()
                .orElse(0.0);
    }




}
