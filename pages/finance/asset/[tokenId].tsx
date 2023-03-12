import { GetServerSideProps, NextPage } from "next";
import { AssetProps, getAssetProps, getMockAssetProps } from "@/core/asset";
import { AssetContent } from "@/components/Asset";
import contents from "@/contents";
import Layout from "@/components/Layout";

export const getServerSideProps: GetServerSideProps = async (context) => {
  let tokenId = context.params?.tokenId;
  if (Array.isArray(tokenId)) {
    tokenId = tokenId[0];
  }
  if (tokenId === undefined) {
    throw Error("Empty tokenId");
  }
  /* Real data */
  const props = await getAssetProps(tokenId);
  /* Mock data */
  // const props = getMockAssetProps();
  return { props };
};

const Asset: NextPage<AssetProps> = (props) => {
  return (
    <Layout
      title={contents.finance.asset.titlePrefix + props.item.id}
      description={contents.finance.asset.descriptionPrefix + props.item.id}
      navbarLogo={contents.finance.navbar.logo}
      navbarItems={contents.finance.navbar.items}
    >
      <AssetContent {...props}></AssetContent>
    </Layout>
  );
};

export default Asset;
