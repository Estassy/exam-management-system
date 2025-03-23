package com.miage.backend.service;

import com.miage.backend.entity.Quiz;
import com.miage.backend.entity.QuizTemplate;
import com.miage.backend.repository.QuestionRepository;
import com.miage.backend.repository.QuizRepository;
import com.miage.backend.repository.QuizTemplateRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class QuizTemplateServiceTest {

    @Mock
    private QuizTemplateRepository quizTemplateRepository;

    @Mock
    private QuestionRepository questionRepository;

    @Mock
    private QuizRepository quizRepository;

    @InjectMocks
    private QuizTemplateService quizTemplateService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getAllTemplates() {
        when(quizTemplateRepository.findAll()).thenReturn(List.of(new QuizTemplate()));

        assertFalse(quizTemplateService.getAllTemplates().isEmpty());
    }

    @Test
    void createQuizTemplate() {
        QuizTemplate template = new QuizTemplate();
        template.setTitle("Test Template");

        when(quizTemplateRepository.save(any(QuizTemplate.class))).thenReturn(template);

        QuizTemplate createdTemplate = quizTemplateService.createQuizTemplate("Test Template", Set.of());

        assertNotNull(createdTemplate);
        assertEquals("Test Template", createdTemplate.getTitle());
    }


}