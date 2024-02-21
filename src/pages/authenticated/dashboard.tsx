const Dashboard = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm">Welcome admin, Jackson</p>
        </div>
        <DaysFilter />
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
