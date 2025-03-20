package com.miage.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.miage.backend.enums.QuestionType;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "questions")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false)
    private String questionText;

    private String option1;
    private String option2;
    private String option3;
    private String option4;

    @Column(nullable = false)
    private String rightAnswer;

    @Enumerated(EnumType.STRING)
    private QuestionType type; // EXAM, QUIZ, TEMPLATE

    @ManyToMany(mappedBy = "questions")
    @JsonIgnore
    private Set<Exam> exams = new HashSet<>();

    @ManyToMany(mappedBy = "questions")
    @JsonIgnore
    private Set<Quiz> quizzes = new HashSet<>();

    @ManyToMany(mappedBy = "questions")
    @JsonIgnore
    private Set<ExamTemplate> templates = new HashSet<>();

    public Question() {}

    // Getters et Setters

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public String getOption1() {
        return option1;
    }

    public void setOption1(String option1) {
        this.option1 = option1;
    }

    public String getOption2() {
        return option2;
    }

    public void setOption2(String option2) {
        this.option2 = option2;
    }

    public String getOption3() {
        return option3;
    }

    public void setOption3(String option3) {
        this.option3 = option3;
    }

    public String getOption4() {
        return option4;
    }

    public void setOption4(String option4) {
        this.option4 = option4;
    }

    public String getRightAnswer() {
        return rightAnswer;
    }

    public void setRightAnswer(String rightAnswer) {
        this.rightAnswer = rightAnswer;
    }

    public QuestionType getType() {
        return type;
    }

    public void setType(QuestionType type) {
        this.type = type;
    }

    public Set<Exam> getExams() {
        return exams;
    }

    public void setExams(Set<Exam> exams) {
        this.exams = exams;
    }

    public Set<Quiz> getQuizzes() {
        return quizzes;
    }

    public void setQuizzes(Set<Quiz> quizzes) {
        this.quizzes = quizzes;
    }

    public Set<ExamTemplate> getTemplates() {
        return templates;
    }

    public void setTemplates(Set<ExamTemplate> templates) {
        this.templates = templates;
    }

}
