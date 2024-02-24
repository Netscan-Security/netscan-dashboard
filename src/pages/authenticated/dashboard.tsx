import StatsCard from "@/components/stats-card";
import DashboardCard from "@/components/dashboard-card";
import { useHostMachines } from "@/services/context/host-machines";

const Dashboard = () => {
  const { hostMachinesInfo } = useHostMachines();

  const totalScannedVulnerabilities = hostMachinesInfo?.reduce(
    (acc, machine) => acc + (machine.scanInfo?.vulnerabilities ?? 0),
    0
  );

  const totalRunningScans = hostMachinesInfo?.reduce(
    (acc, machine) => acc + (machine.scanInfo?.running ? 1 : 0),
    0
  );

  return (
    <>
      <div className="flex flex-col justify-between gap-1 space-y-3 md:gap-4 lg:gap-0 sm:space-y-0 lg:items-center lg:flex-row">
        <div>
          <h1 className="text-4xl font-semibold">Dashboard</h1>
          <p className="text-lg">Welcome admin, Jackson</p>
        </div>
        <DaysFilter />
      </div>
      <div>
        <div className="grid grid-cols-1 gap-4 mt-4 text-center md:grid-cols-2 xl:grid-cols-4">
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
            title="Total Scanned Vulnerabilities"
            percent={5}
            color="text-blue-600"
          />
        </div>
        <div className="mt-4">
          <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard title="Scans Running" value={totalRunningScans} />
            <StatsCard title="Scans Waiting" value={0} />
            <StatsCard
              title="Vulnerabilities"
              value={totalScannedVulnerabilities}
            />
            <StatsCard title="Total Targets" value={0} />
          </div>
        </div>
      </div>
    </>
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
