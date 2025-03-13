
package com.miage.backend.repository;

import com.miage.backend.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CourseRepository extends JpaRepository<Course, UUID> {
    Optional<Course> findByTitle(String title);
    // Trouver les cours dispensés par un enseignant (via la relation Exam -> Teacher)
    //List<Course> findByExams_Teacher_Id(UUID teacherId);
    List<Course> findByStudents_Id(UUID studentId);
}
