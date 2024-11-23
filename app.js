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
    losses: 0,
    gamesPlayed: 0
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
    losses: 0,
    gamesPlayed: 0
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
    losses: 0,
    gamesPlayed: 0
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
    losses: 0,
    gamesPlayed: 0
  }
];

// Generate schedule: 82 games for each team
let schedule = [];
function generateSchedule() {
  let date = new Date(2024, 0, 1); // Start date of the season (January 1, 2024)

  for (let i = 0; i < 82; i++) { // 82 games per team
    for (let j = 0; j < teams.length; j++) {
      for (let k = j + 1; k < teams.length; k++) {
        schedule.push({
          team1: teams[j],
          team2: teams[k],
          date: new Date(date), // Copy the date object
        });
      }
    }
    date.setDate(date.getDate() + 1); // Increment the date by 1 day
  }
}

generateSchedule();

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
function simulateGame(game) {
  const { team1, team2, date } = game;
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

  // Update wins/losses and points
  if (score1 > score2) {
    team1.wins++;
    team2.losses++;
    team1.points += 3; // 3 points for a win
    team1.gamesPlayed++;
  } else {
    team2.wins++;
    team1.losses++;
    team2.points += 3; // 3 points for a win
    team2.gamesPlayed++;
  }

  return {
    date: date.toDateString(),
    team1: team1.name,
    team2: team2.name,
    score: `${score1} - ${score2}`,
    winner: score1 > score2 ? team1.name : team2.name,
  };
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

// Simulate the next game
let currentGameIndex = 0;
document.getElementById('simulateBtn').addEventListener('click', () => {
  if (currentGameIndex < schedule.length) {
    const game = schedule[currentGameIndex];
    const gameResult = simulateGame(game);
    
    // Display the result of the game
    document.getElementById('gameResult').innerHTML = `
      <div class="game-result">
        ${gameResult.date}: ${gameResult.team1} vs ${gameResult.team2} - ${gameResult.score} <br> Winner: ${gameResult.winner}
      </div>
    `;
    
    // Update the leaderboard
    displayLeaderboard();
    
    currentGameIndex++;
  } else {
    document.getElementById('gameResult').innerHTML = 'The season is complete!';
  }
});

// Simulate the final game (top 2 teams)
document.getElementById('simulateFinalBtn').addEventListener('click', () => {
  const topTeams = teams.slice(0, 2);  // Top 2 teams for the final
  const finalGame = simulateGame({
    team1: topTeams[0],
    team2: topTeams[1],
    date: new Date(2024, 5, 15),
  });

  document.getElementById('finalResult').innerHTML = `
    Final: ${finalGame.date} - ${finalGame.team1} vs ${finalGame.team2} - ${finalGame.score} <br> Winner: ${finalGame.winner}
  `;
});

// Initialize the page
displayTeams();
