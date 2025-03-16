package com.miage.backend.controller;

import com.miage.backend.entity.Exam;
import com.miage.backend.entity.ExamTemplate;
import com.miage.backend.entity.User;
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

    @GetMapping
    public ResponseEntity<List<ExamTemplate>> getAllTemplates() {
        return ResponseEntity.ok(examTemplateService.getAllTemplates());
    }

    @PostMapping("/from-template")
    public ResponseEntity<Exam> createExamFromTemplate(
            @RequestParam UUID templateId,
            @RequestParam LocalDateTime date,
            @RequestParam UUID teacherId,
            @RequestParam UUID courseId,
            @RequestParam UUID promotionId) {

        Exam exam = examTemplateService.createExamFromTemplate(templateId, date, teacherId, courseId, promotionId);
        return ResponseEntity.ok(exam);
    }
}

