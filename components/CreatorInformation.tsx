import { IncomesChart } from "@/components/IncomesChart";
import { nFormatter, platformTypeHandler, safeUserImage, stateColor } from "@/core/utils";
import { Income, NftState, Profile, stateName } from "@/types";
import { FC } from "react";

type TitleProps = {
  platform: string,
  creatorName: string,
  id: string,
  state?: NftState | undefined,
}

const Title: FC<TitleProps> = ({ platform, creatorName, id, state }) => {
  const socilaMediaStyle = "fill-white";

  return (
    <div>
      <div className="flex gap-x-1 text-xl items-center">
        <span className="w-6 h-6">
          {platformTypeHandler(platform).icon(socilaMediaStyle)}
        </span>
        <div className="text-info-white">
          {platform.toUpperCase()}
        </div>
        <div className="font-bold text-2xl ml-1 text-primary-normal">
          {creatorName}
        </div>
        {state !== undefined && (
          <div className={`flex items-center ml-4 gap-x-1 text-sm text-${stateColor(state)}`}>
            <span className={`w-1.5 h-1.5 rounded bg-${stateColor(state)}`}></span>
            {stateName(state)}
          </div>
        )}
      </div>
      <h1 className="text-xs font-medium ml-7 text-secondary-light">
        {`ASSET #${id}`}
      </h1>
    </div>

  )
};

type ProfilesDivProps = {
  profiles: Profile[],
}

const ProfilesDiv: FC<ProfilesDivProps> = ({ profiles }) => {
  const iconStyle = "w-5 fill-accent group-hover:fill-info-white"
  return (
    <div className="text-base font-semibold mt-2 flex flex-col gap-y-4">
      {profiles.map((profile) =>
        <a href={profile.link} target="_blanck" key={profile.id} className="flex items-center gap-x-2 text-accent group">
          <span>{platformTypeHandler(profile.type).icon(iconStyle)}</span>
          <span>{`${nFormatter(profile.followers[profile.followers.length - 1], 0)} Followers`}</span>
        </a>
      )}
    </div>
  )
}

type CreatorInformationProps = {
  image: string;
  platform: string;
  creatorName: string;
  attributes: string[];
  profiles: Profile[];
  incomes: Income[];
  id: string;
  state?: NftState | undefined;
  plan: string;
};

export const CreatorInformation: FC<CreatorInformationProps> = ({
  image,
  platform,
  creatorName,
  profiles,
  incomes,
  id,
  state,
  plan
}) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-y-5 flex-col">
        <Title platform={platform} creatorName={creatorName} id={id} state={state} />
        <div className="grid grid-cols-3 gap-4">
          <img className="rounded-xl w-44 h-44 shadow-purpleShadow" src={safeUserImage(image)} />
          <div className="col-span-2 text-info-white font-main">{plan}</div>
        </div>
      </div>
      <div className="grid grid-cols-4">
        <ProfilesDiv profiles={profiles} />
        <IncomesChart incomes={incomes} platform={platform} />
      </div>
    </div>
  )
};