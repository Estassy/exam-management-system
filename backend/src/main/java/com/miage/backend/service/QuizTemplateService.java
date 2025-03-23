package com.miage.backend.service;

import com.miage.backend.entity.QuizTemplate;
import com.miage.backend.entity.*;
import com.miage.backend.exception.ResourceNotFoundException;
import com.miage.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
public class QuizTemplateService {


    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuizTemplateRepository quizTemplateRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private PromotionRepository promotionRepository;

    public List<QuizTemplate> getAllTemplates() {
        return quizTemplateRepository.findAll();
    }

    public Quiz createQuizFromTemplate(UUID templateId, UUID teacherId, UUID courseId, UUID promotionId) {
        QuizTemplate template = quizTemplateRepository.findById(templateId)
                .orElseThrow(() -> new ResourceNotFoundException("Modèle de quiz introuvable"));

        User teacher = userRepository.findById(teacherId)
                .orElseThrow(() -> new ResourceNotFoundException("Enseignant non trouvé"));

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Cours non trouvé"));

        Promotion promotion = promotionRepository.findById(promotionId)
                .orElseThrow(() -> new ResourceNotFoundException("Promotion non trouvée"));

        Quiz quiz = new Quiz();
        quiz.setTitle(template.getTitle());
        quiz.setTeacher(teacher);
        quiz.setCourse(course);
        quiz.setPromotion(promotion);
        quiz.setQuestions(new HashSet<>(template.getQuestions()));

        return quizRepository.save(quiz);
    }

    public Quiz updateQuiz(UUID quizId, String newTitle, Set<UUID> questionIds) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz non trouvé"));

        quiz.setTitle(newTitle);

        if (questionIds != null) {
            Set<Question> questions = new HashSet<>(questionRepository.findAllById(questionIds));
            quiz.setQuestions(questions);
        }

        return quizRepository.save(quiz);
    }

    public QuizTemplate createQuizTemplate(String title, Set<UUID> questionIds) {
        QuizTemplate template = new QuizTemplate();
        template.setTitle(title);

        Set<Question> questions = new HashSet<>(questionRepository.findAllById(questionIds));
        template.setQuestions(questions);

        return quizTemplateRepository.save(template);
    }
}
