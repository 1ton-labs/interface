import { TonDnsContext } from "@/components/TonDnsProvider";
import { useContext } from "react";

export const useTonDns = () => useContext(TonDnsContext);