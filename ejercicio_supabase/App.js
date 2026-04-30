// ============================================================
// ARCHIVO: App.js
// DESCRIPCIÓN: Lista de Tareas conectada a Supabase
//
// OPERACIONES QUE VERÁS EN ESTE EJERCICIO:
//   - READ   → Cargar tareas desde Supabase al abrir la app
//   - CREATE → Insertar una nueva tarea en Supabase
//   - DELETE → Eliminar una tarea de Supabase
//
// PREREQUISITO: Haber configurado lib/supabase.js con tu URL y Key
// ============================================================

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
} from 'react-native';

// Importamos el cliente de Supabase que configuraste en lib/supabase.js
import { supabase } from './lib/supabase';

export default function App() {
  // ── Estado de la app ──────────────────────────────────────
  const [tareas, setTareas] = useState([]);       // Lista de tareas cargadas
  const [nuevoTitulo, setNuevoTitulo] = useState(''); // Texto del input
  const [cargando, setCargando] = useState(true);    // Indicador de carga
  const [guardando, setGuardando] = useState(false); // Indicador al guardar

  // ── Al montar el componente, cargamos las tareas ─────────
  useEffect(() => {
    cargarTareas();
  }, []);

  // ============================================================
  // READ: Leer todas las tareas desde Supabase
  // ============================================================
  const cargarTareas = async () => {
    setCargando(true);

    // Hacemos la consulta a Supabase
    // .from('tareas')  → nombre de tu tabla
    // .select('*')     → trae todas las columnas
    // .order(...)      → más recientes primero
    const { data, error } = await supabase
      .from('tareas')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      // Si hay error, lo mostramos al usuario
      Alert.alert(
        'Error al cargar',
        'No se pudieron cargar las tareas. Verifica tu URL y API Key en lib/supabase.js\n\nDetalle: ' + error.message
      );
      console.error('Error Supabase:', error);
    } else {
      // Si todo salió bien, guardamos las tareas en el estado
      setTareas(data);
    }

    setCargando(false);
  };

  // ============================================================
  // CREATE: Insertar una nueva tarea en Supabase
  // ============================================================
  const agregarTarea = async () => {
    // Validamos que el input no esté vacío
    const titulo = nuevoTitulo.trim();
    if (!titulo) {
      Alert.alert('Campo vacío', 'Por favor escribe el título de la tarea.');
      return;
    }

    setGuardando(true);

    // Insertamos en Supabase
    // .insert({ ... }) → el objeto con los datos del nuevo registro
    const { data, error } = await supabase
      .from('tareas')
      .insert({ titulo: titulo, completada: false })
      .select(); // .select() hace que nos devuelva el registro creado

    if (error) {
      Alert.alert(
        'Error al guardar',
        'No se pudo guardar la tarea.\n\nDetalle: ' + error.message
      );
      console.error('Error Supabase:', error);
    } else {
      // Agregamos la nueva tarea al inicio de la lista local
      // (así no tenemos que hacer otra consulta completa)
      setTareas([data[0], ...tareas]);
      setNuevoTitulo(''); // Limpiamos el input
    }

    setGuardando(false);
  };

  // ============================================================
  // DELETE: Eliminar una tarea de Supabase
  // ============================================================
  const eliminarTarea = (tarea) => {
    // Pedimos confirmación antes de eliminar
    Alert.alert(
      'Eliminar tarea',
      `¿Estás seguro de que quieres eliminar "${tarea.titulo}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            // Eliminamos en Supabase usando el ID único del registro
            // .eq('id', tarea.id) → equivale a WHERE id = tarea.id
            const { error } = await supabase
              .from('tareas')
              .delete()
              .eq('id', tarea.id);

            if (error) {
              Alert.alert('Error al eliminar', error.message);
              console.error('Error Supabase:', error);
            } else {
              // Actualizamos el estado local eliminando la tarea de la lista
              setTareas(tareas.filter(t => t.id !== tarea.id));
            }
          },
        },
      ]
    );
  };

  // ============================================================
  // RENDER: Cada fila de la lista
  // ============================================================
  const renderTarea = ({ item }) => (
    <View style={styles.tareaFila}>
      <Text style={styles.tareaTitulo}>{item.titulo}</Text>
      <TouchableOpacity
        style={styles.btnEliminar}
        onPress={() => eliminarTarea(item)}
      >
        <Text style={styles.btnEliminarTexto}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  // ============================================================
  // RENDER PRINCIPAL
  // ============================================================
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A2980" />

      {/* ── Encabezado ── */}
      <View style={styles.header}>
        <Text style={styles.headerTitulo}>📋 Mis Tareas</Text>
        <Text style={styles.headerSubtitulo}>Conectado a Supabase ⚡</Text>
      </View>

      {/* ── Formulario para agregar ── */}
      <View style={styles.formulario}>
        <TextInput
          style={styles.input}
          placeholder="Escribe una nueva tarea..."
          placeholderTextColor="#999"
          value={nuevoTitulo}
          onChangeText={setNuevoTitulo}
          onSubmitEditing={agregarTarea}
          returnKeyType="done"
        />
        <TouchableOpacity
          style={[styles.btnAgregar, guardando && styles.btnDeshabilitado]}
          onPress={agregarTarea}
          disabled={guardando}
        >
          {guardando
            ? <ActivityIndicator color="#fff" size="small" />
            : <Text style={styles.btnAgregarTexto}>＋</Text>
          }
        </TouchableOpacity>
      </View>

      {/* ── Lista de tareas ── */}
      {cargando ? (
        <View style={styles.centrado}>
          <ActivityIndicator size="large" color="#3ECF8E" />
          <Text style={styles.cargandoTexto}>Cargando desde Supabase...</Text>
        </View>
      ) : tareas.length === 0 ? (
        <View style={styles.centrado}>
          <Text style={styles.vaciTexto}>No hay tareas todavía.</Text>
          <Text style={styles.vaciSubTexto}>¡Agrega tu primera tarea! 👆</Text>
        </View>
      ) : (
        <FlatList
          data={tareas}
          keyExtractor={item => item.id.toString()}
          renderItem={renderTarea}
          contentContainerStyle={styles.lista}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* ── Footer ── */}
      <View style={styles.footer}>
        <Text style={styles.footerTexto}>
          {tareas.length} tarea{tareas.length !== 1 ? 's' : ''} en Supabase
        </Text>
        <TouchableOpacity onPress={cargarTareas}>
          <Text style={styles.footerRefresh}>↻ Actualizar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ============================================================
// ESTILOS
// ============================================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4FF',
  },
  header: {
    backgroundColor: '#1A2980',
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitulo: {
    fontSize: 13,
    color: '#3ECF8E',
    marginTop: 4,
  },
  formulario: {
    flexDirection: 'row',
    margin: 16,
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: '#1A1A2E',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  btnAgregar: {
    backgroundColor: '#3ECF8E',
    borderRadius: 10,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  btnDeshabilitado: {
    backgroundColor: '#9E9E9E',
  },
  btnAgregarTexto: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: 'bold',
    lineHeight: 30,
  },
  lista: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  tareaFila: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  tareaTitulo: {
    flex: 1,
    fontSize: 15,
    color: '#1A1A2E',
  },
  btnEliminar: {
    backgroundColor: '#FFE0E0',
    borderRadius: 8,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  btnEliminarTexto: {
    color: '#CC0000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  centrado: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60,
  },
  cargandoTexto: {
    marginTop: 12,
    color: '#666',
    fontSize: 14,
  },
  vaciTexto: {
    fontSize: 18,
    color: '#444',
    fontWeight: '600',
  },
  vaciSubTexto: {
    fontSize: 14,
    color: '#888',
    marginTop: 6,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  footerTexto: {
    fontSize: 13,
    color: '#666',
  },
  footerRefresh: {
    fontSize: 13,
    color: '#1A2980',
    fontWeight: '600',
  },
});
