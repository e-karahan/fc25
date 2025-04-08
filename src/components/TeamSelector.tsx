import React, { useState, useEffect } from 'react';
import TeamCard from './TeamCard';

interface Team {
  id: string;
  name: string;
  league: string;
  overallRating: number;
  stats: {
    attack: number;
    midfield: number;
    defense: number;
    goalkeeper: number;
  };
  logo: string;
  lastUpdated: string;
}

interface TeamSelectorProps {
  teams: Team[];
  onSelect: (team: Team) => void;
}

const TeamSelector: React.FC<TeamSelectorProps> = ({ teams, onSelect }) => {
  const [selectedLeague, setSelectedLeague] = useState<string>('all');
  const [filteredTeams, setFilteredTeams] = useState<Team[]>([]);

  // Get unique leagues
  const leagues = Array.from(new Set(teams.map(team => team.league)));

  useEffect(() => {
    if (selectedLeague === 'all') {
      setFilteredTeams(teams);
    } else {
      setFilteredTeams(teams.filter(team => team.league === selectedLeague));
    }
  }, [selectedLeague, teams]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => setSelectedLeague('all')}
          className={`btn ${selectedLeague === 'all' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Tüm Ligler
        </button>
        {leagues.map(league => (
          <button
            key={league}
            onClick={() => setSelectedLeague(league)}
            className={`btn ${selectedLeague === league ? 'btn-primary' : 'btn-secondary'}`}
          >
            {league}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredTeams.map(team => (
          <div
            key={team.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onSelect(team)}
          >
            <TeamCard team={team} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSelector; 