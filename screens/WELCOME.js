import { StyleSheet, Text, SafeAreaView,View ,Button, Pressable} from 'react-native'
import React from 'react'
import {MaterialIcons,FontAwesome5} from '@expo/vector-icons'

const WELCOME = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcometext}> PDF Language Bridge </Text>
        <View style={styles.card}>
            <FontAwesome5 name='file-import' size={24} color='#007BFF'/>
            <Text  style={styles.text}>Import PDF files from various sources, including local storage</Text>
        </View>
        <View style={styles.card}>
            <MaterialIcons name='translate' size={24} color='#007BFF'/>
            <Text  style={styles.text}>Translate your documents to any language of your choice in no time</Text>
        </View>
        <View style={styles.card}>
            <MaterialIcons name='download' size={24} color='#007BFF'/>
            <Text  style={styles.text}>Save files to view offline</Text>
        </View>
        <View style={styles.card}>
            <MaterialIcons name='security' size={24} color='#007BFF'/>
            <Text  style={styles.text}>Security and privacy</Text>
        </View>
        <Pressable 
            onPress={()=>navigation.navigate('Upload')}
            style={styles.button}>
                <Text style={styles.buttonText}>Let's Go</Text>
        </Pressable>

    </SafeAreaView>
  )
}

export default WELCOME

const styles = StyleSheet.create({
    container:{
        margin:20
    },
    card:{
        flexDirection:'row',
        gap:10,
        margin:10,
        padding:20,
        alignItems:'center',
        borderColor:'#EEEEEE' ,
        borderWidth:2,
    },
    welcometext:{
        marginVertical:40,
        fontSize:30,
        fontWeight:'bold',
        color:'#007BFF',
        textAlign:'center'
        
    },
    text:{
        fontSize:20,
    },
    button:{
        margin:10,
        alignSelf:'center',
        backgroundColor:'#007BFF',
        padding:20,
        paddingHorizontal:80,
        borderRadius:30,
    },
    buttonText:{
        color:'white',
        fontSize:20,
        fontWeight:'bold',
    }

})