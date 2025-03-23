package com.miage.backend.repository;

import com.miage.backend.entity.Notification;
import com.miage.backend.entity.User;
import com.miage.backend.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, UUID> {
    List<Notification> findByUserId(UUID userId);
    List<Notification> findByUserAndUserRole(User user, Role role);
}
