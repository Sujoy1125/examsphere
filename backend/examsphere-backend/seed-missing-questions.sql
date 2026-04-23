-- ============================================================
-- Seed missing questions for Tests 1-4 (Mathematics, Physics, Chemistry, Biology)
-- Run this in Render Shell or psql if questions are missing
-- ============================================================

-- TEST 1: Mathematics - Advanced Calculus II (already exists, id=1)
INSERT INTO questions (test_id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation) VALUES
(1, 'What is the derivative of f(x) = x^3 + 2x^2 - 5x + 1?', '3x^2 + 4x - 5', '3x^2 + 2x - 5', 'x^3 + 2x^2 - 5', '3x^2 + 4x + 1', 'A', 'Using power rule: d/dx[x^3]=3x^2, d/dx[2x^2]=4x, d/dx[-5x]=-5, d/dx[1]=0'),
(1, 'Evaluate the integral of (2x + 3) dx', 'x^2 + 3x + C', '2x^2 + 3x + C', 'x^2 + 3x', '2x^2 + C', 'A', 'Integral of 2x dx = x^2 and integral of 3 dx = 3x, so answer is x^2 + 3x + C'),
(1, 'What is the limit of (sin x)/x as x approaches 0?', '0', '1', 'infinity', 'Does not exist', 'B', 'This is a standard limit result: limit as x approaches 0 of sin(x)/x = 1'),
(1, 'Find the second derivative of f(x) = e^(2x)', 'e^(2x)', '2e^(2x)', '4e^(2x)', '4x*e^(2x)', 'C', 'First derivative: 2e^(2x), Second derivative: 4e^(2x)'),
(1, 'What is the Taylor series expansion of e^x about x=0?', '1 + x + x^2/2! + x^3/3! + ...', '1 - x + x^2/2! - x^3/3! + ...', 'x + x^2 + x^3 + ...', '1 + x + x^2 + x^3 + ...', 'A', 'e^x = sum(x^n/n!) = 1 + x + x^2/2! + x^3/3! + ...'),
(1, 'Evaluate integral from 0 to pi of sin(x) dx', '0', '1', '2', '-2', 'C', 'Integral of sin(x)dx = -cos(x), so [-cos(pi)] - [-cos(0)] = [1] - [-1] = 2'),
(1, 'What is the derivative of ln(x)?', '1/x', 'x', 'e^x', '1/(x*ln(10))', 'A', 'd/dx[ln(x)] = 1/x for x > 0'),
(1, 'Find the critical points of f(x) = x^3 - 3x^2', 'x = 0, 2', 'x = 0, 3', 'x = 1, 2', 'x = 0 only', 'A', 'f''(x) = 3x^2 - 6x = 3x(x-2), so critical points at x = 0 and x = 2'),
(1, 'What is the divergence of the vector field F = (x^2, y^2, z^2)?', '2x + 2y + 2z', 'x^2 + y^2 + z^2', '2xy + 2yz + 2zx', 'x + y + z', 'A', 'Divergence = d(x^2)/dx + d(y^2)/dy + d(z^2)/dz = 2x + 2y + 2z'),
(1, 'Evaluate the double integral over [0,1]x[0,1] of (x + y) dA', '1', '1/2', '1/3', '2', 'A', 'Integral from 0 to 1 of integral from 0 to 1 of (x+y) dy dx = 1'),
(1, 'What is Green''s Theorem used for?', 'Relating line integral to double integral', 'Finding derivatives', 'Solving differential equations', 'Computing volumes', 'A', 'Green''s Theorem relates circulation to curl over a region'),
(1, 'Evaluate limit as x approaches infinity of (1 + 1/x)^x', '1', 'e', 'infinity', '0', 'B', 'This is the definition of e: limit as x approaches infinity of (1+1/x)^x = e'),
(1, 'What is the general solution to dy/dx = ky?', 'y = Ce^(kx)', 'y = Ce^(-kx)', 'y = Cx^k', 'y = kx + C', 'A', 'Separating variables: dy/y = k dx, so ln|y| = kx + C1, thus y = Ce^(kx)'),
(1, 'Find the volume of the sphere x^2 + y^2 + z^2 = a^2', '(4/3)*pi*a^3', '4*pi*a^2', 'pi*a^3', '(2/3)*pi*a^3', 'A', 'Volume of sphere = (4/3)*pi*r^3 where r = a'),
(1, 'What is the Laplace transform of f(t) = 1?', '1/s', '1', 's', '1/s^2', 'A', 'Laplace transform of 1 is 1/s for s > 0');

