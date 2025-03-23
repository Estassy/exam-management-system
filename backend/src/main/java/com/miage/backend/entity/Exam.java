package com.miage.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.miage.backend.enums.ExamStatus;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "exams")
public class Exam {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false)
    private String title;

    private LocalDateTime date;

    @Enumerated(EnumType.STRING)
    private ExamStatus status = ExamStatus.PENDING;

    @ManyToOne
    @JoinColumn(name = "teacher_id", nullable = true)
    private User teacher;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @ManyToMany
    @JoinTable(
            name = "exam_students",
            joinColumns = @JoinColumn(name = "exam_id"),
            inverseJoinColumns = @JoinColumn(name = "student_id")
    )
    private Set<User> students = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "exam_promotion",
            joinColumns = @JoinColumn(name = "exam_id"),
            inverseJoinColumns = @JoinColumn(name = "promotion_id")
    )
    private Set<Promotion> promotions = new HashSet<>();

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(
            name = "exam_questions",
            joinColumns = @JoinColumn(name = "exam_id"),
            inverseJoinColumns = @JoinColumn(name = "question_id")
    )

    private Set<Question> questions = new HashSet<>();


    @ManyToOne
    @JoinColumn(name = "exam_template_id", nullable = true)
    @JsonIgnore
    private ExamTemplate examTemplate;

    public Exam() {}

    // Getters et Setters

    public Set<Question> getQuestions() { return questions; }
    public void setQuestions(Set<Question> questions) { this.questions = questions; }

    public ExamTemplate getExamTemplate() { return examTemplate; }
    public void setExamTemplate(ExamTemplate examTemplate) { this.examTemplate = examTemplate; }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public LocalDateTime getDate() { return date; }
    public void setDate(LocalDateTime date) { this.date = date; }

    public ExamStatus getStatus() { return status; }
    public void setStatus(ExamStatus status) { this.status = status; }

    public User getTeacher() { return teacher; }
    public void setTeacher(User teacher) { this.teacher = teacher; }

    public Course getCourse() { return course; }
    public void setCourse(Course course) { this.course = course; }

    public Set<User> getStudents() { return students; }
    public void setStudents(Set<User> students) { this.students = students; }

    public Set<Promotion> getPromotions() { return promotions; }
    public void setPromotions(Set<Promotion> promotions) { this.promotions = promotions; }
}
