// components/CarritoIcon.js
import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CarritoIcon = () => {
  const navigation = useNavigation();

  const handleCarritoClick = () => {
    navigation.navigate('CarritoScreen');
  };

  return (
    <TouchableOpacity onPress={handleCarritoClick}>
      <Image source={require('../img/carrito.png')} style={{ width: 40, height: 40, marginRight: 15 }} />
    </TouchableOpacity>
  );
};

export default CarritoIcon;