-- TEST 2: Physics - Kinematics Final Mock (already exists, id=2)
INSERT INTO questions (test_id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation) VALUES
(2, 'What is the SI unit of acceleration?', 'm/s', 'm/s^2', 'm^2/s', 'km/h', 'B', 'Acceleration is rate of change of velocity, unit is meters per second squared'),
(2, 'A car accelerates uniformly from rest to 20 m/s in 5 seconds. What is its acceleration?', '4 m/s^2', '5 m/s^2', '2 m/s^2', '10 m/s^2', 'A', 'a = (v - u)/t = (20 - 0)/5 = 4 m/s^2'),
(2, 'Which equation relates displacement, initial velocity, time, and acceleration?', 'v = u + at', 's = ut + 0.5*at^2', 'v^2 = u^2 + 2as', 'F = ma', 'B', 's = ut + 0.5*at^2 gives displacement under constant acceleration'),
(2, 'An object is thrown vertically upward with initial velocity 30 m/s. How high does it go? (g = 10 m/s^2)', '45 m', '30 m', '60 m', '90 m', 'A', 'Using v^2 = u^2 - 2gh, at max height v=0: h = u^2/2g = 900/20 = 45 m'),
(2, 'What does the slope of a position-time graph represent?', 'Velocity', 'Acceleration', 'Force', 'Displacement', 'A', 'Slope of position-time graph gives instantaneous velocity'),
(2, 'A ball is dropped from a height of 80 m. How long does it take to reach the ground? (g = 10 m/s^2)', '2 s', '4 s', '8 s', '3 s', 'B', 'Using h = 0.5*g*t^2: 80 = 0.5*10*t^2, so t^2 = 16, t = 4 s'),
(2, 'What is the acceleration of a body moving with constant velocity?', 'Zero', 'g', 'Constant non-zero', 'Infinite', 'A', 'If velocity is constant, acceleration is zero'),
(2, 'What is the relative velocity of two objects moving in the same direction at 30 m/s and 20 m/s?', '10 m/s', '50 m/s', '600 m/s^2', '0 m/s', 'A', 'Relative velocity = 30 - 20 = 10 m/s in direction of motion'),
(2, 'A projectile is launched at 45 degrees with speed v. What is its horizontal range on level ground?', 'v^2/g', 'v^2/2g', 'v^2*sin(2theta)/g', 'v^2/g at 45 degrees', 'D', 'At 45 degrees, sin(90)=1, so R = v^2/g which is maximum range'),
(2, 'What quantity is conserved in an elastic collision?', 'Kinetic energy and momentum', 'Only momentum', 'Only kinetic energy', 'Neither', 'A', 'In elastic collision, both kinetic energy and momentum are conserved'),
(2, 'A body moving in a circle of radius r with speed v has centripetal acceleration:', 'v^2/r', 'v/r', 'r/v^2', 'v/r^2', 'A', 'Centripetal acceleration a = v^2/r directed towards center'),
(2, 'What is the time period of a simple pendulum of length L?', '2*pi*sqrt(L/g)', '2*pi*sqrt(g/L)', 'pi*sqrt(L/g)', '2*pi*L/g', 'A', 'T = 2*pi*sqrt(L/g) for simple pendulum with small amplitude'),
(2, 'What is the unit of impulse?', 'N*s', 'kg*m/s^2', 'J', 'N/m', 'A', 'Impulse = Force * Time, so unit is Newton-second'),
(2, 'What is the acceleration due to gravity on Earth approximately?', '9.8 m/s^2', '10 m/s^2', '8.9 m/s^2', '9.2 m/s^2', 'A', 'Standard value is g = 9.8 m/s^2'),
(2, 'A force of 10 N acts on a 2 kg mass. What is the acceleration?', '5 m/s^2', '20 m/s^2', '2 m/s^2', '0.2 m/s^2', 'A', 'From F = ma: a = F/m = 10/2 = 5 m/s^2');

