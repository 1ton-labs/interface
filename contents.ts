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
    // width: 100,
    // height: 45,
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
  landing: {
    logo: "/1ton/android-chrome-192x192.png",
    description: "1TON Logo",
    nftview: {
      logo: {
        image: "/1ton/1ton_landing_NFTview.png",
        description: "1TON NFTView",
      }
    },
    holaA: {
      image: "/1ton/1ton_landing_haloA.png",
      description: "1TON hola A",
    },
    holaB: {
      image: "/1ton/1ton_landing_haloB.png",
      description: "1TON hola B",
    },
    navbar: {
      logo: {
        image: "/1ton/1ton_logo.png",
        link: "https://github.com/1ton-labs",
        size: "h-[40px] w-auto",
        description: "1TON Logo",
      },
      items: [
        {
          name: "TREASURY",
          link: "/treasury",

        },
        {
          name: "FINANCE",
          link: "/finance",
        },
        {
          name: "DOCS",
          link: "https://1ton.gitbook.io/1ton/",
        },
      ],
    },
    button1: {
      name: "Get started",
      link: "/treasury/mint"
    },
    button2: {
      name: "Learn more",
      link: "https://1ton.gitbook.io/1ton/",
    }
  },
  treasury: {
    navbar: {
      logo: {
        image: "/1ton/1ton_treasury_logo.png",
        link: "/",
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
        link: "/",
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

export default contents1ton;
