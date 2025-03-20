
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
    List<Course> findByTeacherId(UUID teacherId);
    List<Course> findByStudents_Id(UUID studentId);
}
