import { chainId2Name, platformTypeHandler, safeUserImage, timeConverHandler, truncatedText } from "@/core/utils";
import { Metadata } from "@/types";
import { FC, useState } from "react";
import { PrimaryButton } from "./Buttons";
import { Spinner, Tooltip } from '@chakra-ui/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsersViewfinder, faUser, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import { useWeb3 } from "@/hooks/useWeb3";
import { APP_CHAIN } from "@/constants";
import { IBondManager } from "@/core/managers/IBondManager";

async function handleMint(
  bondManager: IBondManager,
  metadata: Metadata | undefined,
  chain: string | undefined,
): Promise<boolean> {
  if (chain === undefined) {
    alert("Please connect to wallet.")
  } else if (chain !== APP_CHAIN) {
    alert(`Please switch to the ${chainId2Name(APP_CHAIN)}.`);
  } else {
    if (metadata) {
      try {
        await bondManager.mint({
          metadata,
        });
        return true;
      } catch (e) {
        console.error(e);
      }
    }
  }
  return false;
};

type PreviewTableProps = {
  metadata: Metadata | undefined;
  bio: string;
  plan: string
  duration: number;
  percentage: number;
  read: boolean;
  isConnect: boolean;
};

type ToolTipDivProps = {
  name: string;
  followers: number[];
}

const ToolTipDiv: FC<ToolTipDivProps> = ({ name, followers }) => (
  <div className="p-2 flex flex-col gap-2">
    <div className="flex items-center gap-2">
      <FontAwesomeIcon icon={faUser} className="w-4" />
      {name}
    </div>
    <div className="flex items-center gap-2">
      <FontAwesomeIcon icon={faUsersViewfinder} className="w-4" />
      {followers} Followers
    </div>
  </div>
);

const PreviewTable: FC<PreviewTableProps> = ({
  metadata,
  bio,
  plan,
  duration,
  percentage,
  read,
  isConnect
}) => {
  const { connected, chain, bondManager } = useWeb3();
  const [loading, setLoading] = useState<boolean>(false);
  const socilaMediaStyle = "group-hover:fill-primary-normal fill-white";

  if (!isConnect) {
    return (
      <div className="col-span-4">
      </div>
    )
  } else if (!metadata && isConnect) {
    return (
      <div className="col-span-4">
        <div className="fixed top-40 w-96 self-start backdrop-blur-md shadow-md bg-white/20 rounded-lg px-10 py-4">
          <SkeletonCircle size='10' />
          <SkeletonText mt='4' noOfLines={4} spacing='4' />
        </div>
      </div>
    )
  } else if (!metadata) {
    return (
      <div className="col-span-4">
        <div className="fixed top-[165px] w-96 self-start backdrop-blur-md shadow-md bg-white/20 rounded-lg flex items-center justify-center h-40">
          Please select a primary platform.
        </div>
      </div>
    )
  } else {
    const { platform, name, image, incomes, profiles } = metadata;
    return (
      <div className="col-span-4">
        <div className="fixed top-[165px] w-96 shadow-[10px_10px_40px_-10px_rgba(82,179,208,1)] bg-accent/20 rounded-lg flex flex-col gap-4 px-10 py-4">
          <header className="w-full flex flex-col gap-4 ">
            <div className="flex gap-x-2 items-center">
              <span className="w-5 h-5">{platformTypeHandler(platform).icon(socilaMediaStyle)}</span>
              <div className="font-bold text-start">
                {platform}
              </div>
              <div className="text-primary-normal">{name}</div>
            </div>
            <div className="flex gap-4">
              <img className="w-24 h-24 rounded-full shadow-grayShadow" src={safeUserImage(image)} alt={name} />
              <div>
                <span className="text-gray-400">Plan: </span>
                {truncatedText(plan, 15)}
              </div>
            </div>
          </header>
          <main className="flex flex-col gap-3">
            <div>
              <span className="text-gray-400">Bio: </span>
              {truncatedText(bio, 15)}
            </div>
            <div className="grid grid-cols-2">
              <div className="flex flex-col">Duration:
                <span className="font-bold">
                  {timeConverHandler(duration)}
                </span>
              </div>
              <div className="flex flex-col">Percentage:
                <span className="font-bold">{` ${percentage}`}%</span>
              </div>
            </div>


            {/* Profiles */}
            <div className="flex gap-2">
              {profiles.map((profile) =>
                <Tooltip hasArrow label={
                  <ToolTipDiv
                    name={profile.name}
                    followers={profile.followers} />
                } bg='gray.600' color='white' key={profile.type}
                >
                  <span className="flex items-center justify-center w-8 p-1 rounded-full border border-info-white hover:border-primary-normal group">{platformTypeHandler(profile.type).icon(socilaMediaStyle)}</span>
                </Tooltip>
              )}
            </div>

            {/* Incomes */}
            <div className="flex flex-col gap-0">
              Past Incomes:
              <div>
                {incomes.map((income) =>
                  <div key={income.platform} className="flex items-center">
                    <span className="flex items-center justify-center w-8 p-1">{platformTypeHandler(income.platform).icon(socilaMediaStyle)}
                    </span>
                    <span className="font-bold">
                      {income.past_incomes[income.past_incomes.length - 1]}
                      <FontAwesomeIcon icon={faDollarSign} className="w-4" />
                    </span>
                  </div>
                )}
              </div>
            </div>
          </main>
          {
            <>
              <p className="text-left text-gray-400 text-sm">Please note that minting the account NFT means that you consent the agreement above.</p>
              <div className="text-center">
                {loading ? (
                  <PrimaryButton
                    disabled={true}
                  >
                    <div className="flex items-center">
                      <Spinner />
                    </div>
                  </PrimaryButton>
                ) : (
                  <PrimaryButton
                    disabled={!read || !connected}
                    onClick={() => {
                      const organizeMetadata = {
                        ...metadata,
                        bio: bio,
                        plan: plan,
                        duration: duration,
                        percentage: percentage
                      };
                      setLoading(true);
                      handleMint(bondManager, organizeMetadata, chain)
                        .then((success) => {
                          if (success) {
                            alert("Minted the Bond NFT successfully.");
                            window.location.replace("/treasury/bonds");
                          }
                        })
                        .finally(() => {
                          setLoading(false);
                        });
                    }}
                  >{`${!connected ? "Please connect to wallet" : "MINT"}`}</PrimaryButton>
                )}
              </div>
            </>
          }
        </div>
      </div>

    )
  }

};

export default PreviewTable;