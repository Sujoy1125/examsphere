package com.examsphere.backend.dto;

import java.time.LocalDateTime;

public class AttemptResultDTO {
    private Long attemptId;
    private Long testId;
    private String testTitle;
    private String subject;
    private int score;
    private int totalQuestions;
    private int correctAnswers;
    private int wrongAnswers;
    private int skippedAnswers;
    private long timeTakenSeconds;
    private LocalDateTime attemptedAt;

    public AttemptResultDTO(Long attemptId, Long testId, String testTitle, String subject,
                             int score, int totalQuestions, int correctAnswers, int wrongAnswers,
                             int skippedAnswers, long timeTakenSeconds, LocalDateTime attemptedAt) {
        this.attemptId = attemptId; this.testId = testId; this.testTitle = testTitle;
        this.subject = subject; this.score = score; this.totalQuestions = totalQuestions;
        this.correctAnswers = correctAnswers; this.wrongAnswers = wrongAnswers;
        this.skippedAnswers = skippedAnswers; this.timeTakenSeconds = timeTakenSeconds;
        this.attemptedAt = attemptedAt;
    }

    public Long getAttemptId() { return attemptId; }
    public Long getTestId() { return testId; }
    public String getTestTitle() { return testTitle; }
    public String getSubject() { return subject; }
    public int getScore() { return score; }
    public int getTotalQuestions() { return totalQuestions; }
    public int getCorrectAnswers() { return correctAnswers; }
    public int getWrongAnswers() { return wrongAnswers; }
    public int getSkippedAnswers() { return skippedAnswers; }
    public long getTimeTakenSeconds() { return timeTakenSeconds; }
    public LocalDateTime getAttemptedAt() { return attemptedAt; }
}
