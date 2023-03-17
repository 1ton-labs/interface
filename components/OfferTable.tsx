import { numberWithCommas, shortStr } from "@/core/utils";
import { useWeb3 } from "@/hooks/useWeb3";
import { Offer } from "@/types";
import { Tooltip } from '@chakra-ui/react'
import { FC } from "react";
import { TableButton } from "./Buttons";

type OfferTableProps = {
  offers: Offer[];
  isOwner: boolean;
  tokenId: string;
};

const OfferTable: FC<OfferTableProps> = ({ offers, isOwner, tokenId }) => {
  const { connected, address, loanManager } = useWeb3();
  const tableIyemStyle = "px-4 py-2 font-inter";
  return (
    <table className="border-spacing-y-2 border-separate table-auto text-sm text-left rounded-lgx font-inter">
      <thead className="text-gray-100 shadow-grayShadow bg-secondary-normal uppercase rounded-lg font-inter">
        <tr className="rounded-lg">
          <th scope="col" className={`${tableIyemStyle} rounded-tl-lg`}>Principal</th>
          <th scope="col" className={tableIyemStyle}>Duration</th>
          <th scope="col" className={tableIyemStyle}>Payoff</th>
          <th scope="col" className={`w-[80px] ${tableIyemStyle}`}>APR</th>
          <th scope="col" className={`w-[132px] ${tableIyemStyle}`}>Signer</th>
          <th scope="col" className={tableIyemStyle}>Expires</th>
          <th scope="col" className={`${tableIyemStyle} rounded-tr-lg`}>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          offers.length !== 0 ? (
            offers.map((offer, index) => (
              <tr key={index} className="bg-secondary-dark font-inter">
                <td className={tableIyemStyle}>{numberWithCommas(offer.principal)}</td>
                <td className={tableIyemStyle}>{offer.duration} Days</td>
                <td className={tableIyemStyle}>{numberWithCommas(offer.repayment)}</td>
                <Tooltip hasArrow label={`${offer.interest}%`} bg='gray.300' color='black'>
                  <td className={`w-[80px] ${tableIyemStyle}`}>{offer.interest.substring(0, 3) + "..."}%</td>
                </Tooltip>
                <td className={tableIyemStyle}>{shortStr(offer.signer)}</td>
                <td className={`w-[132px] ${tableIyemStyle}`}>{offer.expires}</td>
                <td className={tableIyemStyle}>
                  {isOwner ? (
                    <TableButton onClick={async () => {
                      try {
                        if (connected) {
                          await loanManager.startLoan({ loanId: '', tokenId }, offer);
                          location.reload();
                        } else {
                          alert("Please connect to your wallet.");
                        }
                      } catch (e) {
                        console.error(e);
                        alert(e);
                      }
                    }}>
                      Accept
                    </TableButton>
                  ) : address === offer.signer ? (
                    <TableButton onClick={async () => {
                      if (connected) {
                        await loanManager.cancelOffer(offer);
                        location.reload();
                      }
                    }}>
                      Cancel
                    </TableButton>
                  ) : (
                    <TableButton disabled>Accept</TableButton>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="py-3 bg-secondary-dark text-gray-400 font-inter text-center" >No offers yet</td>
            </tr>
          )
        }

      </tbody>
    </table>
  );
};

export default OfferTable;