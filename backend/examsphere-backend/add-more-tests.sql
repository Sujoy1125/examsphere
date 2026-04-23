-- ============================================================
-- ExamSphere: Add 8 More Tests with 25 Questions Each
-- Total: 200 new questions across 6 subjects
-- Run this in pgAdmin after creating the database
-- ============================================================

-- Insert subjects (if not already present)
INSERT INTO subjects (name, icon) VALUES
('Mathematics', 'calculate'),
('Physics', 'science'),
('Chemistry', 'experiment'),
('Biology', 'microbiology'),
('Computer Science', 'terminal'),
('English Literature', 'menu_book'),
('History', 'clock')
ON CONFLICT (name) DO NOTHING;

-- Get subject IDs into variables (PostgreSQL doesn't have variables, so we use subqueries)
-- Tests will reference subjects by name via subquery

-- ============================================================
-- TEST 1: Advanced Calculus (Mathematics - Hard - 60 min)
-- ============================================================
INSERT INTO tests (title, subject_id, duration_minutes, difficulty, active)
SELECT 'Advanced Calculus', id, 60, 'Hard', true FROM subjects WHERE name = 'Mathematics';

INSERT INTO questions (test_id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation) VALUES
((SELECT id FROM tests WHERE title = 'Advanced Calculus'), 'What is the derivative of sin(x)?', 'cos(x)', '-cos(x)', '-sin(x)', 'sin(x)', 'A', 'd/dx[sin(x)] = cos(x)'),
((SELECT id FROM tests WHERE title = 'Advanced Calculus'), 'Evaluate the integral of x² dx.', 'x³/3 + C', 'x³ + C', '2x + C', 'x²/2 + C', 'A', '∫xⁿ dx = x^(n+1)/(n+1) + C, so ∫x² dx = x³/3 + C'),
((SELECT id FROM tests WHERE title = 'Advanced Calculus'), 'What is the limit of (sin x)/x as x approaches 0?', '0', '1', '∞', 'Does not exist', 'B', 'This is a standard limit: lim(x→0) sin(x)/x = 1'),
((SELECT id FROM tests WHERE title = 'Advanced Calculus'), 'Find the derivative of e^(2x).', 'e^(2x)', '2e^(2x)', 'e^x', '2e^x', 'B', 'Using chain rule: d/dx[e^(2x)] = e^(2x) · 2 = 2e^(2x)'),
((SELECT id FROM tests WHERE title = 'Advanced Calculus'), 'What is the second derivative of x³?', '3x²', '6x', '6', 'x²', 'C', 'First derivative: 3x², Second derivative: 6x, Third derivative: 6'),
((SELECT id FROM tests WHERE title = 'Advanced Calculus'), 'Evaluate ∫(1/x) dx.', 'ln|x| + C', 'x²/2 + C', '1/x² + C', 'e^x + C', 'A', 'The integral of 1/x is the natural logarithm of the absolute value of x'),
((SELECT id FROM tests WHERE title = 'Advanced Calculus'), 'What is the derivative of ln(x)?', 'x', '1/x', 'e^x', 'ln(x)', 'B', 'd/dx[ln(x)] = 1/x'),
((SELECT id FROM tests WHERE title = 'Advanced Calculus'), 'Find the critical points of f(x) = x³ - 3x².', 'x = 0, 2', 'x = 1, 3', 'x = -1, 1', 'x = 0, 3', 'A', 'f''(x) = 3x² - 6x = 3x(x-2), so critical points at x = 0 and x = 2'),
((SELECT id FROM tests WHERE title = 'Advanced Calculus'), 'What is the Taylor series expansion of e^x around x = 0?', '1 + x + x²/2! + x³/3! + ...', '1 - x + x²/2! - x³/3! + ...', 'x + x² + x³ + ...', '1 + x + x² + x³ + ...', 'A', 'The Taylor series for e^x is the sum of x^n/n! for n = 0 to infinity'),
((SELECT id FROM tests WHERE title = 'Advanced Calculus'), 'Evaluate the definite integral ∫₀¹ x dx.', '0', '1/2', '1', '2', 'B', '∫₀¹ x dx = [x²/2]₀¹ = 1/2 - 0 = 1/2'),
((SELECT id FROM tests WHERE title = 'Advanced Calculus'), 'What is the derivative of tan(x)?', 'sec(x)', 'sec²(x)', 'cot(x)', 'csc²(x)', 'B', 'd/dx[tan(x)] = sec²(x)'),
((SELECT id FROM tests WHERE title = 'Advanced Calculus'), 'Find the partial derivative of f(x,y) = x²y with respect to x.', '2xy', 'x²', 'y', '2x', 'A', '∂f/∂x = 2xy (treat y as constant)'),
((SELECT id FROM tests WHERE title = 'Advanced Calculus'), 'What is the gradient of f(x,y) = x² + y²?', '(2x, 2y)', '(x, y)', '(2, 2)', '(x², y²)', 'A', '∇f = (∂f/∂x, ∂f/∂y) = (2x, 2y)'),
((SELECT id FROM tests WHERE title = 'Advanced Calculus'), 'Evaluate lim(x→∞) (1 + 1/x)^x.', '0', '1', 'e', '∞', 'C', 'This is the definition of e: lim(x→∞) (1 + 1/x)^x = e'),
((SELECT id FROM tests WHERE title = 'Advanced Calculus'), 'What is the derivative of arcsin(x)?', '1/√(1-x²)', '-1/√(1-x²)', '1/(1+x²)', '1/√(1+x²)', 'A', 'd/dx[arcsin(x)] = 1/√(1-x²)'),
((SELECT id FROM tests WHERE title = 'Advanced Calculus'), 'Find the volume of a sphere with radius r using integration.', '(4/3)πr³', '4πr²', 'πr²', '(2/3)πr³', 'A', 'V = ∫∫∫ dV = (4/3)πr³ using spherical coordinates'),
((SELECT id FROM tests WHERE title = 'Advanced Calculus'), 'What is the Laplace transform of 1?', '1/s', 's', '1', '1/s²', 'A', 'L{1} = 1/s for s > 0'),
((SELECT id FROM tests WHERE title = 'Advanced Calculus'), 'Evaluate ∫ e^x sin(x) dx using integration by parts.', '(e^x/2)(sin x - cos x) + C', 'e^x sin x + C', 'e^x cos x + C', '(e^x/2)(sin x + cos x) + C', 'A', 'Using integration by parts twice and solving for the integral'),
((SELECT id FROM tests WHERE title = 'Advanced Calculus'), 'What is the divergence of the vector field F = (x, y, z)?', '0', '1', '3', 'x + y + z', 'C', '∇·F = ∂x/∂x + ∂y/∂y + ∂z/∂z = 1 + 1 + 1 = 3'),
((SELECT id FROM tests WHERE title = 'Advanced Calculus'), 'Find the Fourier series coefficient a₀ for f(x) = x on [-π, π].', '0', 'π', '2π', '1', 'A', 'a₀ = (1/π)∫_{-π}^{π} x dx = 0 since x is an odd function'),
((SELECT id FROM tests WHERE title = 'Advanced Calculus'), 'What is the curl of F = (-y, x, 0)?', '(0, 0, 2)', '(0, 0, 0)', '(1, 1, 0)', '(0, 0, -2)', 'A', '∇×F = (0, 0, ∂x/∂x - ∂(-y)/∂y) = (0, 0, 1 + 1) = (0, 0, 2)'),
((SELECT id FROM tests WHERE title = 'Advanced Calculus'), 'Evaluate the double integral ∫₀¹∫₀¹ (x + y) dx dy.', '1', '1/2', '2', '0', 'A', '∫₀¹∫₀¹ (x + y) dx dy = ∫₀¹ [x²/2 + xy]₀¹ dy = ∫₀¹ (1/2 + y) dy = [y/2 + y²/2]₀¹ = 1'),
((SELECT id FROM tests WHERE title = 'Advanced Calculus'), 'What is the Jacobian determinant for polar coordinates?', 'r', '1', 'r²', '1/r', 'A', 'J = ∂(x,y)/∂(r,θ) = r for x = r cos θ, y = r sin θ'),
((SELECT id FROM tests WHERE title = 'Advanced Calculus'), 'Find the sum of the series Σ(1/n²) from n=1 to ∞.', 'π²/6', 'π²/3', 'π/6', '1', 'A', 'This is the Basel problem: Σ(1/n²) = π²/6'),
((SELECT id FROM tests WHERE title = 'Advanced Calculus'), 'What is the Gamma function Γ(1/2)?', '√π', 'π', '1', 'π/2', 'A', 'Γ(1/2) = √π, a well-known result');

-- ============================================================
-- TEST 2: Linear Algebra (Mathematics - Medium - 45 min)
-- ============================================================
INSERT INTO tests (title, subject_id, duration_minutes, difficulty, active)
SELECT 'Linear Algebra', id, 45, 'Medium', true FROM subjects WHERE name = 'Mathematics';

INSERT INTO questions (test_id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation) VALUES
((SELECT id FROM tests WHERE title = 'Linear Algebra'), 'What is the determinant of a 2x2 matrix [[a,b],[c,d]]?', 'ad - bc', 'ad + bc', 'ab - cd', 'ab + cd', 'A', 'For a 2x2 matrix, det = ad - bc'),
((SELECT id FROM tests WHERE title = 'Linear Algebra'), 'If A is a 3x3 matrix with det(A) = 5, what is det(2A)?', '10', '40', '25', '30', 'B', 'det(kA) = kⁿ det(A) for n×n matrix. So det(2A) = 2³ · 5 = 40'),
((SELECT id FROM tests WHERE title = 'Linear Algebra'), 'What is the rank of the identity matrix I₃?', '0', '1', '2', '3', 'D', 'The identity matrix I₃ has full rank = 3'),
((SELECT id FROM tests WHERE title = 'Linear Algebra'), 'Two vectors are orthogonal if their dot product is:', '1', '0', '-1', 'undefined', 'B', 'Vectors are orthogonal when their dot product equals zero'),
((SELECT id FROM tests WHERE title = 'Linear Algebra'), 'What is the eigenvalue of [[2,0],[0,3]]?', '2 and 3', '1 and 2', '3 and 4', '0 and 1', 'A', 'For diagonal matrices, eigenvalues are the diagonal entries: 2 and 3'),
((SELECT id FROM tests WHERE title = 'Linear Algebra'), 'The null space of a matrix is also called:', 'Row space', 'Column space', 'Kernel', 'Image', 'C', 'The null space (solutions to Ax=0) is also called the kernel'),
((SELECT id FROM tests WHERE title = 'Linear Algebra'), 'A matrix is symmetric if:', 'A = Aᵀ', 'A = -A', 'A = A⁻¹', 'A = 0', 'A', 'A symmetric matrix equals its transpose: A = Aᵀ'),
((SELECT id FROM tests WHERE title = 'Linear Algebra'), 'What is the trace of [[1,2],[3,4]]?', '5', '4', '3', '10', 'A', 'Trace = sum of diagonal elements = 1 + 4 = 5'),
((SELECT id FROM tests WHERE title = 'Linear Algebra'), 'If A and B are invertible, then (AB)⁻¹ = ?', 'A⁻¹B⁻¹', 'B⁻¹A⁻¹', 'AB', 'BA', 'B', '(AB)⁻¹ = B⁻¹A⁻¹ (reverse order)'),
((SELECT id FROM tests WHERE title = 'Linear Algebra'), 'The dimension of the column space is called:', 'Nullity', 'Rank', 'Trace', 'Determinant', 'B', 'The dimension of the column space is the rank of the matrix'),
((SELECT id FROM tests WHERE title = 'Linear Algebra'), 'A set of vectors is linearly independent if:', 'One vector is a multiple of another', 'No vector can be written as a combination of others', 'All vectors are zero', 'All vectors are parallel', 'B', 'Linear independence means no vector is a linear combination of the others'),
((SELECT id FROM tests WHERE title = 'Linear Algebra'), 'What is the characteristic equation used for?', 'Finding eigenvalues', 'Finding determinant', 'Finding inverse', 'Finding rank', 'A', 'The characteristic equation det(A - λI) = 0 is used to find eigenvalues'),
((SELECT id FROM tests WHERE title = 'Linear Algebra'), 'The Gram-Schmidt process is used to:', 'Find eigenvalues', 'Orthogonalize vectors', 'Find determinant', 'Solve systems', 'B', 'Gram-Schmidt orthogonalizes a set of vectors to create an orthonormal basis'),
((SELECT id FROM tests WHERE title = 'Linear Algebra'), 'If a matrix has eigenvalue λ=0, then:', 'It is invertible', 'It is singular (non-invertible)', 'It is symmetric', 'It is diagonal', 'B', 'A zero eigenvalue means det(A) = 0, so the matrix is singular'),
((SELECT id FROM tests WHERE title = 'Linear Algebra'), 'What is the dimension of ℝ³?', '1', '2', '3', '4', 'C', 'ℝ³ is 3-dimensional space'),
((SELECT id FROM tests WHERE title = 'Linear Algebra'), 'A projection matrix P satisfies:', 'P² = P', 'P² = I', 'P = I', 'P = 0', 'A', 'Projection matrices are idempotent: P² = P'),
((SELECT id FROM tests WHERE title = 'Linear Algebra'), 'The singular values of a matrix are:', 'Eigenvalues of A', 'Square roots of eigenvalues of AᵀA', 'Determinants', 'Traces', 'B', 'Singular values are the square roots of eigenvalues of AᵀA'),
((SELECT id FROM tests WHERE title = 'Linear Algebra'), 'Cramer''s rule is used to:', 'Find eigenvalues', 'Solve linear systems using determinants', 'Find matrix inverse', 'Compute rank', 'B', 'Cramer''s rule solves Ax = b using determinants of matrices'),
((SELECT id FROM tests WHERE title = 'Linear Algebra'), 'A basis for a vector space must:', 'Be linearly dependent', 'Span the space and be linearly independent', 'Contain the zero vector', 'Have exactly 2 vectors', 'B', 'A basis must span the space and be linearly independent'),
((SELECT id FROM tests WHERE title = 'Linear Algebra'), 'The transpose of a product (AB)ᵀ equals:', 'AᵀBᵀ', 'BᵀAᵀ', 'AB', 'BA', 'B', '(AB)ᵀ = BᵀAᵀ (reverse order)'),
((SELECT id FROM tests WHERE title = 'Linear Algebra'), 'What is the determinant of an orthogonal matrix?', '0', '1 or -1', 'Any real number', 'Always 1', 'B', 'For orthogonal matrices, det(Q) = ±1'),
((SELECT id FROM tests WHERE title = 'Linear Algebra'), 'The row echelon form is used to:', 'Find eigenvectors', 'Solve systems and find rank', 'Compute determinants', 'Find inverses only', 'B', 'Row echelon form helps solve linear systems and determine rank'),
((SELECT id FROM tests WHERE title = 'Linear Algebra'), 'If v is an eigenvector of A with eigenvalue λ, then A²v = ?', 'λv', 'λ²v', '2λv', 'v/λ', 'B', 'A²v = A(Av) = A(λv) = λ(Av) = λ²v'),
((SELECT id FROM tests WHERE title = 'Linear Algebra'), 'A positive definite matrix has all eigenvalues:', 'Negative', 'Zero', 'Positive', 'Complex', 'C', 'Positive definite matrices have all positive eigenvalues'),
((SELECT id FROM tests WHERE title = 'Linear Algebra'), 'The cross product of two vectors in ℝ³ results in:', 'A scalar', 'A vector orthogonal to both', 'A matrix', 'A complex number', 'B', 'The cross product a × b gives a vector perpendicular to both a and b');

-- ============================================================
-- TEST 3: Probability & Statistics (Mathematics - Medium - 50 min)
-- ============================================================
INSERT INTO tests (title, subject_id, duration_minutes, difficulty, active)
SELECT 'Probability & Statistics', id, 50, 'Medium', true FROM subjects WHERE name = 'Mathematics';

INSERT INTO questions (test_id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation) VALUES
((SELECT id FROM tests WHERE title = 'Probability & Statistics'), 'What is the probability of rolling a 6 on a fair die?', '1/3', '1/6', '1/2', '1/12', 'B', 'A fair die has 6 equally likely outcomes, so P(6) = 1/6'),
((SELECT id FROM tests WHERE title = 'Probability & Statistics'), 'The expected value of a fair coin flip (Heads=1, Tails=0) is:', '0', '0.5', '1', '2', 'B', 'E[X] = (1)(1/2) + (0)(1/2) = 0.5'),
((SELECT id FROM tests WHERE title = 'Probability & Statistics'), 'If events A and B are independent, P(A∩B) = ?', 'P(A) + P(B)', 'P(A) · P(B)', 'P(A) - P(B)', 'P(A) / P(B)', 'B', 'For independent events: P(A∩B) = P(A) · P(B)'),
((SELECT id FROM tests WHERE title = 'Probability & Statistics'), 'What is the variance of a standard normal distribution?', '0', '0.5', '1', '2', 'C', 'Standard normal distribution N(0,1) has variance = 1'),
((SELECT id FROM tests WHERE title = 'Probability & Statistics'), 'The Central Limit Theorem states that:', 'Sample mean equals population mean', 'Sample means approach normal distribution for large n', 'All distributions are normal', 'Variance equals zero', 'B', 'CLT: Sample means approach N(μ, σ²/n) as n → ∞'),
((SELECT id FROM tests WHERE title = 'Probability & Statistics'), 'What is the standard deviation of {2, 4, 6, 8, 10}?', '2√2', '2', '4', '√10', 'A', 'Mean = 6, Variance = [(16+4+0+4+16)/5] = 8, SD = √8 = 2√2'),
((SELECT id FROM tests WHERE title = 'Probability & Statistics'), 'Bayes'' theorem relates:', 'Mean and median', 'Conditional probabilities', 'Variance and SD', 'Mode and range', 'B', 'Bayes'' theorem: P(A|B) = P(B|A)P(A)/P(B)'),
((SELECT id FROM tests WHERE title = 'Probability & Statistics'), 'A p-value less than 0.05 typically means:', 'Accept null hypothesis', 'Reject null hypothesis', 'No conclusion', 'Increase sample size', 'B', 'p < 0.05 indicates statistical significance; reject null hypothesis'),
((SELECT id FROM tests WHERE title = 'Probability & Statistics'), 'The binomial distribution models:', 'Continuous data', 'Number of successes in n trials', 'Normal data', 'Time between events', 'B', 'Binomial: count of successes in n independent Bernoulli trials'),
((SELECT id FROM tests WHERE title = 'Probability & Statistics'), 'What is the mode of {1, 2, 2, 3, 4, 4, 4, 5}?', '2', '3', '4', '5', 'C', 'Mode is the most frequent value: 4 appears 3 times'),
((SELECT id FROM tests WHERE title = 'Probability & Statistics'), 'The correlation coefficient ranges from:', '0 to 1', '-1 to 1', '-∞ to ∞', '0 to ∞', 'B', 'Correlation coefficient r ∈ [-1, 1]'),
((SELECT id FROM tests WHERE title = 'Probability & Statistics'), 'If X ~ N(μ, σ²), then (X-μ)/σ follows:', 'N(0, 1)', 'N(μ, σ)', 'Uniform(0,1)', 'Exponential(1)', 'A', 'Standardization: Z = (X-μ)/σ ~ N(0, 1)'),
((SELECT id FROM tests WHERE title = 'Probability & Statistics'), 'What does a 95% confidence interval mean?', '95% of data falls in the interval', 'We are 95% confident the true parameter is in the interval', 'The mean is 95%', 'The sample size is 95', 'B', 'A 95% CI means 95% of such intervals contain the true parameter'),
((SELECT id FROM tests WHERE title = 'Probability & Statistics'), 'The Poisson distribution models:', 'Binary outcomes', 'Count of events in fixed interval', 'Continuous measurements', 'Normal data', 'B', 'Poisson models the number of events in a fixed interval of time/space'),
((SELECT id FROM tests WHERE title = 'Probability & Statistics'), 'What is the median of {3, 1, 4, 1, 5, 9, 2}?', '1', '2', '3', '4', 'C', 'Sorted: {1, 1, 2, 3, 4, 5, 9}, median (middle value) = 3'),
((SELECT id FROM tests WHERE title = 'Probability & Statistics'), 'Type I error is:', 'Failing to reject false null', 'Rejecting true null hypothesis', 'Accepting true alternative', 'Correct decision', 'B', 'Type I error = false positive = rejecting H₀ when it is true'),
((SELECT id FROM tests WHERE title = 'Probability & Statistics'), 'The law of large numbers states:', 'Sample size must be large', 'Sample mean converges to population mean', 'All samples are normal', 'Variance decreases to zero', 'B', 'LLN: As n → ∞, sample mean converges to expected value'),
((SELECT id FROM tests WHERE title = 'Probability & Statistics'), 'What is the probability of getting exactly 2 heads in 3 coin flips?', '1/8', '3/8', '1/2', '5/8', 'B', 'C(3,2)(1/2)²(1/2)¹ = 3 · (1/8) = 3/8'),
((SELECT id FROM tests WHERE title = 'Probability & Statistics'), 'A random variable with E[X] = 0 and Var(X) = 1 is:', 'Standardized', 'Normal', 'Binomial', 'Poisson', 'A', 'A variable with mean 0 and variance 1 is standardized'),
((SELECT id FROM tests WHERE title = 'Probability & Statistics'), 'The chi-square test is used for:', 'Comparing means', 'Testing independence of categorical variables', 'Regression analysis', 'Correlation', 'B', 'Chi-square test tests independence between categorical variables'),
((SELECT id FROM tests WHERE title = 'Probability & Statistics'), 'What is the interquartile range (IQR)?', 'Q3 - Q1', 'Q1 - Q3', 'Max - Min', 'Mean - Median', 'A', 'IQR = Q3 - Q1 (third quartile minus first quartile)'),
((SELECT id FROM tests WHERE title = 'Probability & Statistics'), 'If P(A) = 0.3 and P(B) = 0.4, and A,B are mutually exclusive, P(A∪B) = ?', '0.7', '0.12', '0.1', '1.0', 'A', 'For mutually exclusive events: P(A∪B) = P(A) + P(B) = 0.3 + 0.4 = 0.7'),
((SELECT id FROM tests WHERE title = 'Probability & Statistics'), 'The t-distribution is used when:', 'Population variance is known', 'Population variance is unknown and sample size is small', 'Sample size is very large', 'Data is categorical', 'B', 't-distribution is used for small samples with unknown population variance'),
((SELECT id FROM tests WHERE title = 'Probability & Statistics'), 'What is the sum of probabilities of all outcomes in a sample space?', '0', '0.5', '1', '∞', 'C', 'By definition, total probability of all outcomes = 1'),
((SELECT id FROM tests WHERE title = 'Probability & Statistics'), 'Regression analysis is used to:', 'Test independence', 'Model relationship between variables', 'Find probability', 'Calculate variance', 'B', 'Regression models the relationship between dependent and independent variables');
