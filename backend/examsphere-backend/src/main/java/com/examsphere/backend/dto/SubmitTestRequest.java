package com.examsphere.backend.dto;

import java.util.Map;

public class SubmitTestRequest {
    private Long testId;
    private Map<Long, String> answers; // questionId -> "A"/"B"/"C"/"D"
    private long timeTakenSeconds;

    public Long getTestId() { return testId; }
    public void setTestId(Long testId) { this.testId = testId; }
    public Map<Long, String> getAnswers() { return answers; }
    public void setAnswers(Map<Long, String> answers) { this.answers = answers; }
    public long getTimeTakenSeconds() { return timeTakenSeconds; }
    public void setTimeTakenSeconds(long timeTakenSeconds) { this.timeTakenSeconds = timeTakenSeconds; }
}
