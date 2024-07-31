import { StyleSheet,Alert, Text, View, TouchableOpacity,TextInput,Keyboard} from 'react-native'
import React,{useState} from 'react'
import {MaterialIcons} from '@expo/vector-icons'
import * as DocumentPicker from 'expo-document-picker';
import *as FileSystem from 'expo-file-system'
import *as IntentLauncher from "expo-intent-launcher"
import axios from "axios"
const Upload = () => {
  const [textToTranslate,setTextToTranslate]=useState("")
  const [translatedText,setTranslatedText]= useState("")
 async function translateText(){
  console.log(textToTranslate);
  axios.post("http://10.0.2.2:3000/translate",{textToTranslate})
    .then((response)=>{
      console.log(response)  
      setTranslatedText(response.data.translatedText)
      
    }).catch((error)=>{
      Alert.alert("Translation failed ","An error occured during translation")
      console.log("error",error);
      console.error(error.response.data);
    })
    
 }

  async function pickDocument() {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
        multiple:false,
      });
      console.log(result)
     
      let uri=result.assets[0].uri;
      const cUri=await FileSystem.getContentUriAsync(uri);
      
        await IntentLauncher.startActivityAsync("android.intent.action.VIEW",{
          data: cUri,
          flags:1,
          type:'application/pdf'
        })
      
     
    } catch (error) {
      console.log('Error picking document:', error);
    }
  }
  return (
    <View onPress={()=>Keyboard.dismiss()} style={{ margin: 30, }}>
      <Text style={styles.text}>Upload a PDF file</Text>
      <View style={styles.card}>
        <View style={{ alignItems: 'center' }}>
          <MaterialIcons name='file-open' size={100} color='#007BFF' />
          
          <TouchableOpacity style={styles.button} onPress={pickDocument}>
            <Text style={{ color: 'white', fontSize: 20 }}>Browse</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Text style={styles.text}>Translate Text</Text>
        <TextInput style={styles.input}
                   placeholder='Enter your text to translate'
                   value={textToTranslate}
                   onChangeText={text=>setTextToTranslate(text)}/>
                  <TouchableOpacity style={styles.translateButton} onPress={translateText}>
                   <Text style={{ color: 'white', fontSize: 20,textAlign:"center" }}>Translate</Text>
                 </TouchableOpacity>
                 {
                  translatedText!=""?(
                    <Text style={styles.input}>
                        {translatedText}
                   </Text>
                  ):(
                    <View></View>
                  )
                 }
        
      </View>
    </View >
  )
}

export default Upload

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: '#EEEEEE',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#007BFF',
    borderWidth: 5,
    borderStyle: "dashed",
  },
  text: {
    fontSize: 20,
    textAlign:"center",
    margin:20,
    fontWeight:'bold',

  },
  button: {
    marginTop: 60,
    backgroundColor: '#007BFF',
    padding: 20,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  translateButton: {
    margin: 30,
    backgroundColor: '#007BFF',
    padding: 20,
    paddingHorizontal: 40,
    borderRadius: 25,
    textAlign:"center"
  },
  input:{
    height:60,
    borderWidth: 1,
    borderRadius:8,
    padding:10,
    fontSize:20,
  }
})