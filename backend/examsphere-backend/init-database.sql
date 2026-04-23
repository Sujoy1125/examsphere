-- ============================================================
-- ExamSphere Database Initialization Script
-- Run this in pgAdmin Query Tool after creating 'examsphere' DB
-- ============================================================

-- 1. users table
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(255) NOT NULL,
    exam VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL
);

-- 2. subjects table
CREATE TABLE IF NOT EXISTS subjects (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    icon VARCHAR(255)
);

-- 3. tests table
CREATE TABLE IF NOT EXISTS tests (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subject_id BIGINT,
    duration_minutes INTEGER,
    difficulty VARCHAR(50),
    active BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_tests_subject FOREIGN KEY (subject_id) REFERENCES subjects(id)
);

-- 4. questions table
CREATE TABLE IF NOT EXISTS questions (
    id BIGSERIAL PRIMARY KEY,
    test_id BIGINT NOT NULL,
    question_text TEXT NOT NULL,
    option_a VARCHAR(255) NOT NULL,
    option_b VARCHAR(255) NOT NULL,
    option_c VARCHAR(255) NOT NULL,
    option_d VARCHAR(255) NOT NULL,
    correct_option VARCHAR(255) NOT NULL,
    explanation TEXT,
    CONSTRAINT fk_questions_test FOREIGN KEY (test_id) REFERENCES tests(id) ON DELETE CASCADE
);

-- 5. test_attempts table
CREATE TABLE IF NOT EXISTS test_attempts (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    test_id BIGINT NOT NULL,
    score INTEGER,
    total_questions INTEGER,
    correct_answers INTEGER,
    wrong_answers INTEGER,
    skipped_answers INTEGER,
    time_taken_seconds BIGINT,
    attempted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_attempts_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_attempts_test FOREIGN KEY (test_id) REFERENCES tests(id)
);

-- 6. attempt_answers table
CREATE TABLE IF NOT EXISTS attempt_answers (
    id BIGSERIAL PRIMARY KEY,
    attempt_id BIGINT NOT NULL,
    question_id BIGINT NOT NULL,
    selected_option VARCHAR(255),
    correct BOOLEAN,
    CONSTRAINT fk_answers_attempt FOREIGN KEY (attempt_id) REFERENCES test_attempts(id) ON DELETE CASCADE,
    CONSTRAINT fk_answers_question FOREIGN KEY (question_id) REFERENCES questions(id)
);

-- ============================================================
-- Sample Data (Optional - for testing)
-- ============================================================

-- Insert sample subjects
INSERT INTO subjects (name, icon) VALUES
('Mathematics', 'calculator'),
('Science', 'flask'),
('English', 'book'),
('History', 'clock');

-- Insert sample tests
INSERT INTO tests (title, subject_id, duration_minutes, difficulty, active) VALUES
('Algebra Basics', 1, 30, 'Easy', true),
('Calculus I', 1, 45, 'Medium', true),
('Physics Fundamentals', 2, 30, 'Medium', true),
('Chemistry Basics', 2, 30, 'Easy', true),
('Grammar Test', 3, 20, 'Easy', true),
('World History', 4, 40, 'Hard', true);

-- Insert sample questions for 'Algebra Basics' (test_id = 1)
INSERT INTO questions (test_id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation) VALUES
(1, 'What is the value of x in 2x + 4 = 10?', '2', '3', '4', '5', 'B', 'Subtract 4 from both sides: 2x = 6, then divide by 2: x = 3'),
(1, 'Simplify: 3(x + 2) - 2x', 'x + 6', 'x + 2', '5x + 6', 'x - 6', 'A', 'Expand: 3x + 6 - 2x = x + 6'),
(1, 'What is the square root of 144?', '10', '11', '12', '13', 'C', '12 × 12 = 144'),
(1, 'Solve: 5x - 3 = 2x + 9', '3', '4', '5', '6', 'B', 'Subtract 2x: 3x - 3 = 9, add 3: 3x = 12, divide by 3: x = 4'),
(1, 'What is the value of 2³?', '4', '6', '8', '9', 'C', '2³ = 2 × 2 × 2 = 8');

-- Insert sample questions for 'Physics Fundamentals' (test_id = 3)
INSERT INTO questions (test_id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation) VALUES
(3, 'What is the SI unit of force?', 'Watt', 'Newton', 'Joule', 'Pascal', 'B', 'The Newton (N) is the SI unit of force'),
(3, 'What is the speed of light in vacuum?', '3 × 10⁸ m/s', '3 × 10⁶ m/s', '3 × 10¹⁰ m/s', '3 × 10⁴ m/s', 'A', 'Speed of light c ≈ 299,792,458 m/s ≈ 3 × 10⁸ m/s'),
(3, 'Which law states that every action has an equal and opposite reaction?', 'First Law', 'Second Law', 'Third Law', 'Fourth Law', 'C', 'Newton''s Third Law of Motion');

-- Insert an admin user (password: admin123)
-- NOTE: In production, use BCrypt hashed passwords
INSERT INTO users (full_name, email, phone, exam, password, role) VALUES
('Admin User', 'admin@examsphere.com', '1234567890', 'Admin', '$2b$10$n9RQvYMxaKTdOr0g/27U.OZlqBCI3UF9oLuwXr21EweqXOh9UqzQG', 'ADMIN');

