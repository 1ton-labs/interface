import contents from "@/contents";
import { FC } from "react";

type ColumnProps = {
  name: string;
  items: {
    name: string;
    link: string;
    newTab?: boolean;
  }[];
};

const Column: FC<ColumnProps> = ({ name, items }) => {
  return (
    <div className="flex flex-col gap-2 py-8">
      <div>
        <span className="font-bold">{name}</span>
      </div>
      {items.map((item, index) => item.newTab ? (
        <div key={index}>
          <a className="text-secondary-light hover:text-info-white transition duration-500" href={item.link} target="_blank" rel="noreferrer">{item.name}</a>
        </div>
      ) : (
        <div key={index}>
          <a className="text-secondary-light hover:text-info-white transition duration-500" href={item.link}>{item.name}</a>
        </div>
      ))}
    </div>
  );
};

const Footer: FC = () => {
  return (
    <footer className="mx-40 my-24">
      <div className="border-y border-gray-800">
        <div className="grid grid-cols-4">
          {contents.footer.columns.map((column, index) => (
            <Column key={index} name={column.name} items={column.items} />
          ))}
        </div>
      </div>
      <div className="mt-8 text-center">
        <span className="text-gray-400">
          <a href="/console">{contents.footer.copyright}</a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
