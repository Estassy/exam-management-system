package com.miage.backend.service;

import com.miage.backend.entity.Notification;
import com.miage.backend.entity.User;
import com.miage.backend.exception.ResourceNotFoundException;
import com.miage.backend.repository.NotificationRepository;
import com.miage.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class NotificationService {

    private static final Logger logger = LoggerFactory.getLogger(NotificationService.class);

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * 🔹 Récupérer toutes les notifications d'un utilisateur
     */
    public List<Notification> getNotificationsByUserId(UUID userId) {
        return notificationRepository.findByUserId(userId);
    }

    /**
     * 🔹 Créer une notification pour un utilisateur spécifique
     */
    public Notification createNotification(UUID userId, String message) {
        Notification notification = new Notification();
        notification.setUserId(userId);
        notification.setMessage(message);
        notification.setTimestamp(new Date());
        notification.setRead(false);
        return notificationRepository.save(notification);
    }

    /**
     * 🔹 Récupérer une notification par ID
     */
    public Notification getNotificationById(UUID id) {
        return notificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("❌ Notification non trouvée pour l'ID: " + id));
    }

    /**
     * 🔹 Envoyer une notification à tous les utilisateurs d'un rôle donné
     */
    public void sendNotificationToRole(String role, String message) {
        List<User> users = userRepository.findByRole(role);

        if (users.isEmpty()) {
            logger.warn("⚠ Aucun utilisateur trouvé pour le rôle : {}", role);
            return;
        }

        for (User user : users) {
            createNotification(user.getId(), message);
        }

        logger.info("✅ Notification envoyée à {} utilisateurs avec le rôle : {}", users.size(), role);
    }

    /**
     * 🔹 Marquer une notification comme lue
     */
    public Notification markAsRead(UUID id) {
        Notification notification = getNotificationById(id);
        notification.setRead(true);
        return notificationRepository.save(notification);
    }

    /**
     * 🔹 Supprimer une notification
     */
    public void deleteNotification(UUID id) {
        if (!notificationRepository.existsById(id)) {
            throw new ResourceNotFoundException("❌ Impossible de supprimer. Notification non trouvée pour ID: " + id);
        }
        notificationRepository.deleteById(id);
    }
}
