import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import ProductsScreen from './Screens/ProductsScreen';
import ProductDetailScreen from './Screens/ProductDetailScreen';
import CartScreen from './Screens/CartScreen';
import ProfileScreen from './Screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {

  const [products, setProducts] = useState([
  {
    id: '1',
    name: 'Camiseta Oversize',
    price: 18.99,
    stock: 5,
    category: 'Ropa',
    image: require('./assets/camiseta.png')
  },
  {
    id: '2',
    name: 'Jeans Slim Fit',
    price: 35.00,
    stock: 3,
    category: 'Ropa',
    image: require('./assets/jeans.jpg')
  },
  {
    id: '3',
    name: 'Sudadera Hoodie',
    price: 28.50,
    stock: 4,
    category: 'Ropa',
    image: require('./assets/hoodie.jpg')
  },
  {
    id: '4',
    name: 'Zapatillas Urbanas',
    price: 50.00,
    stock: 2,
    category: 'Zapatos',
    image: require('./assets/zapatillas.jpg')
  },
  {
    id: '5',
    name: 'Tenis Deportivos',
    price: 45.99,
    stock: 0,
    category: 'Zapatos',
    image: require('./assets/tenis.jpg')
  },
  {
    id: '6',
    name: 'Botas Casual',
    price: 60.00,
    stock: 3,
    category: 'Zapatos',
    image: require('./assets/botas.jpg')
  }
]);

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    if (product.stock <= 0) return;

    const updatedProducts = products.map(p =>
      p.id === product.id ? { ...p, stock: p.stock - 1 } : p
    );

    setProducts(updatedProducts);
    setCart([...cart, product]);
  };

  function TiendaStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Productos">
          {(props) => (
            <ProductsScreen {...props} products={products} />
          )}
        </Stack.Screen>

        <Stack.Screen name="Detalle">
          {(props) => (
            <ProductDetailScreen {...props} addToCart={addToCart} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator>

          <Tab.Screen
            name="Tienda"
            options={{
              tabBarIcon: () => <Text>🛍️</Text>,
              headerShown: false
            }}
          >
            {() => <TiendaStack />}
          </Tab.Screen>

          <Tab.Screen
            name="Carrito"
            options={{
              tabBarIcon: () => <Text>🛒</Text>,
              tabBarBadge: cart.length > 0 ? cart.length : null
            }}
          >
            {(props) => (
              <CartScreen {...props} cart={cart} setCart={setCart} />
            )}
          </Tab.Screen>

          <Tab.Screen
            name="Perfil"
            component={ProfileScreen}
            options={{
              tabBarIcon: () => <Text>👤</Text>
            }}
          />

        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}