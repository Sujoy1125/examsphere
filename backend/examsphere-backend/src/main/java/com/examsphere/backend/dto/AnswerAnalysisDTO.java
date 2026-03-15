package com.examsphere.backend.dto;

public class AnswerAnalysisDTO {
    private Long questionId;
    private String questionText;
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
    private String correctOption;
    private String selectedOption;
    private boolean correct;
    private String explanation;

    public AnswerAnalysisDTO(Long questionId, String questionText, String optionA, String optionB,
                              String optionC, String optionD, String correctOption,
                              String selectedOption, boolean correct, String explanation) {
        this.questionId = questionId;
        this.questionText = questionText;
        this.optionA = optionA; this.optionB = optionB;
        this.optionC = optionC; this.optionD = optionD;
        this.correctOption = correctOption;
        this.selectedOption = selectedOption;
        this.correct = correct;
        this.explanation = explanation;
    }

    public Long getQuestionId() { return questionId; }
    public String getQuestionText() { return questionText; }
    public String getOptionA() { return optionA; }
    public String getOptionB() { return optionB; }
    public String getOptionC() { return optionC; }
    public String getOptionD() { return optionD; }
    public String getCorrectOption() { return correctOption; }
    public String getSelectedOption() { return selectedOption; }
    public boolean isCorrect() { return correct; }
    public String getExplanation() { return explanation; }
}
