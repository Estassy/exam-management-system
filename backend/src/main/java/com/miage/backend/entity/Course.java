package com.miage.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.miage.backend.enums.CourseStatus;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "courses")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false)
    private String title;

    private LocalDateTime date;

    @Enumerated(EnumType.STRING)
    private CourseStatus status = CourseStatus.PENDING;

    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinTable(
            name = "course_students",
            joinColumns = @JoinColumn(name = "course_id"),
            inverseJoinColumns = @JoinColumn(name = "student_id")
    )
    private Set<User> students = new HashSet<>();


    @ManyToMany
    @JoinTable(
            name = "course_promotion",
            joinColumns = @JoinColumn(name = "course_id"),
            inverseJoinColumns = @JoinColumn(name = "promotion_id")
    )
//     @JsonIgnore
    private Set<Promotion> promotions = new HashSet<>();

    @OneToMany(mappedBy = "course")
    @JsonIgnore
    private Set<Exam> exams;

    @ManyToOne
    @JoinColumn(name = "teacher_id", nullable = true)
    private User teacher;



    public Course() {}

    // Getters et Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public LocalDateTime getDate() { return date; }
    public void setDate(LocalDateTime date) { this.date = date; }

    public CourseStatus getStatus() { return status; }
    public void setStatus(CourseStatus status) { this.status = status; }

    public Set<User> getStudents() { return students; }
    public void setStudents(Set<User> students) { this.students = students; }

    public Set<Promotion> getPromotions() { return promotions; }
    public void setPromotions(Set<Promotion> promotions) { this.promotions = promotions; }

    public Set<Exam> getExams() { return exams; }
    public void setExams(Set<Exam> exams) { this.exams = exams; }

    public User getTeacher() { return teacher; }
    public void setTeacher(User teacher) { this.teacher = teacher; }
}
