import dynamic from "next/dynamic";

const ResponsiveLine = dynamic(
  () => import("@nivo/line").then((m) => m.ResponsiveLine),
  { ssr: false }
);

import { OutputData } from "@/utils/chartFunction/formatResponseTime";

interface LineChartProps {
  chartData: OutputData[];
}
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

// const data = [
//   {
//     id: "response",
//     color: "hsl(253, 74%, 50%)",
//     data: [
//       {
//         x: "00", // le x représente l'heure (donc ici 00h)
//         y: 240, // le temps de réponse d'une requête
//       },
//       {
//         x: "01",
//         y: 112,
//       },
//       {
//         x: "02",
//         y: 241,
//       },
//       ..........
//       {
//         x: "22",
//         y: 320,
//       },
//       {
//         x: "23",
//         y: 395,
//       },
//     ],
//   },
// ];

const LineChart = ({ chartData }: LineChartProps) => (
  <ResponsiveLine
    data={chartData}
    animate={false}
    margin={{ top: 20, right: 15, bottom: 40, left: 50 }}
    colors={{ datum: "color" }}
    xScale={{ type: "point" }}
    yScale={{
      type: "linear",
      min: "auto",
      max: "auto",
      stacked: true,
      reverse: false,
    }}
    yFormat=" >-.2f"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Date time (h)",
      legendOffset: 36,
      legendPosition: "middle",
      truncateTickAt: 0,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Response time (ms)",
      legendOffset: -40,
      legendPosition: "middle",
      truncateTickAt: 0,
    }}
    pointSize={8}
    pointColor={{ theme: "background" }}
    pointBorderWidth={8}
    pointBorderColor={{ from: "serieColor" }}
    pointLabel="data.yFormatted"
    pointLabelYOffset={-12}
    enableTouchCrosshair={true}
    useMesh={true}
  />
);

export default LineChart;
