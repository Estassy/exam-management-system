package com.miage.backend.repository;

import com.miage.backend.entity.Exam;
import com.miage.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ExamRepository extends JpaRepository<Exam, UUID> {
    Optional<Exam> findFirstByTeacherOrderByDateAsc(User teacher);
    List<Exam> findByStudentsIdAndDateAfter(UUID studentId, LocalDateTime now);
    boolean existsByCourseIdAndDate(UUID courseId, LocalDateTime date);
}
