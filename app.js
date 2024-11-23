// app.js

// Define team and player data
const teams = [
  {
    name: 'Team 1',
    players: [
      { name: 'Player 1', skill: 75, goals: 0, assists: 0, injuries: 0 },
      { name: 'Player 2', skill: 80, goals: 0, assists: 0, injuries: 0 },
      { name: 'Player 3', skill: 70, goals: 0, assists: 0, injuries: 0 },
      { name: 'Player 4', skill: 65, goals: 0, assists: 0, injuries: 0 }
    ],
    points: 0,
    wins: 0,
    losses: 0
  },
  {
    name: 'Team 2',
    players: [
      { name: 'Player 5', skill: 85, goals: 0, assists: 0, injuries: 0 },
      { name: 'Player 6', skill: 72, goals: 0, assists: 0, injuries: 0 },
      { name: 'Player 7', skill: 78, goals: 0, assists: 0, injuries: 0 },
      { name: 'Player 8', skill: 67, goals: 0, assists: 0, injuries: 0 }
    ],
    points: 0,
    wins: 0,
    losses: 0
  },
  {
    name: 'Team 3',
    players: [
      { name: 'Player 9', skill: 80, goals: 0, assists: 0, injuries: 0 },
      { name: 'Player 10', skill: 77, goals: 0, assists: 0, injuries: 0 },
      { name: 'Player 11', skill: 73, goals: 0, assists: 0, injuries: 0 },
      { name: 'Player 12', skill: 65, goals: 0, assists: 0, injuries: 0 }
    ],
    points: 0,
    wins: 0,
    losses: 0
  },
  {
    name: 'Team 4',
    players: [
      { name: 'Player 13', skill: 88, goals: 0, assists: 0, injuries: 0 },
      { name: 'Player 14', skill: 70, goals: 0, assists: 0, injuries: 0 },
      { name: 'Player 15', skill: 75, goals: 0, assists: 0, injuries: 0 },
      { name: 'Player 16', skill: 60, goals: 0, assists: 0, injuries: 0 }
    ],
    points: 0,
    wins: 0,
    losses: 0
  }
];

// Display teams and players
function displayTeams() {
  teams.forEach((team, index) => {
    const teamElement = document.getElementById(`team${index + 1}`);
    const playerStats = team.players.map(player => {
      return `
        <div class="player">
          ${player.name} - Skill: ${player.skill} - Goals: ${player.goals} - Assists: ${player.assists} - Injuries: ${player.injuries}
        </div>
      `;
    }).join('');
    teamElement.querySelector('#team' + (index + 1) + '-players').innerHTML = playerStats;
  });
}

// Simulate a game between two teams
function simulateGame(team1, team2) {
  let score1 = 0;
  let score2 = 0;

  // Simulate players' stats for scoring and injuries
  team1.players.forEach(player => {
    let effectiveSkill = player.skill - player.injuries * 5;
    if (Math.random() > 0.2) {
      score1 += Math.max(0, effectiveSkill * 0.1 + Math.floor(Math.random() * 3));  // Simulate goal scoring
      player.assists += Math.floor(Math.random() * 2);  // Random assists
    }
  });

  team2.players.forEach(player => {
    let effectiveSkill = player.skill - player.injuries * 5;
    if (Math.random() > 0.2) {
      score2 += Math.max(0, effectiveSkill * 0.1 + Math.floor(Math.random() * 3));  // Simulate goal scoring
      player.assists += Math.floor(Math.random() * 2);  // Random assists
    }
  });

  // Check for injuries
  if (Math.random() < 0.15) {
    const injuredPlayer = team1.players[Math.floor(Math.random() * team1.players.length)];
    injuredPlayer.injuries += 1;
    console.log(`${injuredPlayer.name} from ${team1.name} got injured!`);
  }

  if (Math.random() < 0.15) {
    const injuredPlayer = team2.players[Math.floor(Math.random() * team2.players.length)];
    injuredPlayer.injuries += 1;
    console.log(`${injuredPlayer.name} from ${team2.name} got injured!`);
  }

  // Update wins/losses
  if (score1 > score2) {
    team1.wins++;
    team2.losses++;
    team1.points += 3; // 3 points for a win
    return { winner: team1, score: `${score1} - ${score2}` };
  } else {
    team2.wins++;
    team1.losses++;
    team2.points += 3; // 3 points for a win
    return { winner: team2, score: `${score2} - ${score1}` };
  }
}

// Simulate the full season
function simulateSeason() {
  let results = [];

  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      const team1 = teams[i];
      const team2 = teams[j];
      const gameResult = simulateGame(team1, team2);
      results.push(`${team1.name} vs ${team2.name}: Winner - ${gameResult.winner.name} (${gameResult.score})`);
    }
  }

  // Sort teams by points
  teams.sort((a, b) => b.points - a.points);

  return results;
}

// Display the leaderboard
function displayLeaderboard() {
  const leaderboard = document.getElementById('leaderboard');
  leaderboard.innerHTML = teams.map((team) => {
    return `
      <div class="team">
        <h4>${team.name}</h4>
        <p>Wins: ${team.wins} - Losses: ${team.losses} - Points: ${team.points}</p>
      </div>
    `;
  }).join('');
}

// Simulate the final game
function simulateFinal() {
  const finalTeams = teams.slice(0, 2); // Assuming top 2 teams for the final
  const gameResult = simulateGame(finalTeams[0], finalTeams[1]);
  return `${finalTeams[0].name} vs ${finalTeams[1].name}: Winner - ${gameResult.winner.name} (${gameResult.score})`;
}

// Event listeners
document.getElementById('simulateBtn').addEventListener('click', () => {
  const seasonResults = simulateSeason();
  document.getElementById('seasonResults').innerHTML = seasonResults.join('<br>');
  displayLeaderboard();
});

document.getElementById('simulateFinalBtn').addEventListener('click', () => {
  const finalResult = simulateFinal();
  document.getElementById('finalResult').innerHTML = finalResult;
});

// Initialize the page
displayTeams();
