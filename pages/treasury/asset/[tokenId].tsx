import { AssetContent } from "@/components/Asset";
import Layout from "@/components/Layout";
import contents from "@/contents";
import { AssetProps, getAssetProps } from "@/core/asset";
import { GetServerSideProps, NextPage } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  let tokenId = context.params?.tokenId;
  if (Array.isArray(tokenId)) {
    tokenId = tokenId[0];
  }
  if (tokenId === undefined) {
    throw Error("Empty tokenId");
  }
  const props = await getAssetProps(tokenId);
  return { props };
};

const Asset: NextPage<AssetProps> = (props) => {
  return (
    <Layout
      title={contents.treasury.asset.titlePrefix + props.item.id}
      description={contents.treasury.asset.descriptionPrefix + props.item.id}
      navbarLogo={contents.treasury.navbar.logo}
      navbarItems={contents.treasury.navbar.items}
    >
      <AssetContent {...props}></AssetContent>
    </Layout>
  );
};

export default Asset;
