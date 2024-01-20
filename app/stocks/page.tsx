"use client";

import React, { useEffect, useState } from "react";
import SaleService from "../services/sale.service";
import StockService from "../services/stocks.service";

const Page = () => {
  // product = models.ForeignKey(Product, on_delete=models.CASCADE)
  // depot = models.ForeignKey(Depot, on_delete=models.CASCADE)
  // quantity = models.PositiveIntegerField()
  // min_required = models.PositiveIntegerField()
  const [stocks, setStocks] = useState<
    {
      id: number;
      product_name: string;
      store_name: string;
      quantity: number;
      min_required: number;
    }[]
  >([]);

  useEffect(() => {
    const fetchSales = async () => {
      const response = await StockService.getStocks();
      setStocks(response.data);
    };
    fetchSales();
  }, []);

  return (
    <div className="my-8 overflow-x-auto">
      <div className="flex shadow border-b">
        <table className="min-w-full table">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-2">
                ID
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-2">
                PRODUCT
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-2">
                QUANTITY
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-2">
                MİN REQUİRED
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {stocks.map((stock) => (
              <tr key={stock.id}>
                <td className="text-left px-2 py-3 whitespace-nowrap">
                  <span className="text-sm text-gray-500">{stock.id}</span>
                </td>
                <td className="text-left px-2 py-3 whitespace-nowrap">
                  <span className="text-sm text-gray-500">
                    {stock.product_name}
                  </span>
                </td>
                <td className="text-left px-2 py-3 whitespace-nowrap">
                  <span className="text-sm text-gray-500">
                    {stock.quantity}
                  </span>
                </td>
                <td className="text-left px-2 py-3 whitespace-nowrap">
                  <span className="text-sm text-gray-500">
                    {stock.min_required}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
