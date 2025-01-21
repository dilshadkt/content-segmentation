import React, { useState } from "react";
import { UseCommon } from "../../../hooks/UseCommon";
import BottomCards from "../bottomCards";
import CategoryList from "../cartegoryList";
import ProductDetails from "../productDetails";
import SubCategory from "../subCategory";
import FilterHeader from "../filterHeader";

const RecentSupplier = () => {
  const [subCategory, setSubCategory] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const { isSideBarOpen } = UseCommon();

  return (
    <section
      className={` ${
        isSideBarOpen ? `2xl:overflow-y-auto` : `xl:overflow-y-auto`
      } col-span-1 h-fit xl:h-full 
     flex flex-col  gap-x-3 gap-y-2  pb-2 lg:col-span-3  `}
    >
      <div
        className="bg-[#0D0D0D]  px-3 h-full overflow-hidden flex flex-col  py-3
      gap-y-2 items-center rounded-lg shadow-md"
      >
        <FilterHeader />
        <div className="w-full h-full md:max-h-[430px] overflow-y-auto  flex  gap-x-5">
          <CategoryList
            setProductDetails={setProductDetails}
            setSubCategory={setSubCategory}
          />
          {/* subCategory  */}
          <SubCategory
            setProductDetails={setProductDetails}
            subCategory={subCategory}
          />
          <ProductDetails productDetails={productDetails} />
        </div>
      </div>
      <BottomCards />
    </section>
  );
};

export default RecentSupplier;
