import { platformTypeHandler, stateColor, timeConverHandler, truncatedText } from "@/core/utils";
import { stateName, NftState, NftItemTrait, Income } from "@/types";
import { FC } from "react";
import { useWeb3 } from "@/hooks/useWeb3";
import { useRouter } from "next/router";
import { THEME } from "@/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";

type NFTCardProps = {
  tokenId: string; // NFT address in TON, NFT ID in Ethereum
  displayName: string;
  state: NftState;
  platform: string;
  image: string;
  attributes: NftItemTrait[];
  holder: string; //owner_address
  baseUrl: string;
  duration: number;
  percentage: number;
  incomes: Income[];
}

export const Card: FC<NFTCardProps> = (props) => {
  return THEME === "1ton" ? <VCard {...props} /> : <HCard {...props} />;
}

const VCard: FC<NFTCardProps> = ({
  tokenId,
  displayName,
  state,
  platform,
  image,
  attributes,
  holder,
  baseUrl,
}) => {
  const { connected, prettyAddress } = useWeb3();
  const router = useRouter();
  const socilaMediaStyle = "fill-white";

  const currentPath = router.pathname.split("/")[2];
  const displayUser = connected ? prettyAddress : "Guest";
  const displayOwner = holder ? prettyAddress : undefined;
  return (
    <button
      className="relative py-3 px-4 border border-secondary-light rounded-lg shadow-purpleShadow
      hover:border-accent transition transition-1000"
      onClick={() => window.open(`${baseUrl}/asset/${tokenId}`, "_self")}
    >
      {state !== undefined && (
        <div className={`text-${stateColor(state)} absolute right-0 top-0 flex items-center gap-x-1 px-1 py-0.5 text-sm`}>
          <span className={`w-1.5 h-1.5 rounded bg-${stateColor(state)}`}></span>
          {stateName(state)}
        </div>
      )}
      <div className="flex gap-x-2 mt-3 items-center">
        <span className="w-5 h-5">{platformTypeHandler(platform).icon(socilaMediaStyle)}</span>
        <div className="font-bold text-start">
        {displayName}
        </div>
      </div>
      <div className="flex justify-center">
        <img className="p-4 w-40 h-40 rounded-full" src={image} alt={displayName}/>
      </div>
      <div className="flex justify-between">
        
        {
          attributes.filter((attribute) => attribute.trait_type !== "Last Update").map((attribute) => (
            <div key={attribute.trait_type}>
              <div className="text-sm text-secondary-light">{attribute.trait_type}</div>
              <div>{attribute.value}</div>
            </div>
          ))
        }
      </div>
      {
        currentPath === "all" ? (
          <div className="w-full h-10 text-primary-normal mt-2 text-sm text-center">
            {displayUser === displayOwner ? (
              "You own this item."
            ) 
            : (
              "Holder: " + displayOwner
            )}
          </div>
        ) : (
            <div className="mt-3 text-sm text-secondary-light">{`Last posted at ${attributes[2].value}`}</div>
        )
      }
    </button>
  );
};

const HCard: FC<NFTCardProps> = ({
  tokenId,
  displayName,
  state,
  platform,
  image,
  attributes,
  holder,
  baseUrl,
  duration,
  percentage,
  incomes,
}) => {
  const socilaMediaStyle = "fill-white";
  const { connected, prettyAddress } = useWeb3();
  const recentIncome = (incomes: Income[]) => {
    const platformIncomes = incomes.filter((income) => income.platform === platform)[0];
    return platformIncomes.past_incomes[platformIncomes.past_incomes.length - 1]
  }
  const displayUser = connected ? prettyAddress : "Guest";
  const displayOwner = holder ? prettyAddress : undefined;
  return (
    <button
      className="bg-secondary-normal py-4 px-3 rounded-lg rounded-bl-[52px] shadow-greenShadow border border-transparent
      hover:border-primary-light transition-all"
      onClick={() => window.open(`${baseUrl}/asset/${tokenId}`, "_self")}
    >
      <header className="flex justify-between items-center mb-4">
        <div className="flex gap-x-2 items-center">
          <span className="w-5 h-5">{platformTypeHandler(platform).icon(socilaMediaStyle)}</span>
          <div className="font-bold text-start">
          {displayName}
          </div>
        </div>
        {state !== undefined && (
          <div className={`text-${stateColor(state)} flex items-center gap-x-1 px-1 py-0.5 text-sm`}>
            <span className={`w-1.5 h-1.5 rounded bg-${stateColor(state)}`}></span>
            {stateName(state)}
          </div>
        )}
      </header>
      <main className="flex gap-x-5">
        <div className="flex justify-center">
          <img className="w-24 h-24 rounded-full shadow-grayShadow" src={image} alt={displayName}/>
        </div>
        <div className="w-40 grid grid-cols-2 gap-1 text-start text-sm">
          <div>
            <div className="text-sm text-secondary-light">Duration</div>
            <div>{timeConverHandler(duration)}</div>
          </div>
          <div>
            <div className="text-sm text-secondary-light">Percentage</div>
            <div>{`${percentage} %`}</div>
          </div>
          <div className="col-span-2">
            <div className="text-sm text-secondary-light">Recent Income</div>
            <div>
              {recentIncome(incomes)}
              <FontAwesomeIcon icon={faDollarSign} className="w-4"/>
            </div>
          </div>
        </div>
      </main>
    </button>
  );
};
