package com.examsphere.backend.dto;

public class LeaderboardEntryDTO {
    private Long userId;
    private String fullName;
    private int totalScore;
    private int testsAttempted;
    private double averageScore;
    private int rank;

    public LeaderboardEntryDTO(Long userId, String fullName, int totalScore, int testsAttempted, double averageScore) {
        this.userId = userId; this.fullName = fullName; this.totalScore = totalScore;
        this.testsAttempted = testsAttempted; this.averageScore = averageScore;
    }

    public Long getUserId() { return userId; }
    public String getFullName() { return fullName; }
    public int getTotalScore() { return totalScore; }
    public int getTestsAttempted() { return testsAttempted; }
    public double getAverageScore() { return averageScore; }
    public int getRank() { return rank; }
    public void setRank(int rank) { this.rank = rank; }
}
