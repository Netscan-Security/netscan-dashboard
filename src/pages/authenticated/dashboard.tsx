import DashboardCard from "@/components/dashboard-card";

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-col justify-between space-y-3 sm:space-y-0 sm:items-center sm:flex-row">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm">Welcome admin, Jackson</p>
        </div>
        <DaysFilter />
      </div>
      <div>
        <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-4">
          <DashboardCard
            title="High Severity Vulnerabilities"
            percent={23}
            color="text-red-500"
          />
          <DashboardCard
            title="Medium Severity Vulnerabilities"
            percent={80}
            color="text-yellow-600"
          />
          <DashboardCard
            title="Low Severity Vulnerabilities"
            percent={34}
            color="text-green-600"
          />
          <DashboardCard
            title="Total Scaned Vulnerabilities"
            percent={5}
            color="text-blue-600"
          />
        </div>
        <div className="mt-4">
          <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-5">
            <StatsCard title="Scans Running" value={1} />
            <StatsCard title="Scans Waiting" value={3} />
            <StatsCard title="Total Scans Conducted" value={5} />
            <StatsCard title="Open Vulnerabilities" value={29} />
            <StatsCard title="Total Targets" value={5} />
          </div>
        </div>
      </div>
    </>
  );
};

const StatsCard = ({ title, value }: { title: string; value: number }) => {
  return (
    <div className="p-4 text-center bg-white rounded-md shadow-sm gap-y-5">
      <h3 className="text-sm font-semibold text-gray-600">{title}</h3>
      <h3 className="text-2xl font-semibold text-blue-400">{value}</h3>
    </div>
  );
};

const DaysFilter = () => {
  const filterList = [
    { name: "12 months", value: "12months" },
    { name: "30 days", value: "30days" },
    { name: "7 days", value: "7days" },
    { name: "24 hours", value: "24hours" },
  ];
  return (
    <div className="flex items-center">
      {filterList.map((item, index) => (
        <button
          key={index}
          // first item and last item should have rounded corners
          className={`
        px-4 py-2 text-sm font-semibold text-gray-700 transition border border-gray-300 duration-150 ease-in-out
        ${index === 0 ? "rounded-l-md" : ""}
        ${index === filterList.length - 1 ? "rounded-r-md" : ""}
        `}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};

export default Dashboard;
