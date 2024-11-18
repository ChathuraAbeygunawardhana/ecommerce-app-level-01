import React from 'react';
import renderer from 'react-test-renderer';
import CartItem from '../Cart/CartItem';

describe('CartItem', () => {
  it('renders correctly', () => {
    const item = {
      id: '1',
      name: 'Product Name',
      price: 100,
      image:
        'https://s3-eu-west-1.amazonaws.com/api.themeshplatform.com/media/7e386191b2ee40b290886a05d3e10e24_nike-air-relentless-a.jpg',
      quantity: 1,
    };
    const tree = renderer
      .create(
        <CartItem
          item={item}
          removeFromCart={() => {}}
          increaseQuantity={() => {}}
          decreaseQuantity={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
