package com.miage.backend.controller;

import com.miage.backend.entity.Quiz;
import com.miage.backend.entity.QuizTemplate;
import com.miage.backend.service.QuizTemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/quiz-templates")
public class QuizTemplateController {

    @Autowired
    private QuizTemplateService quizTemplateService;

    /**
     * 📌 Récupérer tous les modèles de quiz
     */
    @GetMapping
    public ResponseEntity<List<QuizTemplate>> getAllTemplates() {
        return ResponseEntity.ok(quizTemplateService.getAllTemplates());
    }

    /**
     * 📌 Créer un modèle de quiz avec un ensemble de questions
     */
    @PostMapping
    public ResponseEntity<QuizTemplate> createQuizTemplate(
            @RequestParam String title,
            @RequestParam Set<UUID> questionIds) {

        QuizTemplate template = quizTemplateService.createQuizTemplate(title, questionIds);
        return ResponseEntity.ok(template);
    }

    /**
     * 📌 Créer un quiz à partir d'un modèle existant
     */
    @PostMapping("/{templateId}/create-quiz")
    public ResponseEntity<Quiz> createQuizFromTemplate(
            @PathVariable UUID templateId,
            @RequestParam UUID teacherId,
            @RequestParam UUID courseId,
            @RequestParam UUID promotionId) {

        Quiz quiz = quizTemplateService.createQuizFromTemplate(templateId, teacherId, courseId, promotionId);
        return ResponseEntity.ok(quiz);
    }
}
