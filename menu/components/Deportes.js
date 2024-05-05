import React, { useState, useEffect } from 'react';

import { View } from 'react-native';
import ProductList from './ProductList';
import { getProductos } from '../servicios/Produc.Service';

const Deportes  = ({ agregarAlCarrito }) => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProductos();
        setProductos(products);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProducts();
  }, []);
 // Función para agregar un producto al carrito localmente
  const agregarAlCarritoLocal = (producto) => {

    // Llama a la función agregarAlCarrito con el producto y la cantidad
    agregarAlCarrito(producto, 1);
  };

  return (
    <View>
      <ProductList
        productos={productos} 
        categoria="Deportes" 
        agregarAlCarrito={agregarAlCarritoLocal} 
      />
    </View>
  );
};

export default Deportes;
