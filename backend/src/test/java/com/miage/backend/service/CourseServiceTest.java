package com.miage.backend.service;

import com.miage.backend.entity.Course;
import com.miage.backend.entity.User;
import com.miage.backend.enums.CourseStatus;
import com.miage.backend.repository.CourseRepository;
import com.miage.backend.repository.UserRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class CourseServiceTest {

    @Mock
    private CourseRepository courseRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private CourseService courseService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createCourse() {
        Course course = new Course();
        course.setTitle("Test Course");
        UUID teacherId = UUID.randomUUID();
        User teacher = new User();
        teacher.setId(teacherId);

        when(userRepository.findById(teacherId)).thenReturn(Optional.of(teacher));
        when(courseRepository.save(any(Course.class))).thenReturn(course);

        Course createdCourse = courseService.createCourse(course, teacherId);

        assertNotNull(createdCourse);
        assertEquals("Test Course", createdCourse.getTitle());
    }

    @Test
    void updateCourseStatus() {
        UUID courseId = UUID.randomUUID();
        Course course = new Course();
        course.setId(courseId);
        course.setStatus(CourseStatus.PENDING);

        when(courseRepository.findById(courseId)).thenReturn(Optional.of(course));
        when(courseRepository.save(any(Course.class))).thenReturn(course);

        Course updatedCourse = courseService.updateCourseStatus(courseId, CourseStatus.ONGOING);

        assertNotNull(updatedCourse);
        assertEquals(CourseStatus.ONGOING, updatedCourse.getStatus());
    }

    @Test
    void deleteCourse() {
        UUID courseId = UUID.randomUUID();
        when(courseRepository.existsById(courseId)).thenReturn(true);

        courseService.deleteCourse(courseId);

        verify(courseRepository, times(1)).deleteById(courseId);
    }

    @Test
    void getCourseById() {
        UUID courseId = UUID.randomUUID();
        Course course = new Course();
        course.setId(courseId);

        when(courseRepository.findById(courseId)).thenReturn(Optional.of(course));

        Optional<Course> foundCourse = courseService.getCourseById(courseId);

        assertTrue(foundCourse.isPresent());
        assertEquals(courseId, foundCourse.get().getId());
    }
}