package com.miage.backend.service;

import com.miage.backend.entity.Promotion;
import com.miage.backend.entity.User;
import com.miage.backend.enums.Role;
import com.miage.backend.repository.PromotionRepository;
import com.miage.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private PromotionRepository promotionRepository;

    public User createUser(String username, String password, Role role, String firstName, String lastName, UUID promotionId) {
        if (firstName == null || firstName.trim().isEmpty()) {
            throw new IllegalArgumentException("Le prénom ne peut pas être vide !");
        }
        if (lastName == null || lastName.trim().isEmpty()) {
            throw new IllegalArgumentException("Le nom de famille ne peut pas être vide !");
        }

        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setActive(true); // Par défaut, utilisateur actif

        // 🏷️ Ajout de la promotion si elle est définie
        if (promotionId != null) {
            Promotion promotion = promotionRepository.findById(promotionId)
                    .orElseThrow(() -> new RuntimeException("Promotion non trouvée avec l'ID : " + promotionId));
            user.setPromotion(promotion);
            System.out.println("✅ Promotion associée : " + promotion.getName());
        } else {
            System.out.println("⚠️ Aucune promotion définie.");
        }

        return userRepository.save(user);
    }



    public List<User> getAllUsers() {
        List<User> users = userRepository.findAll();

        for (User user : users) {
            if (user.getPromotion() != null) {
                Promotion promotion = user.getPromotion();
                user.setPromotion(new Promotion(promotion.getId(), promotion.getName())); // ✅ Assure que seule l'ID et le nom sont envoyés
            }
        }

        return users;
    }



    public Optional<User> getUserById(UUID id) {
        return userRepository.findById(id);
    }

    @Transactional
    public User updateUser(UUID id, String username, String firstName, String lastName, String password, Role role, UUID promotionId) {
        return userRepository.findById(id).map(existingUser -> {
            existingUser.setUsername(username);
            existingUser.setFirstName(firstName);
            existingUser.setLastName(lastName);

            if (promotionId != null) {
                Promotion promotion = promotionRepository.findById(promotionId)
                        .orElseThrow(() -> new RuntimeException("Promotion non trouvée avec l'ID : " + promotionId));
                existingUser.setPromotion(promotion);
            } else {
                existingUser.setPromotion(null);
            }

            if (password != null && !password.isEmpty()) {
                existingUser.setPassword(passwordEncoder.encode(password));
            }

            existingUser.setRole(role);

            // 🔥 Sauvegarder d'abord les modifications
            userRepository.save(existingUser);

            // 🔥 Charger l'utilisateur mis à jour avec la promotion
            User updatedUser = userRepository.findById(existingUser.getId())
                    .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé après mise à jour"));

            // ✅ Charger explicitement la promotion avant de renvoyer l'utilisateur
            Hibernate.initialize(updatedUser.getPromotion());

            return updatedUser; // ✅ Retourne l'utilisateur avec la promotion
        }).orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
    }


    public void deleteUser(UUID id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        if (user.getRole() == Role.ADMIN) {
            throw new RuntimeException("Impossible de supprimer un administrateur.");
        }
        userRepository.deleteById(id);
    }


    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
