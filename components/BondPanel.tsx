import { getTokenId, getTokenIdFromRecord, isNumber, parseCoin, stateColor, timeConverHandler } from "@/core/utils";
import { BondState, Metadata, NftItemRecord, stateName } from "@/types";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Tooltip,
  Spinner,
} from '@chakra-ui/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { FC, useState } from "react";
import { PrimaryButton } from "./Buttons";
import { useWeb3 } from "@/hooks/useWeb3";
import firebase from "firebase";
import { NFT_COLLECTION_ADDRESS, PROJECT_NAME, TOKEN_NAME, TREASURY_ADDRESS } from "@/constants";

type BondPanelProps = {
  item: Metadata;
  duration: number;
}

const BondPanel: FC<BondPanelProps> = ({
  item,
  duration,
}) => {
  const { connected, bondManager, poolManager, tokenManager, checkAllowanceTreasury, checkBalance, update } = useWeb3();
  const [showTooltip, setShowTooltip] = useState(false);
  const [activateLoading, setActivateLoading] = useState(false);
  const [burnLoading, setBurnLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");

  function formateDate(date: Date) {
    return date.toISOString().replace("T", " ").slice(0, -5);
  };

  function addDuration(date: Date, duration: number) {
    return new Date(date.getTime() + duration * 1000);
  };

  function getCurrentRange(duration: number, minDate: any, maxDate: any) {
    if ((minDate.getTime() + duration) < maxDate.getTime()) {
      return duration
    } else {
      let minYear = minDate.getFullYear();
      let minMonth = minDate.getMonth() + 1;
      let maxYear = maxDate.getFullYear();
      let maxMonth = maxDate.getMonth() + 1;
      console.log((maxYear * 12 + maxMonth) - (minYear * 12 + minMonth))
      return (maxYear * 12 + maxMonth) - (minYear * 12 + minMonth)
    }
  };

  let start_time;
  let end_time;
  let today;
  let currentRange;
  if (item.activated_time) {
    start_time = new Date(item.activated_time);
    end_time = addDuration(new Date(item.activated_time), duration);
    today = new Date();
    currentRange = getCurrentRange(duration, start_time, today)
  }

  return (
    <div className="w-full max-w-md mt-8 p-3 bg-secondary-dark rounded-xl">
      {item.activated !== undefined && (
        <div className={`mb-4 flex items-center justify-end gap-x-1 text-sm text-${stateColor(item.activated)}`}>
          <span className={`w-1.5 h-1.5 rounded bg-${stateColor(item.activated)}`}></span>
          {stateName(item.activated)}
        </div>
      )}
      <div className="grid grid-cols-3 font-bold">
        <span>Duration</span>
        <span className="col-span-2 text-end text-info-white">{timeConverHandler(duration)}</span>
      </div>
      <div>
        {item.activated !== BondState.INACTIVATED && start_time && end_time && today ? (
          <>
            <div className="flex justify-between">
              <div className="font-bold">Since</div>
              <div className="text-sm">{formateDate(start_time)}</div>
            </div>
            <div className="flex justify-between">
              <div className="font-bold">Due</div>
              <div className="text-sm">{formateDate(end_time)}</div>
            </div>
            <Slider
              className="my-2"
              id='slider'
              defaultValue={currentRange}
              min={0}
              max={duration}
              colorScheme='teal'
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              isReadOnly={true}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <Tooltip
                hasArrow
                bg='teal.500'
                color='white'
                placement='top'
                isOpen={showTooltip}
                label={formateDate(today)}
              >
                <SliderThumb />
              </Tooltip>
            </Slider>
          </>
        ) : (
          <>
            <div className="flex justify-between">
              <div className="font-bold">Since</div>
              <div className="text-sm">{" "}</div>
            </div>
            <div className="flex justify-between">
              <div className="font-bold">Due</div>
              <div className="text-sm">{" "}</div>
            </div>
            <div className="text-sm text-gray-300 my-1">Will be determined once it&apos;s activated.</div>
          </>
        )}
      </div>
      <div className="grid grid-cols-3 font-bold">
        <span>Balance</span>
        <span className="col-span-2 text-end text-accent">
          {item.balance}
          <FontAwesomeIcon icon={faDollarSign} className="w-4 text-xs" />
          <span className="text-xs">
            {TOKEN_NAME}
          </span>
        </span>
      </div>

      <div className="mt-4 flex justify-between">
        {
          activateLoading ? (
            <PrimaryButton disabled={true}>
              <div className="flex items-center">
                <Spinner />
              </div>
            </PrimaryButton>
          ) : item.activated === BondState.INACTIVATED ? (
            <PrimaryButton
              disabled={!connected}
              onClick={() => {
                setActivateLoading(true);
                bondManager.activate({ tokenId: getTokenId(item), loanId: "" })
                  .then((success) => {
                    if (success) {
                      alert("Activated the Bond NFT.");
                      location.reload();
                    }
                  })
                  .finally(() => {
                    setActivateLoading(false);
                  });
              }}
            >Activate</PrimaryButton>
          ) : (
            <PrimaryButton
              disabled={!connected || item.balance === undefined || item.balance === "0"}
              onClick={() => {
                if (item.balance) {
                  setActivateLoading(true);
                  poolManager.withdraw(getTokenId(item), item.balance)
                    .then((success) => {
                      if (success) {
                        alert(`Withdrawed ${depositAmount} ${TOKEN_NAME} successfully.`)
                        location.reload();
                      }
                    })
                    .finally(() => {
                      setActivateLoading(false);
                    });
                } else {
                  alert(`Balance not found.`)
                }
              }}
            >Withdraw</PrimaryButton>
          )
        }
        {
          burnLoading ? (
            <PrimaryButton disabled={true}>
              <div className="flex items-center">
                <Spinner />
              </div>
            </PrimaryButton>
          ) : (
            <PrimaryButton
              disabled={!connected}
              onClick={async () => {
                const tokenId = getTokenId(item);
                if (tokenId) {
                  setBurnLoading(true);
                  let success = false;
                  try {
                    success = await bondManager.burn({ tokenId, loanId: "" })
                    if (success) {
                      const snapshot = await firebase.database().ref(`/records/${NFT_COLLECTION_ADDRESS}`).once("value");
                      let records: NftItemRecord[] = snapshot.val();
                      records = records.filter((record) => getTokenIdFromRecord(record) !== tokenId);
                      await firebase.database().ref(`/records/${NFT_COLLECTION_ADDRESS}`).set(records)  // Clean NFT metadata cache
                      alert("You have burned the Bond NFT. The Bond NFT will no longer be activated.");
                    }
                  } finally {
                    setBurnLoading(false);
                  }
                  if (success) {
                    window.location.replace("/treasury/bonds");
                  }
                } else {
                  alert("Token ID not found.");
                }
              }}
            >Burn</PrimaryButton>
          )
        }
      </div>
      {item.activated !== BondState.INACTIVATED ? (
        <p className="mt-4 text-sm text-gray-300">The owner of the Bond NFT can withdraw the incomes in the Treasury pool at any time.</p>
      ) : (
        <p className="mt-4 text-sm text-gray-300">The owner can activate the Bond NFT to redirect the creator incomes.</p>
      )}
      <div className="mt-4">
        <hr />
        <form className="mt-4" onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4 flex gap-2 items-center">
            <input type="number" id="deposit-amount" className="text-sm rounded-lg px-3 py-2 w-[130px]" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} />
            <label htmlFor="deposit-amount" className="text-sm text-gray-300">{TOKEN_NAME}</label>
          </div>
          {
            createLoading ? (
              <PrimaryButton>
                <div className="flex items-center">
                  <Spinner />
                </div>
              </PrimaryButton>
            ) : item.poolCreated ? (isNumber(depositAmount) && !checkAllowanceTreasury(parseCoin(depositAmount).toString())) ? (
              <PrimaryButton
                disabled={!connected}
                onClick={async () => {
                  if (isNumber(depositAmount)) {
                    if (connected) {
                      setCreateLoading(true);
                      try {
                        await tokenManager.approveToken(TREASURY_ADDRESS, parseCoin(depositAmount).toString());
                        update();
                      } finally {
                        setCreateLoading(false);
                      }
                    } else {
                      alert("Please connect to your wallet.");
                    }
                  }
                }}
              >Approve WBNB</PrimaryButton>
            ) : (isNumber(depositAmount) && !checkBalance(parseCoin(depositAmount).toString())) ? (
              <PrimaryButton
                disabled={!connected}
                onClick={async () => {
                  if (isNumber(depositAmount)) {
                    if (connected) {
                      setCreateLoading(true);
                      try {
                        await tokenManager.wrapToken(parseCoin(depositAmount).toString());
                        update();
                      } finally {
                        setCreateLoading(false);
                      }
                    } else {
                      alert("Please connect to your wallet.");
                    }
                  }
                }}
              >{`Wrap ${depositAmount} ${TOKEN_NAME}`}</PrimaryButton>
            ) : (
              <PrimaryButton
                disabled={!connected}
                onClick={() => {
                  if (isNumber(depositAmount)) {
                    setCreateLoading(true);
                    poolManager.deposit(getTokenId(item), depositAmount)
                      .then((success) => {
                        if (success) {
                          alert(`Deposited ${depositAmount} ${TOKEN_NAME} successfully.`)
                          location.reload();
                        }
                      })
                      .finally(() => {
                        setCreateLoading(false);
                      });
                  } else {
                    alert(`Please enter valid ${TOKEN_NAME} amount.`)
                  }
                }}
              >Deposit</PrimaryButton>
            ) : (
              <PrimaryButton
                disabled={!connected}
                onClick={() => {
                  setCreateLoading(true);
                  poolManager.create(getTokenId(item))
                    .then((success) => {
                      if (success) {
                        alert("Created the pool in Treasury successfully.");
                        location.reload();
                      }
                    })
                    .finally(() => {
                      setCreateLoading(false);
                    });
                }}
              >Create Pool</PrimaryButton>
            )
          }
        </form>
      </div>
      <p className="mt-4 text-sm text-gray-300">
        Anyone can deposit <b>${TOKEN_NAME}</b> into the Treasury pool, while only the owner can withdraw them from the pool.
      </p>
      <div className="mt-4">
        <hr />
        <h3 className="mt-4 font-bold">{PROJECT_NAME} Finance</h3>
        <PrimaryButton className="mt-4" onClick={() => location.replace("/finance/asset/" + getTokenId(item))}>Go to {PROJECT_NAME} Finance</PrimaryButton>
        <p className="mt-4 text-sm text-gray-300">
          With the Bond NFT, you can <b>borrow money</b> from <b>{PROJECT_NAME} Finance</b> under the collateral of your future income.
        </p>
      </div>


    </div>
  )
};

export default BondPanel;
