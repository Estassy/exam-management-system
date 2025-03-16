package com.miage.backend.service;

import com.miage.backend.entity.*;
import com.miage.backend.exception.ResourceNotFoundException;
import com.miage.backend.repository.*;
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

    public List<ExamTemplate> getAllTemplates() {
        return examTemplateRepository.findAll();
    }

    public Exam createExamFromTemplate(UUID templateId, LocalDateTime date, UUID teacherId, UUID courseId, UUID promotionId) {
        ExamTemplate template = examTemplateRepository.findById(templateId)
                .orElseThrow(() -> new ResourceNotFoundException("Modèle d'examen introuvable"));

        User teacher = userRepository.findById(teacherId)
                .orElseThrow(() -> new ResourceNotFoundException("Enseignant non trouvé"));

        Promotion promotion = promotionRepository.findById(promotionId)
                .orElseThrow(() -> new ResourceNotFoundException("Promotion non trouvée"));

        Exam exam = new Exam();
        exam.setTitle(template.getTitle());
        exam.setDate(date);
        exam.setTeacher(teacher);
        exam.getPromotions().add(promotion);

        // Copier les questions
        Set<Question> copiedQuestions = new HashSet<>();
        for (Question q : template.getQuestions()) {
            Question newQuestion = new Question();
            newQuestion.setQuestionText(q.getQuestionText());
            newQuestion.setOption1(q.getOption1());
            newQuestion.setOption2(q.getOption2());
            newQuestion.setOption3(q.getOption3());
            newQuestion.setOption4(q.getOption4());
            newQuestion.setRightAnswer(q.getRightAnswer());
            Set<Exam> examsSet = new HashSet<>();
            examsSet.add(exam);
            newQuestion.setExams(examsSet);

            copiedQuestions.add(newQuestion);
        }
        exam.setQuestions(copiedQuestions);

        return examRepository.save(exam);
    }

}
