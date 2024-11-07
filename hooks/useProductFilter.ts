import { useState, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  mainImage: string;
  price: string;
  colour: string;
  description: string;
}

interface FilterCriteria {
  priceRange?: [number, number];
  brand?: string;
  color?: string;
}

const useProductFilter = (products: Product[], criteria: FilterCriteria) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    let filtered = products;

    if (criteria.priceRange) {
      filtered = filtered.filter((product) => {
        const price = parseFloat(product.price);
        return (
          price >= criteria.priceRange![0] && price <= criteria.priceRange![1]
        );
      });
    }

    if (criteria.brand) {
      filtered = filtered.filter((product) => {
        const productBrand = product.name.split(' ')[0].toLowerCase();
        return productBrand.includes(criteria.brand!.toLowerCase());
      });
    }

    if (criteria.color) {
      filtered = filtered.filter(
        (product) =>
          product.colour.toLowerCase() === criteria.color!.toLowerCase()
      );
    }

    setFilteredProducts(filtered);
  }, [products, criteria]);

  const getUniqueColors = () => {
    const colors = products.map(product => product.colour.toLowerCase());
    return Array.from(new Set(colors));
  };

  return { filteredProducts, getUniqueColors };
};

export default useProductFilter;
