import { Tab } from "@headlessui/react";
import firebase from "firebase";
import { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from "react";
import { PrimaryButton } from "./Buttons";
import { LENDING_PROTOCOL_ADDRESS, TOKEN_NAME } from "@/constants";
import { calcInterest, calcRepayment, classNames, isNumber, numberWithCommas } from "@/core/utils";
import { Offer, Terms } from "@/types";
import { useWeb3 } from "@/hooks/useWeb3";
import { ethers } from "ethers";
import { Spinner } from "@chakra-ui/react";

type OfferForm = {
  principal: string;
  repayment: string
  duration: string;
  interest: string;
}

type Panel1Props = {
  setSelectedIndex: Dispatch<SetStateAction<number>>;
  setForm: Dispatch<SetStateAction<OfferForm>>;
  tokenId: string;
  isOwner: boolean;
  desiredTerms: Terms|null;
};

const Panel1: FC<Panel1Props> = ({ setSelectedIndex, setForm, tokenId, isOwner, desiredTerms }) => {
  const { address } = useWeb3();
  const interest = desiredTerms ? calcInterest(
    parseFloat(desiredTerms.principal),
    parseFloat(desiredTerms.repayment),
    parseFloat(desiredTerms.duration),
  ) : desiredTerms;
  return (
    <div>
      {desiredTerms ? (
        <div className="h-[256px] text-zinc-300 p-1">
          <table className="table-auto w-full font-medium">
            <tbody className="flex flex-col gap-y-2">
              <tr className="flex justify-between">
                <th scope="row" className="uppercase text-left">principal</th>
                <td className="text-right">{numberWithCommas(desiredTerms.principal)} {TOKEN_NAME}</td>
              </tr>
              <tr className="flex justify-between">
                <th scope="row" className="uppercase text-left">repayment</th>
                <td className="text-right">{numberWithCommas(desiredTerms.repayment)} {TOKEN_NAME}</td>
              </tr>
              <tr className="flex justify-between">
                <th scope="row" className="uppercase text-left">duration</th>
                <td className="text-right">{desiredTerms.duration} Days</td>
              </tr>
              <tr className="flex justify-between">
                <th scope="row" className="uppercase text-left">apr</th>
                <td className="text-right">{interest}%</td>
              </tr>
            </tbody>
          </table>
          <div className="text-end mb-8 mt-4">Due {desiredTerms.expires}</div>
        </div>
      ) : (
        <div className="h-[256px] flex items-center justify-center text-center">
          <p>There is no desired terms.</p>
        </div>
      )}
      {isOwner ? desiredTerms ? (
        <div className="text-center">
          <PrimaryButton onClick={async () => {
            if (tokenId) {
              await firebase.database().ref(`/terms/${tokenId}`).remove();
              location.reload();
            }
          }}>Remove It</PrimaryButton>
        </div>
      ) : (
        <div className="text-center">
          <PrimaryButton onClick={() => setSelectedIndex(1)}>List It</PrimaryButton>
        </div>
      ) : (
        <div className="text-center">
          <PrimaryButton disabled={address === ""} onClick={() => {
            setSelectedIndex(1);
            if (desiredTerms) {
              setForm({
                principal: desiredTerms.principal,
                repayment: desiredTerms.repayment,
                duration: desiredTerms.duration,
                interest: calcInterest(
                  parseFloat(desiredTerms.principal),
                  parseFloat(desiredTerms.repayment),
                  parseFloat(desiredTerms.duration),
                ),
              });
            }
          }}>Start Loan</PrimaryButton>
        </div>
      )}
    </div>
  )
};

type Panel2Props = {
  form: OfferForm;
  setForm: Dispatch<SetStateAction<OfferForm>>;
  tokenId: string;
  isOwner: boolean;
};

const Panel2: FC<Panel2Props> = ({ form, setForm, tokenId, isOwner }) => {
  const { connected, address, loanManager, tokenManager, checkAllowanceLending, checkBalance, update } = useWeb3();
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  function handleChange(e: any) {
    switch (e.target.id) {
      case "principal":
        setForm((prev) => ({
          ...prev,
          principal: e.target.value,
        }));
        break;
      case "repayment":
        setForm((prev) => ({
          ...prev,
          repayment: e.target.value,
        }));
        break;
      case "duration":
        setForm((prev) => ({
          ...prev,
          duration: e.target.value,
        }));
        break;
      case "interest":
        setForm((prev) => ({
          ...prev,
          interest: e.target.value,
        }));
        break;
    }
    setLastUpdated(e.target.id);
  }

  const validateInputs = useCallback(
    () => {
      if (!isNumber(form.principal)) {
        // alert("Please enter valid principal.");
      } else if (!isNumber(form.repayment)) {
        // alert("Please enter valid repayment.");
      } else if (!isNumber(form.duration)) {
        // alert("Please enter valid duration");
      } else {
        return true;
      }
      return false;
    },
    [form.principal, form.repayment, form.duration],
  );

  const createTerms = useCallback(
    () => {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 30);
      const expires = expiryDate.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' });
      const terms: Terms = {
        principal: form.principal,
        repayment: form.repayment,
        duration: form.duration,
        expires,
      };
      return terms;
    },
    [form.principal, form.repayment, form.duration],
  );

  const createOffer = useCallback(
    (tokenId: string, signerAddress: string) => {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 30);
      const expires = expiryDate.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' });
      const offer: Offer = {
        tokenId,
        principal: form.principal,
        repayment: form.repayment,
        duration: form.duration,
        expires: expires,
        interest: '',
        signer: signerAddress,
      };
      return offer;
    },
    [form.principal, form.repayment, form.duration],
  );

  useEffect(() => {
    if (lastUpdated === "principal" || lastUpdated === "repayment" || lastUpdated === "duration") {
      try {
        const principal = parseFloat(form.principal);
        const repayment = parseFloat(form.repayment);
        const duration = parseFloat(form.duration);
        const interest = calcInterest(principal, repayment, duration);
        setForm((prev) => ({
          ...prev,
          interest,
        }));
      } catch {
        //
      }
    } else if (lastUpdated === "interest") {
      try {
        const principal = parseFloat(form.principal);
        const duration = parseFloat(form.duration);
        const interest = parseFloat(form.interest);
        const repayment = calcRepayment(principal, duration, interest).toString();
        setForm((prev) => ({
          ...prev,
          repayment,
        }));
      } catch {
        //
      }
    }
    setLastUpdated("");
  }, [lastUpdated, form]);

  return (
    <div className="">
      <div className="h-[256px] flex flex-col gap-3">
        <div className="relative p-3 text-sm text-zinc-200 bg-zinc-700 rounded-xl border border-zinc-500">
          <div className="w-[106px] text-sm absolute inset-y-0 left-0 flex items-center px-3 my-3 pointer-events-none border-r border-zinc-200">PRINCIPAL</div>
          <input type="text" id="principal" className="pl-[106px] w-full bg-zinc-700 focus:bg-zinc-700 border-none focus:border-transparent focus:ring-0 focus:outline-none font-bold" value={form.principal} onChange={handleChange} />
        </div>
        <div className="relative p-3 text-sm text-zinc-200 bg-zinc-700 rounded-xl border border-zinc-500">
          <div className="w-[106px] text-sm absolute inset-y-0 left-0 flex items-center px-3 my-3 pointer-events-none border-r border-zinc-200">REPAYMENT</div>
          <input type="text" id="repayment" className="pl-[106px] w-full bg-zinc-700 focus:bg-zinc-700 border-none focus:border-transparent focus:ring-0 focus:outline-none font-bold" value={form.repayment} onChange={handleChange} />
        </div>
        <div className="relative p-3 text-sm text-zinc-200 bg-zinc-700 rounded-xl border border-zinc-500">
          <div className="text-right text-sm absolute inset-y-0 right-0 flex items-center px-3 my-3 pointer-events-none">DAYS</div>
          <input type="text" id="duration" className="w-full bg-zinc-700 focus:bg-zinc-700 border-none focus:border-transparent focus:ring-0 focus:outline-none font-bold" value={form.duration} onChange={handleChange} />
        </div>
        <div className="relative p-3 text-sm text-zinc-200 bg-zinc-700 rounded-xl border border-zinc-500">
          <div className="text-right text-sm absolute inset-y-0 right-0 flex items-center px-3 my-3 pointer-events-none">APR</div>
          <input type="text" id="interest" className="w-full bg-zinc-700 focus:bg-zinc-700 border-none focus:border-transparent focus:ring-0 focus:outline-none font-bold" value={form.interest} onChange={handleChange} />
        </div>
      </div>
      <div className="text-center">
        {loading && (
          <PrimaryButton
            disabled={true}
          >
            <div className="flex items-center">
              <Spinner />
            </div>
          </PrimaryButton>
        )}
        {!loading && isOwner && (
          <PrimaryButton
            disabled={!connected || !validateInputs()}
            onClick={async () =>{
              if (tokenId === undefined || tokenId === "") {
                alert("Token address does not exist.");
              } else if (validateInputs()) {
                const terms = createTerms();
                await firebase.database().ref(`/terms/${tokenId}`).update(terms);
                location.reload();
              }
            }}
          >Confirm</PrimaryButton>
        )}
        {!loading && !isOwner && (isNumber(form.principal) && !checkAllowanceLending(ethers.utils.parseEther(form.principal).toString()) ? (
            <PrimaryButton
              disabled={!connected || !validateInputs()}
              onClick={async () =>{
                if (validateInputs()) {
                  if (connected) {
                    setLoading(true);
                    try {
                      await tokenManager.approveToken(LENDING_PROTOCOL_ADDRESS, ethers.utils.parseEther(form.principal).toString());
                      update();
                    } finally {
                      setLoading(false);
                    }
                  } else {
                    alert("Please connect to your wallet.");
                  }
                }
              }}
            >Approve WBNB</PrimaryButton>
          ) : (isNumber(form.principal) && !checkBalance(ethers.utils.parseEther(form.principal).toString())) ? (
            <PrimaryButton
              disabled={!connected || !validateInputs()}
              onClick={async () =>{
                if (validateInputs()) {
                  if (connected) {
                    setLoading(true);
                    try {
                      await tokenManager.wrapToken(ethers.utils.parseEther(form.principal).toString());
                      update();
                    } finally {
                      setLoading(false);
                    }
                  } else {
                    alert("Please connect to your wallet.");
                  }
                }
              }}
            >{`Wrap ${form.principal} ${TOKEN_NAME}`}</PrimaryButton>
          ) : (
            <PrimaryButton
              disabled={!connected || !validateInputs()}
              onClick={async () =>{
                if (tokenId === undefined || tokenId === "") {
                  alert("Token address does not exist.");
                } else if (validateInputs()) {
                  if (connected) {
                    setLoading(true);
                    try {
                      const offer = createOffer(tokenId, address);
                      await loanManager.signOffer(offer);
                    } finally {
                      setLoading(false);
                      location.reload();
                    }
                  } else {
                    alert("Please connect to your wallet.");
                  }
                }
              }}
            >Sign Offer</PrimaryButton>
          )
        )}
      </div>
    </div>
  );
};

