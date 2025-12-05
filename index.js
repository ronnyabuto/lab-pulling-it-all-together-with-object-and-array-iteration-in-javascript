function gameObject() {
  return {
    home: {
      teamName: "Brooklyn Nets",
      colors: ["Black", "White"],
      players: {
        "Alan Anderson": { number: 0, shoe: 16, points: 22, rebounds: 12, assists: 12, steals: 3, blocks: 1, slamDunks: 1 },
        "Reggie Evens": { number: 30, shoe: 14, points: 12, rebounds: 12, assists: 12, steals: 12, blocks: 12, slamDunks: 7 },
        "Brook Lopez": { number: 11, shoe: 17, points: 17, rebounds: 19, assists: 10, steals: 3, blocks: 1, slamDunks: 15 },
        "Mason Plumlee": { number: 1, shoe: 19, points: 26, rebounds: 12, assists: 6, steals: 3, blocks: 8, slamDunks: 5 },
        "Jason Terry": { number: 31, shoe: 15, points: 19, rebounds: 2, assists: 2, steals: 4, blocks: 11, slamDunks: 1 },
      },
    },
    away: {
      teamName: "Charlotte Hornets",
      colors: ["Turquoise", "Purple"],
      players: {
        "Jeff Adrien": { number: 4, shoe: 18, points: 10, rebounds: 1, assists: 1, steals: 2, blocks: 7, slamDunks: 2 },
        "Bismack Biyombo": { number: 0, shoe: 16, points: 12, rebounds: 4, assists: 7, steals: 7, blocks: 15, slamDunks: 10 },
        "DeSagna Diop": { number: 2, shoe: 14, points: 24, rebounds: 12, assists: 12, steals: 4, blocks: 5, slamDunks: 5 },
        "Ben Gordon": { number: 8, shoe: 15, points: 33, rebounds: 3, assists: 2, steals: 1, blocks: 1, slamDunks: 0 },
        "Brendan Hayword": { number: 33, shoe: 15, points: 6, rebounds: 12, assists: 12, steals: 22, blocks: 5, slamDunks: 12 },
      },
    },
  };
}

// --- HELPER FUNCTIONS (Internal use to strip fluff) ---

const getGameData = () => gameObject();

const findTeamKey = (data, teamName) => {
  if (data.home.teamName === teamName) return 'home';
  if (data.away.teamName === teamName) return 'away';
  return null;
};

// Returns a player object if found in either team
const findPlayer = (name) => {
  const data = getGameData();
  return data.home.players[name] || data.away.players[name];
};

// --- CORE IMPLEMENTATION ---

function numPointsScored(playerName) {
  const player = findPlayer(playerName);
  return player ? player.points : 0;
}

function shoeSize(playerName) {
  const player = findPlayer(playerName);
  return player ? player.shoe : 0;
}

function teamColors(teamName) {
  const data = getGameData();
  const key = findTeamKey(data, teamName);
  return key ? data[key].colors : [];
}

function teamNames() {
  const data = getGameData();
  return [data.home.teamName, data.away.teamName];
}

function playerNumbers(teamName) {
  const data = getGameData();
  const key = findTeamKey(data, teamName);
  if (!key) return [];
  // Object.values extracts the stat objects; .map grabs the number
  return Object.values(data[key].players).map(p => p.number);
}

function playerStats(playerName) {
  return findPlayer(playerName) || {};
}

function bigShoeRebounds() {
  const data = getGameData();
  // Flatten all players into one array
  const allPlayers = [
    ...Object.values(data.home.players),
    ...Object.values(data.away.players)
  ];
  
  // Reduce to find the player with max shoe size
  const bigShoePlayer = allPlayers.reduce((prev, current) => {
    return (current.shoe > prev.shoe) ? current : prev;
  });

  return bigShoePlayer.rebounds;
}

// --- BONUS FUNCTIONS (Per Instructions) ---

function mostPointsScored() {
  const data = getGameData();
  // We need names here, so we iterate entries
  const allEntries = [
    ...Object.entries(data.home.players),
    ...Object.entries(data.away.players)
  ];

  let maxPoints = 0;
  let topScorer = "";

  allEntries.forEach(([name, stats]) => {
    if (stats.points > maxPoints) {
      maxPoints = stats.points;
      topScorer = name;
    }
  });

  return topScorer;
}

function winningTeam() {
  const data = getGameData();
  
  const sumPoints = (teamKey) => 
    Object.values(data[teamKey].players).reduce((acc, p) => acc + p.points, 0);

  const homeScore = sumPoints('home');
  const awayScore = sumPoints('away');

  return homeScore > awayScore ? data.home.teamName : data.away.teamName;
}

function playerWithLongestName() {
  const data = getGameData();
  const allNames = [
    ...Object.keys(data.home.players),
    ...Object.keys(data.away.players)
  ];

  return allNames.reduce((a, b) => a.length > b.length ? a : b);
}

function doesLongNameStealATon() {
  const longName = playerWithLongestName();
  const data = getGameData();
  
  // Find max steals in the league
  const allPlayers = [...Object.values(data.home.players), ...Object.values(data.away.players)];
  const maxSteals = Math.max(...allPlayers.map(p => p.steals));
  
  // Get longest name player's steals
  const playerSteals = findPlayer(longName).steals;

  return playerSteals === maxSteals;
}

// Export for testing
module.exports = {
  gameObject,
  numPointsScored,
  shoeSize,
  teamColors,
  teamNames,
  playerNumbers,
  playerStats,
  bigShoeRebounds,
  mostPointsScored,
  winningTeam,
  playerWithLongestName,
  doesLongNameStealATon
};