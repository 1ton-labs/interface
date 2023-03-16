import { FC, useState } from "react";
import { CreatorInformation } from "./CreatorInformation";
import { LoanPanel } from "./LoanPanel";
import OfferTable from "./OfferTable";
import TermsPanel from "./TermsPanel";
import { AssetProps } from "@/core/asset";
import { getTokenId, parseAddress, parseAttributes, shortStr } from "@/core/utils";
import { useWeb3 } from "@/hooks/useWeb3";
import { useRouter } from "next/router";
import BondPanel from "./BondPanel";

export const AssetContent: FC<AssetProps> = ({
  item,
  desiredTerms,
  offers,
  loan,
}) => {
  const { connected, address, prettyAddress } = useWeb3();
  const [customDate, setCustomDate] = useState(new Date());
  const router = useRouter();
  const baseUrl = router.asPath.split("/")[1]

  let isOwner = false;
  let isBorrower = false;
  let isLender = false;

  if (connected) {
    if (item.owner_address) {
      isOwner = parseAddress(item.owner_address) === address;
    }

    if (loan) {
      isBorrower = parseAddress(loan.borrower) === address;
      isLender = parseAddress(loan.lender) === address;
    }
  }

  const displayUser = connected ? prettyAddress : "Guest"; // TODO: prettyAddress
  const displayOwner = item.owner_address ? shortStr(item.owner_address) : ""; // TODO: prettyAddress

  return (
    <div className="flex flex-col max-w-6xl">
      <div className="mt-10 mb-2 px-10">
        <div className="text-2xl font-inter">Hello, {displayUser} 😁</div>
        {item.owner_address === undefined || item.owner_address === "" ? (
          <div className="text-gray-500">
            No owner. It&apos;s a burned NFT.
          </div>
        ) : (
          <div className="text-gray-500">
            {isOwner ? "You own this item." : "Holder: " + displayOwner}
          </div>
        )}
      </div>
      <div className="flex gap-10 px-10 font-sans">
        <div className="pt-8">
          <CreatorInformation
            image={item.image}
            platform={item.platform}
            creatorName={item.name}
            attributes={parseAttributes(item.attributes)}
            profiles={item.profiles}
            incomes={item.incomes}
            id={item.id}
            state={item.state}
            plan={item.plan}
          />
          {/* All offers */}
          <div className="mt-10 flex flex-col gap-y-2">
            <h2 className="text-secondary-light font-semibold font-inter">
              ALL OFFERS
            </h2>
            <OfferTable
              offers={offers}
              isOwner={isOwner}
              tokenId={getTokenId(item)}
            />
          </div>

          {/* Bio */}
          <div className="mt-10 flex flex-col gap-y-2">
            <h2 className="text-secondary-light font-semibold font-inter">
              Bio
            </h2>
            <div text-info-white font-main>{item.bio}</div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          {baseUrl === "treasury" ? (
            <>
              <div className="w-80 rounded-3xl px-4 flex-1 shadow-purpleShadow">
                <BondPanel
                  item={item}
                  duration={item.duration}
                />
              </div>
            </>
          ) : (
            <>
              <div className="w-80 rounded-3xl px-4 flex-1 shadow-purpleShadow">
                <TermsPanel
                  tokenId={getTokenId(item)}
                  isOwnerOrBorrower={isOwner || isBorrower}
                  desiredTerms={desiredTerms}
                />
              </div>
              {loan && !isOwner && (
                <LoanPanel
                  loan={loan}
                  tokenId={getTokenId(item)}
                  isOwner={isOwner}
                  isBorrower={isBorrower}
                  isLender={isLender}
                  customDate={customDate}
                />
              )}
            </>
          )}
        </div>
      </div>
      <div className="mb-16"></div>
      {/* <DebugConsole item={item} loan={loan} customDate={customDate} setCustomDate={setCustomDate} /> */}
    </div>
  );
};
