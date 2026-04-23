-- ============================================================
-- ExamSphere Sample Test Data - 6 Tests with 25+ Questions Each
-- Total: 180+ Questions
-- Run this AFTER init-database.sql (tables must exist first)
-- ============================================================

-- Reset sequences to ensure IDs start from 1 (run if needed)
-- ALTER SEQUENCE subjects_id_seq RESTART WITH 1;
-- ALTER SEQUENCE tests_id_seq RESTART WITH 1;
-- ALTER SEQUENCE questions_id_seq RESTART WITH 1;

-- ============================================================
-- STEP 1: Insert Subjects (Required for foreign key references)
-- ============================================================
INSERT INTO subjects (id, name, icon) VALUES
(1, 'Mathematics', 'calculate'),
(2, 'Physics', 'science'),
(3, 'Chemistry', 'experiment'),
(4, 'Biology', 'microbiology'),
(5, 'Computer Science', 'terminal'),
(6, 'English Literature', 'menu_book')
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- TEST 1: Mathematics - Advanced Calculus II (Medium, 60 min)
-- ============================================================
INSERT INTO tests (title, subject_id, duration_minutes, difficulty, active) VALUES
('Advanced Calculus II', 1, 60, 'Medium', true);

INSERT INTO questions (test_id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation) VALUES
(1, 'What is the derivative of f(x) = x³ + 2x² - 5x + 1?', '3x² + 4x - 5', '3x² + 2x - 5', 'x³ + 2x² - 5', '3x² + 4x + 1', 'A', 'Using power rule: d/dx[x³]=3x², d/dx[2x²]=4x, d/dx[-5x]=-5, d/dx[1]=0'),
(1, 'Evaluate the integral ∫(2x + 3) dx', 'x² + 3x + C', '2x² + 3x + C', 'x² + 3x', '2x² + C', 'A', '∫2x dx = x² and ∫3 dx = 3x, so answer is x² + 3x + C'),
(1, 'What is the limit of (sin x)/x as x approaches 0?', '0', '1', '∞', 'Does not exist', 'B', 'This is a standard limit result: lim(x→0) sin(x)/x = 1'),
(1, 'Find the second derivative of f(x) = e^(2x)', 'e^(2x)', '2e^(2x)', '4e^(2x)', '4x·e^(2x)', 'C', 'First derivative: 2e^(2x), Second derivative: 4e^(2x)'),
(1, 'What is the Taylor series expansion of e^x about x=0?', '1 + x + x²/2! + x³/3! + ...', '1 - x + x²/2! - x³/3! + ...', 'x + x² + x³ + ...', '1 + x + x² + x³ + ...', 'A', 'e^x = Σ(x^n/n!) = 1 + x + x²/2! + x³/3! + ...'),
(1, 'Evaluate ∫(0 to π) sin(x) dx', '0', '1', '2', '-2', 'C', '∫sin(x)dx = -cos(x), so [-cos(π)] - [-cos(0)] = [1] - [-1] = 2'),
(1, 'What is the derivative of ln(x)?', '1/x', 'x', 'e^x', '1/(x·ln(10))', 'A', 'd/dx[ln(x)] = 1/x for x > 0'),
(1, 'Find the critical points of f(x) = x³ - 3x²', 'x = 0, 2', 'x = 0, 3', 'x = 1, 2', 'x = 0 only', 'A', 'f''(x) = 3x² - 6x = 3x(x-2), so critical points at x = 0 and x = 2'),
(1, 'What is the divergence of the vector field F = (x², y², z²)?', '2x + 2y + 2z', 'x² + y² + z²', '2xy + 2yz + 2zx', 'x + y + z', 'A', '∇·F = ∂(x²)/∂x + ∂(y²)/∂y + ∂(z²)/∂z = 2x + 2y + 2z'),
(1, 'Evaluate the double integral ∫∫_R (x + y) dA where R = [0,1]×[0,1]', '1', '1/2', '1/3', '2', 'A', '∫₀¹∫₀¹(x+y)dydx = ∫₀¹[x + 1/2]dx = 1/2 + 1/2 = 1'),
(1, 'What is the curl of the vector field F = (-y, x, 0)?', '(0, 0, 2)', '(0, 0, 0)', '(0, 0, -2)', '(1, 1, 0)', 'A', '∇×F = (∂0/∂y - ∂x/∂z, ∂(-y)/∂z - ∂0/∂x, ∂x/∂x - ∂(-y)/∂y) = (0, 0, 1+1) = (0,0,2)'),
(1, 'Which test determines if ∫(1 to ∞) 1/x^p dx converges?', 'p > 1 converges', 'p < 1 converges', 'p = 1 converges', 'Always diverges', 'A', 'The p-test: ∫₁^∞ 1/x^p dx converges if p > 1 and diverges if p ≤ 1'),
(1, 'What is the Jacobian determinant for polar coordinates?', 'r', '1/r', 'r²', '1', 'A', 'For x = rcos(θ), y = rsin(θ), the Jacobian J = r'),
(1, 'Find the gradient of f(x,y,z) = x²y + yz²', '(2xy, x²+z², 2yz)', '(2xy, x², 2yz)', '(xy, x²+z², yz)', '(2x, 2y, 2z)', 'A', '∇f = (∂f/∂x, ∂f/∂y, ∂f/∂z) = (2xy, x²+z², 2yz)'),
(1, 'What is the radius of convergence for Σ(x^n/n!)?', '∞', '1', '0', 'n', 'A', 'For the exponential series, the ratio test gives L = lim|x|/(n+1) = 0 < 1, so R = ∞'),
(1, 'Evaluate ∫(1 to e) ln(x)/x dx', '1/2', '1', 'e', '0', 'A', 'Let u = ln(x), du = dx/x. ∫₀¹ u du = [u²/2]₀¹ = 1/2'),
(1, 'What is the Laplace transform of f(t) = 1?', '1/s', '1', 's', '1/s²', 'A', 'L{1} = ∫₀^∞ e^(-st)dt = [-e^(-st)/s]₀^∞ = 1/s for s > 0'),
(1, 'Find the directional derivative of f(x,y)=x²+y² at (1,2) in direction u=(3/5,4/5)', '4', '5', '22/5', '2', 'C', 'D_u f = ∇f·u = (2,4)·(3/5,4/5) = 6/5 + 16/5 = 22/5'),
(1, 'What is Green''s Theorem used for?', 'Relating line integral to double integral', 'Finding derivatives', 'Solving differential equations', 'Computing volumes', 'A', 'Green''s Theorem: ∮_C(Pdx+Qdy) = ∬_D(∂Q/∂x - ∂P/∂y)dA'),
(1, 'Evaluate lim(x→∞) (1 + 1/x)^x', '1', 'e', '∞', '0', 'B', 'This is the definition of e: lim(x→∞)(1+1/x)^x = e'),
(1, 'What is the Fourier series of an odd function?', 'Only sine terms', 'Only cosine terms', 'Both sine and cosine', 'Neither', 'A', 'Odd functions have Fourier series with only sine terms (a_n = 0)'),
(1, 'Find the volume of the sphere x² + y² + z² = a² using triple integrals', '(4/3)πa³', '4πa²', 'πa³', '(2/3)πa³', 'A', 'V = ∫∫∫ dV = ∫₀^{2π}∫₀^π∫₀^a r²sin(φ)dr dφ dθ = (4/3)πa³'),
(1, 'What does the Divergence Theorem relate?', 'Flux through closed surface to volume integral of divergence', 'Line integral to area integral', 'Gradient to curl', 'Potential to field', 'A', '∬_S F·dS = ∭_V (∇·F) dV'),
(1, 'Evaluate the improper integral ∫(0 to 1) 1/√x dx', '2', '1', 'Diverges', '0', 'A', '∫₀¹ x^(-1/2)dx = [2x^(1/2)]₀¹ = 2 - 0 = 2'),
(1, 'What is the general solution to dy/dx = ky?', 'y = Ce^(kx)', 'y = Ce^(-kx)', 'y = Cx^k', 'y = kx + C', 'A', 'Separating variables: dy/y = k dx, so ln|y| = kx + C₁, thus y = Ce^(kx)'),
(1, 'Find the surface area of z = x² + y² over the disk x² + y² ≤ 1', '(π/6)(5√5 - 1)', 'π', '2π', 'π/2', 'A', 'SA = ∬_D √(1+4x²+4y²)dA = ∫₀^{2π}∫₀¹ √(1+4r²) r dr dθ = (π/6)(5√5-1)'),
(1, 'What is the Stokes Theorem?', '∮_C F·dr = ∬_S (∇×F)·dS', '∮_C F·dr = ∭_V (∇·F)dV', '∮_C F·dr = 0', '∬_S F·dS = 0', 'A', 'Stokes Theorem relates the circulation around a closed curve C to the flux of curl through surface S bounded by C'),
(1, 'If f(x,y) = x³y², what is ∂²f/∂x∂y?', '6x²y', '6xy²', '3x²y²', 'x³y', 'A', '∂f/∂x = 3x²y², then ∂²f/∂y∂x = 6x²y'),
(1, 'What is the sum of the series Σ(n=1 to ∞) 1/2^n?', '1', '1/2', '2', '∞', 'A', 'Geometric series with a=1/2, r=1/2. Sum = (1/2)/(1-1/2) = 1'),
(1, 'Evaluate the contour integral ∮_C 1/z dz where C is |z|=1', '2πi', '0', '1', 'πi', 'A', 'By Cauchy''s Integral Formula, ∮_C 1/z dz = 2πi');

