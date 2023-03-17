import { getTokenId } from "@/core/utils";
import { Metadata, NftState } from "@/types";
import { FC } from "react";
import { Card } from "./Cards";

type NFTCardsProps = {
  items: Metadata[];
  baseUrl: string;
}

const NFTCards: FC<NFTCardsProps> = ({ items, baseUrl }) => {
  return (
    <div className={`grid max-w-6xl grid-cols-5 gap-5`}>
      {
        items.map((item) => (
          <Card
            key={item.id}
            tokenId={getTokenId(item)}
            displayName={item.name}
            state={item.state ?? NftState.NOT_LISTED}
            platform={item.platform}
            image={item.image}
            holder={item.owner_address ?? ""}
            baseUrl={baseUrl}
            duration={item.duration}
            percentage={item.percentage}
            incomes={item.incomes}
          />
        ))
      }
    </div>
  )
}

export default NFTCards;