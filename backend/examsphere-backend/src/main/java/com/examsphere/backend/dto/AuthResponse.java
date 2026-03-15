package com.examsphere.backend.dto;

public class AuthResponse {
    private String token;
    private String role;
    private Long id;
    private String fullName;
    private String email;
    private String phone;
    private String exam;

    public AuthResponse(String token, String role, Long id, String fullName, String email, String phone, String exam) {
        this.token = token; this.role = role; this.id = id;
        this.fullName = fullName; this.email = email; this.phone = phone; this.exam = exam;
    }

    public String getToken() { return token; }
    public String getRole() { return role; }
    public Long getId() { return id; }
    public String getFullName() { return fullName; }
    public String getEmail() { return email; }
    public String getPhone() { return phone; }
    public String getExam() { return exam; }
}
