package com.miage.backend.service;

import com.miage.backend.entity.Course;
import com.miage.backend.entity.Exam;
import com.miage.backend.entity.Promotion;
import com.miage.backend.entity.User;
import com.miage.backend.repository.PromotionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PromotionService {

    @Autowired
    private PromotionRepository promotionRepository;

    // Créer une promotion
    public Promotion createPromotion(String name) {
        Promotion promotion = new Promotion(name);
        return promotionRepository.save(promotion);
    }

    // Récupérer toutes les promotions
    public List<Promotion> getAllPromotions() {
        return promotionRepository.findAll();
    }

    // Récupérer une promotion par ID
    public Optional<Promotion> getPromotionById(UUID id) {
        return promotionRepository.findById(id);
    }

    // Associer un étudiant à une promotion
    public Promotion addStudentToPromotion(Promotion promotion, User student) {
        promotion.getStudents().add(student);
        return promotionRepository.save(promotion);
    }

    // Associer un cours à une promotion
    public Promotion addCourseToPromotion(Promotion promotion, Course course) {
        promotion.getCourses().add(course);
        return promotionRepository.save(promotion);
    }

    // Associer un examen à une promotion
    public Promotion addExamToPromotion(Promotion promotion, Exam exam) {
        promotion.getExams().add(exam);
        return promotionRepository.save(promotion);
    }

    // Supprimer une promotion
    public void deletePromotion(UUID id) {
        promotionRepository.deleteById(id);
    }
}
