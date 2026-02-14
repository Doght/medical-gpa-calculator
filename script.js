// Point mapping based on your uploaded image
function getGradePoints(score) {
    if (score >= 90) return 4.00;
    if (score >= 85) return 3.50;
    if (score >= 75) return 3.00;
    if (score >= 70) return 2.50;
    if (score >= 60) return 2.00;
    if (score >= 55) return 1.50;
    if (score >= 50) return 1.00;
    return 0.00;
}

function calculateGPA() {
    const rows = document.querySelectorAll('.input-group');
    let totalQualityPoints = 0;   // For 4.0 GPA
    let totalWeightedScore = 0;   // For 100% Weighted Avg
    let totalCreditsUsed = 0;

    rows.forEach(row => {
        const credits = parseFloat(row.getAttribute('data-cr'));
        const scoreVal = row.querySelector('input').value;

        if (scoreVal !== "" && !isNaN(scoreVal)) {
            const score = parseFloat(scoreVal);
            
            // 1. Calculate for out of 100
            totalWeightedScore += (score * credits);
            
            // 2. Calculate for out of 4.0
            totalQualityPoints += (getGradePoints(score) * credits);
            
            totalCreditsUsed += credits;
        }
    });

    if (totalCreditsUsed > 0) {
        // Output results
        document.getElementById('final-gpa').innerText = (totalQualityPoints / totalCreditsUsed).toFixed(2);
        document.getElementById('final-weight').innerText = (totalWeightedScore / totalCreditsUsed).toFixed(2);
        document.getElementById('cr-sum').innerText = totalCreditsUsed;
        
        // Show the results box
        document.getElementById('result-display').classList.remove('hidden');
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    } else {
        alert("Please enter at least one score.");
    }
}