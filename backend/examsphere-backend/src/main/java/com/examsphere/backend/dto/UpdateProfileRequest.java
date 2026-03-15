package com.examsphere.backend.dto;

public class UpdateProfileRequest {
    private String fullName;
    private String phone;
    private String exam;

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getExam() { return exam; }
    public void setExam(String exam) { this.exam = exam; }
}
