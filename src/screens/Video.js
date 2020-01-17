import React, { Component } from 'react';
import { 
    Container, 
    Header, 
    Icon, 
    Button, 
    Title 
} from 'native-base';
import {
    View,
    Text,    
    StyleSheet,   
    TouchableOpacity
} from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import {connect} from 'react-redux'

VideoList = [
    "https://api.auassist.co.uk/checkins/step-1.mp4",
    "https://api.auassist.co.uk/checkins/step-2.mp4",
    "https://api.auassist.co.uk/checkins/step-3.mp4",
    "https://api.auassist.co.uk/checkins/step-4.mp4",
    "https://api.auassist.co.uk/checkins/step-5.mp4",
    "https://api.auassist.co.uk/checkins/step_final.mp4",
    null                  
]  
class VideoComponent extends Component {

    constructor() {
        super();         
        this.state = {          
            index: 0,                     
            isPlaying: true,
            myInterval: null,
            timeIndex: 0,
        };        
    }     
    next = () => {
        const {index}  = this.state        
        const videoLength = VideoList.length - 1        
        this.setState ({
          index: (index + 1) % videoLength,
          timeIndex: 0,
          isPlaying: true,
        });
    }
    prev = ()=> {
        const {index}  = this.state        
        if ( index < 1) return
        this.setState ({
          index: index -1,
          timeIndex: 0,
          isPlaying: true,
        });
    }
    jewelStyle = (option) => {
        const {garageColor} = this.props.userData
        return {
           width:'100%',
           height:'100%',
           display: 'flex',
           flexDirection: 'column',
           justifyContent: 'space-between',
           backgroundColor: garageColor,
        }
     }
     userEvent = () => {
        this.setState ({timeIndex:0})
     }
     goHelpPage = () => {
         const {myInterval} = this.state
         const {navigation} = this.props
        this.setState({
            timeIndex: 0, 
            index: VideoList.length-1
        })
        if (myInterval) {
            clearInterval(myInterval)
        } 
        navigation.navigate('Help')
     }
     goCheckInHome = () => {
        const {myInterval} = this.state
        const {navigation} = this.props
        this.setState({
            timeIndex: 0, 
            index: 0
        })
        if (myInterval) {
            clearInterval(myInterval);
        }  
        navigation.navigate('CheckInHome')
     }
     componentWillMount () {        
        const {garageCheckinTutorial} = this.props.userData        
        if (!garageCheckinTutorial || 
            garageCheckinTutorial == ""
        ) return        
        if (VideoList.length < 8) {
            VideoList.unshift(garageCheckinTutorial)
        }  
        else return       
     }
     componentDidMount () {        
        this.willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            () => {
                const myInterval = setInterval (()=>{     
                    const {timeIndex, myInterval, isPlaying} = this.state
                    if (timeIndex > 8 && !isPlaying) {                
                        clearInterval (myInterval)
                        this.props.navigation.navigate ('CheckInHome')
                    }
                    else this.setState({timeIndex: timeIndex + 1})
                }, 5000)
                this.setState ({
                    myInterval: myInterval, 
                    index: 0
                })
            }
        );          
     }   
     componentWillUnmount () {
        const {myInterval} = this.state
        if (myInterval) {
            clearInterval (myInterval)
        } 
        this.setState ({timeIndex: 0})
     }  
    render () {
        return (
            <Container style={this.jewelStyle()} >
                <Header style={styles.headerBar}>
                    <View style={styles.headerSide}>
                        <Button 
                            transparent 
                            onPress={()=>this.props.navigation.goBack()}
                        >
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
                 <View 
                    style={styles.content}  
                    onTouchEndCapture={this.userEvent} 
                    pointerEvents={'box-none'}
                 >
                     <VideoPlayer
                         source={{uri: VideoList[this.state.index]}}
                         disableBack
                         disablePlayPause
                         onEnd={()=> this.setState({
                                            timeIndex: 0, 
                                            isPlaying: false
                                     })
                         }
                         onPause={()=> this.setState({
                                                timeIndex: 0, 
                                                isPlaying: false
                                        })
                         }
                         onPlay = {()=> this.setState ({
                                                isPlaying:true, 
                                                timeIndex: 0
                                        })
                         } />
                </View>
                <View style={styles.ctrlContainer}>
                    <TouchableOpacity 
                        style={styles.btn} 
                        onPress= {this.goHelpPage}>
                        <Text style={styles.txt}> Help </Text> 
                    </TouchableOpacity>
                    <View style={styles.ctrlVideo}>
                        <TouchableOpacity 
                            style={
                                this.state.index==0 ? 
                                    styles.disableBtn : styles.btn
                            } 
                            onPress={this.prev} 
                            disabled={this.state.index == 0}> 
                            <Text style={styles.txt}>Back</Text>
                        </TouchableOpacity>
                        <Text style={{width: 10}}></Text>
                        <TouchableOpacity 
                            style={
                                this.state.index==VideoList.length-2? 
                                    styles.disableBtn : styles.btn
                            }  
                            onPress={this.next} 
                            disabled={this.state.index == VideoList.length-2}>
                            <Text style={styles.txt}>Next</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity 
                        style={styles.btn} 
                        onPress= {this.goCheckInHome}> 
                        <Text style={styles.txt}>Retry</Text> 
                    </TouchableOpacity>
                </View>
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
)(VideoComponent)

const styles = StyleSheet.create({
    container: {
        width:'100%',
        height:'100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#70ad47',
    },
    headerBar: {
        flexGrow: 1,        
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
        width:'100%',
        flexGrow: 8,
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    videoPlay: {
        height: 350,
        marginBottom: 10
    },
    ctrlContainer: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
        padding: 10,
    },
    ctrlVideo: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-around',
    },
    videoPlayer: {
        width: '100%'
    },
    btn: {
        width: 80,
        height: 30,
        textAlign: "center",
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
        paddingTop: 3
    },
    disableBtn: {
        width: 80,
        height: 30,
        textAlign: "center",
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
        paddingTop: 3,
        opacity: 0.3
    },
    txt: {
        fontSize: 16,
        textAlign: 'center',
        alignContent: 'center',
        fontWeight: 'bold'
    }
});