type TermsPanelProps = {
  tokenId: string;
  isOwnerOrBorrower: boolean;
  desiredTerms: Terms|null;
};

const TermsPanel: FC<TermsPanelProps> = ({ tokenId, isOwnerOrBorrower, desiredTerms }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [form, setForm] = useState<OfferForm>({
    principal: "",
    repayment: "",
    duration: "",
    interest: "",
  });
  const pages = isOwnerOrBorrower ? {
    "DESIRED TERMS": (
      <Panel1
        setSelectedIndex={setSelectedIndex}
        setForm={setForm}
        tokenId={tokenId}
        isOwner={isOwnerOrBorrower}
        desiredTerms={desiredTerms}
      />
    ),
    "SET TERMS": (
      <Panel2
        form={form}
        setForm={setForm}
        tokenId={tokenId}
        isOwner={isOwnerOrBorrower}
      />
    ),
  } : {
    "DESIRED TERMS": (
      <Panel1
        setSelectedIndex={setSelectedIndex}
        setForm={setForm}
        tokenId={tokenId}
        isOwner={isOwnerOrBorrower}
        desiredTerms={desiredTerms}
      />
    ),
    "MAKE AN OFFER": (
      <Panel2
        form={form}
        setForm={setForm}
        tokenId={tokenId}
        isOwner={isOwnerOrBorrower}
      />
    ),
  };

  return (
    <div className="w-full max-w-md px-2 py-10 sm:px-0">
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {Object.keys(pages).map((page) => (
            <Tab
              key={page}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-secondary-light',
                  'ring-white ring-opacity-40 ring-offset-1 ring-offset-primary-dark focus:outline-none focus:ring-1',
                  selected
                    ? 'bg-secondary-normal shadow text-info-white'
                    : 'text-gray-100 hover:bg-white/[0.12] hover:text-info-white'
                )
              }
            >
              {page}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(pages).map((children, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'rounded-xl bg-secondary-dark p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400'
              )}
            >
              {children}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default TermsPanel;