package com.miage.backend.service;

import com.miage.backend.entity.Exam;
import com.miage.backend.repository.ExamRepository;
import com.miage.backend.repository.UserRepository;
import com.miage.backend.service.ExamService;
import com.miage.backend.service.NotificationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class ExamServiceTest {

    @Mock
    private ExamRepository examRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private NotificationService notificationService;

    @InjectMocks
    private ExamService examService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createExam() {
        Exam exam = new Exam();
        exam.setTitle("Test Exam");

        when(examRepository.save(any(Exam.class))).thenReturn(exam);

        Exam createdExam = examService.createExam(exam);

        assertNotNull(createdExam);
        assertEquals("Test Exam", createdExam.getTitle());
    }

    @Test
    void updateExam() {
        UUID examId = UUID.randomUUID();
        Exam exam = new Exam();
        exam.setId(examId);
        exam.setTitle("Old Title");

        when(examRepository.findById(examId)).thenReturn(Optional.of(exam));
        when(examRepository.save(any(Exam.class))).thenReturn(exam);

        Exam updatedExam = examService.updateExam(examId, exam);

        assertNotNull(updatedExam);
        assertEquals("Old Title", updatedExam.getTitle());
    }

    @Test
    void deleteExam() {
        UUID examId = UUID.randomUUID();

        examService.deleteExam(examId);

        verify(examRepository, times(1)).deleteById(examId);
    }

    @Test
    void getExamById() {
        UUID examId = UUID.randomUUID();
        Exam exam = new Exam();
        exam.setId(examId);

        when(examRepository.findById(examId)).thenReturn(Optional.of(exam));

        Optional<Exam> foundExam = examService.getExamById(examId);

        assertTrue(foundExam.isPresent());
        assertEquals(examId, foundExam.get().getId());
    }
}