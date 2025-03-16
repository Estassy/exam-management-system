package com.miage.backend.repository;

import com.miage.backend.entity.QuizTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface QuizTemplateRepository extends JpaRepository<QuizTemplate, UUID> {
}
