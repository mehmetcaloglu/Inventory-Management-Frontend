"use client";

import React, { useEffect, useState } from "react";
import SaleService from "../services/sale.service";

const Page = () => {
  const [sales, setSales] = useState<
    {
      id: number;
      store_name: string;
      product_name: string;
      quantity: number;
      sale_date: string;
      total_amount: number;
    }[]
  >([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchSales = async () => {
      const response = await SaleService.getAllSales({ page });
      setSales(response.data.results);
    };
    fetchSales();
  }, []);

  useEffect(() => {
    const fetchSales = async () => {
      const response = await SaleService.getAllSales({ page });
      setSales(response.data.results);
    };
    fetchSales();
  }, [page]);

  return (
    <div className="my-8 overflow-x-auto">
      {/* page selector */}
      <div className="flex items-center justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Prev
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
          onClick={() => setPage(page + 1)}
          disabled={sales.length < 1000}
        >
          Next
        </button>
      </div>
      <div className="flex shadow border-b">
        <table className="min-w-full table">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-2">
                ID
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-2">
                STORE
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-2">
                PRODUCT
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-2">
                QUANTITY
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-2">
                SALE_DATE
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-2">
                TOTAL_AMOUNT
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {sales.map((sale) => (
              <tr key={sale.id}>
                <td className="text-left px-2 py-3 whitespace-nowrap">
                  <span className="text-sm text-gray-500">{sale.id}</span>
                </td>
                <td className="text-left px-2 py-3 whitespace-nowrap">
                  <span className="text-sm text-gray-500">
                    {sale.store_name}
                  </span>
                </td>
                <td className="text-left px-2 py-3 whitespace-nowrap">
                  <span className="text-sm text-gray-500">
                    {sale.product_name}
                  </span>
                </td>
                <td className="text-left px-2 py-3 whitespace-nowrap">
                  <span className="text-sm text-gray-500">{sale.quantity}</span>
                </td>
                <td className="text-left px-2 py-3 whitespace-nowrap">
                  <span className="text-sm text-gray-500">
                    {new Date(sale.sale_date).toLocaleDateString("en-US")}
                  </span>
                </td>
                <td className="text-left px-2 py-3 whitespace-nowrap">
                  <span className="text-sm text-gray-500">
                    {sale.total_amount} TL
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
