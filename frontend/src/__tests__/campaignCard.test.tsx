import CampaignCard from "@/components/campaign/CampaignCard";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { COUNT_URL_FROM_CAMPAIGN } from "@/requests/queries/countUrlFromCampaign.queries";

// Mock des données de la requête GraphQL
const mocks = [
  {
    request: {
      query: COUNT_URL_FROM_CAMPAIGN,
      variables: {
        campaignId: 1,
      },
    },
    result: {
      data: {
        countUrlFromCampaign: {
          count: 5,
        },
      },
    },
  },
];

describe("CampaignCard component", () => {
  it("renders correctly", () => {
    const view = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CampaignCard
          data={{
            id: 1,
            name: "Campaign1_User1",
            image:
              "https://images.unsplash.com/photo-1564406836777-5964b5c6c3a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8d2FsbHBhcGVyc3x8fHx8fDE3MTU4NzgwNDQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
            intervalTest: 60,
            isMailAlert: false,
            isWorking: true,
            userId: "c83135a6-3bd7-46b1-b6d8-6b4117cfabf7",
            createdAt: new Date("2024-07-14T00:35:18.165Z"),
          }}
        />
      </MockedProvider>
    );

    expect(screen.getByText(/Campaign1_User1/)).toBeInTheDocument();
    expect(screen.getByText(/Details/)).toBeInTheDocument();
    expect(view.baseElement).toMatchSnapshot();
  });
});
