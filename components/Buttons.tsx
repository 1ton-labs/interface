import { TonConnectButton } from "@tonconnect/ui-react";
import { FC, ReactNode } from "react";

type PrimaryButtonProps = {
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
};

export const PrimaryButton: FC<PrimaryButtonProps> = ({
  children,
  className,
  disabled,
  onClick,
}) => {
  const buttonStyle = `${className} h-9 
  ${className?.includes("px-") || className?.includes("p-") ? "" : "px-7"} 
  font-medium text-sm rounded-lg 
  bg-accent transition transition-500 text-black 
  ${disabled ? "opacity-70 cursor-not-allowed" : "hover:opacity-70"}`;
  return (
    <button className={buttonStyle} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};
type TableButtonProps = {
  children?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
};

export const TableButton: FC<TableButtonProps> = ({
  children,
  disabled,
  onClick,
}) => {
  const buttonStyle = `border px-2 py-0.5 rounded-md transition-colors ${
    disabled
      ? "border-secondary-light text-secondary-light cursor-not-allowed"
      : "border-primary-dark hover:bg-primary-normal text-info-white"
  }`;
  return (
    <button className={buttonStyle} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

const WalletConnectButton: FC = TonConnectButton;

export default WalletConnectButton;
