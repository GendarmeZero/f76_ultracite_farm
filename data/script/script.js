        // SCORE calculation formulas based on Fallout Wiki data
        function calculateScoreForNextLevel(currentLevel) {
            // Formula: ΔSCORE_n = 25(n-1) + 1000
            return 25 * (currentLevel - 1) + 1000;
        }

        function calculateCumulativeScore(level) {
            // Formula: SCORE_n = 12.5n^2 + 962.5n - 975
            if (level <= 0) return 0;
            return 12.5 * Math.pow(level, 2) + 962.5 * level - 975;
        }

        function calculateScoreNeeds() {
            // Get user input
            const currentLevel = parseInt(document.getElementById('currentLevel').value) || 1;
            const boostPercentage = parseInt(document.getElementById('boostPercentage').value) || 0;

            // Validate input
            if (currentLevel < 1 || currentLevel > 100) {
                alert("Please enter a valid level between 1 and 100");
                return;
            }

            if (boostPercentage < 0 || boostPercentage > 100) {
                alert("Please enter a valid boost percentage between 0 and 100");
                return;
            }

            // Calculate SCORE values
            const scoreForNextLevel = calculateScoreForNextLevel(currentLevel);
            const currentCumulativeScore = calculateCumulativeScore(currentLevel);
            const totalScoreFor100 = 220275; // From Fallout Wiki
            const scoreNeededFor100 = totalScoreFor100 - currentCumulativeScore;

            // Calculate boosted values
            const baseScorePerKill = 3000;
            const boostedScorePerKill = baseScorePerKill * (1 + boostPercentage / 100);

            const killsForNextLevel = Math.ceil(scoreForNextLevel / boostedScorePerKill);
            const killsFor100 = Math.ceil(scoreNeededFor100 / boostedScorePerKill);

            // Display results
            document.getElementById('nextLevelScore').textContent = scoreForNextLevel.toLocaleString();
            document.getElementById('level100Score').textContent = scoreNeededFor100.toLocaleString();
            document.getElementById('scorePerKill').textContent = boostedScorePerKill.toLocaleString();
            document.getElementById('killsNextLevel').textContent = killsForNextLevel;
            document.getElementById('killsLevel100').textContent = killsFor100;

            // Show result box
            document.getElementById('resultBox').style.display = 'block';
        }

        // Initialize with default values
        window.onload = function () {
            calculateScoreNeeds();
        };