package com.miage.backend.service;

import com.miage.backend.entity.Grade;
import com.miage.backend.entity.User;
import com.miage.backend.entity.Course;
import com.miage.backend.entity.Exam;
import com.miage.backend.repository.GradeRepository;
import com.miage.backend.repository.UserRepository;
import com.miage.backend.repository.CourseRepository;
import com.miage.backend.repository.ExamRepository;
import com.miage.backend.service.GradeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class GradeServiceTest {

    @Mock
    private GradeRepository gradeRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private CourseRepository courseRepository;

    @Mock
    private ExamRepository examRepository;

    @InjectMocks
    private GradeService gradeService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void addGrade() {
        UUID studentId = UUID.randomUUID();
        UUID courseId = UUID.randomUUID();
        UUID examId = UUID.randomUUID();
        double score = 95.0;

        User student = new User();
        student.setId(studentId);
        Course course = new Course();
        course.setId(courseId);
        Exam exam = new Exam();
        exam.setId(examId);

        when(userRepository.findById(studentId)).thenReturn(Optional.of(student));
        when(courseRepository.findById(courseId)).thenReturn(Optional.of(course));
        when(examRepository.findById(examId)).thenReturn(Optional.of(exam));
        when(gradeRepository.save(any(Grade.class))).thenReturn(new Grade(student, course, exam, score));

        Grade grade = gradeService.addGrade(studentId, courseId, examId, score);

        assertNotNull(grade);
        assertEquals(score, grade.getScore());
    }

    @Test
    void updateGrade() {
        UUID gradeId = UUID.randomUUID();
        double newScore = 85.0;
        Grade grade = new Grade();
        grade.setId(gradeId);
        grade.setScore(90.0);

        when(gradeRepository.findById(gradeId)).thenReturn(Optional.of(grade));
        when(gradeRepository.save(any(Grade.class))).thenReturn(grade);

        Grade updatedGrade = gradeService.updateGrade(gradeId, newScore);

        assertNotNull(updatedGrade);
        assertEquals(newScore, updatedGrade.getScore());
    }

    @Test
    void getGradesByStudent() {
        UUID studentId = UUID.randomUUID();
        when(gradeRepository.findByStudentId(studentId)).thenReturn(List.of(new Grade()));

        assertFalse(gradeService.getGradesByStudent(studentId).isEmpty());
    }
}