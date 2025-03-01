package com.miage.backend.service;

import com.miage.backend.entity.Notification;
import com.miage.backend.exception.ResourceNotFoundException;
import com.miage.backend.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public Notification createNotification(Notification notification) {
        notification.setTimestamp(new Date());
        notification.setRead(false);
        return notificationRepository.save(notification);
    }

    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    public Notification getNotificationById(UUID id) {
        return notificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notification non trouvée pour l'ID: " + id));
    }

    public Notification markAsRead(UUID id) {
        Notification notification = getNotificationById(id);
        notification.setRead(true);
        return notificationRepository.save(notification);
    }

    public void deleteNotification(UUID id) {
        notificationRepository.deleteById(id);
    }
}
