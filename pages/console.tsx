import All from "@/components/All";
import DebugConsole from "@/components/DebugConsole";
import Layout from "@/components/Layout";
import contents from "@/contents";
import { NextPage } from "next";

const Console: NextPage = () => {
  return (
    <Layout
      title={contents.console.title}
      description={contents.console.description}
      navbarLogo={contents.console.navbar.logo}
      navbarItems={contents.console.navbar.items}
    >
      <div className="flex flex-col">
        <DebugConsole item={null} loan={null} customDate={null} setCustomDate={() => {}} />
        <All />
      </div>
    </Layout>
  );
};

export default Console;