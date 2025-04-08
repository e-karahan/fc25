import React, { useState, useEffect } from 'react';
import './App.css';
import TeamCard from './components/TeamCard';

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

function App() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<[Team | null, Team | null]>([null, null]);
  const [selectedLeagues, setSelectedLeagues] = useState<string[]>([]);
  const [history, setHistory] = useState<[Team, Team][]>([]);
  const [powerLevel, setPowerLevel] = useState<number>(0); // -1: Zayıf, 0: Dengeli, 1: Güçlü
  const [isSelecting, setIsSelecting] = useState(false);
  const [showFirstTeam, setShowFirstTeam] = useState(false);
  const [showSecondTeam, setShowSecondTeam] = useState(false);

  // Takımları yükle
  useEffect(() => {
    fetch('/teams_data.json')
      .then(res => res.json())
      .then(data => setTeams(data.teams));
  }, []);

  // 5 yıldız sistemini 100'lük sisteme çevir
  const convertTo100 = (rating: number) => Math.round(rating * 20);

  // Rastgele takım seç
  const selectRandomTeams = () => {
    setIsSelecting(true);
    setShowFirstTeam(false);
    setShowSecondTeam(false);
    setSelectedTeams([null, null]);

    let availableTeams = teams;
    if (selectedLeagues.length > 0) {
      availableTeams = teams.filter(team => selectedLeagues.includes(team.league));
    }

    // Güç seviyesine göre filtrele
    if (powerLevel !== 0) {
      availableTeams = availableTeams.filter(team => {
        const teamRating = convertTo100(team.overallRating);
        if (powerLevel === 1) return teamRating >= 80; // Güçlü: 80-100
        return teamRating < 60; // Zayıf: 0-60
      });
    } else {
      // Dengeli: 60-80
      availableTeams = availableTeams.filter(team => {
        const teamRating = convertTo100(team.overallRating);
        return teamRating >= 60 && teamRating < 80;
      });
    }

    const team1 = availableTeams[Math.floor(Math.random() * availableTeams.length)];
    if (!team1) {
      console.log("Bu kriterlere uygun takım bulunamadı!");
      setIsSelecting(false);
      return;
    }

    const similarTeams = availableTeams.filter(team => 
      Math.abs(team.overallRating - team1.overallRating) <= 0.5 && team.id !== team1.id
    );
    const team2 = similarTeams[Math.floor(Math.random() * similarTeams.length)];

    if (team1 && team2) {
      // İlk takımı 1 saniye sonra göster
      setTimeout(() => {
        setSelectedTeams([team1, null]);
        setShowFirstTeam(true);
        
        // İkinci takımı 2 saniye sonra göster
        setTimeout(() => {
          setSelectedTeams([team1, team2]);
          setShowSecondTeam(true);
          setIsSelecting(false);
          
          // Geçmişe ekle
          setHistory(prev => {
            const newHistory: [Team, Team][] = [[team1, team2], ...prev];
            return newHistory.slice(0, 10);
          });
        }, 2000);
      }, 1000);
    }
  };

  // Ligleri al
  const leagues = Array.from(new Set(teams.map(team => team.league))).sort();

  // Lig seçimini değiştir
  const toggleLeague = (league: string) => {
    setSelectedLeagues(prev => {
      if (prev.includes(league)) {
        return prev.filter(l => l !== league);
      }
      return [...prev, league];
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A4D2E] via-[#4F6F52] to-[#1A4D2E] text-white p-4">
      <div className="relative py-3 sm:max-w-6xl sm:mx-auto w-full px-4">
        <div className="relative px-4 py-10 bg-[#262626] shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-5xl mx-auto">
            <div className="divide-y divide-[#4B5563]">
              <div className="py-8 text-base leading-6 space-y-4 text-[#F3F4F6] sm:text-lg sm:leading-7">
                <h1 className="text-4xl font-bold text-center mb-8 text-green-500">FC25 Takım Seçici</h1>
                
                {/* Lig Seçimi */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Ligler</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {leagues.map(league => (
                      <button
                        key={league}
                        onClick={() => toggleLeague(league)}
                        className={`p-2 rounded text-sm transition-all duration-300 ${
                          selectedLeagues.includes(league)
                            ? 'bg-[#4B5563] text-[#F3F4F6] shadow-md'
                            : 'bg-[#1A1A1A] hover:bg-[#4B5563] text-[#F3F4F6]'
                        }`}
                      >
                        {league}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Güç Seviyesi Seçimi */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Güç Seviyesi</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPowerLevel(-1)}
                      className={`flex-1 p-2 rounded transition-all duration-300 ${
                        powerLevel === -1 
                          ? 'bg-[#4B5563] text-[#F3F4F6] shadow-md' 
                          : 'bg-[#1A1A1A] hover:bg-[#4B5563] text-[#F3F4F6]'
                      }`}
                    >
                      Zayıf (0-60)
                    </button>
                    <button
                      onClick={() => setPowerLevel(0)}
                      className={`flex-1 p-2 rounded transition-all duration-300 ${
                        powerLevel === 0 
                          ? 'bg-[#4B5563] text-[#F3F4F6] shadow-md' 
                          : 'bg-[#1A1A1A] hover:bg-[#4B5563] text-[#F3F4F6]'
                      }`}
                    >
                      Dengeli (60-80)
                    </button>
                    <button
                      onClick={() => setPowerLevel(1)}
                      className={`flex-1 p-2 rounded transition-all duration-300 ${
                        powerLevel === 1 
                          ? 'bg-[#4B5563] text-[#F3F4F6] shadow-md' 
                          : 'bg-[#1A1A1A] hover:bg-[#4B5563] text-[#F3F4F6]'
                      }`}
                    >
                      Güçlü (80-100)
                    </button>
                  </div>
                </div>

                {/* Rastgele Takım Seç Butonu */}
                <button
                  onClick={selectRandomTeams}
                  disabled={isSelecting}
                  className={`w-full p-3 rounded-lg transition-all duration-300 ${
                    isSelecting 
                      ? 'bg-[#1A1A1A] cursor-not-allowed opacity-70' 
                      : 'bg-[#6B7280] hover:bg-[#4B5563] text-[#F3F4F6]'
                  } shadow-md hover:shadow-lg font-bold`}
                >
                  {isSelecting ? 'Takımlar Seçiliyor...' : 'Rastgele Takım Seç'}
                </button>

                {/* Seçilen Takımlar */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                  <div className={`transition-all duration-700 transform ${
                    showFirstTeam 
                      ? 'translate-x-0 rotate-0 opacity-100' 
                      : '-translate-x-full rotate-12 opacity-0'
                  }`}>
                    {selectedTeams[0] && <TeamCard team={selectedTeams[0]} />}
                  </div>
                  <div className={`transition-all duration-700 transform ${
                    showSecondTeam 
                      ? 'translate-x-0 rotate-0 opacity-100' 
                      : 'translate-x-full -rotate-12 opacity-0'
                  }`}>
                    {selectedTeams[1] && <TeamCard team={selectedTeams[1]} />}
                  </div>
                  
                  {/* VS Animasyonu */}
                  <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-700 transform ${
                    (showFirstTeam && showSecondTeam) 
                      ? 'scale-100 opacity-100' 
                      : 'scale-150 opacity-0'
                  }`}>
                    <div className="bg-[#4B5563] text-[#F3F4F6] font-bold text-2xl px-6 py-3 rounded-full shadow-lg">
                      VS
                    </div>
                  </div>
                </div>

                {/* Geçmiş */}
                {history.length > 0 && (
                  <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4 text-[#6B7280]">Son Seçimler</h2>
                    <div className="space-y-2">
                      {history.map((match, index) => (
                        <div 
                          key={index} 
                          className="flex justify-between items-center text-sm p-3 rounded-lg bg-[#1A1A1A] hover:bg-[#262626] transition-all duration-300"
                        >
                          <span className="font-medium text-[#F3F4F6]">{match[0].name} <span className="text-[#9CA3AF]">({convertTo100(match[0].overallRating)})</span></span>
                          <span className="px-3 py-1 rounded-full bg-[#4B5563] text-[#F3F4F6] text-xs font-medium">vs</span>
                          <span className="font-medium text-[#F3F4F6]">{match[1].name} <span className="text-[#9CA3AF]">({convertTo100(match[1].overallRating)})</span></span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