-- ============================================================
-- TEST 2: Physics - Kinematics Final Mock (Medium, 90 min)
-- ============================================================
INSERT INTO tests (title, subject_id, duration_minutes, difficulty, active) VALUES
('Kinematics Final Mock', 2, 90, 'Medium', true);

INSERT INTO questions (test_id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation) VALUES
(2, 'What is the SI unit of acceleration?', 'm/s', 'm/s²', 'm²/s', 'km/h', 'B', 'Acceleration is the rate of change of velocity, so its unit is meters per second squared (m/s²)'),
(2, 'A car accelerates uniformly from rest to 20 m/s in 5 seconds. What is its acceleration?', '4 m/s²', '5 m/s²', '2 m/s²', '10 m/s²', 'A', 'a = (v - u)/t = (20 - 0)/5 = 4 m/s²'),
(2, 'Which equation relates displacement, initial velocity, time, and acceleration?', 'v = u + at', 's = ut + ½at²', 'v² = u² + 2as', 'F = ma', 'B', 's = ut + ½at² gives displacement under constant acceleration'),
(2, 'An object is thrown vertically upward with initial velocity 30 m/s. How high does it go? (g = 10 m/s²)', '45 m', '30 m', '60 m', '90 m', 'A', 'Using v² = u² - 2gh, at max height v=0: h = u²/2g = 900/20 = 45 m'),
(2, 'What does the slope of a position-time graph represent?', 'Velocity', 'Acceleration', 'Force', 'Displacement', 'A', 'The slope of position-time graph gives the instantaneous velocity'),
(2, 'A ball is dropped from a height of 80 m. How long does it take to reach the ground? (g = 10 m/s²)', '2 s', '4 s', '8 s', '3 s', 'B', 'Using h = ½gt²: 80 = ½(10)t², so t² = 16, t = 4 s'),
(2, 'What is the acceleration of a body moving with constant velocity?', 'Zero', 'g', 'Constant non-zero', 'Infinite', 'A', 'If velocity is constant, there is no change in velocity, so acceleration is zero'),
(2, 'Two balls are dropped from the same height, one 2 seconds after the other. What happens to the distance between them as they fall?', 'Increases', 'Decreases', 'Remains constant', 'First increases then decreases', 'A', 'The first ball always has greater velocity, so the distance between them increases with time'),
(2, 'What is the relative velocity of two objects moving in the same direction at 30 m/s and 20 m/s?', '10 m/s', '50 m/s', '600 m/s²', '0 m/s', 'A', 'Relative velocity = 30 - 20 = 10 m/s in the direction of motion'),
(2, 'A projectile is launched at 45° with speed v. What is its horizontal range on level ground?', 'v²/g', 'v²/2g', 'v²sin(2θ)/g', 'v²/g at 45°', 'D', 'At 45°, sin(90°)=1, so R = v²/g. This is the maximum range for a given initial speed'),
(2, 'What quantity is conserved in an elastic collision?', 'Kinetic energy and momentum', 'Only momentum', 'Only kinetic energy', 'Neither', 'A', 'In an elastic collision, both kinetic energy and momentum are conserved'),
(2, 'A body moving in a circle of radius r with speed v has centripetal acceleration:', 'v²/r', 'v/r', 'r/v²', 'v/r²', 'A', 'Centripetal acceleration a = v²/r, directed towards the center'),
(2, 'What is the time period of a simple pendulum of length L?', '2π√(L/g)', '2π√(g/L)', 'π√(L/g)', '2πL/g', 'A', 'T = 2π√(L/g) for a simple pendulum with small amplitude'),
(2, 'If a car travels half the distance at 30 km/h and half at 60 km/h, what is the average speed?', '40 km/h', '45 km/h', '50 km/h', '35 km/h', 'A', 'Average speed = total distance/total time = d/(d/60 + d/120) = 40 km/h'),
(2, 'What is the unit of impulse?', 'N·s', 'kg·m/s²', 'J', 'N/m', 'A', 'Impulse = Force × Time, so unit is Newton-second (N·s)'),
(2, 'A stone is thrown horizontally from a height of 45 m with speed 10 m/s. How far does it travel horizontally before hitting the ground? (g = 10 m/s²)', '30 m', '45 m', '20 m', '15 m', 'A', 'Time to fall: t = √(2h/g) = √9 = 3 s. Horizontal distance = 10 × 3 = 30 m'),
(2, 'What is the maximum height reached by a projectile launched at angle θ with speed v?', 'v²sin²θ/2g', 'v²sinθ/2g', 'v²/2g', 'v²sin(2θ)/g', 'A', 'H_max = v²sin²θ/(2g), derived from vertical motion equation'),
(2, 'In uniform circular motion, which quantity remains constant?', 'Speed', 'Velocity', 'Acceleration', 'Displacement', 'A', 'Speed remains constant in uniform circular motion, but velocity changes direction'),
(2, 'What is the work done by a force F over displacement d at angle θ?', 'Fd cos θ', 'Fd sin θ', 'Fd', 'F/d', 'A', 'Work = F·d = Fd cos θ, where θ is the angle between force and displacement'),
(2, 'A 2 kg object accelerates from 5 m/s to 15 m/s. What is the work done on it?', '200 J', '100 J', '250 J', '400 J', 'A', 'W = ΔKE = ½m(v² - u²) = ½(2)(225 - 25) = 200 J'),
(2, 'What is the power if 100 J of work is done in 5 seconds?', '20 W', '500 W', '25 W', '100 W', 'A', 'Power = Work/Time = 100/5 = 20 Watts'),
(2, 'What is the momentum of a 5 kg object moving at 4 m/s?', '20 kg·m/s', '20 m/s', '1.25 kg/s', '9 kg·m/s', 'A', 'Momentum p = mv = 5 × 4 = 20 kg·m/s'),
(2, 'Which law states that an object at rest stays at rest unless acted upon by a net force?', 'Newton''s First Law', 'Newton''s Second Law', 'Newton''s Third Law', 'Law of Gravitation', 'A', 'Newton''s First Law (Law of Inertia) states this principle'),
(2, 'What is the acceleration due to gravity on Earth approximately?', '9.8 m/s²', '10 m/s²', '8.9 m/s²', '9.2 m/s²', 'A', 'Standard value is g = 9.8 m/s², often approximated as 10 m/s²'),
(2, 'A force of 10 N acts on a 2 kg mass. What is the acceleration?', '5 m/s²', '20 m/s²', '2 m/s²', '0.2 m/s²', 'A', 'From F = ma: a = F/m = 10/2 = 5 m/s²'),
(2, 'What type of motion is exhibited by a simple harmonic oscillator?', 'Periodic', 'Linear', 'Random', 'Exponential', 'A', 'Simple harmonic motion is periodic with constant amplitude and frequency'),
(2, 'What is the kinetic energy of a 10 kg object moving at 6 m/s?', '180 J', '360 J', '60 J', '120 J', 'A', 'KE = ½mv² = ½(10)(36) = 180 J'),
(2, 'A ball is thrown upward. At the highest point, its velocity is:', 'Zero', 'Maximum', 'Equal to g', 'Undefined', 'A', 'At the highest point, the ball momentarily stops before falling back, so velocity is zero'),
(2, 'What is the displacement of an object that returns to its starting point?', 'Zero', 'Distance traveled', 'Twice the distance', 'Undefined', 'A', 'Displacement is the change in position; returning to start means displacement is zero'),
(2, 'Two vectors of magnitude 3 and 4 are perpendicular. What is the magnitude of their resultant?', '5', '7', '1', '12', 'A', 'Using Pythagorean theorem: R = √(3² + 4²) = √25 = 5');

