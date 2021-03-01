import React from 'react'; 
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Image} from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component{ 
    constructor(){
        super();
        this.state={
            hasCameraPermission: null,
            scanned: false,
            buttonState: 'normal',
            scannedData: ''
        }
    }
    getCameraPermissions = async (id) =>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === "granted",
            buttonState: "clicked"
        })
    }
    handleBarCodeScanner = async ({type, data}) =>{
             this.setState({ 
                 scanned: true, 
                 scannedData: data, 
                 buttonState: 'normal' 
            }); 
    }
    render(){
        const hasCameraPermission = this.state.hasCameraPermission;
        const scanned = this.state.scannned;
        const buttonState = this.state.buttonState;

        if(buttonState === "clicked" && hasCameraPermission){
            return(
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanner}
                    style={styles.absoluteFillObject}
                />
            )
        }

        else if(buttonState==="normal"){
            return(
                <View style={styles.container}>
                    <Image
                        source={require("../assets/220px-Barcode-scanner.jpg")}
                        style={{marginTop:500}}
                    />
                    <Text style={{fontSize:30}}>Bar Code Scanner</Text>
                    <Text style={StyleSheet.displayText}>{
                    hasCameraPermission===true?this.state.scannedData:"Request Camera Permission"}
                    </Text>
                    <TouchableOpacity
                        onPress={this.getCameraPermissions}
                        style={styles.scanButton}>
                            <Text style={styles.scanButton}>Scan QR Code</Text>
                        </TouchableOpacity>
                </View>
            )
        }
    }
}


    const styles = StyleSheet.create({ 
        container: { 
            flex: 1, 
            justifyContent: 'center', 
            alignItems: 'center' 
        }, 
        displayText:{ 
            fontSize: 15, 
            textDecorationLine: 'underline' 
        }, 
        scanButton:{ 
            backgroundColor: '#2196F3', 
            padding: 10, 
            margin: 10 
        },
        buttonText:{ 
            fontSize: 15, 
            textAlign: 'center', 
            marginTop: 10 
        }, 
        inputView:{ 
            flexDirection: 'row', 
            margin: 20 
        }, 
        inputBox:{ 
            width: 200, 
            height: 40, 
            borderWidth: 1.5, 
            borderRightWidth: 0, 
            fontSize: 20 
        }, 
        scanButton:{ 
            backgroundColor: '#66BB6A', 
            width: 100, 
            height:30,
            borderWidth: 1.5, 
            borderLeftWidth: 0 
        } ,
        submitButton:{
            backgroundColor: '#FBC02D',
            width: 100,
            height:50
          },
          submitButtonText:{
            padding: 10,
            textAlign: 'center',
            fontSize: 20,
            fontWeight:"bold",
            color: 'white'
          }
    });
