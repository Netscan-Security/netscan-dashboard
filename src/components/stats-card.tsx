const StatsCard = ({ title, value }: { title: string; value?: number }) => {
  return (
    <div className="p-4 text-center rounded-md hover:bg-white gap-y-5 hover:shadow-sm hover:shadow-black/40">
      <h3 className="text-sm font-semibold text-gray-600">{title}</h3>
      <h3 className="text-2xl font-semibold text-blue-400">{value}</h3>
    </div>
  );
};

export default StatsCard;
