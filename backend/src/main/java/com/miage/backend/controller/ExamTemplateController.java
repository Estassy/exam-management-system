package com.miage.backend.controller;

import com.miage.backend.entity.Exam;
import com.miage.backend.entity.ExamTemplate;
import com.miage.backend.entity.Question;
import com.miage.backend.entity.User;
import com.miage.backend.repository.ExamTemplateRepository;
import com.miage.backend.service.ExamTemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/exam-templates")
public class ExamTemplateController {

    @Autowired
    private ExamTemplateService examTemplateService;

    @Autowired
    private ExamTemplateRepository examTemplateRepository;

    @GetMapping
    public List<ExamTemplate> getAllTemplates() {
        List<ExamTemplate> templates = examTemplateRepository.findAll();

        // ✅ Évite la référence cyclique en supprimant les `questions.templates`
        for (ExamTemplate template : templates) {
            for (Question question : template.getQuestions()) {
                question.setTemplates(null); // 🔥 Supprime la référence pour éviter la boucle infinie
            }
        }

        return templates;
    }


    @PostMapping("/from-template")
    public ResponseEntity<Exam> createExamFromTemplate(
            @RequestParam UUID templateId,
            @RequestParam LocalDateTime date,
            @RequestParam UUID teacherId,
            @RequestParam UUID courseId,
            @RequestParam UUID promotionId) {

        System.out.println("📩 Requête reçue avec les paramètres :");
        System.out.println("   🔹 templateId: " + templateId);
        System.out.println("   🔹 date: " + date);
        System.out.println("   🔹 teacherId: " + teacherId);
        System.out.println("   🔹 courseId: " + courseId);
        System.out.println("   🔹 promotionId: " + promotionId);

        Exam exam = examTemplateService.createExamFromTemplate(templateId, date, teacherId, courseId, promotionId);
        return ResponseEntity.ok(exam);
    }
}

