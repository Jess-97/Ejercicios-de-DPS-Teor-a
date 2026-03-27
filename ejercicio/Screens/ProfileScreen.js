import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >

        {/* 👤 HEADER */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👤</Text>
          </View>

          <Text style={styles.name}>Jessica Álvarez</Text>
          <Text style={styles.email}>jessica@email.com</Text>
        </View>

        {/* 📋 OPCIONES */}
        <View style={styles.menu}>

          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>📦 Mis pedidos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>❤️ Favoritos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>⚙️ Configuración</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>💳 Métodos de pago</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>📍 Direcciones</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>🔔 Notificaciones</Text>
          </TouchableOpacity>

        </View>

        {/* 🚪 BOTÓN */}
        <TouchableOpacity style={styles.logout}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
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

  scroll: {
    paddingBottom: 30
  },

  header: {
    alignItems: 'center',
    marginBottom: 25
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: '#E1D5E7',
    justifyContent: 'center',
    alignItems: 'center'
  },

  avatarText: {
    fontSize: 40
  },

  name: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
    color: '#333'
  },

  email: {
    color: '#9E9E9E',
    marginTop: 2
  },

  menu: {
    marginTop: 10
  },

  option: {
    backgroundColor: '#FFF',
    padding: 15,
    marginTop: 10,
    borderRadius: 12,
    elevation: 2
  },

  optionText: {
    color: '#333'
  },

  logout: {
    backgroundColor: '#D4A5A5',
    padding: 15,
    marginTop: 25,
    borderRadius: 12
  },

  logoutText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});