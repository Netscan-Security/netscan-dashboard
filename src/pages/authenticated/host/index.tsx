// import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import {
  ActivityIcon,
  ArrowLeftIcon,
  FileClockIcon,
  ShieldIcon,
} from "lucide-react";

// Local imports
import { Button } from "@/components/ui/button";
// import StatsCard from "@/components/stats-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useHost } from "@/shared/services/host";
import PageLoader from "@/components/templates/page-loader";

const Host = () => {
  const navigate = useNavigate();
  // const { hostMachinesInfo: hostMachines, setHostMachinesInfo } =
  //   useHostMachines();
  const machineId = useParams<{ id: string }>()?.id ?? "";
  const { data: hostMachine, isLoading } = useHost(machineId);

  return (
    <main className="flex flex-col flex-1 gap-4 p-4 md:gap-8 md:p-6">
      {isLoading && !hostMachine ? (
        <PageLoader />
      ) : (
        <>
          <div className="flex items-center gap-4">
            <Button
              className="h-9"
              size="sm"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              <ArrowLeftIcon size={24} className="mr-1" />
              Back
            </Button>
            <h1 className="text-lg font-semibold md:text-2xl">
              {hostMachine?.name}
            </h1>
            <Button
              className="ml-auto"
              size="sm"
              // onClick={() => {
              //   // make running status 1 then stop the scan after 10 seconds
              //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //   // @ts-ignore
              //   setHostMachinesInfo((prev) => {
              //     return prev?.map((machine) => {
              //       if (machine.id === Number(machineId)) {
              //         return {
              //           ...machine,
              //           scanInfo: {
              //             ...machine.scanInfo,
              //             running: true,
              //           },
              //         };
              //       }
              //       return machine;
              //     });
              //   });
              //   toast.success(`Started scanning ${name}`);

              //   setTimeout(() => {
              //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //     // @ts-ignore
              //     setHostMachinesInfo((prev) => {
              //       return prev?.map((machine) => {
              //         if (machine.id === Number(machineId)) {
              //           return {
              //             ...machine,
              //             lastScanned: new Date().toISOString(),
              //             scanInfo: {
              //               ...machine.scanInfo,
              //               running: false,
              //               total: (machine?.scanInfo?.total ?? 0) + 1,
              //               vulnerabilities:
              //                 (machine?.scanInfo?.vulnerabilities ?? 0) + 3,
              //             },
              //           };
              //         }
              //         return machine;
              //       });
              //     });
              //     toast.success(`Done scanning ${name}`);
              //   }, 10000);
              // }}
            >
              Initiate scan
            </Button>
            <Button size="sm">Restart</Button>
            <Button size="sm">Update agent</Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Logs</CardTitle>
                <CardDescription>Machine logs</CardDescription>
              </CardHeader>
              <CardContent className="h-[200px] grid place-items-center">
                <FileClockIcon className="w-20 h-20 text-gray-500 dark:text-gray-400" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Vulnerabilities</CardTitle>
                <CardDescription>Security vulnerabilities</CardDescription>
              </CardHeader>
              <CardContent className="h-[200px] grid place-items-center">
                <ShieldIcon className="w-20 h-20 text-gray-500 dark:text-gray-400" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Assessment</CardTitle>
                <CardDescription>Assessment details</CardDescription>
              </CardHeader>
              <CardContent className="h-[200px] grid place-items-center">
                <ActivityIcon className="w-20 h-20 text-gray-500 dark:text-gray-400" />
              </CardContent>
            </Card>
          </div>

          {/* machine details */}
          <Card>
            <CardHeader>
              <CardTitle>Machine Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <h2 className="text-lg font-semibold">IP Address:</h2>
                  <p className="text-gray-600">{hostMachine?.ipAddress}</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Operating System:</h2>
                  <p className="text-gray-600">{hostMachine?.os}</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold">CPU:</h2>
                  <p className="text-gray-600">{hostMachine?.cpu}</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold">RAM:</h2>
                  <p className="text-gray-600">{hostMachine?.memory}GB</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </main>
    // <div>
    //   <div className="flex items-center justify-between">
    //     <div className="flex items-center mb-4 space-x-3">
    //       <Button variant="outline" onClick={() => navigate(-1)}>
    //         <ArrowLeft size={24} />
    //       </Button>
    //       <h1 className="text-4xl font-semibold">{name}</h1>
    //     </div>

    //     <Button
    //       variant="default"
    //       onClick={() => {
    //         // make running status 1 then stop the scan after 10 seconds
    //         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //         // @ts-ignore
    //         setHostMachinesInfo((prev) => {
    //           return prev?.map((machine) => {
    //             if (machine.id === Number(machineId)) {
    //               return {
    //                 ...machine,
    //                 scanInfo: {
    //                   ...machine.scanInfo,
    //                   running: true,
    //                 },
    //               };
    //             }
    //             return machine;
    //           });
    //         });
    //         toast.success(`Started scanning ${name}`);

    //         setTimeout(() => {
    //           // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //           // @ts-ignore
    //           setHostMachinesInfo((prev) => {
    //             return prev?.map((machine) => {
    //               if (machine.id === Number(machineId)) {
    //                 return {
    //                   ...machine,
    //                   lastScanned: new Date().toISOString(),
    //                   scanInfo: {
    //                     ...machine.scanInfo,
    //                     running: false,
    //                     total: (machine?.scanInfo?.total ?? 0) + 1,
    //                     vulnerabilities:
    //                       (machine?.scanInfo?.vulnerabilities ?? 0) + 3,
    //                   },
    //                 };
    //               }
    //               return machine;
    //             });
    //           });
    //           toast.success(`Done scanning ${name}`);
    //         }, 10000);
    //       }}
    //     >
    //       Scan Machine
    //     </Button>
    //   </div>
    //   <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-4">
    //     <StatsCard title="Scan Running" value={scanInfo?.running} />
    //     <StatsCard title="Total Scans" value={scanInfo?.total} />
    //     <StatsCard
    //       title="Open Vulnerabilities"
    //       value={scanInfo?.vulnerabilities}
    //     />
    //     <StatsCard title="Total Targets" value={scanInfo?.targets} />
    //   </div>
    //   <div className="p-6">
    //     <h1 className="mb-4 text-2xl font-bold">Machine Details</h1>
    //     <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
    //       <div>
    //         <h2 className="text-lg font-semibold">IP Address:</h2>
    //         <p className="text-gray-600">{ipAddress}</p>
    //       </div>
    //       <div>
    //         <h2 className="text-lg font-semibold">Operating System:</h2>
    //         <p className="text-gray-600">{machineSpecs?.os}</p>
    //       </div>
    //       <div>
    //         <h2 className="text-lg font-semibold">CPU:</h2>
    //         <p className="text-gray-600">{machineSpecs?.cpu}</p>
    //       </div>
    //       <div>
    //         <h2 className="text-lg font-semibold">RAM:</h2>
    //         <p className="text-gray-600">{machineSpecs?.ram}GB</p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};
export default Host;
