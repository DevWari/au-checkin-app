import React, { Component } from 'react';
import { 
    Container,    
} from 'native-base';

import {
    View,
    Text,    
    Alert,
    StyleSheet,
    TouchableOpacity,  
    StatusBar,
    TextInput,
    KeyboardAvoidingView 
} from 'react-native';
import {connect} from 'react-redux'
import {login} from '../store/actions'

class CustomerLogin extends Component {

    state = {
        appCode: '',
        password: '', 
        isLoading: false       
    }    
    onLogin = () => {
        const {appCode, password} = this.state        
        if (appCode == '') {
            Alert.alert('Warning','Please Input your App Code')
            return
        } 
        if (password == '') {
            Alert.alert('Warning','Please Input your Password')
            return
        }       
        this.setState ({isLoading: true})
        this.props.login (appCode, password)        
    }       
    componentDidMount () {
        StatusBar.setHidden(true)
        this.willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            () => this.setState ({appCode:'', password:''})           
        );   
    }
    render () {
        const {isLoading} = this.state
        return (           
            <Container style={styles.container}>   
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior="padding"
                    enabled={true}
                >
                    <View style={styles.content}>
                        <Text style={styles.title}>
                            Welcome to AU Check-In 
                        </Text>
                        <TextInput 
                            style={styles.input}
                            keyboardType='decimal-pad' 
                            placeholder='App Code'
                            value={this.state.appCode} 
                            onChangeText={text=>this.setState({appCode:text})}/>                   
                        <TextInput 
                            style={styles.input}
                            placeholder='Password' 
                            secureTextEntry={true}
                            value={this.state.password} 
                            onChangeText={text=>this.setState({password:text})}/>                   
                        <TouchableOpacity 
                            style={styles.btnLogin} 
                            onPress={this.onLogin}>
                            <Text style={styles.txtLogin}>LOGIN</Text>
                        </TouchableOpacity>
                    </View>  
                </KeyboardAvoidingView>                           
             </Container>
        )        
    }
}

function mapStateToProps (state) {
	return {
	    userData: state.customerLoginReducer
	}
}  
function mapDispatchToProps (dispatch) {
    console.log ("dispatch.......", dispatch)
	return {
        login: (a, b) => dispatch(login(a,b))
	}
}  
export default connect(
    mapStateToProps,   
	mapDispatchToProps,
)(CustomerLogin)

const styles = StyleSheet.create({
    container: {
      width:'100%',
      height:'100%',
      backgroundColor: '#70ad47',
    },
    content: {
        width:'100%',
        height:'100%',
        padding: '5%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height:40,
        width: '100%',
        marginBottom:5, 
        paddingLeft: 10,
        borderRadius: 15,
        fontSize: 17,
        backgroundColor:'white',
    },
    btnLogin: {
        width:'100%', 
        alignItems:'center',
        borderRadius:15,
        height:40,
        borderColor:'grey',
        backgroundColor:'white',
        marginTop:20
    },
    title: {
        textAlign:'center', 
        marginBottom:40, 
        fontSize: 25, 
        color:'#385723', 
        fontWeight:'bold'
    },
    txtLogin: {
        paddingTop: 8,
        fontSize: 18,
    }
});