-- ============================================================
-- TEST 3: Chemistry - Organic Chemistry Prep (Hard, 60 min)
-- ============================================================
INSERT INTO tests (title, subject_id, duration_minutes, difficulty, active) VALUES
('Organic Chemistry Prep', 3, 60, 'Hard', true);

INSERT INTO questions (test_id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation) VALUES
(3, 'What is the general formula for alkanes?', 'C_nH_2n', 'C_nH_2n+2', 'C_nH_2n-2', 'C_nH_n', 'B', 'Alkanes are saturated hydrocarbons with general formula C_nH_2n+2'),
(3, 'Which functional group is present in carboxylic acids?', '-COOH', '-OH', '-CHO', '-CO-', 'A', 'Carboxylic acids contain the carboxyl group (-COOH)'),
(3, 'What is the IUPAC name of CH₃-CH₂-CH₂-CH₃?', 'Butane', 'Propane', 'Pentane', 'Hexane', 'A', 'A 4-carbon alkane is called butane'),
(3, 'Which reagent is used to distinguish between aldehydes and ketones?', 'Tollens'' reagent', 'NaOH', 'HCl', 'H₂SO₄', 'A', 'Tollens'' reagent gives a silver mirror with aldehydes but not with ketones'),
(3, 'What is the product when ethene reacts with hydrogen in presence of Ni catalyst?', 'Ethane', 'Ethyne', 'Methane', 'Propane', 'A', 'Hydrogenation of ethene (C₂H₄) gives ethane (C₂H₆)'),
(3, 'Which type of isomerism is shown by but-2-ene?', 'Geometric (cis-trans)', 'Optical', 'Structural', 'Tautomerism', 'A', 'But-2-ene exists as cis and trans isomers due to restricted rotation around the double bond'),
(3, 'What is the hybridization of carbon in methane?', 'sp³', 'sp²', 'sp', 'dsp²', 'A', 'In methane, carbon forms 4 sigma bonds with sp³ hybridization'),
(3, 'Which compound undergoes electrophilic substitution reactions?', 'Benzene', 'Ethane', 'Ethene', 'Ethyne', 'A', 'Benzene undergoes electrophilic substitution (not addition) due to its stable aromatic ring'),
(3, 'What is the product of dehydration of ethanol?', 'Ethene', 'Ethane', 'Ethyne', 'Methane', 'A', 'Dehydration of ethanol (C₂H₅OH) with concentrated H₂SO₄ at 170°C gives ethene (C₂H₄)'),
(3, 'What type of bond is present between carbon atoms in ethene?', 'One sigma and one pi', 'Two sigma', 'One sigma and two pi', 'Two pi', 'A', 'Ethene has one C=C double bond consisting of one sigma and one pi bond'),
(3, 'Which compound gives a positive iodoform test?', 'Ethanol', 'Methanol', 'Propanol', 'Butanol', 'A', 'Ethanol and methyl ketones give positive iodoform test due to CH₃CH(OH)- or CH₃CO- group'),
(3, 'What is the molecular formula of benzene?', 'C₆H₆', 'C₆H₁₂', 'C₆H₁₀', 'C₅H₅', 'A', 'Benzene is an aromatic hydrocarbon with formula C₆H₆'),
(3, 'Which reaction converts alkyl halides to alcohols?', 'Nucleophilic substitution', 'Electrophilic addition', 'Elimination', 'Oxidation', 'A', 'Alkyl halides react with aqueous NaOH via nucleophilic substitution to form alcohols'),
(3, 'What is the product when benzenediazonium chloride reacts with phenol?', 'p-Hydroxyazobenzene (orange dye)', 'Aniline', 'Nitrobenzene', 'Benzene', 'A', 'Diazonium coupling with phenol gives an orange azo dye used as an indicator'),
(3, 'Which functional group is present in CH₃CHO?', 'Aldehyde', 'Ketone', 'Alcohol', 'Ether', 'A', 'CH₃CHO is ethanal (acetaldehyde), containing the -CHO (aldehyde) group'),
(3, 'What is the order of stability of carbocations?', '3° > 2° > 1° > CH₃⁺', '1° > 2° > 3° > CH₃⁺', 'CH₃⁺ > 1° > 2° > 3°', '2° > 3° > 1° > CH₃⁺', 'A', 'Tertiary carbocations are most stable due to hyperconjugation and inductive effects'),
(3, 'Which polymer is formed by condensation of terephthalic acid and ethylene glycol?', 'Terylene (PET)', 'Nylon-6,6', 'Bakelite', 'PVC', 'A', 'Terylene (Dacron/PET) is a polyester formed by this condensation reaction'),
(3, 'What is the name of the reaction where an alkyl group is attached to benzene ring?', 'Friedel-Crafts alkylation', 'Wurtz reaction', 'Grignard reaction', 'Cannizzaro reaction', 'A', 'Friedel-Crafts alkylation introduces alkyl groups to aromatic rings using alkyl halides and AlCl₃'),
(3, 'Which compound shows optical isomerism?', '2-Butanol', '1-Butanol', 'Butanal', 'Butane', 'A', '2-Butanol has a chiral carbon (attached to -OH, -H, -CH₃, -C₂H₅), showing optical isomerism'),
(3, 'What is the product when acetylene reacts with excess HBr?', '1,1-Dibromoethane', 'Vinyl bromide', 'Bromoethane', 'Ethane', 'A', 'Acetylene + 2HBr → CH₃CHBr₂ (1,1-dibromoethane) via Markovnikov addition'),
(3, 'Which test is used to detect the presence of unsaturation?', 'Bromine water test', 'Fehling''s test', 'Biuret test', 'Molisch test', 'A', 'Bromine water decolorizes in presence of C=C or C≡C bonds, indicating unsaturation'),
(3, 'What is the hybridization of carbon in ethyne (acetylene)?', 'sp', 'sp²', 'sp³', 'dsp³', 'A', 'In ethyne, each carbon forms 2 sigma bonds with sp hybridization'),
(3, 'Which reagent converts primary alcohols to aldehydes?', 'PCC', 'KMnO₄', 'Na₂Cr₂O₇/H₂SO₄', 'LiAlH₄', 'A', 'PCC (pyridinium chlorochromate) oxidizes primary alcohols to aldehydes without further oxidation'),
(3, 'What is the product of hydrolysis of CH₃CN?', 'CH₃COOH', 'CH₃CHO', 'CH₃CH₂OH', 'CH₄', 'A', 'Nitriles hydrolyze to carboxylic acids: CH₃CN + 2H₂O → CH₃COOH + NH₃'),
(3, 'Which compound is most acidic?', 'p-Nitrophenol', 'Phenol', 'Ethanol', 'p-Cresol', 'A', 'p-Nitrophenol is most acidic due to electron-withdrawing -NO₂ group stabilizing the phenoxide ion'),
(3, 'What is the Hückel rule for aromaticity?', '4n+2 π electrons', '4n π electrons', '6 π electrons only', '2n π electrons', 'A', 'Hückel''s rule states aromatic compounds have (4n+2) π electrons in a cyclic, planar, conjugated system'),
(3, 'Which reaction converts benzene to nitrobenzene?', 'Nitration', 'Sulfonation', 'Halogenation', 'Friedel-Crafts', 'A', 'Nitration of benzene with concentrated HNO₃/H₂SO₄ mixture gives nitrobenzene'),
(3, 'What is the product when acetone reacts with Grignard reagent CH₃MgBr followed by hydrolysis?', 'tert-Butyl alcohol', 'Isopropyl alcohol', 'Ethanol', 'Acetaldehyde', 'A', 'Acetone + CH₃MgBr → (CH₃)₃COMgBr → (CH₃)₃COH (tert-butyl alcohol) after hydrolysis'),
(3, 'Which type of polymer is starch?', 'Natural polymer', 'Synthetic polymer', 'Thermosetting polymer', 'Elastomer', 'A', 'Starch is a natural polymer (polysaccharide) composed of glucose units');

