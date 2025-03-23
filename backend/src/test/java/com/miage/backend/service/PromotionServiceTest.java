package com.miage.backend.service;

import com.miage.backend.entity.Course;
import com.miage.backend.entity.Exam;
import com.miage.backend.entity.Promotion;
import com.miage.backend.entity.User;
import com.miage.backend.repository.PromotionRepository;
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

class PromotionServiceTest {

    @Mock
    private PromotionRepository promotionRepository;

    @InjectMocks
    private PromotionService promotionService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createPromotion() {
        Promotion promotion = new Promotion("Test Promotion");

        when(promotionRepository.save(any(Promotion.class))).thenReturn(promotion);

        Promotion createdPromotion = promotionService.createPromotion("Test Promotion");

        assertNotNull(createdPromotion);
        assertEquals("Test Promotion", createdPromotion.getName());
    }

    @Test
    void getAllPromotions() {
        when(promotionRepository.findAll()).thenReturn(List.of(new Promotion()));

        List<Promotion> promotions = promotionService.getAllPromotions();

        assertFalse(promotions.isEmpty());
    }

    @Test
    void getPromotionById() {
        UUID promotionId = UUID.randomUUID();
        Promotion promotion = new Promotion();

        when(promotionRepository.findById(promotionId)).thenReturn(Optional.of(promotion));

        Optional<Promotion> foundPromotion = promotionService.getPromotionById(promotionId);

        assertTrue(foundPromotion.isPresent());
    }

    @Test
    void addStudentToPromotion() {
        Promotion promotion = new Promotion();
        User student = new User();

        when(promotionRepository.save(any(Promotion.class))).thenReturn(promotion);

        Promotion updatedPromotion = promotionService.addStudentToPromotion(promotion, student);

        assertNotNull(updatedPromotion);
        assertTrue(updatedPromotion.getStudents().contains(student));
    }

    @Test
    void addCourseToPromotion() {
        Promotion promotion = new Promotion();
        Course course = new Course();

        when(promotionRepository.save(any(Promotion.class))).thenReturn(promotion);

        Promotion updatedPromotion = promotionService.addCourseToPromotion(promotion, course);

        assertNotNull(updatedPromotion);
        assertTrue(updatedPromotion.getCourses().contains(course));
    }

    @Test
    void addExamToPromotion() {
        Promotion promotion = new Promotion();
        Exam exam = new Exam();

        when(promotionRepository.save(any(Promotion.class))).thenReturn(promotion);

        Promotion updatedPromotion = promotionService.addExamToPromotion(promotion, exam);

        assertNotNull(updatedPromotion);
        assertTrue(updatedPromotion.getExams().contains(exam));
    }

    @Test
    void deletePromotion() {
        UUID promotionId = UUID.randomUUID();

        doNothing().when(promotionRepository).deleteById(promotionId);

        promotionService.deletePromotion(promotionId);

        verify(promotionRepository, times(1)).deleteById(promotionId);
    }
}