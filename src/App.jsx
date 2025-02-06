import React, { useState, useEffect } from 'react';

const App = () => {
  const [teams] = useState([
    'Team Alpha', 'Team Beta', 'Team Gamma', 'Team Delta',
    'Team Epsilon', 'Team Zeta', 'Team Eta', 'Team Theta',
    'Team Iota', 'Team Kappa', 'Team Lambda', 'Team Mu'
  ]);

  const [points, setPoints] = useState({});
  const [selectedTeams, setSelectedTeams] = useState([]);

  // Load points from localStorage on initial render
  useEffect(() => {
    const savedPoints = localStorage.getItem('teamPoints');
    if (savedPoints) {
      setPoints(JSON.parse(savedPoints));
    }
  }, []);

  const handleTeamSelect = (team) => {
    if (selectedTeams.includes(team)) {
      setSelectedTeams(selectedTeams.filter(t => t !== team));
    } else if (selectedTeams.length < 2) {
      setSelectedTeams([...selectedTeams, team]);
    }
  };

  const handleVoteSubmit = () => {
    if (selectedTeams.length === 2) {
      const newPoints = { ...points };
      // First place gets 1000 points
      newPoints[selectedTeams[0]] = (newPoints[selectedTeams[0]] || 0) + 1000;
      // Second place gets 500 points
      newPoints[selectedTeams[1]] = (newPoints[selectedTeams[1]] || 0) + 500;
      
      setPoints(newPoints);
      localStorage.setItem('teamPoints', JSON.stringify(newPoints));
      setSelectedTeams([]);
    }
  };

  const rankings = teams
    .map(team => ({
      name: team,
      points: points[team] || 0
    }))
    .sort((a, b) => b.points - a.points);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Class Team Leaderboard</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <h2>Select Teams (1st then 2nd place)</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px', marginBottom: '20px' }}>
          {teams.map(team => (
            <button
              key={team}
              onClick={() => handleTeamSelect(team)}
              style={{
                padding: '10px',
                border: '1px solid #ccc',
                backgroundColor: selectedTeams.includes(team) ? '#007bff' : 'white',
                color: selectedTeams.includes(team) ? 'white' : 'black',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {team}
            </button>
          ))}
        </div>
        <button
          onClick={handleVoteSubmit}
          disabled={selectedTeams.length !== 2}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: selectedTeams.length === 2 ? '#28a745' : '#cccccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: selectedTeams.length === 2 ? 'pointer' : 'not-allowed'
          }}
        >
          Submit Votes
        </button>
      </div>

      <div>
        <h2>Current Rankings</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {rankings.map((team, index) => (
            <div
              key={team.name}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px'
              }}
            >
              <span>{index + 1}. {team.name}</span>
              <span>{team.points} points</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
