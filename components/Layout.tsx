import { ReactNode, FC } from "react"
import Navbar, { NavbarItem, NavbarLogo } from "@/components/Navbar";
import Head from "next/head";
import Footer from "./Footer";

type LayoutProps = {
  children: ReactNode;
  title: string;
  description: string;
  navbarLogo: NavbarLogo;
  navbarItems: NavbarItem[];
};

const Layout: FC<LayoutProps> = ({ children, title, description, navbarLogo, navbarItems }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Navbar logo={navbarLogo} items={navbarItems} />
        <div className="flex justify-center font-main">{children}</div>
        <Footer />
      </main>
    </div>
  )
}

export default Layout;