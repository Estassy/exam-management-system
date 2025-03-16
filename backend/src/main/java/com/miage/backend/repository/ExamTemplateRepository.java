package com.miage.backend.repository;

import com.miage.backend.entity.ExamTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ExamTemplateRepository extends JpaRepository<ExamTemplate, UUID> {
}
