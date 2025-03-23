package com.miage.backend.dto;


import java.util.UUID;

public class GradeDTO {
    private UUID examId;
    private String examTitle;
    private double score;
    private double trend; // facultatif
    private double promotionAverage;


    //Getters et Setters
    public UUID getExamId() {
        return examId;
    }

    public void setExamId(UUID examId) {
        this.examId = examId;
    }

    public String getExamTitle() {
        return examTitle;
    }

    public void setExamTitle(String examTitle) {
        this.examTitle = examTitle;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }

    public double getTrend() {
        return trend;
    }

    public void setTrend(double trend) {
        this.trend = trend;
    }

    public double getPromotionAverage() {
        return promotionAverage;
    }

    public void setPromotionAverage(double promotionAverage) {
        this.promotionAverage = promotionAverage;
    }


}
