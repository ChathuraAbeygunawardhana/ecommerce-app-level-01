import { useState, useEffect } from 'react';
import { Product, FilterCriteria } from '../types/product';
import { filterProducts, getUniqueColors } from '../utils/productFilters';

const useProductFilter = (products: Product[], criteria: FilterCriteria) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    setFilteredProducts(filterProducts(products, criteria));
  }, [products, criteria]);

  return { 
    filteredProducts, 
    getUniqueColors: () => getUniqueColors(products) 
  };
};

export default useProductFilter;
