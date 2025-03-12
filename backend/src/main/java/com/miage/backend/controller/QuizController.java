package com.miage.backend.controller;

import com.miage.backend.entity.Quiz;
import com.miage.backend.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/quizzes")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @PostMapping
    public ResponseEntity<Quiz> createQuiz(@RequestBody Quiz quiz) {
        Quiz created = quizService.createQuiz(quiz);
        return ResponseEntity.ok(created);
    }

    @GetMapping
    public ResponseEntity<List<Quiz>> getAllQuizzes() {
        List<Quiz> quizzes = quizService.getAllQuizzes();
        return ResponseEntity.ok(quizzes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Quiz> getQuizById(@PathVariable UUID id) {
        Optional<Quiz> quiz = quizService.getQuizById(id);
        return quiz.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Quiz> updateQuiz(@PathVariable UUID id, @RequestBody Quiz quiz) {
        Quiz updated = quizService.updateQuiz(id, quiz);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuiz(@PathVariable UUID id) {
        quizService.deleteQuiz(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{quizId}/questions/{questionId}")
    public ResponseEntity<Quiz> addQuestionToQuiz(@PathVariable UUID quizId, @PathVariable UUID questionId) {
        Quiz updatedQuiz = quizService.addQuestionToQuiz(quizId, questionId);
        return ResponseEntity.ok(updatedQuiz);
    }

    @DeleteMapping("/{quizId}/questions/{questionId}")
    public ResponseEntity<Quiz> removeQuestionFromQuiz(@PathVariable UUID quizId, @PathVariable UUID questionId) {
        Quiz updatedQuiz = quizService.removeQuestionFromQuiz(quizId, questionId);
        return ResponseEntity.ok(updatedQuiz);
    }
}
