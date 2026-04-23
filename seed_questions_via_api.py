#!/usr/bin/env python3
"""
Seed missing questions for Tests 1-4 using the ExamSphere Admin API.
No database credentials needed — uses admin login + API endpoints.
"""

import requests
import json

BASE_URL = "https://examsphere-api-9i8g.onrender.com/api"
ADMIN_EMAIL = "admin@examsphere.com"
ADMIN_PASSWORD = "admin123"

QUESTIONS = {
    1: [  # Mathematics - Advanced Calculus II
        {"testId": 1, "questionText": "What is the derivative of f(x) = x^3 + 2x^2 - 5x + 1?", "optionA": "3x^2 + 4x - 5", "optionB": "3x^2 + 2x - 5", "optionC": "x^3 + 2x^2 - 5", "optionD": "3x^2 + 4x + 1", "correctOption": "A", "explanation": "Using power rule: d/dx[x^3]=3x^2, d/dx[2x^2]=4x, d/dx[-5x]=-5, d/dx[1]=0"},
        {"testId": 1, "questionText": "Evaluate the integral of (2x + 3) dx", "optionA": "x^2 + 3x + C", "optionB": "2x^2 + 3x + C", "optionC": "x^2 + 3x", "optionD": "2x^2 + C", "correctOption": "A", "explanation": "Integral of 2x dx = x^2 and integral of 3 dx = 3x, so answer is x^2 + 3x + C"},
        {"testId": 1, "questionText": "What is the limit of (sin x)/x as x approaches 0?", "optionA": "0", "optionB": "1", "optionC": "infinity", "optionD": "Does not exist", "correctOption": "B", "explanation": "This is a standard limit result: limit as x approaches 0 of sin(x)/x = 1"},
        {"testId": 1, "questionText": "Find the second derivative of f(x) = e^(2x)", "optionA": "e^(2x)", "optionB": "2e^(2x)", "optionC": "4e^(2x)", "optionD": "4x*e^(2x)", "correctOption": "C", "explanation": "First derivative: 2e^(2x), Second derivative: 4e^(2x)"},
        {"testId": 1, "questionText": "What is the Taylor series expansion of e^x about x=0?", "optionA": "1 + x + x^2/2! + x^3/3! + ...", "optionB": "1 - x + x^2/2! - x^3/3! + ...", "optionC": "x + x^2 + x^3 + ...", "optionD": "1 + x + x^2 + x^3 + ...", "correctOption": "A", "explanation": "e^x = sum(x^n/n!) = 1 + x + x^2/2! + x^3/3! + ..."},
        {"testId": 1, "questionText": "Evaluate integral from 0 to pi of sin(x) dx", "optionA": "0", "optionB": "1", "optionC": "2", "optionD": "-2", "correctOption": "C", "explanation": "Integral of sin(x)dx = -cos(x), so [-cos(pi)] - [-cos(0)] = [1] - [-1] = 2"},
        {"testId": 1, "questionText": "What is the derivative of ln(x)?", "optionA": "1/x", "optionB": "x", "optionC": "e^x", "optionD": "1/(x*ln(10))", "correctOption": "A", "explanation": "d/dx[ln(x)] = 1/x for x > 0"},
        {"testId": 1, "questionText": "Find the critical points of f(x) = x^3 - 3x^2", "optionA": "x = 0, 2", "optionB": "x = 0, 3", "optionC": "x = 1, 2", "optionD": "x = 0 only", "correctOption": "A", "explanation": "f'(x) = 3x^2 - 6x = 3x(x-2), so critical points at x = 0 and x = 2"},
        {"testId": 1, "questionText": "What is the divergence of the vector field F = (x^2, y^2, z^2)?", "optionA": "2x + 2y + 2z", "optionB": "x^2 + y^2 + z^2", "optionC": "2xy + 2yz + 2zx", "optionD": "x + y + z", "correctOption": "A", "explanation": "Divergence = d(x^2)/dx + d(y^2)/dy + d(z^2)/dz = 2x + 2y + 2z"},
        {"testId": 1, "questionText": "Evaluate the double integral over [0,1]x[0,1] of (x + y) dA", "optionA": "1", "optionB": "1/2", "optionC": "1/3", "optionD": "2", "correctOption": "A", "explanation": "Integral from 0 to 1 of integral from 0 to 1 of (x+y) dy dx = 1"},
        {"testId": 1, "questionText": "What is Green's Theorem used for?", "optionA": "Relating line integral to double integral", "optionB": "Finding derivatives", "optionC": "Solving differential equations", "optionD": "Computing volumes", "correctOption": "A", "explanation": "Green's Theorem relates circulation to curl over a region"},
        {"testId": 1, "questionText": "Evaluate limit as x approaches infinity of (1 + 1/x)^x", "optionA": "1", "optionB": "e", "optionC": "infinity", "optionD": "0", "correctOption": "B", "explanation": "This is the definition of e"},
        {"testId": 1, "questionText": "What is the general solution to dy/dx = ky?", "optionA": "y = Ce^(kx)", "optionB": "y = Ce^(-kx)", "optionC": "y = Cx^k", "optionD": "y = kx + C", "correctOption": "A", "explanation": "Separating variables: dy/y = k dx, so ln|y| = kx + C1, thus y = Ce^(kx)"},
        {"testId": 1, "questionText": "Find the volume of the sphere x^2 + y^2 + z^2 = a^2", "optionA": "(4/3)*pi*a^3", "optionB": "4*pi*a^2", "optionC": "pi*a^3", "optionD": "(2/3)*pi*a^3", "correctOption": "A", "explanation": "Volume of sphere = (4/3)*pi*r^3 where r = a"},
        {"testId": 1, "questionText": "What is the Laplace transform of f(t) = 1?", "optionA": "1/s", "optionB": "1", "optionC": "s", "optionD": "1/s^2", "correctOption": "A", "explanation": "Laplace transform of 1 is 1/s for s > 0"},
    ],
    2: [  # Physics - Kinematics Final Mock
        {"testId": 2, "questionText": "What is the SI unit of acceleration?", "optionA": "m/s", "optionB": "m/s^2", "optionC": "m^2/s", "optionD": "km/h", "correctOption": "B", "explanation": "Acceleration is rate of change of velocity, unit is meters per second squared"},
        {"testId": 2, "questionText": "A car accelerates uniformly from rest to 20 m/s in 5 seconds. What is its acceleration?", "optionA": "4 m/s^2", "optionB": "5 m/s^2", "optionC": "2 m/s^2", "optionD": "10 m/s^2", "correctOption": "A", "explanation": "a = (v - u)/t = (20 - 0)/5 = 4 m/s^2"},
        {"testId": 2, "questionText": "Which equation relates displacement, initial velocity, time, and acceleration?", "optionA": "v = u + at", "optionB": "s = ut + 0.5*at^2", "optionC": "v^2 = u^2 + 2as", "optionD": "F = ma", "correctOption": "B", "explanation": "s = ut + 0.5*at^2 gives displacement under constant acceleration"},
        {"testId": 2, "questionText": "An object is thrown vertically upward with initial velocity 30 m/s. How high does it go? (g = 10 m/s^2)", "optionA": "45 m", "optionB": "30 m", "optionC": "60 m", "optionD": "90 m", "correctOption": "A", "explanation": "Using v^2 = u^2 - 2gh, at max height v=0: h = u^2/2g = 900/20 = 45 m"},
        {"testId": 2, "questionText": "What does the slope of a position-time graph represent?", "optionA": "Velocity", "optionB": "Acceleration", "optionC": "Force", "optionD": "Displacement", "correctOption": "A", "explanation": "Slope of position-time graph gives instantaneous velocity"},
        {"testId": 2, "questionText": "A ball is dropped from a height of 80 m. How long does it take to reach the ground? (g = 10 m/s^2)", "optionA": "2 s", "optionB": "4 s", "optionC": "8 s", "optionD": "3 s", "correctOption": "B", "explanation": "Using h = 0.5*g*t^2: 80 = 0.5*10*t^2, so t^2 = 16, t = 4 s"},
        {"testId": 2, "questionText": "What is the acceleration of a body moving with constant velocity?", "optionA": "Zero", "optionB": "g", "optionC": "Constant non-zero", "optionD": "Infinite", "correctOption": "A", "explanation": "If velocity is constant, acceleration is zero"},
        {"testId": 2, "questionText": "What is the relative velocity of two objects moving in the same direction at 30 m/s and 20 m/s?", "optionA": "10 m/s", "optionB": "50 m/s", "optionC": "600 m/s^2", "optionD": "0 m/s", "correctOption": "A", "explanation": "Relative velocity = 30 - 20 = 10 m/s in direction of motion"},
        {"testId": 2, "questionText": "A projectile is launched at 45 degrees with speed v. What is its horizontal range on level ground?", "optionA": "v^2/g", "optionB": "v^2/2g", "optionC": "v^2*sin(2theta)/g", "optionD": "v^2/g at 45 degrees", "correctOption": "D", "explanation": "At 45 degrees, sin(90)=1, so R = v^2/g which is maximum range"},
        {"testId": 2, "questionText": "What quantity is conserved in an elastic collision?", "optionA": "Kinetic energy and momentum", "optionB": "Only momentum", "optionC": "Only kinetic energy", "optionD": "Neither", "correctOption": "A", "explanation": "In elastic collision, both kinetic energy and momentum are conserved"},
        {"testId": 2, "questionText": "A body moving in a circle of radius r with speed v has centripetal acceleration:", "optionA": "v^2/r", "optionB": "v/r", "optionC": "r/v^2", "optionD": "v/r^2", "correctOption": "A", "explanation": "Centripetal acceleration a = v^2/r directed towards center"},
        {"testId": 2, "questionText": "What is the time period of a simple pendulum of length L?", "optionA": "2*pi*sqrt(L/g)", "optionB": "2*pi*sqrt(g/L)", "optionC": "pi*sqrt(L/g)", "optionD": "2*pi*L/g", "correctOption": "A", "explanation": "T = 2*pi*sqrt(L/g) for simple pendulum with small amplitude"},
        {"testId": 2, "questionText": "What is the unit of impulse?", "optionA": "N*s", "optionB": "kg*m/s^2", "optionC": "J", "optionD": "N/m", "correctOption": "A", "explanation": "Impulse = Force * Time, so unit is Newton-second"},
        {"testId": 2, "questionText": "What is the acceleration due to gravity on Earth approximately?", "optionA": "9.8 m/s^2", "optionB": "10 m/s^2", "optionC": "8.9 m/s^2", "optionD": "9.2 m/s^2", "correctOption": "A", "explanation": "Standard value is g = 9.8 m/s^2"},
        {"testId": 2, "questionText": "A force of 10 N acts on a 2 kg mass. What is the acceleration?", "optionA": "5 m/s^2", "optionB": "20 m/s^2", "optionC": "2 m/s^2", "optionD": "0.2 m/s^2", "correctOption": "A", "explanation": "From F = ma: a = F/m = 10/2 = 5 m/s^2"},
    ],
    3: [  # Chemistry - Organic Chemistry Prep
        {"testId": 3, "questionText": "What is the general formula for alkanes?", "optionA": "C_nH_2n", "optionB": "C_nH_2n+2", "optionC": "C_nH_2n-2", "optionD": "C_nH_n", "correctOption": "B", "explanation": "Alkanes are saturated hydrocarbons with general formula C_nH_2n+2"},
        {"testId": 3, "questionText": "Which functional group is present in carboxylic acids?", "optionA": "-COOH", "optionB": "-OH", "optionC": "-CHO", "optionD": "-CO-", "correctOption": "A", "explanation": "Carboxylic acids contain the carboxyl group (-COOH)"},
        {"testId": 3, "questionText": "What is the IUPAC name of CH3-CH2-CH2-CH3?", "optionA": "Butane", "optionB": "Propane", "optionC": "Pentane", "optionD": "Hexane", "correctOption": "A", "explanation": "A 4-carbon alkane is called butane"},
        {"testId": 3, "questionText": "Which reagent is used to distinguish between aldehydes and ketones?", "optionA": "Tollens reagent", "optionB": "NaOH", "optionC": "HCl", "optionD": "H2SO4", "correctOption": "A", "explanation": "Tollens reagent gives silver mirror with aldehydes but not ketones"},
        {"testId": 3, "questionText": "What is the product when ethene reacts with hydrogen in presence of Ni catalyst?", "optionA": "Ethane", "optionB": "Ethyne", "optionC": "Methane", "optionD": "Propane", "correctOption": "A", "explanation": "Hydrogenation of ethene (C2H4) gives ethane (C2H6)"},
        {"testId": 3, "questionText": "Which type of isomerism is shown by but-2-ene?", "optionA": "Geometric (cis-trans)", "optionB": "Optical", "optionC": "Structural", "optionD": "Tautomerism", "correctOption": "A", "explanation": "But-2-ene exists as cis and trans isomers due to restricted rotation around double bond"},
        {"testId": 3, "questionText": "What is the hybridization of carbon in methane?", "optionA": "sp3", "optionB": "sp2", "optionC": "sp", "optionD": "dsp2", "correctOption": "A", "explanation": "In methane, carbon forms 4 sigma bonds with sp3 hybridization"},
        {"testId": 3, "questionText": "Which compound undergoes electrophilic substitution reactions?", "optionA": "Benzene", "optionB": "Ethane", "optionC": "Ethene", "optionD": "Ethyne", "correctOption": "A", "explanation": "Benzene undergoes electrophilic substitution due to stable aromatic ring"},
        {"testId": 3, "questionText": "What is the product of dehydration of ethanol?", "optionA": "Ethene", "optionB": "Ethane", "optionC": "Ethyne", "optionD": "Methane", "correctOption": "A", "explanation": "Dehydration of ethanol with concentrated H2SO4 at 170C gives ethene"},
        {"testId": 3, "questionText": "What type of bond is present between carbon atoms in ethene?", "optionA": "One sigma and one pi", "optionB": "Two sigma", "optionC": "One sigma and two pi", "optionD": "Two pi", "correctOption": "A", "explanation": "Ethene has one C=C double bond: one sigma and one pi bond"},
        {"testId": 3, "questionText": "What is the molecular formula of benzene?", "optionA": "C6H6", "optionB": "C6H12", "optionC": "C6H10", "optionD": "C5H5", "correctOption": "A", "explanation": "Benzene is an aromatic hydrocarbon with formula C6H6"},
        {"testId": 3, "questionText": "Which reaction converts alkyl halides to alcohols?", "optionA": "Nucleophilic substitution", "optionB": "Electrophilic addition", "optionC": "Elimination", "optionD": "Oxidation", "correctOption": "A", "explanation": "Alkyl halides react with aqueous NaOH via nucleophilic substitution to form alcohols"},
        {"testId": 3, "questionText": "Which functional group is present in CH3CHO?", "optionA": "Aldehyde", "optionB": "Ketone", "optionC": "Alcohol", "optionD": "Ether", "correctOption": "A", "explanation": "CH3CHO is ethanal (acetaldehyde), containing the -CHO group"},
        {"testId": 3, "questionText": "What is the order of stability of carbocations?", "optionA": "3 > 2 > 1 > CH3+", "optionB": "1 > 2 > 3 > CH3+", "optionC": "CH3+ > 1 > 2 > 3", "optionD": "2 > 3 > 1 > CH3+", "correctOption": "A", "explanation": "Tertiary carbocations are most stable due to hyperconjugation and inductive effects"},
        {"testId": 3, "questionText": "What is the product when acetone reacts with Grignard reagent CH3MgBr followed by hydrolysis?", "optionA": "tert-Butyl alcohol", "optionB": "Isopropyl alcohol", "optionC": "Ethanol", "optionD": "Acetaldehyde", "correctOption": "A", "explanation": "Acetone + CH3MgBr gives tert-butyl alcohol after hydrolysis"},
    ],
    4: [  # Biology - Cellular Structures & Processes
        {"testId": 4, "questionText": "What is the powerhouse of the cell?", "optionA": "Mitochondria", "optionB": "Nucleus", "optionC": "Ribosome", "optionD": "Golgi body", "correctOption": "A", "explanation": "Mitochondria produce ATP through cellular respiration"},
        {"testId": 4, "questionText": "Which organelle contains the cell's genetic material?", "optionA": "Nucleus", "optionB": "Mitochondria", "optionC": "Ribosome", "optionD": "Lysosome", "correctOption": "A", "explanation": "The nucleus houses DNA and controls cellular activities"},
        {"testId": 4, "questionText": "What is the function of ribosomes?", "optionA": "Protein synthesis", "optionB": "Energy production", "optionC": "Waste removal", "optionD": "Cell division", "correctOption": "A", "explanation": "Ribosomes translate mRNA into proteins"},
        {"testId": 4, "questionText": "Which structure is found in plant cells but not animal cells?", "optionA": "Cell wall", "optionB": "Nucleus", "optionC": "Mitochondria", "optionD": "Cell membrane", "correctOption": "A", "explanation": "Plant cells have rigid cell wall made of cellulose; animal cells do not"},
        {"testId": 4, "questionText": "What is the fluid inside the cell called?", "optionA": "Cytoplasm", "optionB": "Nucleoplasm", "optionC": "Protoplasm", "optionD": "Cytosol", "correctOption": "A", "explanation": "Cytoplasm is jelly-like substance filling the cell"},
        {"testId": 4, "questionText": "Which organelle is known as the suicide bag of the cell?", "optionA": "Lysosome", "optionB": "Peroxisome", "optionC": "Vacuole", "optionD": "Golgi body", "correctOption": "A", "explanation": "Lysosomes contain hydrolytic enzymes that break down cellular waste"},
        {"testId": 4, "questionText": "What is the function of the cell membrane?", "optionA": "Controls what enters and exits", "optionB": "Stores genetic information", "optionC": "Produces proteins", "optionD": "Makes energy", "correctOption": "A", "explanation": "Plasma membrane is selectively permeable and regulates transport"},
        {"testId": 4, "questionText": "Which organelle modifies, sorts, and packages proteins?", "optionA": "Golgi apparatus", "optionB": "ER", "optionC": "Ribosome", "optionD": "Nucleus", "correctOption": "A", "explanation": "Golgi apparatus processes and packages proteins for secretion"},
        {"testId": 4, "questionText": "What type of cell lacks a nucleus?", "optionA": "Prokaryotic", "optionB": "Eukaryotic", "optionC": "Plant", "optionD": "Animal", "correctOption": "A", "explanation": "Prokaryotic cells (bacteria, archaea) do not have membrane-bound nucleus"},
        {"testId": 4, "questionText": "Which molecule carries genetic information?", "optionA": "DNA", "optionB": "RNA", "optionC": "Protein", "optionD": "Lipid", "correctOption": "A", "explanation": "DNA contains genetic instructions for development and function"},
        {"testId": 4, "questionText": "What is the process by which cells divide to form two identical daughter cells?", "optionA": "Mitosis", "optionB": "Meiosis", "optionC": "Fertilization", "optionD": "Binary fission", "correctOption": "A", "explanation": "Mitosis produces two genetically identical diploid daughter cells"},
        {"testId": 4, "questionText": "Which stage of mitosis involves chromosomes lining up at the equator?", "optionA": "Metaphase", "optionB": "Prophase", "optionC": "Anaphase", "optionD": "Telophase", "correctOption": "A", "explanation": "In metaphase, chromosomes align at metaphase plate (cell equator)"},
        {"testId": 4, "questionText": "What is the end product of photosynthesis?", "optionA": "Glucose and oxygen", "optionB": "Carbon dioxide and water", "optionC": "ATP only", "optionD": "Oxygen only", "correctOption": "A", "explanation": "Photosynthesis converts CO2 and H2O into glucose and O2"},
        {"testId": 4, "questionText": "Which pigment is primarily responsible for capturing light energy?", "optionA": "Chlorophyll", "optionB": "Carotenoid", "optionC": "Xanthophyll", "optionD": "Melanin", "correctOption": "A", "explanation": "Chlorophyll a and b are primary photosynthetic pigments in plants"},
        {"testId": 4, "questionText": "Where does the light-dependent reaction of photosynthesis occur?", "optionA": "Thylakoid membrane", "optionB": "Stroma", "optionC": "Cytoplasm", "optionD": "Mitochondria", "correctOption": "A", "explanation": "Light reactions occur in thylakoid membranes of chloroplasts"},
    ]
}


def get_admin_token():
    """Login as admin and return JWT token."""
    resp = requests.post(
        f"{BASE_URL}/auth/login",
        json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}
    )
    resp.raise_for_status()
    token = resp.json()["token"]
    print(f"✅ Admin login successful")
    return token


def seed_questions(token):
    """Insert all missing questions via API."""
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
    total = 0

    for test_id, questions in QUESTIONS.items():
        print(f"\n📚 Seeding Test {test_id} ({len(questions)} questions)...")
        for i, q in enumerate(questions, 1):
            resp = requests.post(f"{BASE_URL}/questions", json=q, headers=headers)
            if resp.status_code == 200:
                print(f"  ✅ Q{i}: {q['questionText'][:50]}...")
                total += 1
            else:
                print(f"  ❌ Q{i} failed: {resp.status_code} - {resp.text}")

    print(f"\n🎉 Done! Total questions inserted: {total}")


if __name__ == "__main__":
    print("🔌 Connecting to ExamSphere API...")
    token = get_admin_token()
    seed_questions(token)

