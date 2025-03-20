package com.miage.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "promotions")
public class Promotion implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(unique = true, nullable = false)
    private String name;

    @JsonIgnore
    @OneToMany(mappedBy = "promotion", fetch = FetchType.LAZY)
    private Set<User> students = new HashSet<>();

    @ManyToMany(mappedBy = "promotions")
    @JsonIgnore
    private Set<Course> courses = new HashSet<>();

    @ManyToMany(mappedBy = "promotions")
    @JsonIgnore
    private Set<Exam> exams = new HashSet<>();

    public Promotion() {}

    public Promotion(String name) {
        this.name = name;
    }

    public Promotion(UUID id, String name) {
        this.id = id;
        this.name = name;
    }

    // Getters et Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Set<User> getStudents() { return students; }
    public void setStudents(Set<User> students) { this.students = students; }

    public Set<Course> getCourses() { return courses; }
    public void setCourses(Set<Course> courses) { this.courses = courses; }

    public Set<Exam> getExams() { return exams; }
    public void setExams(Set<Exam> exams) { this.exams = exams; }
}
