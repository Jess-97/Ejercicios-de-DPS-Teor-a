import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView
} from 'react-native';

export default function CartScreen({ cart, setCart }) {

  const [paymentMethod, setPaymentMethod] = useState('');

  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardDate, setCardDate] = useState('');

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const removeItem = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const formatCardNumber = (text) => {
    const cleaned = text.replace(/\s/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : '';
  };

  const handlePay = () => {
    if (cart.length === 0) {
      Alert.alert('Carrito vacío');
      return;
    }

    if (paymentMethod === '') {
      Alert.alert('Selecciona método de pago');
      return;
    }

    if (paymentMethod === 'Tarjeta') {
      if (cardNumber === '' || cardName === '' || cardDate === '') {
        Alert.alert('Completa los datos de la tarjeta');
        return;
      }
    }

    Alert.alert('Compra exitosa', `Pagaste $${total.toFixed(2)}`);

    setCart([]);
    setPaymentMethod('');
    setCardNumber('');
    setCardName('');
    setCardDate('');
  };

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView showsVerticalScrollIndicator={false}>

        <Text style={styles.title}>🛒 Carrito</Text>

        {cart.length === 0 ? (
          <Text style={styles.empty}>Tu carrito está vacío</Text>
        ) : (
          cart.map((item, index) => (
            <View key={index} style={styles.card}>
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>${item.price}</Text>
              </View>

              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => removeItem(index)}
              >
                <Text style={styles.deleteText}>X</Text>
              </TouchableOpacity>
            </View>
          ))
        )}

        <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>

        <Text style={styles.section}>Forma de pago</Text>

        <TouchableOpacity
          style={[styles.option, paymentMethod === 'Efectivo' && styles.active]}
          onPress={() => setPaymentMethod('Efectivo')}
        >
          <Text>💵 Efectivo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, paymentMethod === 'Tarjeta' && styles.active]}
          onPress={() => setPaymentMethod('Tarjeta')}
        >
          <Text>💳 Tarjeta</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, paymentMethod === 'Transferencia' && styles.active]}
          onPress={() => setPaymentMethod('Transferencia')}
        >
          <Text>🏦 Transferencia</Text>
        </TouchableOpacity>

        {/* 💳 TARJETA */}
        {paymentMethod === 'Tarjeta' && (
          <View style={styles.paymentBox}>

            <Text style={styles.subTitle}>Datos de la tarjeta</Text>

            <TextInput
              placeholder="1234 5678 9012 3456"
              style={styles.input}
              keyboardType="numeric"
              value={cardNumber}
              onChangeText={(text) => setCardNumber(formatCardNumber(text))}
              maxLength={19}
            />

            <TextInput
              placeholder="Nombre del titular"
              style={styles.input}
              value={cardName}
              onChangeText={setCardName}
            />

            <TextInput
              placeholder="MM/AA"
              style={styles.input}
              value={cardDate}
              onChangeText={setCardDate}
            />

          </View>
        )}

        {/* 🏦 TRANSFERENCIA */}
        {paymentMethod === 'Transferencia' && (
          <View style={styles.paymentBox}>
            <Text style={styles.subTitle}>Datos bancarios</Text>
            <Text>Banco: Boutique Bank</Text>
            <Text>Cuenta: 123-456-789</Text>
            <Text>Titular: Boutique Store</Text>
          </View>
        )}

        {paymentMethod !== '' && (
          <Text style={styles.selected}>Método: {paymentMethod}</Text>
        )}

        <TouchableOpacity style={styles.payButton} onPress={handlePay}>
          <Text style={styles.payText}>Pagar</Text>
        </TouchableOpacity>

      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFF',
    padding: 20
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#D4A5A5'
  },

  empty: {
    marginTop: 10,
    color: '#9E9E9E'
  },

  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#FFF',
    marginTop: 10,
    borderRadius: 12,
    elevation: 2
  },

  name: {
    fontWeight: 'bold'
  },

  price: {
    color: '#D4A5A5',
    marginTop: 5
  },

  deleteBtn: {
    backgroundColor: '#D4A5A5',
    padding: 10,
    borderRadius: 8
  },

  deleteText: {
    color: '#FFF'
  },

  total: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: 'bold'
  },

  section: {
    marginTop: 15,
    fontWeight: 'bold'
  },

  option: {
    padding: 12,
    backgroundColor: '#E1D5E7',
    marginTop: 10,
    borderRadius: 10
  },

  active: {
    borderWidth: 2,
    borderColor: '#D4A5A5'
  },

  paymentBox: {
    backgroundColor: '#FFF',
    padding: 15,
    marginTop: 10,
    borderRadius: 12
  },

  subTitle: {
    fontWeight: 'bold',
    marginBottom: 10
  },

  input: {
    borderWidth: 1,
    borderColor: '#E1D5E7',
    padding: 10,
    marginTop: 10,
    borderRadius: 8
  },

  selected: {
    marginTop: 10,
    color: '#D4A5A5',
    fontWeight: 'bold'
  },

  payButton: {
    backgroundColor: '#D4A5A5',
    padding: 15,
    marginTop: 20,
    borderRadius: 12,
    marginBottom: 30
  },

  payText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});