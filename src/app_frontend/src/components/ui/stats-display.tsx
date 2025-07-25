interface StatItem {
  label: string;
  value: string;
}

interface StatsDisplayProps {
  stats: StatItem[];
}

export function StatsDisplay({ stats }: StatsDisplayProps) {
  return (
    <div className="space-y-3">
      {stats.map((stat) => (
        <div key={stat.label} className="flex justify-between text-sm">
          <span className="text-gray-400">{stat.label}</span>
          <span>{stat.value}</span>
        </div>
      ))}
    </div>
  );
}