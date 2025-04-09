"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Product from "@/lib/types/product";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { fetchProductFromId } from "@/lib/hooks/fetchProductFromId";
import NavBar from "@/components/NavBar";
import ImageSlider from "@/components/ImageSlider";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      const data = await fetchProductFromId(id as string);
      setProduct(data || null);
    }

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="p-8">
        <Skeleton className="w-full h-[500px] mb-6" />
        <Skeleton className="w-1/2 h-8" />
        <Skeleton className="w-1/4 h-6 mt-2" />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen">
      <NavBar />

      <main className="mx-auto px-4 py-12 space-y-16">
        {/* Product section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image carousel */}
          <div className="rounded-xl border bg-muted px-6">
            <ImageSlider image={product.images} />
          </div>

          {/* Product details */}
          <div className="flex flex-col space-y-4 p-2 m-auto">
            <h1 className="text-4xl font-bold leading-tight">
              {product.title}
            </h1>
            <p className="text-muted-foreground text-base">
              {product.description}
            </p>

            <div className="space-y-2">
              <p className="text-3xl font-semibold text-primary">
                ${product.price}
              </p>
              <p className="text-sm text-muted-foreground">
                Available: {product.quantity}
              </p>
              <p className="text-sm text-muted-foreground">
                Seller: {product.seller_name}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-6">
              <Button className="px-8 py-2">Buy Now</Button>
              <Button variant="outline" className="px-8 py-2">
                Add to Cart
              </Button>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Replace with dynamic review cards */}
            <Card>
              <CardContent className="p-4 text-sm text-muted-foreground">
                No reviews yet.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Similar Products */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Similar Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Replace with actual product cards */}
            <Card>
              <CardContent className="p-4 text-center text-sm text-muted-foreground">
                Coming Soon
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );

}
