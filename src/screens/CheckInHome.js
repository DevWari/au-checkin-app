import React, { Component } from 'react';
import { 
    Container,
    Header,   
    Button,     
    Title,  
   
} from 'native-base';
import {
    View,
    Text,  
    StyleSheet,
    TouchableOpacity,  
    StatusBar 
} from 'react-native';
import {connect} from 'react-redux'
import {logout} from '../store/actions'

class CheckInHome extends Component {
  jewelStyle = function(option) {
     return {
        width:'100%',
        height:'100%',
        backgroundColor: this.props.userData.garageColor,
     }
  }  
  onLogut = () => {    
    this.props.logout ()        
  }   
  componentWillUpdate(nextProps, nextState) {        
    if (nextProps.userData.status == "no") {
        this.props.navigation.navigate ("CustomerLogin")    
    }
  }
  componentDidMount () {
    StatusBar.setHidden(true)
  }
  render() {
    return (
      <Container style={this.jewelStyle()}>
          <Header style={styles.headerBar}>
              <View style={styles.headerSide}></View>            
              <View style={styles.headerBody}>
                   <Title style={{fontSize:24}}>
                       {this.props.userData.garageCode}
                    </Title>
              </View>
              <View style={styles.headerSide}>
                  
              </View>
          </Header>
          <View style={styles.content}>
              <Text style={styles.title}>
                  {this.props.userData.checkin_message?                 
                      this.props.userData.checkin_message: this.props.userData.garageName
                  }
              </Text>                
              <TouchableOpacity 
                  style={styles.btnCheck} 
                  onPress={()=>this.props.navigation.navigate('UserLogin')}>
                  <Text style={styles.txtCheckIn}>Check{'\n'} In</Text>
              </TouchableOpacity>
          </View>
      </Container>
    );
  }
}
function mapStateToProps (state) {
	return {
	  userData: state.customerLoginReducer
	}
}  
function mapDispatchToProps (dispatch) {
	return {
        logout: () => dispatch(logout())
	}
} 
export default connect(
    mapStateToProps,   
	mapDispatchToProps,
)(CheckInHome)

const styles = StyleSheet.create({
    container: {
        width:'100%',
        height:'100%',
        backgroundColor: '#70ad47',
    },
    headerBar: {        
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerBody: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: "center"
    },
    headerSide: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',        
        width: 70,        
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
    input: {
        marginBottom:10, 
        backgroundColor:'white'
    },
    title: {
        textAlign:'center',
        marginBottom:20, 
        fontSize: 30, 
        color:'#ffffff', 
        fontWeight:'bold'
    },
    btnCheck: {
        height:96, 
        width: 96, 
        borderRadius: 48,
        borderWidth: 2,
        borderColor:'green',
        backgroundColor:'white',
        marginTop:10,
    },
    txtCheckIn: {
        fontSize: 20,
        color: "black",
        fontWeight: "bold",
        textAlign:'center',
        marginTop: 25
    }
});
