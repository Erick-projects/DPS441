import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Image, Text, TouchableWithoutFeedback, View, Keyboard, Alert } from 'react-native';
import { firebaseConfig } from './firebase-config';
import CarritoIcon from './components/CarritoIcon';
import Principal from './components/Principal';
import Electronicos from './components/Electronicos';
import Deportes from './components/Deportes';
import Hogar from './components/Hogar';
import Ropa from './components/Ropa';
import Login from './components/Login';
import Pago from './components/Pago';
import CarritoScreen from './components/CarritoScreen';
import ProductList from './components/ProductList';

const app = initializeApp(firebaseConfig);

// Crea el Drawer Navigator
const Drawer = createDrawerNavigator();

const Carrito = () => {
  return (
    <Image source={require('./img/carrito.png')} style={{ width: 40, height: 40, marginRight: 15 }} />
  );
};

const Icon = () => {
  return (
    <Image source={require('./img/Icon.png')} style={{ width: 50, height: 50, }} />
  );
};

const Logo = () => {
  return (
    <Text style={{ fontSize: 25, fontWeight: 'bold' }}>StoreSV</Text>
  );
};

export default function App() {

  // Ocultar el teclado
  const cerrarTeclado = () => { Keyboard.dismiss(); }

  // Estado para el inicio de sesión 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    const [carrito, setCarrito] = useState([]);

  // Función para crear cuenta
  const handleCreateAccount = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('cuenta creada', userCredential.user)
        Alert.alert('Cuenta creada')
        onLogin();
      })
      .catch(error => {
        console.log(error)
        Alert.alert('Ingresa una cuenta valida')
      });
  };

  //funcion para iniciar sesion
  const handleSignIn = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('sesion iniciada', userCredential.user)
        onLogin();
      })
      .catch(error => {
        console.log(error)
        Alert.alert('Cuenta no encontrada');
      })
  }

  //cerrar sesion
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setIsLoggedIn(false);
        Alert.alert('Sesion cerrada')
      })
      .catch(error => console.log(error));
  };

  //estado de inicio de sesion en true
  const onLogin = () => {
    setIsLoggedIn(true);
  };
  const agregarAlCarrito = (producto, cantidad) => {
    // Función para agregar un producto al carrito
    const productoExistente = carrito.find((item) => item.producto.id === producto.id);

    if (productoExistente) {
      setCarrito(
        carrito.map((item) =>
          item.producto.id === producto.id ? { ...item, cantidad: item.cantidad + cantidad } : item
        )
      );
    } else {
      setCarrito([...carrito, { producto, cantidad }]);
    }
  };

  const eliminarProductoCarrito = (productoId) => {
    
    // Función para eliminar un producto del carrito
    const nuevoCarrito = carrito.filter((item) => item.producto.id !== productoId);
    setCarrito(nuevoCarrito);
  };

  return (
    <NavigationContainer>
      {!isLoggedIn ? (
        <TouchableWithoutFeedback onPress={() => cerrarTeclado()}>
          <View style={{ flex: 1 }}>
            <Login onLogin={onLogin}
              setEmail={setEmail}
              setPassword={setPassword}
              handleCreateAccount={handleCreateAccount}
              handleSignIn={handleSignIn}/>
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <Drawer.Navigator screenOptions={{
          drawerStyle: {
            backgroundColor: '#98C1D9',
            borderBottomRightRadius: 20,
          },
          headerStyle: {
            backgroundColor: '#98C1D9',
          },
         headerRight: () => <CarritoIcon />,
          headerTitle: () => <Logo />,
          headerTitleAlign: 'center',
          drawerActiveTintColor: '#3D5A80',
          drawerInactiveTintColor: 'white',
          drawerLabelStyle: { fontSize: 20 },
        }}>
          <Drawer.Screen name="Inicio" component={Principal} options={{ drawerIcon: () => <Icon /> }} />
                <Drawer.Screen name="Electronicos" component={() => <Electronicos agregarAlCarrito={agregarAlCarrito} />} />
          <Drawer.Screen name="Deportes" component={() => <Deportes agregarAlCarrito={agregarAlCarrito} />} />
          <Drawer.Screen name="Hogar" component={() => <Hogar agregarAlCarrito={agregarAlCarrito} />} />
          <Drawer.Screen name="Ropa" component={() => <Ropa agregarAlCarrito={agregarAlCarrito} />} />
          <Drawer.Screen name="Pago" component={Pago} />
          <Drawer.Screen name="Cerrar sesión" component={handleSignOut} options={{ headerShown: false }} />
          <Drawer.Screen 
            name="CarritoScreen" 
            component={() => <CarritoScreen carrito={carrito} setCarrito={setCarrito} eliminarProductoCarrito={eliminarProductoCarrito} />} 
            options={{ drawerLabel: () => null }} 
          />
          <Drawer.Screen name="ProductList" component={ProductList} options={{ drawerLabel: () => null }} />
        </Drawer.Navigator>
      )}
    </NavigationContainer>
  );
}

