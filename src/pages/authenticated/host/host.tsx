import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

// Local imports
import { Button } from "@/components/ui/button";
import StatsCard from "@/components/stats-card";
import { useHostMachines } from "@/services/context/host-machines";
import { toast } from "sonner";

const Host = () => {
  const navigate = useNavigate();
  const { hostMachinesInfo: hostMachines, setHostMachinesInfo } =
    useHostMachines();
  const machineId = useParams<{ id: string }>()?.id ?? "";

  const {
    name,
    ipAddress,
    // status,
    // lastScanned,
    machineSpecs,
    scanInfo,
  } = hostMachines!.find((machine) => machine.id === Number(machineId))!;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center mb-4 space-x-3">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft size={24} />
          </Button>
          <h1 className="text-4xl font-semibold">{name}</h1>
        </div>

        <Button
          variant="default"
          onClick={() => {
            // make running status 1 then stop the scan after 10 seconds
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setHostMachinesInfo((prev) => {
              return prev?.map((machine) => {
                if (machine.id === Number(machineId)) {
                  return {
                    ...machine,
                    scanInfo: {
                      ...machine.scanInfo,
                      running: 1,
                    },
                  };
                }
                return machine;
              });
            });
            toast.success(`Started scanning ${name}`);

            setTimeout(() => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              setHostMachinesInfo((prev) => {
                return prev?.map((machine) => {
                  if (machine.id === Number(machineId)) {
                    return {
                      ...machine,
                      scanInfo: {
                        ...machine.scanInfo,
                        running: 0,
                        total: machine?.scanInfo?.total ?? 0 + 1,
                        vulnerabilities:
                          machine?.scanInfo?.vulnerabilities ?? 0 + 3,
                      },
                    };
                  }
                  return machine;
                });
              });
              toast.success(`Done scanning ${name}`);
            }, 20000);
          }}
        >
          Scan Machine
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Scans Running" value={scanInfo?.running} />
        <StatsCard title="Total Scans" value={scanInfo?.total} />
        <StatsCard
          title="Open Vulnerabilities"
          value={scanInfo?.vulnerabilities}
        />
        <StatsCard title="Total Targets" value={scanInfo?.targets} />
      </div>
      <div className="p-6">
        <h1 className="mb-4 text-2xl font-bold">Machine Details</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold">IP Address:</h2>
            <p className="text-gray-600">{ipAddress}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Operating System:</h2>
            <p className="text-gray-600">{machineSpecs?.os}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">CPU:</h2>
            <p className="text-gray-600">{machineSpecs?.cpu}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">RAM:</h2>
            <p className="text-gray-600">{machineSpecs?.ram}GB</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Host;
