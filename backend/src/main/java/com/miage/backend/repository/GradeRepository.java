package com.miage.backend.repository;

import com.miage.backend.entity.Course;
import com.miage.backend.entity.Exam;
import com.miage.backend.entity.Grade;
import com.miage.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface GradeRepository extends JpaRepository<Grade, UUID> {
    List<Grade> findByStudentId(UUID studentId);
    List<Grade> findByExamId(UUID examId);
    Optional<Grade> findByStudentAndCourse(User student, Course course);
    Optional<Grade> findByStudentAndExam(User student, Exam exam);



}
