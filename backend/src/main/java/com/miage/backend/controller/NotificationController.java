package com.miage.backend.controller;

import com.miage.backend.entity.Notification;
import com.miage.backend.enums.Role;
import com.miage.backend.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    /**
     * 🔹 Récupérer toutes les notifications d'un utilisateur par son `userId`
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Notification>> getNotificationsByUserId(@PathVariable UUID userId) {
        return ResponseEntity.ok(notificationService.getNotificationsByUserId(userId));
    }

    /**
     * 🔹 Envoyer une notification à un utilisateur spécifique
     */
    @PostMapping("/send")
    public ResponseEntity<Notification> sendNotification(
            @RequestParam UUID userId,
            @RequestParam String message) {
        return ResponseEntity.ok(notificationService.createNotification(userId, message));
    }

    /**
     * 🔹 Envoyer une notification à tous les utilisateurs ayant un rôle donné (Etudiants, Enseignants, Admins)
     */
    @PostMapping("/send-to-role")
    public ResponseEntity<String> sendNotificationToRole(
            @RequestParam Role role,
            @RequestParam String message) {
        notificationService.sendNotificationToRole(role, message);
        return ResponseEntity.ok("✅ Notification envoyée aux " + role + "s.");
    }

    /**
     * 🔹 Récupérer une notification par son `id`
     */
    @GetMapping("/{id}")
    public ResponseEntity<Notification> getNotificationById(@PathVariable UUID id) {
        return ResponseEntity.ok(notificationService.getNotificationById(id));
    }

    /**
     * 🔹 Marquer une notification comme lue
     */
    @PutMapping("/{id}/read")
    public ResponseEntity<Notification> markAsRead(@PathVariable UUID id) {
        return ResponseEntity.ok(notificationService.markAsRead(id));
    }

    /**
     * 🔹 Supprimer une notification
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotification(@PathVariable UUID id) {
        notificationService.deleteNotification(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Notification>> getNotifications(@PathVariable UUID studentId) {
        return ResponseEntity.ok(notificationService.getNotificationsByStudentId(studentId));
    }
}
