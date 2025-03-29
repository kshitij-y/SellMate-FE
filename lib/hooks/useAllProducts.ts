import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "../TanStack-Query/api";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string[];
  condition: string;
  negotiable: boolean;
  quantity: number;
  is_auction: boolean;
  starting_bid?: number;
  bid_increment?: number;
  auction_end_time?: string;
  seller_id: string;
  seller_name: string;
  seller_contact?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface Data<T> {
  result: T;
  currentPage: string;
  totalPage: string;
  totalItems: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: Data<T>;
  error: string;
}


export const useAllProducts = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["products", page, limit],
    queryFn: async () => {
      const response = await fetcher<ApiResponse<Product[]>>(
        `/api/product/allProducts?page=${page}&limit=${limit}`
      );
      if (!response.success) {
        throw new Error(response.error || "Failed to fetch products");
      }

      return response;
    },
    staleTime: 5 * 60 * 1000,
    placeholderData: (prevData) => prevData || undefined,
  });
};