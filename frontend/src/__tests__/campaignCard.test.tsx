import CampaignCard from "@/components/campaign/CampaignCard";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("CampaignCard component", () => {
  it("renders correctly", () => {
    const view = render(
      <CampaignCard
        data={{
          name: "campaign test",
          image:
            "https://images.unsplash.com/photo-1419064642531-e575728395f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8d2FsbHBhcGVycyxsYW5kc2NhcGV8fHx8fHwxNzE1OTA0NTE0&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
          id: 2,
          isWorking: true,
          isMailAlert: true,
          intervalTest: 60,
          userId: "d5d31072-f28a-4ea7-b971-3f457cfdfa5d",
          urls: {
            urlPath: "https://www.github.com/",
            type: "PAGE",
            id: 1,
          },
        }}
      />
    );
    expect(screen.getByText(/campaign test/)).toBeInTheDocument();
    expect(screen.getByText(/Voir/)).toBeInTheDocument();
    expect(view.baseElement).toMatchSnapshot();
  });
});
