import { BondContent } from "@/components/Bond";
import Layout from "@/components/Layout";
import contents from "@/contents";
import { BondProps, getListedTokenIds } from "@/core/bond";
import { getActiveLoanKeys } from "@/core/utils";
import { GetServerSideProps, NextPage } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  const listedTokenIds = await getListedTokenIds();
  const activeTokenIds = await getActiveLoanKeys();
  return {
    props: {
      listedTokenIds,
      activeTokenIds,
      baseUrl: "/treasury",
    },
  };
};

const TreasuryBonds: NextPage<BondProps> = (props) => (
  <Layout
    title={contents.treasury.bonds.title}
    description={contents.treasury.bonds.description}
    navbarLogo={contents.treasury.navbar.logo}
    navbarItems={contents.treasury.navbar.items}
  >
    <BondContent {...props} />
  </Layout>
);

export default TreasuryBonds;