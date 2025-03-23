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

    @Autowired
    private NotificationService notificationService;

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

        //  Ajout de la promotion si elle est définie
        if (promotionId != null) {
            Promotion promotion = promotionRepository.findById(promotionId)
                    .orElseThrow(() -> new RuntimeException("Promotion non trouvée avec l'ID : " + promotionId));
            user.setPromotion(promotion);
        } else {
            System.out.println("⚠️ Aucune promotion définie.");
        }

        User savedUser = userRepository.save(user);

        //  Envoi d'une notification aux professeurs si c'est un étudiant
        if (role == Role.STUDENT) {
            String message = "👨‍🎓 Nouvel étudiant inscrit : " + firstName + " " + lastName;
            notificationService.sendNotificationToRole(Role.TEACHER, message);
        }

        return savedUser;
    }



    public List<User> getAllUsers() {
        List<User> users = userRepository.findAll();

        for (User user : users) {
            if (user.getPromotion() != null) {
                Promotion promotion = user.getPromotion();
                user.setPromotion(new Promotion(promotion.getId(), promotion.getName()));
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
            boolean hasChanged = false;
            StringBuilder messageBuilder = new StringBuilder("ℹ️ Mise à jour de l'utilisateur : ");

            if (!existingUser.getUsername().equals(username)) {
                messageBuilder.append("👤 Nom d'utilisateur modifié. ");
                existingUser.setUsername(username);
                hasChanged = true;
            }

            if (!existingUser.getFirstName().equals(firstName)) {
                messageBuilder.append("🪪 Prénom changé. ");
                existingUser.setFirstName(firstName);
                hasChanged = true;
            }

            if (!existingUser.getLastName().equals(lastName)) {
                messageBuilder.append("🪪 Nom changé. ");
                existingUser.setLastName(lastName);
                hasChanged = true;
            }

            if (promotionId != null) {
                Promotion promotion = promotionRepository.findById(promotionId)
                        .orElseThrow(() -> new RuntimeException("Promotion non trouvée avec l'ID : " + promotionId));
                if (existingUser.getPromotion() == null || !existingUser.getPromotion().getId().equals(promotionId)) {
                    messageBuilder.append("🏷️ Promotion mise à jour. ");
                    existingUser.setPromotion(promotion);
                    hasChanged = true;
                }
            } else {
                if (existingUser.getPromotion() != null) {
                    messageBuilder.append("Promotion retirée. ");
                    existingUser.setPromotion(null);
                    hasChanged = true;
                }
            }

            if (password != null && !password.trim().isEmpty()) {
                existingUser.setPassword(passwordEncoder.encode(password));
                messageBuilder.append("🔒 Mot de passe changé. ");
                hasChanged = true;
            }


            if (!existingUser.getRole().equals(role)) {
                messageBuilder.append("🧩 Rôle modifié en ").append(role).append(". ");
                existingUser.setRole(role);
                hasChanged = true;
            }

            // 🔥 Sauvegarder si des changements ont eu lieu
            if (hasChanged) {
                userRepository.save(existingUser);

                String notifMessage = messageBuilder.toString();

                // 👨‍🏫 Notifier les admins si un étudiant est modifié, sinon notifier les profs
                if (role == Role.STUDENT) {
                    notificationService.sendNotificationToRole(Role.TEACHER, notifMessage);
                } else {
                    notificationService.sendNotificationToRole(Role.ADMIN, notifMessage);
                }
            }

            // 🔥 Recharger l'utilisateur mis à jour
            User updatedUser = userRepository.findById(existingUser.getId())
                    .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé après mise à jour"));
            Hibernate.initialize(updatedUser.getPromotion());

            return updatedUser;
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
