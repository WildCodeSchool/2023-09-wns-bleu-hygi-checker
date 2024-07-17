import { InputData } from "@/types/interfaces";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FormatHoursAndMinutes } from "@/utils/chartFunction/FormatHoursAndMinutes";
import { getStatusColor } from "@/utils/chartFunction/getColor";

interface StatusBarProps {
  data: InputData[];
}

const StatusBar = ({ data }: StatusBarProps) => {
  // Fonction pour compléter les réponses jusqu'à 24 éléments
  const completeResponses = (responses: InputData[]): InputData[] => {
    const filledResponses = [...responses];
    while (filledResponses.length < 24) {
      filledResponses.push({
        id: null,
        responseTime: null,
        statusCode: null,
        createdAt: null,
        campaignUrl: { id: data[0].campaignUrl.id },
      });
    }
    return filledResponses.reverse();
  };

  // Compléter les réponses
  const completeData = completeResponses(data);

  return (
    <div className="flex overflow-hidden">
      <TooltipProvider>
        {completeData.map((response) => (
          <Tooltip key={response.id}>
            <TooltipTrigger asChild>
              <div
                className={`${getStatusColor(response.statusCode, true)} h-12 w-2 rounded-lg mx-1 my-2 transform transition-transform duration-200 hover:scale-110 lg:w-4`}
              ></div>
            </TooltipTrigger>
            {response.createdAt !== null &&
              response.createdAt !== undefined &&
              response.statusCode !== null &&
              response.statusCode !== undefined &&
              response.responseTime !== null &&
              response.responseTime !== undefined && (
                <TooltipContent>
                  <p>
                    Hour :{" "}
                    <span className="font-bold">
                      {FormatHoursAndMinutes(response.createdAt)}
                    </span>
                  </p>
                  <p>
                    Status :{" "}
                    <span
                      className={`${getStatusColor(response.statusCode, false)} font-bold`}
                    >
                      {response.statusCode}
                    </span>
                  </p>
                  <p>
                    Time :{" "}
                    <span className="font-bold">{response.responseTime}ms</span>
                  </p>
                </TooltipContent>
              )}
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
};

export default StatusBar;
