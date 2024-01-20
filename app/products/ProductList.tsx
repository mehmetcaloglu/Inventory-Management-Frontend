import React from "react";
import IProduct from "../types/product.item";
import Product from "./Product";

// TODO include type

const ItemList = ({ items, loading, deleteItem, editItem }: any) => {
  return (
    <>
      <div className="my-8 overflow-x-auto">
        <div className="flex shadow border-b">
          <table className="min-w-full table">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-2">
                  ID
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-2">
                  NAME
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-2">
                  PRICE
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-2">
                  DESCRIPTION
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-2">
                  CATEGORY
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-2">
                  SUPPLIER
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-2"></th>
              </tr>
            </thead>
            {!loading && (
              <tbody className="bg-white">
                {items?.map((item: IProduct) => (
                  <Product
                    item={item}
                    key={item.id}
                    deleteItem={deleteItem}
                    editItem={editItem}
                  />
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </>
  );
};

export default ItemList;
