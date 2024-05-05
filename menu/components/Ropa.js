import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import ProductList from './ProductList';
import { getProductos } from '../servicios/Produc.Service';

const Ropa = ({ agregarAlCarrito }) => {
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
 // Función para agregar un producto al carrito 
  const agregarAlCarritoLocal = (producto) => {
    // Llama a la función agregarAlCarrito
    agregarAlCarrito(producto, 1);
  };

  return (
    <View>
     
      <ProductList
        productos={productos} 
        categoria="Ropa" 
        agregarAlCarrito={agregarAlCarritoLocal} 
      />
    </View>
  );
};

export default Ropa;
