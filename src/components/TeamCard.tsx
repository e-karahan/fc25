import React from 'react';

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

interface TeamCardProps {
  team: Team;
}

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  // 5 yıldız sistemini 100'lük sisteme çevir
  const convertTo100 = (rating: number) => Math.round(rating * 20);

  return (
    <div className="bg-[#262626] rounded-lg shadow-lg p-6 text-[#F3F4F6] w-full hover:shadow-xl hover:scale-[1.02] transition-all duration-300 animate-cardEntrance">
      {/* Ülke Bilgisi */}
      <div className="text-center mb-4 animate-fadeIn">
        <span className="text-sm text-[#9CA3AF] uppercase tracking-wider font-medium">{team.league}</span>
      </div>

      {/* Takım Logosu ve İsmi */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-32 h-32 flex items-center justify-center mb-4 bg-[#1A1A1A] rounded-full p-4 shadow-inner animate-logoSpin">
          <img
            src={team.logo}
            alt={`${team.name} logo`}
            className="max-w-full max-h-full object-contain"
          />
        </div>
        <h3 className="text-xl font-bold text-center text-[#6B7280] animate-fadeIn">{team.name}</h3>
      </div>

      {/* İstatistikler */}
      <div className="grid grid-cols-4 gap-4 text-center bg-[#1A1A1A] rounded-lg p-4 shadow-inner animate-slideUp">
        <div className="transform hover:scale-110 transition-transform duration-200 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          <div className="text-lg font-bold text-[#6B7280]">{convertTo100(team.overallRating)}</div>
          <div className="text-xs text-[#9CA3AF]">OVR</div>
        </div>
        <div className="transform hover:scale-110 transition-transform duration-200 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
          <div className="text-lg font-bold text-[#6B7280]">{convertTo100(team.stats.attack)}</div>
          <div className="text-xs text-[#9CA3AF]">ATK</div>
        </div>
        <div className="transform hover:scale-110 transition-transform duration-200 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
          <div className="text-lg font-bold text-[#6B7280]">{convertTo100(team.stats.midfield)}</div>
          <div className="text-xs text-[#9CA3AF]">ORT</div>
        </div>
        <div className="transform hover:scale-110 transition-transform duration-200 animate-fadeIn" style={{ animationDelay: '0.5s' }}>
          <div className="text-lg font-bold text-[#6B7280]">{convertTo100(team.stats.defense)}</div>
          <div className="text-xs text-[#9CA3AF]">DEF</div>
        </div>
      </div>
    </div>
  );
};

export default TeamCard; 