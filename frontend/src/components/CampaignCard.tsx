export type CampaignType = {
  title: string
  url: string
  urlNumber: number
}

type CampaignCardProps = {
  campaign: CampaignType
}

export default function CampaignCard({
  campaign: { title, url, urlNumber },
}: CampaignCardProps) {
  return (
    <div className="[w-400] flex flex-column p-2 gap-2 rounded-lg border">
      <h2>{title}</h2>
      <div className="flex flex-column gap-1">
        <p>{url}</p>
        <p>{urlNumber}</p>
      </div>
    </div>
  )
}
