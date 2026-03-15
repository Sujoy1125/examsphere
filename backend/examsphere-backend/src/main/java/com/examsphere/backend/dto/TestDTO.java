package com.examsphere.backend.dto;

public class TestDTO {
    private Long id;
    private String title;
    private String subject;
    private int durationMinutes;
    private String difficulty;
    private boolean active;
    private int questionCount;

    public TestDTO(Long id, String title, String subject, int durationMinutes, String difficulty, boolean active, int questionCount) {
        this.id = id; this.title = title; this.subject = subject;
        this.durationMinutes = durationMinutes; this.difficulty = difficulty;
        this.active = active; this.questionCount = questionCount;
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getSubject() { return subject; }
    public int getDurationMinutes() { return durationMinutes; }
    public String getDifficulty() { return difficulty; }
    public boolean isActive() { return active; }
    public int getQuestionCount() { return questionCount; }
}
