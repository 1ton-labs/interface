import { useRouter } from "next/router";
import { FC } from "react";
import WalletConnectButton from "./Buttons";

export type NavbarLogo = {
  image: string;
  link: string;
  description: string;
  size?: string;
};

export type NavbarItem = {
  name: string;
  link: string;
};

type NavbarProps = {
  logo: NavbarLogo;
  items: NavbarItem[];
};

const Navbar: FC<NavbarProps> = ({ logo, items }) => {
  const router = useRouter();
  const defaultButtonStyle = "font-sans font-bold py-[2px] px-4 mx-0 lg:mx-4 rounded-lg text-info-white hover:text-primary-light transition transition-500";
  const activeButtonStyle = "font-sans font-bold py-[2px] px-4 mx-0 lg:mx-4 rounded-lg text-info-white hover:text-primary-light transition transition-500 bg-secondary-dark";

  return (
    <div className={`flex justify-between items-start lg:items-center px-2 py-2 lg:px-40 lg:py-4 shadow-purpleShadow`}>
      <div className="flex items-start lg:items-center flex-col gap-y-2.5 lg:flex-row">
        <a href={logo.link}>
          <img
            src={logo.image}
            alt={logo.description}
            // className="w-[150px] h-[30px] lg:w-[200px] lg:h-[40px]"
            className={`${logo.size ? logo.size : (
              `w-[150px] lg:w-[200px]`
            )}`}
          />
        </a>
        <div className="ml-0 lg:ml-6 flex">
          {items.map((item, index) => (
            <div key={index}>
              <a href={item.link}>
                <button className={router.asPath === item.link ? activeButtonStyle : defaultButtonStyle}>{item.name}</button>
              </a>
            </div>
          ))}
        </div>
      </div>

      <WalletConnectButton />
    </div>
  )
}

export default Navbar;