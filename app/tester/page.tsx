"use client";

import React, { useState } from "react";
import { useAllProducts } from "@/lib/hooks/useAllProducts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

const ProductsPage = () => {
  const [page, setPage] = useState(1);
  const limit = 12;

  const { data, isLoading, isError } = useAllProducts(page, limit);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton key={i} className="h-80 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="text-center text-red-500">Error fetching products!</div>
    );
  }

  const {
    success,
    message,
    data: { result, currentPage, totalPage, totalItems },
    error,
  } = data;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      {error && (
        <div className="text-red-500 text-center mb-4">Error: {error}</div>
      )}

      <p className="text-gray-600 mb-4">{message}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {result.map((product) => (
          <Card key={product.id} className="shadow-lg rounded-lg">
            <CardHeader className="p-0">
              <div className="relative w-full h-48">
                {product.images?.length > 0 ? (
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                ) : (
                  <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
              </div>
              <CardTitle className="text-xl font-bold p-4">
                {product.title}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-gray-600">{product.description}</p>
              <p className="mt-2 font-bold">Price: ₹{product.price}</p>
              <p className="text-sm text-gray-500">
                Condition: {product.condition}
              </p>
              <p className="text-sm text-gray-500">
                Seller: {product.seller_name}
              </p>
              <p className="text-sm text-gray-500">Status: {product.status}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between items-center mt-8">
        <Button
          disabled={Number(currentPage) <= 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </Button>

        <span>
          Page {Number(currentPage)} of {totalPage} ({totalItems} items)
        </span>

        <Button
          disabled={Number(currentPage) >= Number(totalPage)}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ProductsPage;