-- TEST 3: Chemistry - Organic Chemistry Prep (already exists, id=3)
INSERT INTO questions (test_id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation) VALUES
(3, 'What is the general formula for alkanes?', 'C_nH_2n', 'C_nH_2n+2', 'C_nH_2n-2', 'C_nH_n', 'B', 'Alkanes are saturated hydrocarbons with general formula C_nH_2n+2'),
(3, 'Which functional group is present in carboxylic acids?', '-COOH', '-OH', '-CHO', '-CO-', 'A', 'Carboxylic acids contain the carboxyl group (-COOH)'),
(3, 'What is the IUPAC name of CH3-CH2-CH2-CH3?', 'Butane', 'Propane', 'Pentane', 'Hexane', 'A', 'A 4-carbon alkane is called butane'),
(3, 'Which reagent is used to distinguish between aldehydes and ketones?', 'Tollens reagent', 'NaOH', 'HCl', 'H2SO4', 'A', 'Tollens reagent gives silver mirror with aldehydes but not ketones'),
(3, 'What is the product when ethene reacts with hydrogen in presence of Ni catalyst?', 'Ethane', 'Ethyne', 'Methane', 'Propane', 'A', 'Hydrogenation of ethene (C2H4) gives ethane (C2H6)'),
(3, 'Which type of isomerism is shown by but-2-ene?', 'Geometric (cis-trans)', 'Optical', 'Structural', 'Tautomerism', 'A', 'But-2-ene exists as cis and trans isomers due to restricted rotation around double bond'),
(3, 'What is the hybridization of carbon in methane?', 'sp3', 'sp2', 'sp', 'dsp2', 'A', 'In methane, carbon forms 4 sigma bonds with sp3 hybridization'),
(3, 'Which compound undergoes electrophilic substitution reactions?', 'Benzene', 'Ethane', 'Ethene', 'Ethyne', 'A', 'Benzene undergoes electrophilic substitution due to stable aromatic ring'),
(3, 'What is the product of dehydration of ethanol?', 'Ethene', 'Ethane', 'Ethyne', 'Methane', 'A', 'Dehydration of ethanol with concentrated H2SO4 at 170C gives ethene'),
(3, 'What type of bond is present between carbon atoms in ethene?', 'One sigma and one pi', 'Two sigma', 'One sigma and two pi', 'Two pi', 'A', 'Ethene has one C=C double bond: one sigma and one pi bond'),
(3, 'What is the molecular formula of benzene?', 'C6H6', 'C6H12', 'C6H10', 'C5H5', 'A', 'Benzene is an aromatic hydrocarbon with formula C6H6'),
(3, 'Which reaction converts alkyl halides to alcohols?', 'Nucleophilic substitution', 'Electrophilic addition', 'Elimination', 'Oxidation', 'A', 'Alkyl halides react with aqueous NaOH via nucleophilic substitution to form alcohols'),
(3, 'Which functional group is present in CH3CHO?', 'Aldehyde', 'Ketone', 'Alcohol', 'Ether', 'A', 'CH3CHO is ethanal (acetaldehyde), containing the -CHO group'),
(3, 'What is the order of stability of carbocations?', '3 > 2 > 1 > CH3+', '1 > 2 > 3 > CH3+', 'CH3+ > 1 > 2 > 3', '2 > 3 > 1 > CH3+', 'A', 'Tertiary carbocations are most stable due to hyperconjugation and inductive effects'),
(3, 'What is the product when acetone reacts with Grignard reagent CH3MgBr followed by hydrolysis?', 'tert-Butyl alcohol', 'Isopropyl alcohol', 'Ethanol', 'Acetaldehyde', 'A', 'Acetone + CH3MgBr gives tert-butyl alcohol after hydrolysis');

