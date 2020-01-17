import React, { Component } from 'react';
import { 
    Container, 
    Header, 
    Content,    
    Button,     
    Icon,     
    Title, 
    Accordion 
} from 'native-base';
import { 
    View, 
    Text, 
    StyleSheet,
    StatusBar
} from 'react-native';
import {connect} from 'react-redux'

const dataArray = [
    { 
        title: "I'm asked to enter a PIN when trying to pair with my phone",
        content: "Cause: Pair Smart Key Finder with your phone using the AU Assist app instead" + "\n" +
                 "Solution: You're trying to pair the Smart Key Finder via your phone's Bluetooth settings" 
    },
    { 
        title: "I can't pair the Smart Key Finder with my phone.                ",
        content: "Cause: Bluetooth is off." + "\n" + "Solution: Turn on Bluetooth in your phone settings." 
    },
    { 
        title: "Smart Key FInder's location does not appear on the map", 
        content: "Cause: GPS is turned off or the AU Assist app cannot access GPS." + "\n" + 
                 "Solution: Activate GPS and make sure the AU Assist app can access your phone's GPS." 
    },
    { 
        title: "My Bluetooth is on and key-finder won’t connect               ", 
        content: "Open and fully close the app twice in quick succession this will refresh the app." 
    }
];
class HelpComponent extends Component {

    state = {
        myInterval: null,
        timeIndex: 0,
    }

    jewelStyle = function(option) {
        return {
           width:'100%',
           height:'100%',
           backgroundColor: this.props.userData.garageColor,           
        }
    }
    _renderHeader(item, expanded) {
        return (
            <View 
                style={{
                    flexDirection: "row",
                    padding: 10,
                    justifyContent: "space-between",
                    alignItems: "center" ,
                    backgroundColor: "#A9DAD6" 
                }}
            >
                <Text 
                    style={{ fontWeight: "600", marginRight: 5, flex: 9 }}>
                    {" "}{item.title}
                </Text>
                    {
                        expanded ? 
                        <Icon style={{ fontSize: 18, flex: 1, textAlign:'right' }} name="arrow-dropup" /> : 
                        <Icon style={{ fontSize: 18, flex: 1, textAlign:'right' }} name="arrow-dropdown" />
                    }
            </View>
        );
    }
    _renderContent(item) {
        return (
            <Text
                style={{
                    backgroundColor: "#e3f1f1",
                    padding: 10,
                    fontStyle: "italic",
                }}
            >
                {item.content}
            </Text>
        );
    }
    componentDidMount () {
        StatusBar.setHidden (true)
        const myInterval = setInterval (()=>{          
           const {timeIndex, myInterval, isPlaying} = this.state
           if (timeIndex > 8 && !isPlaying) {               
               clearInterval (myInterval)
               this.props.navigation.navigate ('CheckInHome')
           }
           else this.setState({timeIndex: timeIndex + 1})
       }, 5000)
       this.setState ({myInterval: myInterval})
    }

    componentWillUnmount () {
        if (this.state.myInterval) {
            clearInterval (this.state.myInterval)
        }
        this.setState ({timeIndex: 0})
    }

    userEvent = () => {
       this.setState ({timeIndex:0})
    }    
    render () {
        return (
            <Container 
                style={this.jewelStyle()} 
                onTouchEndCapture={this.userEvent} 
                pointerEvents={'box-none'}
            >
                <Header style={styles.headerBar}>
                    <View style={styles.headerSide}>
                        <Button 
                            transparent onPress={()=>this.props.navigation.goBack()}>
                            <Icon name='arrow-back' />
                        </Button>
                    </View>
                    <View style={styles.headerBody}>
                        <Title style={{fontSize:24}}>
                            {this.props.userData.garageCode}
                        </Title>
                    </View>
                    <View style={styles.headerSide}/>
                </Header>
                <Content padder>                    
                    <View style={styles.subTitle}>
                        <Text style={styles.subTitle1}>FAQs</Text>
                        <Text style={styles.subTitle2}>Problem solving and useful tips</Text>
                        <Text style={styles.subTitle2}>Some Issues and Solutions</Text>    
                    </View>
                    <Accordion 
                        dataArray={dataArray}
                        animation={true}
                        expanded={true}
                        renderHeader={this._renderHeader}
                        renderContent={this._renderContent}
                    />                                
                </Content>
            </Container>
        )        
    }
}

function mapStateToProps (state) {
	return {      
      userData: state.customerLoginReducer,
	 }
}
export default connect(
    mapStateToProps,   
	null,
)(HelpComponent)

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
    content: {
        width: '100%',
        alignSelf:'center', 
        display: "flex", 
        flexDirection: 'column',
        alignItems: "center",
        textAlign: 'center',
        padding: 10,
    },
    subTitle: {
        textAlign: 'center'
    },
    subTitle1: {
        padding: 10,
        fontSize: 20,
        color: '#ffffff',
        textAlign: 'center'
    },
    subTitle2: {
        padding: 5,
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 16
    },
    accordion: {
        width: '100%'
    }
});