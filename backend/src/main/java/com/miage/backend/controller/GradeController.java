package com.miage.backend.controller;

import com.miage.backend.entity.Grade;
import com.miage.backend.service.GradeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/grades")
public class GradeController {

    @Autowired
    private GradeService gradeService;

    // Ajouter une note
    @PostMapping
    public ResponseEntity<Grade> addGrade(@RequestParam UUID studentId, @RequestParam UUID examId, @RequestParam double score) {
        return ResponseEntity.ok(gradeService.addGrade(studentId, examId, score));
    }

    // Récupérer les notes d'un étudiant
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Grade>> getGradesByStudent(@PathVariable UUID studentId) {
        return ResponseEntity.ok(gradeService.getGradesByStudent(studentId));
    }

    // Modifier une note
    @PutMapping("/{gradeId}")
    public ResponseEntity<Grade> updateGrade(@PathVariable UUID gradeId, @RequestParam double newScore) {
        return ResponseEntity.ok(gradeService.updateGrade(gradeId, newScore));
    }
}
