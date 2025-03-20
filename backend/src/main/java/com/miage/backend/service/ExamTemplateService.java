package com.miage.backend.service;

import com.miage.backend.entity.*;
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
        exam.setTitle(template.getTitle());
        exam.setDate(date);
        exam.setTeacher(teacher);
        exam.setCourse(course);
        exam.setExamTemplate(template);
        exam.getPromotions().add(promotion);

        // ✅ Sauvegarde initiale de l'examen
        exam = examRepository.save(exam);

        // ✅ Étape 1 : Copier et attacher les questions après persistance
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
        return examRepository.save(exam);
    }





}
