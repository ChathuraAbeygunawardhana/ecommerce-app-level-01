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

interface Filter {
  apply(products: Product[]): Product[];
}

class PriceRangeFilter implements Filter {
  constructor(private priceRange: [number, number]) {}
  apply(products: Product[]): Product[] {
    return products.filter((product) => {
      const price = parseFloat(product.price);
      return price >= this.priceRange[0] && price <= this.priceRange[1];
    });
  }
}

class BrandFilter implements Filter {
  constructor(private brand: string) {}
  apply(products: Product[]): Product[] {
    return products.filter((product) => {
      const productBrand = product.name.split(' ')[0].toLowerCase();
      return productBrand.includes(this.brand.toLowerCase());
    });
  }
}

class ColorFilter implements Filter {
  constructor(private color: string) {}
  apply(products: Product[]): Product[] {
    return products.filter(
      (product) => product.colour.toLowerCase() === this.color.toLowerCase()
    );
  }
}

const useProductFilter = (products: Product[], criteria: FilterCriteria) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    let filters: Filter[] = [];

    if (criteria.priceRange) {
      filters.push(new PriceRangeFilter(criteria.priceRange));
    }

    if (criteria.brand) {
      filters.push(new BrandFilter(criteria.brand));
    }

    if (criteria.color) {
      filters.push(new ColorFilter(criteria.color));
    }

    let filtered = products;
    filters.forEach((filter) => {
      filtered = filter.apply(filtered);
    });

    setFilteredProducts(filtered);
  }, [products, criteria]);

  const getUniqueColors = () => {
    const colors = products.map(product => product.colour.toLowerCase());
    return Array.from(new Set(colors));
  };

  return { filteredProducts, getUniqueColors };
};

export default useProductFilter;
