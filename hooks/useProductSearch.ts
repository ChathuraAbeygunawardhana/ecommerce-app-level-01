import { useState, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  mainImage: string;
  price: string;
  colour: string;
  description: string;
}

const useProductSearch = (data: Product[], searchTerm: string) => {
  const [searchedProducts, setSearchedProducts] = useState(data);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm) {
        const filtered = data.filter((product: { name: string }) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchedProducts(filtered);
      } else {
        setSearchedProducts(data);
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [data, searchTerm]);

  return { searchedProducts };
};

export default useProductSearch;
