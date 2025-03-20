package com.miage.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "grades")
public class Grade {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    @JsonIgnore
    private User student;

    @ManyToOne
    @JoinColumn(name = "exam_id", nullable = false)
    private Exam exam;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false) // 🔥 Ajout du cours
    private Course course;

    @Column(nullable = false)
    private double score; // Note de l'examen

    public Grade() {}

    public Grade(User student, Course course, Exam exam,  double score) {
        this.student = student;
        this.exam = exam;
        this.score = score;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public User getStudent() { return student; }
    public void setStudent(User student) { this.student = student; }

    public Exam getExam() { return exam; }
    public void setExam(Exam exam) { this.exam = exam; }

    public double getScore() { return score; }
    public void setScore(double score) { this.score = score; }

    public Course getCourse() { return course; } // 🔥 Ajout du cours
    public void setCourse(Course course) { this.course = course; } // 🔥 Ajout du cours
}
