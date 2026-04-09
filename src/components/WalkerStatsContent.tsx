import { useState } from "react";

const TEAMS = [
  { name: "Purdue Boilermakers", emoji: "🚂", league: "College Football & Basketball", color: "#CFB991" },
  { name: "Kansas City Chiefs", emoji: "🏈", league: "NFL", color: "#E31837" },
  { name: "Indiana Pacers",     emoji: "🏀", league: "NBA", color: "#002D62" },
  { name: "Baltimore Orioles",  emoji: "⚾", league: "MLB", color: "#DF4601" },
  { name: "Tampa Bay Lightning",emoji: "⚡", league: "NHL", color: "#002868" },
  { name: "Ferrari F1",         emoji: "🏎️", league: "Formula 1", color: "#DC0000" },
];

const INTERESTS = [
  { icon: "📸", label: "Photography" },
  { icon: "🎥", label: "Videography" },
  { icon: "📊", label: "Sports Analytics" },
  { icon: "📱", label: "Social Media Strategy" },
  { icon: "📜", label: "History & Research" },
  { icon: "💻", label: "Technology & IT" },
];

const WalkerStatsContent = () => {
  const [showTeams, setShowTeams] = useState(false);

  return (
    <div className="space-y-5 text-card-foreground">
      {/* Header */}
      <div className="flex items-center gap-3">
        <img
          src={import.meta.env.BASE_URL + "headshot.jpg"}
          alt="Walker Birchfield"
          className="w-14 h-14 rounded-full border-2 border-primary object-cover object-top flex-shrink-0"
        />
        <div>
          <h2 className="text-xl font-extrabold text-primary">Walker Birchfield</h2>
          <p className="text-xs text-muted-foreground">History/Law Student · Creative Director</p>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: "Age",      value: "22" },
          { label: "Birthday", value: "Dec 4, 2003" },
          { label: "From",     value: "Chesapeake, VA" },
          { label: "School",   value: "Purdue University" },
        ].map(({ label, value }) => (
          <div key={label} className="bg-muted/50 rounded-xl p-3">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="font-bold text-sm">{value}</p>
          </div>
        ))}
      </div>

      {/* Sports — expandable */}
      <div>
        <button
          className="w-full flex items-center justify-between bg-muted/50 rounded-xl p-3 hover:border-primary border border-transparent transition-colors group"
          onClick={() => setShowTeams(!showTeams)}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">🏆</span>
            <span className="font-bold text-sm group-hover:text-primary transition-colors">Watching Sports</span>
          </div>
          <span className="text-muted-foreground text-xs">{showTeams ? "▲ hide" : "▼ see teams"}</span>
        </button>

        {showTeams && (
          <div className="mt-2 grid grid-cols-1 gap-1.5 pl-1">
            {TEAMS.map((team) => (
              <div
                key={team.name}
                className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/30 border border-border"
              >
                <span className="text-xl w-7 text-center">{team.emoji}</span>
                <div>
                  <p className="font-semibold text-sm leading-tight">{team.name}</p>
                  <p className="text-xs text-muted-foreground">{team.league}</p>
                </div>
                <div
                  className="ml-auto w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: team.color }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Other interests */}
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Other Interests</p>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map(({ icon, label }) => (
            <span
              key={label}
              className="flex items-center gap-1 bg-muted/60 border border-border rounded-full px-3 py-1 text-xs font-medium"
            >
              {icon} {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WalkerStatsContent;
