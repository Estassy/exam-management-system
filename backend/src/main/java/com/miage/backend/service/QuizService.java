package com.miage.backend.service;

import com.miage.backend.entity.Question;
import com.miage.backend.entity.Quiz;
import com.miage.backend.exception.ResourceNotFoundException;
import com.miage.backend.repository.QuestionRepository;
import com.miage.backend.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuestionRepository questionRepository;

    public Quiz createQuiz(Quiz quiz) {
        return quizRepository.save(quiz);
    }

    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    public Optional<Quiz> getQuizById(UUID id) {
        return quizRepository.findById(id);
    }

    public Quiz updateQuiz(UUID quizId, Quiz updatedQuiz) {
        Quiz existingQuiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz non trouvé pour l'ID : " + quizId));

        existingQuiz.setTitle(updatedQuiz.getTitle());
        return quizRepository.save(existingQuiz);
    }

    public void deleteQuiz(UUID quizId) {
        if (!quizRepository.existsById(quizId)) {
            throw new ResourceNotFoundException("Quiz non trouvé pour l'ID : " + quizId);
        }
        quizRepository.deleteById(quizId);
    }

    public Quiz addQuestionToQuiz(UUID quizId, UUID questionId) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz non trouvé pour l'ID : " + quizId));
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new ResourceNotFoundException("Question non trouvée pour l'ID : " + questionId));

        quiz.getQuestions().add(question);
        return quizRepository.save(quiz);
    }

    public Quiz removeQuestionFromQuiz(UUID quizId, UUID questionId) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz non trouvé pour l'ID : " + quizId));
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new ResourceNotFoundException("Question non trouvée pour l'ID : " + questionId));

        quiz.getQuestions().remove(question);
        return quizRepository.save(quiz);
    }
}
