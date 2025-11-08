import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  iconColor?: string;
  iconBgColor?: string;
}

export function StatCard({
  icon: Icon,
  value,
  label,
  iconColor = "text-brand-orange-500",
  iconBgColor = "bg-brand-orange-100",
}: StatCardProps) {
  return (
    <div className="stat-card group">
      <div
        className={`w-12 h-12 ${iconBgColor} rounded-full flex items-center justify-center mb-4
                    transition-transform duration-300 group-hover:scale-110`}
      >
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>
      <div className="text-3xl md:text-4xl font-black text-brand-black mb-1">
        {value}
      </div>
      <div className="text-sm text-gray-600 font-medium">{label}</div>
    </div>
  );
}
