/**
 * Created by Z10002053 on 2016/5/19.
 */
var Content = React.createClass({
    render: function() {
        return  <div>
            <input type="text" value={this.props.myDataProp} onChange={this.props.updateStateProp} />
            <h4>{this.props.myDataProp}</h4>
        </div>;
    }
});
var HelloMessage = React.createClass({
    getInitialState: function() {
        return {value: 'Hello Runoob!'};
    },
    handleChange: function(event) {
        //this.setState({value: event.target.value});
        alert(event.target.value)
    },
    render: function() {
        var value = this.state.value;
        return <div>
            <Content myDataProp = {value}
                     updateStateProp = {this.handleChange}></Content>
        </div>;
    }
});
ReactDOM.render(
    <HelloMessage />,
    document.getElementById('example')
);
