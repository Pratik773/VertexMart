import { useQuery } from "@tanstack/react-query"; // Ensure this line exists!
import { MOCK_PRODUCTS } from "../data/products";

const ITEMS_PER_PAGE = 8;

const fetchProducts = async ({ queryKey }) => {
  const [_, { page, search }] = queryKey;

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // 1. Filter by search
  const filtered = MOCK_PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  // 2. Calculate indices
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return {
    products: paginated,
    totalCount: filtered.length,
    totalPages: Math.ceil(filtered.length / ITEMS_PER_PAGE),
  };
};

export const useProducts = (page, search) => {
  return useQuery({
    queryKey: ["products", { page, search }],
    queryFn: fetchProducts,
  });
};