-- ============================================================
-- TEST 4: Biology - Cellular Structures & Processes (Easy, 45 min)
-- ============================================================
INSERT INTO tests (title, subject_id, duration_minutes, difficulty, active) VALUES
('Cellular Structures & Processes', 4, 45, 'Easy', true);

INSERT INTO questions (test_id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation) VALUES
(4, 'What is the powerhouse of the cell?', 'Mitochondria', 'Nucleus', 'Ribosome', 'Golgi body', 'A', 'Mitochondria produce ATP through cellular respiration and are called the powerhouse of the cell'),
(4, 'Which organelle contains the cell''s genetic material?', 'Nucleus', 'Mitochondria', 'Ribosome', 'Lysosome', 'A', 'The nucleus houses DNA and controls cellular activities'),
(4, 'What is the function of ribosomes?', 'Protein synthesis', 'Energy production', 'Waste removal', 'Cell division', 'A', 'Ribosomes are responsible for translating mRNA into proteins'),
(4, 'Which structure is found in plant cells but not animal cells?', 'Cell wall', 'Nucleus', 'Mitochondria', 'Cell membrane', 'A', 'Plant cells have a rigid cell wall made of cellulose; animal cells do not'),
(4, 'What is the fluid inside the cell called?', 'Cytoplasm', 'Nucleoplasm', 'Protoplasm', 'Cytosol', 'A', 'Cytoplasm is the jelly-like substance that fills the cell and suspends organelles'),
(4, 'Which organelle is known as the "suicide bag" of the cell?', 'Lysosome', 'Peroxisome', 'Vacuole', 'Golgi body', 'A', 'Lysosomes contain hydrolytic enzymes that can break down cellular waste and damaged organelles'),
(4, 'What is the function of the cell membrane?', 'Controls what enters and exits', 'Stores genetic information', 'Produces proteins', 'Makes energy', 'A', 'The plasma membrane is selectively permeable and regulates transport across the cell'),
(4, 'Which organelle modifies, sorts, and packages proteins?', 'Golgi apparatus', 'ER', 'Ribosome', 'Nucleus', 'A', 'The Golgi apparatus processes and packages proteins for secretion or delivery to other organelles'),
(4, 'What type of cell lacks a nucleus?', 'Prokaryotic', 'Eukaryotic', 'Plant', 'Animal', 'A', 'Prokaryotic cells (bacteria, archaea) do not have a membrane-bound nucleus'),
(4, 'Which molecule carries genetic information?', 'DNA', 'RNA', 'Protein', 'Lipid', 'A', 'DNA (deoxyribonucleic acid) contains the genetic instructions for development and function'),
(4, 'What is the process by which cells divide to form two identical daughter cells?', 'Mitosis', 'Meiosis', 'Fertilization', 'Binary fission', 'A', 'Mitosis produces two genetically identical diploid daughter cells from one parent cell'),
(4, 'Which stage of mitosis involves chromosomes lining up at the equator?', 'Metaphase', 'Prophase', 'Anaphase', 'Telophase', 'A', 'In metaphase, chromosomes align at the metaphase plate (cell equator)'),
(4, 'What is the end product of photosynthesis?', 'Glucose and oxygen', 'Carbon dioxide and water', 'ATP only', 'Oxygen only', 'A', 'Photosynthesis converts CO₂ and H₂O into glucose (C₆H₁₂O₆) and O₂ using sunlight energy'),
(4, 'Which pigment is primarily responsible for capturing light energy?', 'Chlorophyll', 'Carotenoid', 'Xanthophyll', 'Melanin', 'A', 'Chlorophyll a and b are the primary photosynthetic pigments in plants'),
(4, 'Where does the light-dependent reaction of photosynthesis occur?', 'Thylakoid membrane', 'Stroma', 'Cytoplasm', 'Mitochondria', 'A', 'Light reactions occur in the thylakoid membranes of chloroplasts'),
(4, 'What is the primary function of the rough ER?', 'Protein synthesis', 'Lipid synthesis', 'Detoxification', 'Calcium storage', 'A', 'The rough ER is studded with ribosomes and is involved in protein synthesis and modification'),
(4, 'Which process produces the most ATP?', 'Electron transport chain', 'Glycolysis', 'Krebs cycle', 'Fermentation', 'A', 'The electron transport chain in mitochondria produces about 34 ATP per glucose molecule'),
(4, 'What is the function of the nucleolus?', 'Ribosome production', 'DNA replication', 'Protein synthesis', 'Cell division', 'A', 'The nucleolus is responsible for producing and assembling ribosome subunits'),
(4, 'Which organelle is responsible for detoxifying harmful substances?', 'Smooth ER', 'Rough ER', 'Golgi body', 'Lysosome', 'A', 'The smooth endoplasmic reticulum contains enzymes that detoxify drugs and poisons'),
(4, 'What is the difference between plant and animal vacuoles?', 'Plant vacuoles are larger', 'Animal vacuoles are larger', 'They are the same size', 'Only animals have vacuoles', 'A', 'Plant cells typically have one large central vacuole; animal cells have smaller, more numerous vacuoles'),
(4, 'What is the function of centrioles?', 'Cell division', 'Protein synthesis', 'Energy production', 'Waste removal', 'A', 'Centrioles help organize microtubules during cell division in animal cells'),
(4, 'Which of the following is NOT found in a prokaryotic cell?', 'Nucleus', 'Ribosome', 'Cell membrane', 'Cytoplasm', 'A', 'Prokaryotes lack a membrane-bound nucleus and other membrane-bound organelles'),
(4, 'What is the role of mRNA in protein synthesis?', 'Carries genetic code from DNA to ribosome', 'Forms ribosomal structure', 'Brings amino acids to ribosome', 'Stores genetic information', 'A', 'Messenger RNA (mRNA) transcribes the genetic code from DNA and carries it to the ribosome'),
(4, 'Which cellular process occurs in the cytoplasm?', 'Glycolysis', 'Krebs cycle', 'Electron transport chain', 'Photosynthesis', 'A', 'Glycolysis, the first step of cellular respiration, occurs in the cytoplasm'),
(4, 'What is the function of the cytoskeleton?', 'Provides structural support', 'Stores energy', 'Synthesizes proteins', 'Transports RNA', 'A', 'The cytoskeleton provides structural support, maintains cell shape, and enables cell movement'),
(4, 'What is the main difference between diffusion and osmosis?', 'Osmosis involves water', 'Diffusion involves water', 'They are the same', 'Osmosis requires energy', 'A', 'Osmosis is the diffusion of water molecules across a selectively permeable membrane'),
(4, 'Which organelle contains its own DNA?', 'Mitochondria', 'Ribosome', 'Golgi body', 'Lysosome', 'A', 'Mitochondria contain their own circular DNA, evidence of their evolutionary origin as bacteria'),
(4, 'What is active transport?', 'Movement against concentration gradient using energy', 'Movement down concentration gradient', 'Diffusion of water', 'Passive movement', 'A', 'Active transport moves molecules against their concentration gradient and requires ATP energy'),
(4, 'What are the two main stages of photosynthesis?', 'Light reactions and Calvin cycle', 'Glycolysis and Krebs cycle', 'Transcription and translation', 'Replication and division', 'A', 'Photosynthesis consists of the light-dependent reactions and the Calvin cycle (light-independent reactions)'),
(4, 'What is the function of plasmids in bacteria?', 'Carry extra genes', 'Produce energy', 'Store food', 'Support structure', 'A', 'Plasmids are small, circular DNA molecules that carry accessory genes separate from chromosomal DNA');

