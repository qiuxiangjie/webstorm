var MyTitle = React.createClass({
    getDefaultProps:function () {
        return{
            title:"hello world!"
        }
    },
    render:function(){
        return (
            <h1>{this.props.title}</h1>
        )
    }
});

ReactDOM.render(<MyTitle title='123'/>,document.body);