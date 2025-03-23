package com.miage.backend.service;

import com.miage.backend.entity.Question;
import com.miage.backend.exception.ResourceNotFoundException;
import com.miage.backend.repository.QuestionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class QuestionServiceTest {

    @Mock
    private QuestionRepository questionRepository;

    @InjectMocks
    private QuestionService questionService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createQuestion() {
        Question question = new Question();
        question.setQuestionText("Sample Question");

        when(questionRepository.save(any(Question.class))).thenReturn(question);

        Question createdQuestion = questionService.createQuestion(question);

        assertNotNull(createdQuestion);
        assertEquals("Sample Question", createdQuestion.getQuestionText());
    }

    @Test
    void getAllQuestions() {
        when(questionRepository.findAll()).thenReturn(List.of(new Question()));

        List<Question> questions = questionService.getAllQuestions();

        assertFalse(questions.isEmpty());
    }

    @Test
    void getQuestionById() {
        UUID questionId = UUID.randomUUID();
        Question question = new Question();

        when(questionRepository.findById(questionId)).thenReturn(Optional.of(question));

        Optional<Question> foundQuestion = questionService.getQuestionById(questionId);

        assertTrue(foundQuestion.isPresent());
    }

    @Test
    void updateQuestion() {
        UUID questionId = UUID.randomUUID();
        Question existingQuestion = new Question();
        existingQuestion.setQuestionText("Old Question");

        Question updatedQuestion = new Question();
        updatedQuestion.setQuestionText("New Question");

        when(questionRepository.findById(questionId)).thenReturn(Optional.of(existingQuestion));
        when(questionRepository.save(any(Question.class))).thenReturn(existingQuestion);

        Question result = questionService.updateQuestion(questionId, updatedQuestion);

        assertNotNull(result);
        assertEquals("New Question", result.getQuestionText());
    }

    @Test
    void deleteQuestion() {
        UUID questionId = UUID.randomUUID();

        when(questionRepository.existsById(questionId)).thenReturn(true);
        doNothing().when(questionRepository).deleteById(questionId);

        questionService.deleteQuestion(questionId);

        verify(questionRepository, times(1)).deleteById(questionId);
    }

    @Test
    void deleteQuestion_NotFound() {
        UUID questionId = UUID.randomUUID();

        when(questionRepository.existsById(questionId)).thenReturn(false);

        assertThrows(ResourceNotFoundException.class, () -> questionService.deleteQuestion(questionId));
    }
}