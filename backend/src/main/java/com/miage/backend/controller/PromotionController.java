package com.miage.backend.controller;

import com.miage.backend.entity.Course;
import com.miage.backend.entity.Exam;
import com.miage.backend.entity.Promotion;
import com.miage.backend.entity.User;
import com.miage.backend.repository.PromotionRepository;
import com.miage.backend.service.PromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/promotions")
public class PromotionController {

    @Autowired
    private PromotionService promotionService;

    @Autowired
    private PromotionRepository promotionRepository;

    // Créer une promotion
    @PostMapping("/create")
    public Promotion createPromotion(@RequestParam String name) {
        return promotionService.createPromotion(name);
    }

    // Récupérer toutes les promotions
    @GetMapping("/all")
    public List<Map<String, Object>> getAllPromotions() {
        List<Promotion> promotions = promotionRepository.findAll();

        // Convertir chaque promotion en une version simplifiée
        return promotions.stream().map(promotion -> {
            Map<String, Object> simplifiedPromotion = new HashMap<>();
            simplifiedPromotion.put("id", promotion.getId());
            simplifiedPromotion.put("name", promotion.getName());
            return simplifiedPromotion;
        }).toList();
    }

    // Récupérer une promotion par ID
    @GetMapping("/{id}")
    public Optional<Promotion> getPromotionById(@PathVariable UUID id) {
        return promotionService.getPromotionById(id);
    }

    //  Associer un étudiant à une promotion
    @PostMapping("/{promoId}/add-student")
    public Promotion addStudentToPromotion(@PathVariable UUID promoId, @RequestBody User student) {
        Promotion promotion = promotionService.getPromotionById(promoId).orElseThrow();
        return promotionService.addStudentToPromotion(promotion, student);
    }

    // ✅ Associer un cours à une promotion
    @PostMapping("/{promoId}/add-course")
    public Promotion addCourseToPromotion(@PathVariable UUID promoId, @RequestBody Course course) {
        Promotion promotion = promotionService.getPromotionById(promoId).orElseThrow();
        return promotionService.addCourseToPromotion(promotion, course);
    }

    // ✅ Associer un examen à une promotion
    @PostMapping("/{promoId}/add-exam")
    public Promotion addExamToPromotion(@PathVariable UUID promoId, @RequestBody Exam exam) {
        Promotion promotion = promotionService.getPromotionById(promoId).orElseThrow();
        return promotionService.addExamToPromotion(promotion, exam);
    }

    // ✅ Supprimer une promotion
    @DeleteMapping("/{id}")
    public void deletePromotion(@PathVariable UUID id) {
        promotionService.deletePromotion(id);
    }
}
