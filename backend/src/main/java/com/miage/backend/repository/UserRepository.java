package com.miage.backend.repository;

import com.miage.backend.entity.Promotion;
import com.miage.backend.entity.User;
import com.miage.backend.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    List<User> findByRole(Role role);
    User findByUsername(String username);
    @Query("SELECT u FROM User u WHERE u.promotion = :promotion")
    List<User> findByPromotion(@Param("promotion") Promotion promotion);

}
