import { FC, useState } from "react";

import { Spinner } from "@chakra-ui/react";
import { PrimaryButton } from "@/components/Buttons";
import { LENDING_PROTOCOL_ADDRESS, TOKEN_NAME } from "@/constants";
import { EthTokenReader } from "@/core/EthTokenReader";
import { isNumber, formatTonOrETH, numberWithCommas, shortStr } from "@/core/utils";
import { useWeb3 } from "@/hooks/useWeb3";
import { Loan } from "@/types";

type LoanPanelProps = {
  loan: Loan;
  tokenId: string;
  isOwner: boolean;
  isBorrower: boolean;
  isLender: boolean;
  customDate: Date;
};

export const LoanPanel: FC<LoanPanelProps> = ({ loan, tokenId, isOwner, isBorrower, isLender, customDate }) => {
  const { connected, checkAllowanceLending, checkBalance, loanManager, tokenManager, update } = useWeb3();
  const [loading, setLoading] = useState<boolean>(false);
  const dueDate = new Date((loan.start_time + loan.duration) * 1000);
  const trStyle = "flex justify-between font-medium text-sm font-inter border-b border-secondary-normal"
  const highlight = "flex justify-between text-sm font-inter border-b border-primary-normal text-info-white font-semibold"

  return (
    <div className="w-80 rounded-3xl px-4 py-10 flex-1 shadow-purpleShadow">
      <div className="w-full max-w-md rounded-xl bg-secondary-dark py-4">
        <table className="table-auto w-full border-separate border-spacing-3">
          <tbody className="flex flex-col gap-y-2 text-gray-400">
            <tr className="flex justify-center">
              <th className="uppercase font-inter font-semibold">Loan Stats</th>
            </tr>
            <tr className={trStyle}>
              <td>Principal</td>
              <td>{numberWithCommas(formatTonOrETH(loan.principal))} {TOKEN_NAME}</td>
            </tr>
            <tr className={trStyle}>
              <td>Pay Back</td>
              <td>{numberWithCommas(formatTonOrETH(loan.repayment))} {TOKEN_NAME}</td>
            </tr>
            <tr className={trStyle}>
              <td>Start Date</td>
              <td>{(new Date(loan.start_time * 1000)).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}</td>
            </tr>
            <tr className={trStyle}>
              <td>Due</td>
              <td>{(dueDate).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}</td>
            </tr>
            <tr className={highlight}>
              <td>Lender</td>
              <td>{shortStr(loan.lender)}</td>
            </tr>
            <tr className={highlight}>
              <td>Borrower</td>
              <td>{shortStr(loan.borrower)}</td>
            </tr>
          </tbody>
        </table>

        {loading && (
          <div className="text-center py-2">
            <PrimaryButton disabled={true}>
              <div className="flex items-center">
                <Spinner />
              </div>
            </PrimaryButton>
          </div>
        )}

        {!loading && isBorrower &&
          (
            <div className="text-center py-2">
              {(isNumber(loan.repayment) && checkAllowanceLending(loan.repayment) ? 
                (isNumber(loan.repayment) && checkBalance(loan.repayment)) ? (
                  <PrimaryButton disabled={!connected || customDate > dueDate}
                    onClick={async () => {
                      // await firebase.database().ref(`/loans/${tokenId}`).remove();
                      // location.reload();
                      if (connected) {
                        setLoading(true);
                        await loanManager.repay({loanId: loan.loan_id, tokenId })
                        setLoading(false);
                        location.reload();
                      } else {
                        alert("Please connect to your wallet.");
                      }
                    }
                  }
                  >Repay</PrimaryButton>
                ) : (
                  <PrimaryButton
                    disabled={!connected || customDate > dueDate}
                    onClick={async () => {
                      if (connected) {
                        setLoading(true);
                        try {
                          const tokenReader = new EthTokenReader();
                          const allowance = await tokenReader.allowanceWBNB(loan.borrower, LENDING_PROTOCOL_ADDRESS);
                          const balance = await tokenReader.balanceWBNB(loan.borrower);
                          const delta = allowance.sub(balance);
                          await tokenManager.wrapToken(delta.toString());
                          update();
                        } finally {
                          setLoading(false);
                        }
                      } else {
                        alert("Please connect to your wallet.");
                      }
                    }}
                  >
                    {`Wrap ${TOKEN_NAME}`}
                  </PrimaryButton>
                ) : (
                  <PrimaryButton
                    disabled={!connected || customDate > dueDate}
                    onClick={async () => {
                      if (connected) {
                        setLoading(true);
                        try {
                          await tokenManager.approveToken(LENDING_PROTOCOL_ADDRESS, loan.repayment);
                          update();
                        } finally {
                          setLoading(false);
                        }
                      } else {
                        alert("Please connect to your wallet.");
                      }
                    }}
                  >Approve WBNB</PrimaryButton>
                )
              )}
            </div>
          )
        }

        {isLender && (
          <div className="text-center py-2">
            <PrimaryButton
              disabled={customDate < dueDate}
              onClick={async () => {
                // await firebase.database().ref(`/loans/${tokenId}`).remove();
                // location.reload();
                if (connected) {
                  await loanManager.claim({loanId: loan.loan_id, tokenId })
                  location.reload();
                } else {
                  alert("Please connect to your wallet.");
                }
              }}
            >Claim</PrimaryButton>
          </div>
        )}
      </div>
    </div>
  );
}