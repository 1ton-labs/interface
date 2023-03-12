import { THEME } from "@/constants";
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
    <div className={`grid ${THEME === "1ton" ? "grid-cols-5 gap-5" : "grid-cols-3 gap-8"}`}>
      {
        items.map((item) => (
          <Card
            key={item.id}
            tokenId={getTokenId(item)}
            displayName={item.name}
            state={item.state ?? NftState.NOT_LISTED}
            platform={item.platform}
            image={item.image}
            attributes={item.attributes}
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