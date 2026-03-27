import React from 'react';
import {
  SafeAreaView, Text, TouchableOpacity, StyleSheet, Alert, Image
} from 'react-native';

export default function ProductDetailScreen({ route, addToCart }) {

  const product = route?.params?.product;

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Error: producto no encontrado</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      <Image source={product.image} style={styles.image} />

      <Text style={styles.category}>{product.category}</Text>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>

      {product.stock === 0 ? (
        <Text style={styles.out}>Agotado</Text>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            addToCart(product);
            Alert.alert('Producto agregado');
          }}
        >
          <Text style={styles.text}>🛍️ Comprar</Text>
        </TouchableOpacity>
      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FDFDFF' },

  image: { width: '100%', height: 250, borderRadius: 15 },

  category: { color: '#9E9E9E', marginTop: 10 },
  name: { fontSize: 22, fontWeight: 'bold' },
  price: { color: '#D4A5A5', marginTop: 5, fontSize: 18 },

  button: {
    backgroundColor: '#D4A5A5',
    padding: 15,
    marginTop: 20,
    borderRadius: 12
  },

  text: { color: '#FFF', textAlign: 'center', fontWeight: 'bold' },
  out: { color: 'red', marginTop: 10 }
});