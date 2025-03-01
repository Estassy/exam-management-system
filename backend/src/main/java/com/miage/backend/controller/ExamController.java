package com.miage.backend.controller;

import com.miage.backend.entity.Exam;
import com.miage.backend.service.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/exams")
public class ExamController {

    @Autowired
    private ExamService examService;

    @PostMapping
    public ResponseEntity<Exam> createExam(@RequestBody Exam exam) {
        Exam created = examService.createExam(exam);
        return ResponseEntity.ok(created);
    }

    @GetMapping
    public ResponseEntity<List<Exam>> getAllExams() {
        List<Exam> exams = examService.getAllExams();
        return ResponseEntity.ok(exams);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Exam> getExamById(@PathVariable UUID id) {
        Optional<Exam> exam = examService.getExamById(id);
        return exam.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Exam> updateExam(@PathVariable UUID id, @RequestBody Exam exam) {
        Exam updated = examService.updateExam(id, exam);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExam(@PathVariable UUID id) {
        examService.deleteExam(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/teacher/{teacher}")
    public ResponseEntity<Exam> getFirstExamByTeacher(@PathVariable String teacher) {
        return examService.getFirstExamByTeacher(teacher)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @PostMapping("/{examId}/students/{studentId}")
    public ResponseEntity<Exam> addStudentToExam(@PathVariable UUID examId, @PathVariable UUID studentId) {
        Exam updatedExam = examService.addStudentToExam(examId, studentId);
        return ResponseEntity.ok(updatedExam);
    }

    @DeleteMapping("/{examId}/students/{studentId}")
    public ResponseEntity<Exam> removeStudentFromExam(@PathVariable UUID examId, @PathVariable UUID studentId) {
        Exam updatedExam = examService.removeStudentFromExam(examId, studentId);
        return ResponseEntity.ok(updatedExam);
    }
}
