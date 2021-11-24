import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Voice from 'react-native-voice';

const App = () =>{
  const [recognized, setRecognized] = useState('');
  const [started, setStarted] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  },[]);

  const onSpeechStart = async (e) => {
    console.log('onSpeechStart: ', e);
  }

  const onStart = async () => {
    try {
      await Voice.start('pt-BR');
    } catch (e) {
      console.error('onStart: ', e);
    }
  }
  
  const onSpeechError = async (e) => {
    console.log('onSpeechError: ', e);
  }
  
  const onSpeechResults = async (e) => {
    console.log('onSpeechResults: ', e.value[0]);
  }

  return (
    <View>
      <Text style={styles.transcript}>
        Transcript
      </Text>
      {results.map((result, index) => <Text style={styles.transcript}> {result}</Text>
      )}
      <Button style={styles.transcript}
        onPress={() => onStart()}
        title="Start"></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  transcript: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
    top: '400%',
  },
});

export default App;
