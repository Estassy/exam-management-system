package com.miage.backend.entity;

import jakarta.persistence.*;
import java.util.*;

@Entity
@Table(name = "exams")
public class Exam {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String title;

    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    private String teacher; // Vous pouvez aussi utiliser une relation vers l'entité User pour l'enseignant

    @ManyToMany
    @JoinTable(name = "exam_students",
            joinColumns = @JoinColumn(name = "exam_id"),
            inverseJoinColumns = @JoinColumn(name = "student_id"))

    private Set<User> students = new HashSet<>();

    public Exam() {
        // Initialisation de la collection
        this.students = new HashSet<>();
    }

    // Getters et Setters
    public UUID getId() {
        return id;
    }
    public void setId(UUID id) {
        this.id = id;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public Date getDate() {
        return date;
    }
    public void setDate(Date date) {
        this.date = date;
    }
    public String getTeacher() {
        return teacher;
    }
    public void setTeacher(String teacher) {
        this.teacher = teacher;
    }
    public Set<User> getStudents() {
        return students;
    }
    public void setStudents(Set<User> students) {
        this.students = students;
    }
}
