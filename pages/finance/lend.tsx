import Layout from "@/components/Layout";
import NFTCards from "@/components/NFTCards";
import { PROJECT_NAME } from "@/constants";
import contents from "@/contents";
import { getActiveLoanKeys, getBond, getBondRecords, getTokenIdFromRecord } from "@/core/utils";
import { Metadata, NftState } from "@/types";
import firebase from "firebase";
import { GetServerSideProps, NextPage } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  // Get all NFTs under current collection
  const records = await getBondRecords();
  const existingItemIds = records.map((record) => getTokenIdFromRecord(record));
  // Get listed items
  let snapshot = await firebase.database().ref("/terms").once("value");
  const allTerms = snapshot.val();
  const listedTokenIds = allTerms ? Object.keys(snapshot.val()) : [];
  const listedExistingTokenIds = listedTokenIds.filter((id) => existingItemIds.includes(id));
  const listedItems = await Promise.all(listedExistingTokenIds.map(async (id) => {
    const item = await getBond(id);
    item.state = NftState.LISTED;
    return item;
  }));
  const activeTokenIds = await getActiveLoanKeys();
  listedItems.forEach((item) => {
    if (item.token_address && activeTokenIds.includes(item.token_address)) {
      item.state = NftState.ACTIVE;
    }
  });
  return {
    props: {
      listedItems,
    },
  };
};

type FinanceLendProps = {
  listedItems: Metadata[],
};

const FinanceLend: NextPage<FinanceLendProps> = ({ listedItems }) => {
  return (
    <Layout
      title={contents.finance.lend.title}
      description={contents.finance.lend.description}
      navbarLogo={contents.finance.navbar.logo}
      navbarItems={contents.finance.navbar.items}
    >
      <div className="flex items-center flex-col mt-20">
        <h1 className="mb-6 w-full font-bold text-xl text-start">{contents.finance.lend.header}</h1>
        {listedItems.length > 0 ? (
          <NFTCards items={listedItems} baseUrl="/finance" />
        ) : (
          <p>I&apos;m sorry. No NFT is listed on {PROJECT_NAME} Finance. 🫢</p>
        )}
      </div>
    </Layout>
  );
};

export default FinanceLend;