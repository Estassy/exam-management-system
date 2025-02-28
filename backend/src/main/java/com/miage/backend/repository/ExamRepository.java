package com.miage.backend.repository;

import com.miage.backend.entity.Exam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ExamRepository extends JpaRepository<Exam, UUID> {
    Optional<Exam> findFirstByTeacherOrderByDateAsc(String teacher);
}
