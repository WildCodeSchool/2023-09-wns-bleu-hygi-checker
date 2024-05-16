import CampaignCard from "@/components/dashboard/CampaignCard";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("CampaignCard component", () => {
  it("renders correctly", () => {
    const view = render(
      <CampaignCard
        campaign={{
          title: "teeeest",
          url: "urllll",
          urlNumber: 4,
        }}
      />
    );
    expect(screen.getByText(/teeeest/)).toBeInTheDocument();
    expect(screen.getByText(/4/)).toBeInTheDocument();
    expect(view.baseElement).toMatchSnapshot();
  });
});
