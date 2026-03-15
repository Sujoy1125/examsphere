package com.examsphere.backend.controller;

import com.examsphere.backend.dto.AttemptResultDTO;
import com.examsphere.backend.dto.LeaderboardEntryDTO;
import com.examsphere.backend.dto.SubmitTestRequest;
import com.examsphere.backend.dto.AnswerAnalysisDTO;
import com.examsphere.backend.service.TestAttemptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/attempts")
@CrossOrigin(origins = "http://localhost:5173")
public class TestAttemptController {

    @Autowired private TestAttemptService attemptService;

    @PostMapping("/submit")
    public ResponseEntity<AttemptResultDTO> submitTest(Authentication auth, @RequestBody SubmitTestRequest request) {
        return ResponseEntity.ok(attemptService.submitTest(auth.getName(), request));
    }

    @GetMapping("/my")
    public ResponseEntity<List<AttemptResultDTO>> getMyAttempts(Authentication auth) {
        return ResponseEntity.ok(attemptService.getMyAttempts(auth.getName()));
    }

    @GetMapping("/{attemptId}/answers")
    public ResponseEntity<List<AnswerAnalysisDTO>> getAttemptAnswers(@PathVariable Long attemptId, Authentication auth) {
        return ResponseEntity.ok(attemptService.getAttemptAnswers(attemptId, auth.getName()));
    }

    @GetMapping("/leaderboard")
    public ResponseEntity<List<LeaderboardEntryDTO>> getLeaderboard() {
        return ResponseEntity.ok(attemptService.getLeaderboard());
    }
}
