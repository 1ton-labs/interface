import { PrimaryButton } from "@/components/Buttons";
import { BintanGOIcon, CyberConnectIcon, InstagramIcon, LensProtocolIcon, TelegramIcon, TiktokIcon, TwitterIcon, UnknownIcon, YouTubeIcon } from "@/components/IconSvg";
import Layout from "@/components/Layout";
import SliderBar from "@/components/SliderBar";
import contents from "@/contents";
import { useWeb3 } from "@/hooks/useWeb3";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { NextPage } from "next";
import { Dispatch, FC, ReactNode, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import DropdownBox from "@/components/DropdownBox";
import { Textarea, Input, Spinner } from '@chakra-ui/react';
import { generateMetadataWithProfiles, getTwitterProfile } from "@/core/metadata";
import PreviewTable from "@/components/PreviewTable";
import { Metadata, Profile } from "@/types";

export const platformConfig = {
  "TWITTER": {
    name: "Twitter",
    icon: (style: string) => <TwitterIcon style={style} />,
  },
  "TIKTOK": {
    name: "TikTok",
    icon: (style: string) => <TiktokIcon style={style} />,
  },
  "YOUTUBE": {
    name: "YouTube",
    icon: (style: string) => <YouTubeIcon style={style} />,
  },
  "INSTAGRAM": {
    name: "Instagram",
    icon: (style: string) => <InstagramIcon style={style} />,
  },
  "TELEGRAM": {
    name: "Telegram",
    icon: (style: string) => <TelegramIcon style={style} />
  },
  "BINTANGO": {
    name: "BintanGO",
    icon: (style: string) => <BintanGOIcon style={style} />
  },
  "CYBERCONNECT": {
    name: "CyberConnect",
    icon: (style: string) => <CyberConnectIcon style={style} />
  },
  "LENS": {
    name: "Lens Protocol",
    icon: (style: string) => <LensProtocolIcon style={style} />
  },
  "UNKNOWN": {
    name: "Unknown",
    icon: (style: string) => <UnknownIcon style={style} />
  }
};

const TonPlatformOptions = [
  platformConfig.BINTANGO,
];

const PlatformOptions = TonPlatformOptions;

const DurationOptionsForDemo = [2592000, 7776000, 15552000, 31104000, 10, 60]

type AgreementProps = {
  onOpen: () => void;
};

const Agreement: FC<AgreementProps> = ({ onOpen }) => {
  return (
    <div className="w-full">
      <div className="w-full max-w-xl rounded-2xl bg-gray-900 p-2">
        <Disclosure>
          {({ open }) => {
            if (open) {
              onOpen();
            }
            return (
              <>
                <Disclosure.Button
                  className="flex w-full justify-between rounded-lg bg-gray-800 
                  px-4 py-2 text-left font-medium text-primary-normal hover:opacity-70
                  transition-all
                  focus:outline-none focus-visible:ring focus-visible:ring-purple-500 
                  focus-visible:ring-opacity-75"
                >
                  <span>Agreement</span>
                  <ChevronUpIcon
                    className={`${open ? 'rotate-180 transform' : ''
                      } h-5 w-5 text-accent`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="leading-6 px-4 pt-4 pb-2 text-gray-300">
                  <div>
                    <p className="mb-2">You are entering into a Pawn agreement. This means that you hand us your goods as a pledge, and we provide you with a digitalized NFT as a receipt. You do not have to pay back NFT unless you want your goods back.</p>
                    <p className="mb-2">IF YOUR GOODS ARE IMPORTANT TO YOU AND YOU THINK THAT YOU MIGHT NOT BE ABLE TO PAY TO GET THEM BACK, YOU MUST NOT SIGN THIS AGREEMENT.</p>
                    <p className="mb-2">YOUR RIGHTS AND OBLIGATIONS RELATING TO PAWNED GOODS ARE SET OUT IN THE 1TON FOUNDATION LTD ACT 2023 (the Act”)</p>
                    <ul className="list-disc">
                      <li className="mb-2 list-inside">You (“the Pledger”) are pledging the pawned goods to the Custodian. This means that the Custodian holds the pawned goods and has rights in them.  You have the right to get the goods back but only if you pay the digitized NFT receipt for the goods on or before the redemption date.</li>
                      <li className="mb-2 list-inside">You do not have to pay us NFT receipt back at all, unless you want your pawned goods back.</li>
                      <li className="mb-2 list-inside">To redeem your pawned goods, you must come in and pay us the NFT receipt set out in the table on the reverse of this ticket. The redemption amount increases each month we hold the pawned goods, to cover our costs.</li>
                      <li className="mb-2 list-inside">You have the right to see the pawned goods while we hold the NFT receipt. You can access your social media account but not own them. If you want to check that your goods are still safe, our staff can check that for you. Please contact us 2 days before you want to verify the pawned goods.</li>
                      <li className="mb-2 list-inside">Take care of this NFT receipt. Under the Act, we are able to give the pawned goods to any person who holds this NFT receipt, unless we have proof that they are not entitled to it. </li>
                      <li className="mb-2 list-inside">We will take care to store the pawned goods, but we do not insure them. We are not responsible for Police seizure of the goods, or loss or damage for reasons outside of our control, including fire, water damage or burglary.</li>
                    </ul>
                    <p>1Ton Foundation (2023) Ltd</p>
                  </div>
                </Disclosure.Panel>
              </>
            );
          }}
        </Disclosure>
      </div>
    </div>
  );
};

type PlatformSelectProps = {
  item: {
    name: string,
    icon: (style: string) => JSX.Element,
  },
  profiles: Profile[],
  setProfiles: Dispatch<SetStateAction<Profile[]>>,
}

const PlatformSelect: FC<PlatformSelectProps> = ({
  item,
  profiles,
  setProfiles,
}) => {
  const { address } = useWeb3();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const active = profiles.length > 0 && (
    profiles[0].type.toLowerCase() == item.name.toLowerCase() ||
    profiles[0].type.toLowerCase() === "twitter" && item.name.toLowerCase() === "bintango"
  );
  const accountConnected = profiles.some((profile) => (
    profile.type.toLowerCase() === item.name.toLowerCase() ||
    profile.type.toLowerCase() === "twitter" && item.name.toLowerCase() === "bintango"
  ));
  const platformStyle = `${active ? "fill-primary-light" : "fill-info-white"}`;
  const showEmailPassword = item.name === platformConfig.BINTANGO.name && !accountConnected;

  const handleClick = useCallback(() => {
    if (profiles.length > 0) {
      const index = profiles.findIndex((profile) => (
        profile.type.toLowerCase() == item.name.toLowerCase() ||
        profile.type.toLowerCase() === "twitter" && item.name.toLowerCase() === "bintango"
      ));
      if (index != -1 && index != 0) {
        setProfiles((prev) => {
          let tmp = [...prev];
          [tmp[0], tmp[index]] = [tmp[index], tmp[0]];
          return tmp;
        });
      }
    }
  }, [profiles, setProfiles]);

  return (
    <div className={`bg-gray-900 border rounded-lg py-2 px-4 ${active ? "text-primary-light border-primary-light" : "text-info-white border-transparent"}`}>
      <div className="flex items-center justify-between gap-x-2">
        <button
          className="flex items-center group hover:text-primary-light gap-x-2 flex-grow text-lg"
          onClick={() => handleClick()}
        >
          <span className="w-7 h-7">{item.icon(platformStyle + " group-hover:fill-primary-light")}</span>
          <span>{item.name}</span>
        </button>
        <PrimaryButton
          className="w-[100px] px-0"
          onClick={async () => {
            switch (item.name) {
              case platformConfig.BINTANGO.name:
                if (emailRef.current?.value && passwordRef.current?.value && emailRef.current.value.includes("@")) {
                  const username = emailRef.current.value.split("@")[0];
                  const twitterProfile = await getTwitterProfile(username);
                  setProfiles((prev) => {
                    if (prev.some((p) => p.type === twitterProfile.type)) {
                      return prev;
                    } else {
                      return [...prev, twitterProfile];
                    }
                  });
                } else {
                  alert("Please enter valid email and password.");
                }
                break;
              default:
                throw Error("Unsupported platform: " + item.name);
            }
          }}
          disabled={accountConnected}
        >{accountConnected ? "Connected" : "Connect"}</PrimaryButton>
      </div>
      <form className={`grid grid-cols-2 gap-y-2 mb-2 ${showEmailPassword ? "block" : "hidden"}`}>
        <label htmlFor={item.name + "Email"} className="col-span-2 transition-all">
          <span className="text-sm font-medium text-info-white">
            Email
          </span>
          <Input
            type="email"
            name={item.name + "Email"}
            placeholder="example@gmail.com"
            ref={emailRef}
            focusBorderColor='gray.400'
          />
        </label>
        <label htmlFor={item.name + "Password"} className="col-span-2 transition-all">
          <span className="text-sm font-medium text-info-white">
            Password
          </span>
          <Input
            type="password"
            name={item.name + "Password"}
            placeholder="********"
            ref={passwordRef}
            focusBorderColor='gray.400'
          />
        </label>
      </form>
    </div>
  )
};

type FormItemProps = {
  children: ReactNode;
  title: string;
  step: number;
  loading?: boolean;
}

const FormItem: FC<FormItemProps> = ({ title, step, children, loading }) => (
  <div className="w-full font-inter">
    <div className="mb-3 flex items-center">
      <span className="w-7 h-7 flex justify-center items-center bg-secondary-light rounded-full mr-4">
        {step}
      </span>
      <div className="my-1 font-medium">{title}</div>
      {loading && <Spinner className="ml-4" size="sm" />}
    </div>
    <div className="px-11">{children}</div>
  </div>
)

const TreasuryMint: NextPage = () => {
  const [bio, setBio] = useState<string>("");
  const [plan, setPlan] = useState<string>("");
  const [duration, setDuration] = useState(DurationOptionsForDemo[0]);
  const [percentage, setPercentage] = useState(100);
  const [metadata, setMetadata] = useState<Metadata>();

  const [read, setRead] = useState<boolean>(false);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [bioLoading, setBioLoading] = useState<boolean>(false);
  const [planLoading, setPlanLoading] = useState<boolean>(false);

  useEffect(() => {
    if (profiles[0]) {
      // Generate bio and business plan
      setBioLoading(true);
      fetch(`/api/text-generator?type=bio&name=${profiles[0].name}`)
        .then((res) => res.json())
        .then((data) => setBio(data.text))
        .finally(() => setBioLoading(false));
      setPlanLoading(true);
      fetch(`/api/text-generator?type=plan&name=${profiles[0].name}`)
        .then((res) => res.json())
        .then((data) => setPlan(data.text))
        .finally(() => setPlanLoading(false));
    }
  }, [profiles]);

  useEffect(() => {
    // Re-generate metadata with new profiles
    generateMetadataWithProfiles(profiles, bio, plan, duration, percentage)
      .then((metadata) => setMetadata(metadata));
  }, [profiles, bio, plan]);

  return (
    <Layout
      title={contents.treasury.mint.title}
      description={contents.treasury.mint.description}
      navbarLogo={contents.treasury.navbar.logo}
      navbarItems={contents.treasury.navbar.items}
    >
      <div className="max-w-5xl mt-12 flex flex-col gap-4">
        <h1 className="text-xl font-bold">{contents.treasury.mint.header}</h1>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-8 py-20 px-16 gap-y-10 border border-secondary-normal rounded-lg flex flex-col justify-center shadow shadow-gray-700">
            <FormItem
              title="Connect to your Accounts"
              step={1}>
              <div className="flex flex-col gap-y-2.5 mb-4">
                {
                  PlatformOptions.map((item) => (
                    <PlatformSelect
                      key={item.name}
                      item={item}
                      profiles={profiles}
                      setProfiles={setProfiles}
                    />
                  ))
                }
              </div>
              {profiles.length === 0 ? (
                <div className="text-gray-500">Please connect to at least 1 account.</div>
              ) : (
                <div className="text-gray-500">The primary account will be used for the income of the Bond NFT.</div>
              )}
            </FormItem>
            <FormItem
              title="Your bio (in 150 words)"
              step={2}
              loading={bioLoading}
            >
              <Textarea
                minHeight={200}
                placeholder={planLoading ? "(loading for demo purpose...)" : ""}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                focusBorderColor="gray.400"
              />
            </FormItem>
            <FormItem
              title="Your business plan (in 150 words)"
              step={3}
              loading={planLoading}
            >
              <Textarea
                minHeight={200}
                placeholder={planLoading ? "(loading for demo purpose...)" : ""}
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                focusBorderColor="gray.400"
              />
            </FormItem>
            <FormItem
              title="Set the bond parameters"
              step={4}
            >
              <div className="flex flex-col gap-y-4">
                <div>
                  <p className="text-sm font-bold">Duration:</p>
                  <DropdownBox
                    durationOptions={DurationOptionsForDemo}
                    duration={duration}
                    setDuration={setDuration}
                  />
                </div>
                <div>
                  <p className="text-sm font-bold">Percentage:</p>
                  <SliderBar
                    percentage={percentage}
                    setPercentage={setPercentage}
                  />
                </div>
              </div>
            </FormItem>

            <FormItem
              title="Please read and consent the agreement before minting the account NFT."
              step={5}
            >
              <Agreement onOpen={() => setRead(true)} />
            </FormItem>
          </div>
          <PreviewTable
            metadata={metadata}
            bio={bio}
            plan={plan}
            duration={duration}
            percentage={percentage}
            read={read}
            isConnect={profiles.length > 0}
          />
        </div>
      </div>

      <img
        src={contents.landing.holaA.image}
        alt={contents.landing.holaA.description}
        className="w-[800px] absolute -right-[400px] top-32 z-[-10]"
      />
      <img
        src={contents.landing.holaB.image}
        alt={contents.landing.holaB.description}
        className="w-[600px] absolute top-10 -left-[300px] z-[-10]"
      />
    </Layout>
  )
}

export default TreasuryMint;
