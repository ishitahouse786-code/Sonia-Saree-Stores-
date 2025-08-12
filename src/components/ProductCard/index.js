import React from 'react';
import { HomeGrid as BaseHomeGrid, exampleProducts } from '../SoniaStore';

const HomeGrid = ({ initialProducts }) => {
  return <BaseHomeGrid products={initialProducts} />;
};

export { exampleProducts };
export default HomeGrid;