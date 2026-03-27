import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet, Image
} from 'react-native';

export default function ProductsScreen({ navigation, products }) {
  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>✨ Boutique</Text>
      <Text style={styles.subtitle}>Ropa & Zapatos</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 20 }}

        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            disabled={item.stock === 0}
            onPress={() =>
              navigation.navigate('Detalle', { product: item })
            }
          >
            <Image source={item.image} style={styles.image} />

            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>${item.price.toFixed(2)}</Text>

            {item.stock === 0 ? (
              <Text style={styles.out}>Agotado</Text>
            ) : (
              <Text style={styles.stock}>Disponible</Text>
            )}
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDFDFF', padding: 10 },

  title: { fontSize: 28, fontWeight: 'bold', color: '#D4A5A5' },
  subtitle: { color: '#9E9E9E', marginBottom: 10 },

  card: {
    flex: 1,
    backgroundColor: '#FFF',
    margin: 5,
    padding: 12,
    borderRadius: 15,
    elevation: 3
  },

  image: { width: '100%', height: 100, borderRadius: 10 },

  category: { fontSize: 12, color: '#9E9E9E', marginTop: 5 },
  name: { fontWeight: 'bold', marginTop: 5 },
  price: { color: '#D4A5A5', marginTop: 5, fontWeight: 'bold' },
  stock: { color: '#4CAF50', marginTop: 5 },
  out: { color: 'red', marginTop: 5 }
});