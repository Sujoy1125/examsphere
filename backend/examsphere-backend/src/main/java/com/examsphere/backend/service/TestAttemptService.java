package com.examsphere.backend.service;

import com.examsphere.backend.dto.AttemptResultDTO;
import com.examsphere.backend.dto.AnswerAnalysisDTO;
import com.examsphere.backend.dto.LeaderboardEntryDTO;
import com.examsphere.backend.dto.SubmitTestRequest;
import com.examsphere.backend.model.*;
import com.examsphere.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class TestAttemptService {

    @Autowired private TestAttemptRepository attemptRepository;
    @Autowired private AttemptAnswerRepository answerRepository;
    @Autowired private TestRepository testRepository;
    @Autowired private QuestionRepository questionRepository;
    @Autowired private UserRepository userRepository;

    public AttemptResultDTO submitTest(String email, SubmitTestRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Test test = testRepository.findById(request.getTestId())
                .orElseThrow(() -> new RuntimeException("Test not found"));

        List<Question> questions = questionRepository.findByTestId(test.getId());
        Map<Long, String> submittedAnswers = request.getAnswers();

        int correct = 0, wrong = 0, skipped = 0;
        List<AttemptAnswer> answerEntities = new ArrayList<>();

        for (Question q : questions) {
            String submitted = submittedAnswers.get(q.getId());
            AttemptAnswer aa = new AttemptAnswer();
            aa.setQuestion(q);
            aa.setSelectedOption(submitted);

            if (submitted == null || submitted.isEmpty()) {
                skipped++;
                aa.setCorrect(false);
            } else if (submitted.equalsIgnoreCase(q.getCorrectOption())) {
                correct++;
                aa.setCorrect(true);
            } else {
                wrong++;
                aa.setCorrect(false);
            }
            answerEntities.add(aa);
        }

        int score = correct * 4 - wrong; // +4 correct, -1 wrong
        if (score < 0) score = 0;

        TestAttempt attempt = new TestAttempt();
        attempt.setUser(user);
        attempt.setTest(test);
        attempt.setScore(score);
        attempt.setTotalQuestions(questions.size());
        attempt.setCorrectAnswers(correct);
        attempt.setWrongAnswers(wrong);
        attempt.setSkippedAnswers(skipped);
        attempt.setTimeTakenSeconds(request.getTimeTakenSeconds());
        TestAttempt saved = attemptRepository.save(attempt);

        for (AttemptAnswer aa : answerEntities) {
            aa.setAttempt(saved);
        }
        answerRepository.saveAll(answerEntities);

        String subject = test.getSubject() != null ? test.getSubject().getName() : "General";
        return new AttemptResultDTO(saved.getId(), test.getId(), test.getTitle(), subject,
                score, questions.size(), correct, wrong, skipped,
                request.getTimeTakenSeconds(), saved.getAttemptedAt());
    }

    public List<AttemptResultDTO> getMyAttempts(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return attemptRepository.findByUserIdOrderByAttemptedAtDesc(user.getId()).stream()
                .map(a -> {
                    String subject = a.getTest().getSubject() != null ? a.getTest().getSubject().getName() : "General";
                    return new AttemptResultDTO(a.getId(), a.getTest().getId(), a.getTest().getTitle(),
                            subject, a.getScore(), a.getTotalQuestions(), a.getCorrectAnswers(),
                            a.getWrongAnswers(), a.getSkippedAnswers(), a.getTimeTakenSeconds(), a.getAttemptedAt());
                })
                .collect(Collectors.toList());
    }

    public List<AnswerAnalysisDTO> getAttemptAnswers(Long attemptId, String email) {
        TestAttempt attempt = attemptRepository.findById(attemptId)
                .orElseThrow(() -> new RuntimeException("Attempt not found"));
        if (!attempt.getUser().getEmail().equals(email))
            throw new RuntimeException("Access denied");
        return answerRepository.findByAttemptId(attemptId).stream()
                .map(aa -> {
                    Question q = aa.getQuestion();
                    return new AnswerAnalysisDTO(
                        q.getId(), q.getQuestionText(),
                        q.getOptionA(), q.getOptionB(), q.getOptionC(), q.getOptionD(),
                        q.getCorrectOption(), aa.getSelectedOption(), aa.isCorrect(),
                        q.getExplanation()
                    );
                })
                .collect(Collectors.toList());
    }

    public List<LeaderboardEntryDTO> getLeaderboard() {
        List<TestAttempt> all = attemptRepository.findAll();
        Map<Long, LeaderboardEntryDTO> map = new LinkedHashMap<>();

        for (TestAttempt a : all) {
            Long uid = a.getUser().getId();
            if (!map.containsKey(uid)) {
                map.put(uid, new LeaderboardEntryDTO(uid, a.getUser().getFullName(), 0, 0, 0));
            }
            LeaderboardEntryDTO entry = map.get(uid);
            entry.setRank(entry.getRank()); // placeholder — will re-rank below
        }

        // Recompute totals
        Map<Long, int[]> stats = new HashMap<>(); // userId -> [totalScore, count]
        for (TestAttempt a : all) {
            Long uid = a.getUser().getId();
            stats.computeIfAbsent(uid, k -> new int[]{0, 0});
            stats.get(uid)[0] += a.getScore();
            stats.get(uid)[1]++;
        }

        List<LeaderboardEntryDTO> result = new ArrayList<>();
        for (TestAttempt a : all) {
            Long uid = a.getUser().getId();
            if (!map.containsKey(uid)) continue;
            int[] s = stats.get(uid);
            double avg = s[1] > 0 ? (double) s[0] / s[1] : 0;
            result.add(new LeaderboardEntryDTO(uid, a.getUser().getFullName(), s[0], s[1], avg));
            map.remove(uid);
        }

        result.sort((a, b) -> b.getTotalScore() - a.getTotalScore());
        for (int i = 0; i < result.size(); i++) result.get(i).setRank(i + 1);
        return result;
    }

    public List<AttemptResultDTO> getAllAttempts() {
        return attemptRepository.findAll().stream()
                .map(a -> {
                    String subject = a.getTest().getSubject() != null ? a.getTest().getSubject().getName() : "General";
                    return new AttemptResultDTO(a.getId(), a.getTest().getId(), a.getTest().getTitle(),
                            subject, a.getScore(), a.getTotalQuestions(), a.getCorrectAnswers(),
                            a.getWrongAnswers(), a.getSkippedAnswers(), a.getTimeTakenSeconds(), a.getAttemptedAt());
                })
                .collect(Collectors.toList());
    }
}
