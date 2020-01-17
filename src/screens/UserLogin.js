import React, { Component } from 'react';
import { 
    Container, 
    Header,      
    Button, 
    Icon, 
    Title, 
    Spinner 
} from 'native-base';
import {
    View,
    Text,    
    Alert,
    StyleSheet,
    TouchableOpacity,   
    TextInput,
    KeyboardAvoidingView
} from 'react-native';
import {connect} from 'react-redux'
class UserLogin extends Component {

    state = {
      name: '',
      telephone:'',
      vehicleReg: '',  
      isLoading: false,      
    }
    jewelStyle = function(option) {
        return {
           width:'100%',
           height:'100%',
           backgroundColor: this.props.userData.garageColor,
        }
     }  
    onUserLogin = () => {
        const {name, telephone, vehicleReg} = this.state       
        this.setState ({isLoading: true})
        const {garageCode, userCode, token} = this.props.userData        
        if (telephone.length < 9) {
            Alert.alert ("Warning", "Please Input your phone number correctly")
            this.setState({isLoading: false})
            return
        } 
        
        fetch('https://api.auassist.co.uk/api/shared/add_event',{    
            method: 'POST',
            headers: 
            {   'Accept': 'application/json',
                'Content-Type': 'application/json',    
                'Authorization': "Bearer " + token,
            },
            body: JSON.stringify(
            {   name : name,
                phone: telephone,
                vehicle_reg: vehicleReg,
                garage_code: garageCode,
                user_code: userCode                
            })    
        }).then((response) => response.json()).then((responseJsonFromServer) =>
        {
            this.setState ({isLoading: false})
            if (responseJsonFromServer.status == 'ok') this.props.navigation.navigate ('Video')
        }).catch((error) =>
        {
            console.error("errrrr",error);                
            this.setState ({isLoading: false})
        });  
    }      
    componentDidMount () {     
        
        console.log ("color", this.props.userData.garageColor)
        this.willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            () => this.setState({name:'', telephone:'', vehicleReg:''})
        );  
    }    
    render () {
        return (            
            <Container style={this.jewelStyle()}>            
                { this.state.isLoading && <Spinner style= {styles.loadingBar} color='blue' />}
                <Header style={styles.headerBar}>
                    <View style={styles.headerSide}>
                        <Button transparent onPress={()=>this.props.navigation.goBack()}>
                            <Icon name='arrow-back' />
                        </Button>
                    </View>
                    <View style={styles.headerBody}>
                        <Title style={{fontSize:24}}>
                            {this.props.userData.garageCode}
                        </Title>
                    </View>
                    <View style={styles.headerSide}></View>
                </Header>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior="padding"
                    enabled={true}
                >
                    <View style={styles.content}>
                        <TextInput 
                            style={styles.input}
                            placeholder='Name' 
                            value={this.state.name} 
                            onChangeText={text=>this.setState({name:text})}/>               
                        <TextInput 
                            style={styles.input}
                            placeholder='Telephone' 
                            value={this.state.telephone} 
                            keyboardType='decimal-pad' 
                            onChangeText={text=>this.setState({telephone:text})}/>              
                        <TextInput 
                            style={styles.input}
                            placeholder='Vehicle Reg.' 
                            value={this.state.vehicleReg}
                            onChangeText={text=>this.setState({vehicleReg:text})}/>                   
                        <TouchableOpacity 
                            style={styles.btnNext} 
                            onPress={this.onUserLogin}>
                            <Text style={styles.txtNext}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </Container>
        )        
    }
}

function mapStateToProps (state) {
	return {
      userStatus: state.userLoginReducer,
      userData: state.customerLoginReducer,
	 }
}  
function mapDispatchToProps (dispatch) {
	return {
        userLogin: (name, telephone,vehicleReg, garageCode, userCode, token) => 
        dispatch(userLogin(name,telephone, vehicleReg, garageCode , userCode, token))
	 }
}  
export default connect(
    mapStateToProps,   
	mapDispatchToProps,
)(UserLogin)

const styles = StyleSheet.create({
    container: {
        width:'100%',
        height:'100%',        
    },
    headerBar: {
        
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerSide: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: "center",
        width: 70,
    },
    headerBody: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: "center"
    },
    input: {
        height: 40,
        width:'100%',
        marginBottom:5, 
        borderRadius: 15,
        paddingLeft: 10,
        fontSize: 17,
        backgroundColor:'white'
    },
    title: {
        textAlign:'center', 
        marginBottom:20, 
        fontSize: 25, 
        color:'#385723', 
        fontWeight:'bold'
    },
    content: {
        width:'100%',
        height:'100%',
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnNext: {
        width:'100%', 
        alignItems:'center', 
        borderWidth: 1, 
        borderRadius:15,
        height:40,
        borderColor:'grey',
        backgroundColor:'white',
        marginTop:10
    },
    txtNext: {
        fontSize: 18,
        marginTop: 8
    },
    loadingBar: {
        position:'absolute', 
        top: 70,
        left: '48%'
    }
});