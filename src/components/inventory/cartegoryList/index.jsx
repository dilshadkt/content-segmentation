import React from "react";
import Header from "./header";
import ListItem from "./list";

const CategoryList = ({ setProductDetails, setSubCategory }) => {
  return (
    <div className="flex flex-col w-full overflow-y-auto">
      <Header />
      {/* stock list  */}
      <div className="w-full  overflow-y-auto flex mt-3 flex-col gap-y-1">
        {new Array(5).fill(" ").map((stock, index) => (
          <ListItem
            key={index}
            item={stock}
            setProductDetails={setProductDetails}
            setSubCategory={setSubCategory}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
