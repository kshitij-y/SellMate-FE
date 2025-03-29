"use client";

import React, { useEffect } from "react";
import { useShowMyProduct } from "@/lib/hooks/useProducts";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const ShowMyProductsPage = () => {
  const { mutate, data, isPending, isError, error } = useShowMyProduct();

  useEffect(() => {
    mutate();
  }, [mutate]);

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin w-10 h-10 text-blue-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Error: {error?.message}</p>
      </div>
    );
  }

  const products = data?.data || [];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Products</h1>

      {products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="rounded-lg shadow-md">
              <CardHeader>
                <h2 className="text-xl font-semibold">{product.title}</h2>
                <p className="text-gray-500">{product.condition}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{product.description}</p>
                <p className="text-lg font-bold mt-2">${product.price}</p>
                <div className="flex justify-between mt-4">
                  <Button variant="default">Edit</Button>
                  <Button variant="destructive">Delete</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowMyProductsPage;