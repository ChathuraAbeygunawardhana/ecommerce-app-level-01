import React from 'react';
import renderer from 'react-test-renderer';
import CartTotal from '../Cart/CartTotal';

describe('CartTotal', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<CartTotal total="200" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});