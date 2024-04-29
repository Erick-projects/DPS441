import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const firebaseConfig = {
  apiKey: "AIzaSyCGrcdXl7mQxdC78WSP7KtRyYUATiAc46Y",
  authDomain: "storesv-f79e9.firebaseapp.com",
  projectId: "storesv-f79e9",
  storageBucket: "storesv-f79e9.appspot.com",
  messagingSenderId: "38071701511",
  appId: "1:38071701511:web:13fcef8b7166276d5d9aa2"
};

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