-- ============================================================
-- TEST 5: Computer Science - Data Structures & Algorithms (Hard, 75 min)
-- ============================================================
INSERT INTO tests (title, subject_id, duration_minutes, difficulty, active) VALUES
('Data Structures & Algorithms', 5, 75, 'Hard', true);

INSERT INTO questions (test_id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation) VALUES
(5, 'What is the time complexity of binary search?', 'O(log n)', 'O(n)', 'O(n log n)', 'O(1)', 'A', 'Binary search halves the search space each step, giving O(log n) time complexity'),
(5, 'Which data structure uses LIFO (Last In First Out)?', 'Stack', 'Queue', 'Linked List', 'Tree', 'A', 'A stack follows the Last In First Out principle where the last element added is the first removed'),
(5, 'What is the worst-case time complexity of quicksort?', 'O(n²)', 'O(n log n)', 'O(n)', 'O(log n)', 'A', 'Quicksort has O(n²) worst-case when the pivot is always the smallest or largest element'),
(5, 'Which sorting algorithm has the best average-case time complexity?', 'Merge Sort', 'Bubble Sort', 'Insertion Sort', 'Selection Sort', 'A', 'Merge Sort has O(n log n) average-case complexity and is stable'),
(5, 'What data structure is used for implementing a priority queue?', 'Heap', 'Stack', 'Queue', 'Array', 'A', 'A heap (min-heap or max-heap) is the most efficient data structure for implementing priority queues'),
(5, 'What is the space complexity of DFS using recursion?', 'O(h)', 'O(n)', 'O(1)', 'O(n²)', 'A', 'DFS recursion stack depth equals the height h of the tree; O(h) space complexity'),
(5, 'Which traversal gives nodes in sorted order for a BST?', 'Inorder', 'Preorder', 'Postorder', 'Level order', 'A', 'Inorder traversal (Left-Root-Right) of a BST visits nodes in ascending sorted order'),
(5, 'What is the time complexity to access an element in an array by index?', 'O(1)', 'O(log n)', 'O(n)', 'O(n²)', 'A', 'Arrays provide random access with O(1) time complexity using the index'),
(5, 'Which algorithm is used to find the shortest path in an unweighted graph?', 'BFS', 'DFS', 'Dijkstra', 'A*', 'A', 'Breadth-First Search (BFS) finds the shortest path in unweighted graphs'),
(5, 'What is the maximum number of edges in a simple undirected graph with n vertices?', 'n(n-1)/2', 'n(n-1)', 'n²', '2n', 'A', 'In a complete graph, each vertex connects to n-1 others; total edges = n(n-1)/2'),
(5, 'Which data structure is best for implementing undo functionality?', 'Stack', 'Queue', 'Heap', 'Graph', 'A', 'A stack is ideal for undo because it naturally supports reversing the most recent operations (LIFO)'),
(5, 'What is the time complexity of inserting at the beginning of a linked list?', 'O(1)', 'O(n)', 'O(log n)', 'O(n²)', 'A', 'Insertion at the head of a linked list only requires updating pointers, taking O(1) time'),
(5, 'What is a hash collision?', 'Two keys map to same index', 'Hash function error', 'Memory overflow', 'Key not found', 'A', 'A collision occurs when two different keys produce the same hash value and map to the same bucket'),
(5, 'Which tree is self-balancing?', 'AVL Tree', 'Binary Search Tree', 'Heap', 'Trie', 'A', 'AVL trees maintain balance by ensuring the height difference between subtrees is at most 1'),
(5, 'What is the time complexity of Dijkstra''s algorithm with a binary heap?', 'O(E log V)', 'O(V²)', 'O(E + V)', 'O(V log E)', 'A', 'Using a binary heap, Dijkstra''s algorithm runs in O(E log V) time'),
(5, 'Which algorithm detects cycles in a directed graph?', 'DFS', 'BFS', 'Dijkstra', 'Kruskal', 'A', 'Depth-First Search can detect cycles by checking for back edges during traversal'),
(5, 'What is dynamic programming primarily used for?', 'Optimization problems', 'Sorting', 'Searching', 'Graph traversal', 'A', 'Dynamic programming solves complex problems by breaking them into overlapping subproblems and storing results'),
(5, 'What is the time complexity of accessing the minimum element in a min-heap?', 'O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'A', 'The minimum element in a min-heap is always at the root, accessible in O(1) time'),
(5, 'Which sorting algorithm is stable?', 'Merge Sort', 'Quick Sort', 'Heap Sort', 'Selection Sort', 'A', 'Merge sort is stable as it preserves the relative order of equal elements'),
(5, 'What is the maximum height of an AVL tree with n nodes?', 'O(log n)', 'O(n)', 'O(√n)', 'O(n log n)', 'A', 'AVL trees guarantee O(log n) height by maintaining balance, ensuring efficient operations'),
(5, 'What data structure is used in Breadth-First Search?', 'Queue', 'Stack', 'Heap', 'Priority Queue', 'A', 'BFS uses a queue to explore nodes level by level, processing neighbors before deeper nodes'),
(5, 'What is memoization in dynamic programming?', 'Storing results of subproblems', 'Deleting memory', 'Memory allocation', 'Garbage collection', 'A', 'Memoization stores the results of expensive function calls to avoid redundant calculations'),
(5, 'Which graph traversal is best for finding connected components?', 'DFS', 'BFS', 'Dijkstra', 'Prim', 'A', 'DFS is commonly used to find connected components by exploring all reachable nodes from a starting point'),
(5, 'What is the time complexity of building a heap from an array?', 'O(n)', 'O(n log n)', 'O(n²)', 'O(log n)', 'A', 'Heap construction using the bottom-up approach takes O(n) time, not O(n log n)'),
(5, 'What does the acronym DAG stand for?', 'Directed Acyclic Graph', 'Data Access Graph', 'Dynamic Array Graph', 'Directed Array Graph', 'A', 'A DAG is a directed graph with no cycles, commonly used in scheduling and dependency resolution'),
(5, 'Which data structure supports O(1) insertion, deletion, and access by key?', 'Hash Table', 'Array', 'Linked List', 'Binary Search Tree', 'A', 'Hash tables provide average O(1) time for insertion, deletion, and lookup operations'),
(5, 'What is topological sorting used for?', 'Ordering tasks with dependencies', 'Sorting numbers', 'Finding shortest path', 'Detecting cycles', 'A', 'Topological sort orders vertices in a DAG such that for every edge u→v, u comes before v'),
(5, 'What is the time complexity of finding an element in a balanced BST?', 'O(log n)', 'O(n)', 'O(1)', 'O(n²)', 'A', 'In a balanced BST, each comparison eliminates half the remaining nodes, giving O(log n) search time'),
(5, 'Which algorithm finds the Minimum Spanning Tree?', 'Kruskal', 'Dijkstra', 'DFS', 'Binary Search', 'A', 'Kruskal''s algorithm finds the MST by sorting edges and adding them if they don''t form a cycle'),
(5, 'What is the best-case time complexity of bubble sort?', 'O(n)', 'O(n²)', 'O(n log n)', 'O(1)', 'A', 'With an optimized implementation, bubble sort runs in O(n) when the array is already sorted');

-- ============================================================
-- TEST 6: English Literature - Shakespeare & Classics (Medium, 60 min)
-- ============================================================
INSERT INTO tests (title, subject_id, duration_minutes, difficulty, active) VALUES
('Shakespeare & Classics', 6, 60, 'Medium', true);

INSERT INTO questions (test_id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation) VALUES
(6, 'Who wrote "Romeo and Juliet"?', 'William Shakespeare', 'Charles Dickens', 'Jane Austen', 'Mark Twain', 'A', 'Romeo and Juliet is one of Shakespeare''s most famous tragedies, written around 1594-1596'),
(6, 'In which play does the character Hamlet appear?', 'Hamlet', 'Macbeth', 'Othello', 'King Lear', 'A', 'Hamlet is the protagonist of Shakespeare''s tragedy "The Tragedy of Hamlet, Prince of Denmark"'),
(6, 'What is the famous opening line of "Moby-Dick"?', 'Call me Ishmael', 'It was the best of times', 'In the beginning', 'All happy families', 'A', '"Call me Ishmael" is the iconic opening line of Herman Melville''s novel Moby-Dick'),
(6, 'Who is the author of "Pride and Prejudice"?', 'Jane Austen', 'Charlotte Brontë', 'Emily Brontë', 'Mary Shelley', 'A', 'Pride and Prejudice was written by Jane Austen and published in 1813'),
(6, 'Which Shakespeare play features the characters Prospero and Miranda?', 'The Tempest', 'A Midsummer Night''s Dream', 'The Merchant of Venice', 'Twelfth Night', 'A', 'The Tempest is Shakespeare''s play about a magician, Prospero, and his daughter Miranda on an island'),
(6, 'What genre is "Macbeth" classified as?', 'Tragedy', 'Comedy', 'History', 'Romance', 'A', 'Macbeth is one of Shakespeare''s four great tragedies, along with Hamlet, Othello, and King Lear'),
(6, 'Who wrote "The Great Gatsby"?', 'F. Scott Fitzgerald', 'Ernest Hemingway', 'John Steinbeck', 'William Faulkner', 'A', 'The Great Gatsby was written by F. Scott Fitzgerald and published in 1925'),
(6, 'In "1984", who is the leader of the Party?', 'Big Brother', 'O''Brien', 'Emmanuel Goldstein', 'Winston Smith', 'A', 'Big Brother is the symbolic leader of the totalitarian regime in George Orwell''s 1984'),
(6, 'What is the name of the monster in Mary Shelley''s novel?', 'The Creature', 'Frankenstein', 'Dracula', 'The Beast', 'A', 'The monster is referred to as "The Creature"; Frankenstein is the name of its creator, Victor'),
(6, 'Which poet wrote "The Road Not Taken"?', 'Robert Frost', 'Walt Whitman', 'Emily Dickinson', 'T.S. Eliot', 'A', '"The Road Not Taken" is a famous poem by Robert Frost published in 1916'),
(6, 'In "To Kill a Mockingbird", who is the narrator?', 'Scout Finch', 'Atticus Finch', 'Jem Finch', 'Boo Radley', 'A', 'Jean Louise "Scout" Finch narrates the story from her childhood perspective'),
(6, 'Who wrote "Wuthering Heights"?', 'Emily Brontë', 'Charlotte Brontë', 'Anne Brontë', 'Jane Austen', 'A', 'Wuthering Heights is Emily Brontë''s only novel, published in 1847 under the pseudonym Ellis Bell'),
(6, 'What is the setting of "A Tale of Two Cities"?', 'London and Paris', 'Rome and Venice', 'New York and Boston', 'Dublin and Belfast', 'A', 'Charles Dickens'' novel is set in London and Paris during the French Revolution'),
(6, 'Which Shakespeare play contains the line "All the world''s a stage"?', 'As You Like It', 'Hamlet', 'Macbeth', 'King Lear', 'A', 'This famous monologue is spoken by Jaques in Act II, Scene VII of As You Like It'),
(6, 'Who wrote "The Catcher in the Rye"?', 'J.D. Salinger', 'John Updike', 'Saul Bellow', 'Philip Roth', 'A', 'The Catcher in the Rye was written by J.D. Salinger and published in 1951'),
(6, 'What is the name of the ship in "Moby-Dick"?', 'Pequod', 'Nautilus', 'Beagle', 'Bounty', 'A', 'The Pequod is the whaling ship commanded by Captain Ahab in Moby-Dick'),
(6, 'Which novel begins with "It was the best of times, it was the worst of times"?', 'A Tale of Two Cities', 'Great Expectations', 'Oliver Twist', 'David Copperfield', 'A', 'This opening line is from Charles Dickens'' A Tale of Two Cities (1859)'),
(6, 'Who wrote "The Odyssey"?', 'Homer', 'Virgil', 'Sophocles', 'Plato', 'A', 'The Odyssey is an ancient Greek epic poem attributed to Homer, sequel to The Iliad'),
(6, 'In "Romeo and Juliet", which family does Juliet belong to?', 'Capulet', 'Montague', 'Escalus', 'Paris', 'A', 'Juliet is a Capulet; Romeo is a Montague. Their families are feuding in Verona'),
(6, 'What type of poem has 14 lines with a specific rhyme scheme?', 'Sonnet', 'Ode', 'Elegy', 'Ballad', 'A', 'A sonnet is a 14-line poem, typically with iambic pentameter; Shakespeare wrote many sonnets'),
(6, 'Who wrote "Brave New World"?', 'Aldous Huxley', 'George Orwell', 'Ray Bradbury', 'Kurt Vonnegut', 'A', 'Brave New World is a dystopian novel by Aldous Huxley, published in 1932'),
(6, 'What is the name of Sherlock Holmes'' companion?', 'Dr. Watson', 'Inspector Lestrade', 'Mycroft Holmes', 'Professor Moriarty', 'A', 'Dr. John Watson is Sherlock Holmes'' friend, assistant, and chronicler in Arthur Conan Doyle''s stories'),
(6, 'In "Hamlet", who says "To be, or not to be"?', 'Hamlet', 'Claudius', 'Polonius', 'Laertes', 'A', 'Hamlet delivers this famous soliloquy in Act III, Scene I, contemplating life and death'),
(6, 'Who wrote "Leaves of Grass"?', 'Walt Whitman', 'Henry Wadsworth Longfellow', 'Ralph Waldo Emerson', 'Edgar Allan Poe', 'A', 'Leaves of Grass is a poetry collection by Walt Whitman, first published in 1855'),
(6, 'What is the genre of "The Metamorphosis" by Franz Kafka?', 'Absurdist fiction', 'Romance', 'Science fiction', 'Historical fiction', 'A', 'The Metamorphosis is a novella about Gregor Samsa transforming into an insect, a classic of absurdist literature'),
(6, 'Which Shakespeare play is set in Denmark?', 'Hamlet', 'Macbeth', 'Othello', 'Romeo and Juliet', 'A', 'Hamlet, Prince of Denmark, is explicitly set in the Danish castle of Elsinore'),
(6, 'Who wrote "The Old Man and the Sea"?', 'Ernest Hemingway', 'William Faulkner', 'F. Scott Fitzgerald', 'John Steinbeck', 'A', 'The Old Man and the Sea was written by Ernest Hemingway and published in 1952'),
(6, 'In "Lord of the Flies", what does the conch shell represent?', 'Order and civilization', 'Savagery', 'Fear', 'Nature', 'A', 'The conch shell symbolizes order, democracy, and civilization among the stranded boys'),
(6, 'Who wrote "Jane Eyre"?', 'Charlotte Brontë', 'Emily Brontë', 'Anne Brontë', 'Jane Austen', 'A', 'Jane Eyre is a novel by Charlotte Brontë, published in 1847 under the pen name Currer Bell'),
(6, 'What is the meaning of the title "The Scarlet Letter"?', 'A red letter A for adultery', 'A military badge', 'A type of flower', 'A ship''s name', 'A', 'In Nathaniel Hawthorne''s novel, Hester Prynne must wear a scarlet "A" as punishment for adultery'),
(6, 'Which poet wrote "Because I could not stop for Death"?', 'Emily Dickinson', 'Sylvia Plath', 'Elizabeth Bishop', 'Marianne Moore', 'A', 'This poem is by Emily Dickinson, known for her unique style and themes of death and immortality');

