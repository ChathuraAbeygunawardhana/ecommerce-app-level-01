
import { Product, FilterCriteria } from '../types/product';

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

export const filterProducts = (products: Product[], criteria: FilterCriteria): Product[] => {
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
  
  return filtered;
};

export const getUniqueColors = (products: Product[]): string[] => {
  const colors = products.map(product => product.colour.toLowerCase());
  return Array.from(new Set(colors));
};