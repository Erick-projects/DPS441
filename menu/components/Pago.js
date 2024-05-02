import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TextInput, TouchableOpacity } from 'react-native';
import RadioButtons from '../components/RadioButtons';

export default function App() {
    const [direccionEnvio, setDireccionEnvio] = useState('');
    const [metodoPago, setMetodoPago] = useState('');
    const [mostrarInputTarjeta, setMostrarInputTarjeta] = useState(false);
    const [codigoTarjeta, setCodigoTarjeta] = useState('');
    const [direccionError, setDireccionError] = useState('');
    const [metodoPagoError, setMetodoPagoError] = useState('');
    const [codigoTarjetaError, setCodigoTarjetaError] = useState('');

    const handleMetodoPagoSelect = (option) => {
        setMetodoPago(option);
        setMostrarInputTarjeta(true);
        setMetodoPagoError('');
    };

    const handleCodigoTarjetaChange = (text) => {
        const formattedText = text.replace(/\D/g, ''); // Eliminar caracteres no numéricos
        let formattedValue = '';
        for (let i = 0; i < formattedText.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += '-';
            }
            formattedValue += formattedText[i];
        }
        setCodigoTarjeta(formattedValue);

        // Validar si la tarjeta tiene el formato completo
        if (formattedValue.length === 19) {
            setCodigoTarjetaError('');
        } else {
            setCodigoTarjetaError('¡Ingrese un número de tarjeta válido!');
        }
    };

    const handleAceptar = () => {
        let formIsValid = true;

        // Validar el campo de dirección
        if (!direccionEnvio.trim()) {
            setDireccionError('¡Ingrese la dirección de envío!');
            formIsValid = false;
        } else {
            setDireccionError('');
        }

        // Validar el campo de método de pago
        if (!metodoPago) {
            setMetodoPagoError('¡Seleccione un método de pago!');
            formIsValid = false;
        } else {
            setMetodoPagoError('');
        }

        // Validar el campo de la tarjeta si está visible
        if (mostrarInputTarjeta && codigoTarjeta.length !== 19) {
            setCodigoTarjetaError('¡Ingrese un número de tarjeta válido!');
            formIsValid = false;
        } else {
            setCodigoTarjetaError('');
        }

        // Procesar el formulario si todos los campos son válidos
        if (formIsValid) {
            Alert.alert('Operación exitosa', 'Método de pago procesado exitosamente.');
        }
    };

    const handleCancelar = () => {
        setMetodoPago('');
        setMostrarInputTarjeta(false);
        setCodigoTarjeta('');
        setDireccionError('');
        setMetodoPagoError('');
        setCodigoTarjetaError('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Dirección de Envío:</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingrese la dirección de envío"
                onChangeText={(text) => setDireccionEnvio(text)}
                value={direccionEnvio}
            />
            {direccionError ? <Text style={styles.errorText}>{direccionError}</Text> : null}

            <View style={styles.metodosPagoContainer}>
                <Text style={styles.label}>Métodos de Pago:</Text>
                <RadioButtons
                    options={['Banco Agrícola', 'MasterCard']}
                    selectedOption={metodoPago}
                    onSelect={handleMetodoPagoSelect}
                />
                {metodoPagoError ? <Text style={styles.errorText}>{metodoPagoError}</Text> : null}
            </View>

            {mostrarInputTarjeta && (
                <View style={styles.tarjetaContainer}>
                    <Text style={styles.label}>Ingrese el código de su tarjeta:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="XXXX-XXXX-XXXX-XXXX"
                        keyboardType="numeric"
                        value={codigoTarjeta}
                        onChangeText={handleCodigoTarjetaChange}
                        maxLength={19}
                    />
                    {codigoTarjetaError ? <Text style={styles.errorText}>{codigoTarjetaError}</Text> : null}
                </View>
            )}

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, { backgroundColor: 'green' }]} onPress={handleAceptar} disabled={!direccionEnvio.trim() || !metodoPago || (mostrarInputTarjeta && codigoTarjeta.length !== 19)}>
                    <Text style={styles.buttonText}>Aceptar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={handleCancelar}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#000',
        padding: 10,
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    metodosPagoContainer: {
        marginBottom: 20,
    },
    tarjetaContainer: {
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 5,
    },
});