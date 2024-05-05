import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { getProductos } from '../servicios/Produc.Service';

const ProductList = ({ categoria, agregarAlCarrito }) => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      const productosData = await getProductos();
      setProductos(productosData);
    };
    fetchProductos();
  }, []);

  const filteredProducts = productos.filter((producto) => producto.Categoria === categoria);

  const renderProduct = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={{ uri: item.Img }} style={styles.productImage} />
      <View style={styles.productDetailsContainer}>
        <Text style={styles.productName}>{item.Nombre}</Text>
        <Text style={styles.productDescription}>{item.Descripcion}</Text>
        <Text style={styles.productPrice}>Precio: ${item.Precio}</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => agregarAlCarrito(item)}>
          <Text style={styles.addButtonText}>Agregar Al Carrito</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View>
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.container}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#98c1d9',
    borderWidth: 1,
    borderColor: '#87CEFA',
    borderRadius: 5,
    padding: 20,
    marginBottom: 10,
  },
  productImage: {
    width: 160,
    height: 150,
    marginRight: 10,
    borderRadius: 15,
  },
  productDetailsContainer: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 14,
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: '#B22320',
  },
  addButton: {
    backgroundColor: '#3D5A80',
    padding: 10,
    borderRadius: 15,
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProductList;