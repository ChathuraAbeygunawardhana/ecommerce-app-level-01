
import React from 'react';
import renderer from 'react-test-renderer';
import ProductItem from '../Home/ProductItem';

describe('ProductItem', () => {
  it('renders correctly', () => {
    const item = {
      mainImage: 'https://example.com/image.jpg',
      name: 'Product Name',
      price: 100,
    };
    const tree = renderer.create(<ProductItem item={item} onPress={() => {}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});