
import React,{
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Component,
    ListView,
    TextInput,
    Navigator,
    ScrollView,
    Alert,
    Dimensions,
    AsyncStorage
    } from 'react-native';

import CommStyle from '../comm/CommStyle';
import BAckArrow from '../img/back_arrow.png';
import ProjectExceptionReasonInput from './ProjectExceptionReasonInput';
import NavBar from '../Component/NavBar';

var request_url = "http://192.168.251.12:3000/apis/2/dms/project/planCheck/list.do?projectId=1002";
/******************************�����**************************************************/
export default class ProjectFollowExceptionCheck extends Component{
    //������
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            ds:[],
            opacityShow:false,
            overLength:300,
            current_stepName:'',
            current_id:'',
            text:''

        };
        this.renderItem   = this.renderItem.bind(this);
        this.getAlert     = this.getAlert.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.cancelAlert  = this.cancelAlert.bind(this);
        this.confirmAlert = this.confirmAlert.bind(this)
    }
    componentDidMount() {
        // ��ȡ����
        fetch(request_url)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.response.data.milestoneList),
                    ds:responseData.response.data.milestoneList
                });
            })
            .done();
    }
    _onBackClick(){
        this.props.navigator.pop();
    }
    _onToExceptionInput(){
        this.props.navigator.push({
            component:ProjectExceptionReasonInput,
            sceneConfig:Navigator.SceneConfigs.PushFromRight,
            params:{followData:this.props.followData}})
    }
    getAlert(data){
        this.setState({
            opacityShow:true,
            current_stepName:data.stepName,
            current_id:data.id
        });
    };
    cancelAlert(){
        this.setState({
            opacityShow:false
        });
    }
    confirmAlert(){
        this.cancelAlert();
        var postURL ='http://192.168.251.12:3000/apis/2/dms/project/track/submit.do';
        fetch(postURL,{
            method: 'POST',
            body:JSON.stringify({
                id:this.state.id,
                stepName:this.state.current_stepName,
                status:2,
                reason:this.state.text
            })
        }).then((response)=>response.text()
        ).then((res)=>{

            }).catch((err)=>{
                console.log(err);
            }).done();
        /*        //���ش洢
         AsyncStorage.setItem('aaa',this.state.text);
         AsyncStorage.getItem('aaa',(error, author) => {
         if(error){// �����ʱ��
         } else { // ��ȷ��ʱ��
         alert(author)
         }});*/
    }
    handleChange(data){
        this.setState({
            text:data,
            overLength:300-data.length
        })
    }
    render(){
        return(
            <View style={styles.bgView} >
                <NavBar
                    fromPage={this}
                    title={'����������'}
                    />
                <ScrollView style={{height:460}}>
                    <View style={{flex:1}}>
                        {this.renderList()}
                    </View>
                </ScrollView>
                <TouchableOpacity onPress={this._onToExceptionInput.bind(this)}>
                    <View style={{ height:44,flexDirection:'row'}} >
                        <View style={{backgroundColor:CommStyle.BQDefaultColor,flexDirection:'row',justifyContent:'center',alignItems:'center',flex:5 }} >
                            <Text style={{ textAlign:'center',color: 'white', fontSize:16,flex:1 }} >ȷ��</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                { this.state.opacityShow &&
                <View style={styles.reasonForm}>
                    <View
                        style={[styles.showAlert]}
                        >
                        <View style={styles.alertTitle}>
                            <Text sytle={styles.alertTitleText}>δ���ԭ��</Text>
                        </View>
                        <View style={{height:100, margin:5}} >
                            <TextInput
                                maxLength={300}
                                style={{ margin:8,flex:1,fontSize:14 }}
                                multiline={true}
                                placeholder={'���ڴ˴���д'}
                                onChangeText = {this.handleChange}
                                // onChangeText={(text) => this.setState({text})}
                                value={this.state.text}
                                ></TextInput>
                        </View>
                        <View sytle={{height:50,marginBottom:30,position:'relative'}}>
                            <Text style={{position:'absolute',left:10,fontSize:14}}>*�뼰ʱ��������</Text>
                            <Text style={{position:'absolute',left:300,fontSize:14}}>{this.state.overLength}</Text>
                        </View>
                        <View style={{marginTop:50,flexDirection:'row'}}>
                            <View style={styles.bottomBun}>
                                <TouchableOpacity onPress={this.cancelAlert} ><Text style={{color:'#7073ca'}}>ȡ��</Text></TouchableOpacity>
                            </View>
                            <View style={styles.bottomBun}>
                                <TouchableOpacity onPress={this.confirmAlert}><Text style={{color:'#7073ca'}}>ȷ��</Text></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                }
            </View>
        );
    }
    //��Ⱦ�б�
    renderList(){
        return this.state.ds.map((value)=>{
            return (
                <View>
                    <View style={styles.minTitle} >
                        <Text style={{ color: '#666666',fontSize:12 }}>
                            {value.milestoneName}
                        </Text>
                    </View>
                    <ListView
                        dataSource={ this.state.dataSource.cloneWithRows(value.stepInfos)}
                        renderRow={this.renderItem}

                        />
                </View>
            )
        });
    }
    //���������λ��
    randomKey(){
        return(Math.random().toString().substring(3,9));
    }
    //��Ⱦ��
    renderItem(rowData,i){
        return (
            <View   key={`${i}`}  style={{ padding:15,height:80}} >
                <Text>{rowData.stepName}</Text>
                <Button data={rowData} getAlert={this.getAlert} ></Button>
                <View style={[]}></View>
            </View>
        )
    }
}
/*******************************���������Button********************************/
class Button extends Component{
    constructor(props){
        super(props);
        this.state={
            completeActive:false,
            uncompleteActive:this.props.data.status=="2"
        }
    }
    //�ɹ���ťonPress����
    clickCompleted(data){
        this.setState({
            completeActive:!this.state.completeActive,
            uncompleteActive:false
        });
        // alert(this.props.data.stepName);

        //�����ύ
        var postURL ='http://192.168.251.12:3000/apis/2/dms/project/track/submit.do';
        fetch(postURL,{
            method: 'POST',
            body:JSON.stringify({
                id:this.props.data.id,
                stepName:this.props.data.stepName,
                status:1
            })
        }).then((response)=>response.text()
        ).then((res)=>{

            }).catch((err)=>{
                alert(err);
            }).done();
    }
    //δ��ɰ�ťonPress����
    clickUncomplete(){
        this.setState({
            uncompleteActive:true,
            completeActive:false,
            modalVisible:!this.state.modalVisible,
            transparent:!this.state.transparent,
            opacityShow:!this.state.opacityShow
        });
        var rowData = this.props.data;
        this.props.getAlert(rowData);
        //alert(this.props.data.id)
    }
    handleChange(){
    }
    render(){
        var completeColor,
            uncompleteColor,
            completeText,
            uncompleteText;
        if(this.state.completeActive){
            completeColor = styles.completeColor;
            completeText = styles.completeText;
        }else{
            completeColor = completeText = {};
        }
        if(this.state.uncompleteActive){
            uncompleteColor = styles.uncompleteColor;
            uncompleteText  = styles.uncompleteText;
        }else{
            uncompleteColor = uncompleteText ={};
        }
        return(
            <View>
                <View style={styles.towButton}>
                    <TouchableOpacity style={[styles.completeButton,completeColor]} onPress={this.clickCompleted.bind(this)} >
                        <Text style={[completeText]}>���</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.completeButton,{left:100},uncompleteColor]} onPress={this.clickUncomplete.bind(this)} >
                        <Text style={[uncompleteText]}>δ���</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
/**********************��ʽ*********************************/
var styles = StyleSheet.create({
    bottomBun:{
        flex:1,
        height:40,
        borderWidth:0.5,
        borderColor:'#ddd',
        justifyContent:'center',
        alignItems:'center',
        width:180
    },
    reasonInputView:{
        height:500,
        margin:100,
        borderWidth:1,
        borderColor:'#DDD',
        backgroundColor:'#DDD'
    },
    reasonInput:{
        margin:8,
        flex:1,
        fontSize:14
    },
    alertTitle:{
        /* position:'relative',
         paddingTop:20,
         paddingBottom:20,
         flex:1,*/
        height:20,
        justifyContent:'center',
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'#DDD'
    },
    alertTitleText:{
        color:'#000',
        fontSize:16
    },
    reasonForm:{
        flex:1,
        position:"absolute",
        top:0,
        left:0,
        bottom:0,
        right:0,
        margin:0,
        height:Dimensions.get('window').height,
        width:Dimensions.get('window').widht,
        backgroundColor:'rgba(0,0,0,0.5)',
        justifyContent:'center',
        alignItems:'center'
    },
    showAlert:{
        margin:30,
        opacity:1,
        borderRadius:5,
        height:Dimensions.get('window').height/2.5,
        width:Dimensions.get('window').widht/1.8,
        backgroundColor:"#FFF"
    },
    acceptanceItem:{
        color:'#333',
        fontSize:14
    },
    towButton:{
        justifyContent:'space-between'
    },
    completeButton:{
        position:'absolute',
        left:0,
        top:10,
        borderRadius:15,
        borderWidth:0.5,
        borderColor:'#DDD',
        width:65,
        height:28,
        justifyContent:'center',
        alignItems:'center'
    },
    completeColor:{
        backgroundColor:'#f8b154'
    },
    completeText:{
        color:'#FFF'
    },
    uncompleteColor:{
        backgroundColor:'#a9a9a9'
    },
    uncompleteText:{
        color:'#FFF'
    },
    minTitle:{
        marginBottom:1 ,
        height:35 ,
        backgroundColor:'#efeff4',
        justifyContent:'center',
        alignItems:'center'
    },
    minTitletext:{},
    bgView:{
        flex:1,
        flexDirection:'column',
        backgroundColor:CommStyle.BQBackgroundColor
    },
    backarrowIcon:{
        width:25,
        height:25,
        resizeMode:'contain',
        flex:1,
        paddingRight:7
    },

});

