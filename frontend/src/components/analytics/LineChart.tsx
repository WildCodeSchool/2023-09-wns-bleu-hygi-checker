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
//       {
//         x: "03",
//         y: 357,
//       },
//       {
//         x: "04",
//         y: 189,
//       },
//       {
//         x: "05",
//         y: 280,
//       },
//       {
//         x: "06",
//         y: 405,
//       },
//       {
//         x: "07",
//         y: 561,
//       },
//       {
//         x: "08",
//         y: 236,
//       },
//       {
//         x: "09",
//         y: 153,
//       },
//       {
//         x: "10",
//         y: 489,
//       },
//       {
//         x: "11",
//         y: 281,
//       },
//       {
//         x: "12",
//         y: 371,
//       },
//       {
//         x: "13",
//         y: 456,
//       },
//       {
//         x: "14",
//         y: 394,
//       },
//       {
//         x: "15",
//         y: 163,
//       },
//       {
//         x: "16",
//         y: 166,
//       },
//       {
//         x: "17",
//         y: 271,
//       },
//       {
//         x: "18",
//         y: 356,
//       },
//       {
//         x: "19",
//         y: 99,
//       },
//       {
//         x: "20",
//         y: 200,
//       },
//       {
//         x: "21",
//         y: 236,
//       },
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
