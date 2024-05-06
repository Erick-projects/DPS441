import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation

const CarritoScreen = ({ carrito, setCarrito }) => {
  const navigation = useNavigation(); // Obtiene la instancia de navigation

  const calcularSubtotal = () => {
    let subtotal = 0;
    if (carrito && carrito.length > 0) {
      carrito.forEach((item) => {
        if (item.producto && item.producto.Precio && item.cantidad) {
          subtotal += item.producto.Precio * item.cantidad;
        }
      });
    }
    return subtotal.toFixed(2);
  };

  const eliminarProductoCarrito = (idProducto) => {
    const nuevoCarrito = carrito.filter(item => item.producto.id !== idProducto);
    setCarrito(nuevoCarrito);
  };

  const renderProductoCarrito = ({ item }) => (
    <View style={styles.productoCarritoContainer}>
      <Image source={{ uri: item.producto.Img }} style={styles.productoCarritoImage} />
      <View style={styles.productoCarritoDetalles}>
        <Text style={styles.productoCarritoNombre}>{item.producto.Nombre}</Text>
        <Text style={styles.productoCarritoPrecio}>Precio: ${item.producto.Precio}</Text>
        <Text style={styles.productoCarritoCantidad}>Cantidad: {item.cantidad}</Text>
      </View>
      <TouchableOpacity
        style={styles.eliminarContainer}
        onPress={() => eliminarProductoCarrito(item.producto.id)}
      >
        <Image source={require('../img/papelera.png')} style={styles.eliminarImagen} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={carrito}
        renderItem={renderProductoCarrito}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={
          <View style={styles.subtotalContainer}>
            <Text style={styles.subtotalText}>Subtotal: ${calcularSubtotal()}</Text>
            <TouchableOpacity 
              style={styles.comprarButtonContainer} 
              onPress={() => navigation.navigate('Pago')} // Navega a la pantalla Pago.js
            >
              <Text style={styles.comprarButtonText}>Comprar</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#98c1d9',
    padding: 16,
    width: '90%',
    height: '80%',
    alignSelf: 'center',
    marginTop: '5%',
    marginBottom: '10%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  productoCarritoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F6F7',
    borderWidth: 1,
    borderColor: '#87CEFA',
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
  },
  productoCarritoImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 10,
  },
  productoCarritoDetalles: {
    flex: 1,
  },
  productoCarritoNombre: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productoCarritoPrecio: {
    fontSize: 14,
    marginBottom: 5,
  },
  productoCarritoCantidad: {
    fontSize: 14,
  },
  subtotalContainer: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
  },
  subtotalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#B22320',
  },
  eliminarContainer: {
    padding: 8,
  },
  eliminarImagen: {
    width: 34,
    height: 34,
  },
  comprarButtonContainer: {
    backgroundColor: '#3D5A80',
    padding: 10,
    borderRadius: 15, 
    marginTop: 10,
    alignSelf: 'center',
    width: '40%',
  },
  comprarButtonText: {
    color: 'white', 
    fontWeight: 'bold', 
    textAlign: 'center',
  },
});

export default CarritoScreen;