-- TEST 4: Biology - Cellular Structures & Processes (already exists, id=4)
INSERT INTO questions (test_id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation) VALUES
(4, 'What is the powerhouse of the cell?', 'Mitochondria', 'Nucleus', 'Ribosome', 'Golgi body', 'A', 'Mitochondria produce ATP through cellular respiration'),
(4, 'Which organelle contains the cell''s genetic material?', 'Nucleus', 'Mitochondria', 'Ribosome', 'Lysosome', 'A', 'The nucleus houses DNA and controls cellular activities'),
(4, 'What is the function of ribosomes?', 'Protein synthesis', 'Energy production', 'Waste removal', 'Cell division', 'A', 'Ribosomes translate mRNA into proteins'),
(4, 'Which structure is found in plant cells but not animal cells?', 'Cell wall', 'Nucleus', 'Mitochondria', 'Cell membrane', 'A', 'Plant cells have rigid cell wall made of cellulose; animal cells do not'),
(4, 'What is the fluid inside the cell called?', 'Cytoplasm', 'Nucleoplasm', 'Protoplasm', 'Cytosol', 'A', 'Cytoplasm is jelly-like substance filling the cell'),
(4, 'Which organelle is known as the suicide bag of the cell?', 'Lysosome', 'Peroxisome', 'Vacuole', 'Golgi body', 'A', 'Lysosomes contain hydrolytic enzymes that break down cellular waste'),
(4, 'What is the function of the cell membrane?', 'Controls what enters and exits', 'Stores genetic information', 'Produces proteins', 'Makes energy', 'A', 'Plasma membrane is selectively permeable and regulates transport'),
(4, 'Which organelle modifies, sorts, and packages proteins?', 'Golgi apparatus', 'ER', 'Ribosome', 'Nucleus', 'A', 'Golgi apparatus processes and packages proteins for secretion'),
(4, 'What type of cell lacks a nucleus?', 'Prokaryotic', 'Eukaryotic', 'Plant', 'Animal', 'A', 'Prokaryotic cells (bacteria, archaea) do not have membrane-bound nucleus'),
(4, 'Which molecule carries genetic information?', 'DNA', 'RNA', 'Protein', 'Lipid', 'A', 'DNA contains genetic instructions for development and function'),
(4, 'What is the process by which cells divide to form two identical daughter cells?', 'Mitosis', 'Meiosis', 'Fertilization', 'Binary fission', 'A', 'Mitosis produces two genetically identical diploid daughter cells'),
(4, 'Which stage of mitosis involves chromosomes lining up at the equator?', 'Metaphase', 'Prophase', 'Anaphase', 'Telophase', 'A', 'In metaphase, chromosomes align at metaphase plate (cell equator)'),
(4, 'What is the end product of photosynthesis?', 'Glucose and oxygen', 'Carbon dioxide and water', 'ATP only', 'Oxygen only', 'A', 'Photosynthesis converts CO2 and H2O into glucose and O2'),
(4, 'Which pigment is primarily responsible for capturing light energy?', 'Chlorophyll', 'Carotenoid', 'Xanthophyll', 'Melanin', 'A', 'Chlorophyll a and b are primary photosynthetic pigments in plants'),
(4, 'Where does the light-dependent reaction of photosynthesis occur?', 'Thylakoid membrane', 'Stroma', 'Cytoplasm', 'Mitochondria', 'A', 'Light reactions occur in thylakoid membranes of chloroplasts');

