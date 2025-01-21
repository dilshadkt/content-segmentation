import React from "react";
import PrimaryButton from "../../shared/buttons/primaryButton";

const ProductDetails = ({ productDetails }) => {
  return (
    <div
      className={` hidden rounded-lg h-full  overflow-y-auto   overflow-hidden transition-all duration-300
shadow-md bg-[#433E3F]  lg:flex flex-col ${
        productDetails ? ` w-2/3 p-3` : `w-0`
      }`}
    >
      <h3 className="text-[#CCCBCB]   leading-5">
        Purchase Requirement <br /> Expected
      </h3>
      <span className="text-xs mt-1 text-[#9F9C9C]">
        Based on previous Sales
      </span>
      <div className="h-full gap-2   overflow-y-auto flex flex-col justify-between">
        <div className="flex flex-col overflow-y-auto">
          <table className="w-full border-collapse table-auto overflow-y-auto">
            <thead className="sticky top-0 bg-[#433E3F]">
              <tr>
                <th className="text-xs text-left text-[#9F9C9C] whitespace-nowrap font-normal  py-2">
                  Item Name
                </th>
                <th className="text-xs text-center text-[#9F9C9C] whitespace-nowrap font-normal  py-2">
                  In Hand <br /> Qty
                </th>
                <th className="text-xs text-center pl-2 text-[#9F9C9C] whitespace-nowrap font-normal  py-2">
                  Re Order <br /> Qty
                </th>
              </tr>
            </thead>
            <tbody>
              {new Array(6).fill(" ").map((product, index) => (
                <tr key={index} className="text-xs  text-[#CCCBCB]">
                  <td className="">Samsung S24 Ultra 12GB</td>
                  <td className="text-right py-3">10</td>
                  <td className="text-right text-[#E4626F] pl-2">10</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-2 gap-x-6">
          <PrimaryButton className={" border  border-[#6F57DE]"}>
            Export
          </PrimaryButton>
          <PrimaryButton className={"bg-[#6F57DE]"}>Print</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
