-- ============================================================
-- Add More Tests with 25 Questions Each
-- Run this in pgAdmin after the initial setup
-- ============================================================

-- Test 4: Advanced Mathematics (subject_id = 1)
INSERT INTO tests (title, subject_id, duration_minutes, difficulty, active) VALUES
('Advanced Algebra', 1, 60, 'Hard', true);

-- 25 Questions for Advanced Algebra (test_id = 4)
INSERT INTO questions (test_id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation) VALUES
(4, 'If x² + 5x + 6 = 0, what are the values of x?', '1 and 6', '2 and 3', '-2 and -3', '-1 and -6', 'C', 'Factor: (x+2)(x+3)=0, so x=-2 or x=-3'),
(4, 'What is the derivative of f(x) = 3x² + 2x + 1?', '6x + 2', '3x + 2', '6x + 1', '3x² + 2', 'A', 'Using power rule: d/dx(3x²)=6x, d/dx(2x)=2'),
(4, 'Solve for x: 2^(x+1) = 16', '2', '3', '4', '5', 'B', '16 = 2⁴, so x+1=4, x=3'),
(4, 'What is the sum of the first 20 positive integers?', '200', '210', '220', '190', 'B', 'Formula: n(n+1)/2 = 20×21/2 = 210'),
(4, 'If log₂(x) = 5, what is x?', '16', '25', '32', '10', 'C', 'x = 2⁵ = 32'),
(4, 'What is the value of sin(30°)?', '0.5', '0.707', '0.866', '1', 'A', 'sin(30°) = 1/2 = 0.5'),
(4, 'Find the equation of a line with slope 3 passing through (1, 2)', 'y = 3x + 1', 'y = 3x - 1', 'y = 3x + 2', 'y = x + 3', 'B', 'y - 2 = 3(x - 1) → y = 3x - 1'),
(4, 'What is the discriminant of x² - 4x + 4 = 0?', '0', '4', '8', '16', 'A', 'D = b² - 4ac = 16 - 16 = 0'),
(4, 'If f(x) = x³ - 3x², find f''(x)', '3x² - 6x', 'x² - 3x', '3x² - 3x', '3x - 6', 'A', 'f''(x) = 3x² - 6x'),
(4, 'What is the value of cos(60°)?', '0.5', '0.707', '0.866', '0', 'A', 'cos(60°) = 1/2 = 0.5'),
(4, 'Solve: |2x - 4| = 6', 'x = 5 only', 'x = -1 only', 'x = 5 or x = -1', 'x = 1 or x = 5', 'C', '2x-4=6 → x=5, or 2x-4=-6 → x=-1'),
(4, 'What is the period of sin(2x)?', 'π', '2π', 'π/2', '4π', 'A', 'Period of sin(x) is 2π, so sin(2x) has period 2π/2 = π'),
(4, 'If a triangle has sides 3, 4, 5, what is its area?', '6', '12', '10', '7.5', 'A', 'Right triangle: area = ½ × 3 × 4 = 6'),
(4, 'What is the value of e⁰?', '0', '1', 'e', 'undefined', 'B', 'Any number to the power 0 equals 1'),
(4, 'Find the inverse of f(x) = 2x + 3', 'f⁻¹(x) = (x-3)/2', 'f⁻¹(x) = x/2 - 3', 'f⁻¹(x) = 2x - 3', 'f⁻¹(x) = (x+3)/2', 'A', 'y = 2x+3 → x = (y-3)/2'),
(4, 'What is the sum of interior angles of a hexagon?', '540°', '720°', '360°', '900°', 'B', 'Formula: (n-2)×180° = 4×180° = 720°'),
(4, 'If tan(θ) = 1, what is θ in degrees?', '30°', '45°', '60°', '90°', 'B', 'tan(45°) = 1'),
(4, 'What is the limit of (x²-1)/(x-1) as x approaches 1?', '0', '1', '2', 'undefined', 'C', 'Factor: (x+1)(x-1)/(x-1) = x+1 → limit = 2'),
(4, 'Solve the system: x + y = 5, x - y = 1', 'x=2, y=3', 'x=3, y=2', 'x=4, y=1', 'x=1, y=4', 'B', 'Adding equations: 2x=6
