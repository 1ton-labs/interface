import { THEME } from "./constants";

const contents1ton = {
  // title: "TAIPEI Hack-a-TONx",
  title: "1TON | Hack-a-TONx w/ DoraHacks",
  // description: "TAIPEI Hack-a-TONx",
  description: "1TON at TAIPEI Hack-a-TONx",
  team: {
    name: "1TON",
    link: "https://github.com/1ton-labs",
  },
  logo: {
    image: "/1ton/1ton_logo.png",
    link: "https://github.com/1ton-labs",
    description: "1TON Logo",
    width: 100,
    height: 45,
  },
  oneliner: "Empowering the Unbanked Creators with Valued Digital Assets",
  // subliner: "TAIPEI Hack-a-TONx <span>DoraHacks</span>",
  subliner: "Hack-a-TONx <span>DoraHacks</span>",
  button1: {
    name: "Treasury",
    // description: "Get the NFT as the ownership of a social media account.",
    description: "Get the NFT as a bond of the creator future incomes.",
  },
  button2: {
    name: "Finance",
    // description: "Borrow or lend money on the account NFT marketplace.",
    description: "Borrow or lend money on the Creator Bond NFT marketplace.",
  },
  treasury: {
    navbar: {
      logo: {
        image: "/1ton/1ton_treasury_logo.png",
        link: "/treasury",
        description: "1TON Treasury Logo",
      },
      items: [
        {
          name: "MINT",
          link: "/treasury/mint",
        },
        {
          name: "MY BONDS",
          link: "/treasury/bonds",
        },
      ],
    },
    mint: {
      title: "1TON Treasury: Mint",
      description: "1TON Treasury: Mint",
      header: "Mint Creator Bond NFT",
    },
    bonds: {
      title: "1TON Treasury: My Bond NFTs",
      description: "1TON Treasury: My Bond NFTs",
      header: "My Creator Bond NFTs",
    },
    asset: {
      titlePrefix: "1TON Treasury: Bond #",
      descriptionPrefix: "1TON Treasury: Bond #",
    },
  },
  finance: {
    navbar: {
      logo: {
        image: "/1ton/1ton_finance_logo.png",
        link: "/finance",
        description: "1TON Finance Logo",
      },
      items: [
        {
          name: "BORROW",
          link: "/finance/borrow",
        },
        {
          name: "LEND",
          link: "/finance/lend",
        },
      ],
    },
    borrow: {
      title: "1TON Finance: Borrow",
      description: "1TON Finance: Borrow",
      header: "My Creator Bond NFTs",
    },
    lend: {
      title: "1TON Finance: Lend",
      description: "1TON Finance: Lend",
      header: "Listed Creator Bond NFTs",
    },
    asset: {
      titlePrefix: "1TON Finance: Asset #",
      descriptionPrefix: "1TON Finance: Asset #",
    },
  },
  console: {
    title: "1TON Finance: Console",
    description: "1TON Finance: Console",
    navbar: {
      logo: {
        image: "/1ton/1ton_logo.png",
        link: "/",
        description: "1TON Logo",
      },
      items: [],
    },
  },
  footer: {
    columns: [
      {
        name: "Ecosystem",
        items: [
          {
            name: "1TON Treasury",
            link: "/treasury",
            newTab: false,
          },
          {
            name: "1TON Finance",
            link: "/finance",
            newTab: false,
          },
        ],
      },
      {
        name: "Community",
        items: [
          {
            name: "Github",
            link: "https://github.com/1ton-labs",
            newTab: true,
          },
        ],
      },
    ],
    copyright: "2023 © 1TON",
  },
};

const contentsSprout = {
  title: "Sprout | Connected 2023",
  description: "Sprout at Connected 2023",
  team: {
    name: "Sprout",
    link: "https://github.com/sprout-network",
  },
  logo: {
    image: "/sprout/sprout_logo.png",
    link: "https://github.com/sprout-network",
    description: "Sprout Logo",
    width: 100,  // 512
    height: 30,  // 153
  },
  oneliner: "Empowering the Unbanked Creators with Valued Digital Assets",
  subliner: "<span>Connected 2023</span> / A Web3 Social Hackathon",
  button1: {
    name: "Treasury",
    description: "Get the NFT as a bond of the creator future incomes.",
  },
  button2: {
    name: "Finance",
    description: "Borrow or lend money on the Creator Bond NFT marketplace.",
  },
  treasury: {
    navbar: {
      logo: {
        image: "/sprout/sprout_treasury_logo.png",
        link: "/treasury",
        description: "Sprout Treasury Logo",
      },
      items: [
        {
          name: "MINT",
          link: "/treasury/mint",
        },
        {
          name: "MY BONDS",
          link: "/treasury/bonds",
        },
      ],
    },
    mint: {
      title: "Sprout Treasury: Mint",
      description: "Sprout Treasury: Mint",
      header: "Mint Creator Bond NFT",
    },
    bonds: {
      title: "Sprout Treasury: My Bond NFTs",
      description: "Sprout Treasury: My Bond NFTs",
      header: "My Creator Bond NFTs",
    },
    asset: {
      titlePrefix: "Sprout Treasury: Bond #",
      descriptionPrefix: "Sprout Treasury: Bond #",
    },
  },
  finance: {
    navbar: {
      logo: {
        image: "/sprout/sprout_finance_logo.png",
        link: "/finance",
        description: "Sprout Finance Logo",
      },
      items: [
        {
          name: "BORROW",
          link: "/finance/borrow",
        },
        {
          name: "LEND",
          link: "/finance/lend",
        },
      ],
    },
    borrow: {
      title: "Sprout Finance: Borrow",
      description: "Sprout Finance: Borrow",
      header: "My Creator Bond NFTs",
    },
    lend: {
      title: "Sprout Finance: Lend",
      description: "Sprout Finance: Lend",
      header: "Listed Creator Bond NFTs",
    },
    asset: {
      titlePrefix: "Sprout Finance: Asset #",
      descriptionPrefix: "Sprout Finance: Asset #",
    },
  },
  console: {
    title: "Sprout Finance: Console",
    description: "Sprout Finance: Console",
    navbar: {
      logo: {
        image: "/sprout/sprout_logo.png",
        link: "/",
        description: "Sprout Logo",
      },
      items: [],
    },
  },
  footer: {
    columns: [
      {
        name: "Ecosystem",
        items: [
          {
            name: "Sprout Treasury",
            link: "/treasury",
            newTab: false,
          },
          {
            name: "Sprout Finance",
            link: "/finance",
            newTab: false,
          },
        ],
      },
      {
        name: "Community",
        items: [
          {
            name: "Github",
            link: "https://github.com/sprout-network",
            newTab: true,
          },
        ],
      },
      {
        name: "Docs",
        items: [
          {
            name: "About Sprout Network",
            link: "https://sprout-2.gitbook.io/sprout/what-is-sprout-finance/sprout-finance-intro",
            newTab: true,
          },
        ],
      },
    ],
    copyright: "2023 © Sprout Network",
  },
};

export default (THEME === "1ton" ? contents1ton : contentsSprout);
