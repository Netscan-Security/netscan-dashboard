import { Button } from "./ui/button";

const DashboardCard = ({
  title,
  percent,
  color,
}: {
  title: string;
  percent: number;
  color: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-2 bg-white rounded-md shadow-sm">
      <div>
        <PercentageCircle color={color} percent={percent} />
      </div>
      <h3 className="text-sm font-semibold text-gray-600">{title}</h3>
      <Button variant="outline" size="sm" className="w-fit">
        View
      </Button>
    </div>
  );
};

const PercentageCircle = ({
  color,
  percent,
}: {
  percent: number;
  color?: string;
}) => {
  const strokeWidth = 8;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (percent / 100) * circumference;

  return (
    <div className="relative">
      <svg height="100" width="100">
        {/* full circle */}
        <circle
          className={`text-gray-100 stroke-current`}
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
        />
        <circle
          className={`stroke-current ${color}`}
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
          style={{
            strokeDasharray: `${circumference} ${circumference}`,
            strokeDashoffset: progress,
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
          }}
        />
      </svg>
      <div
        className={`absolute inset-0 flex items-center justify-center ${color}`}
      >
        <span className="text-lg font-bold">{percent}</span>
      </div>
    </div>
  );
};

export default DashboardCard;
