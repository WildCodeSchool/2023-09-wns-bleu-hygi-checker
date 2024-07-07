import dynamic from "next/dynamic";

const ResponsivePie = dynamic(
  () => import("@nivo/pie").then((m) => m.ResponsivePie),
  { ssr: false }
);

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const data = [
  {
    id: "200",
    label: "200",
    value: 315,
    color: "hsl(113, 48%, 52%)",
  },
  {
    id: "404",
    label: "404",
    value: 48,
    color: "hsl(20, 100%, 48%)",
  },
  {
    id: "500",
    label: "500",
    value: 35,
    color: "hsl(0, 100%, 50%)",
  },
  {
    id: "other",
    label: "other",
    value: 63,
    color: "hsl(58, 76%, 55%)",
  },
];

const PieChart = () => (
  <ResponsivePie
    data={data}
    margin={{ top: 40, right: 80, bottom: 20, left: 80 }}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    activeOuterRadiusOffset={8}
    colors={{ datum: "data.color" }}
    borderWidth={1}
    borderColor={{
      from: "color",
      modifiers: [["darker", 0.2]],
    }}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: "color" }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{
      from: "color",
      modifiers: [["darker", 2]],
    }}
    defs={[
      {
        id: "dots",
        type: "patternDots",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: "lines",
        type: "patternLines",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ]}
  />
);

export default PieChart;
