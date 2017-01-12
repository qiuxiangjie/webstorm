/*
var LikeButton = React.createClass({
    getInitialState: function() {
        return {liked: false};
    },

    handleClick: function(event) {
        this.setState({liked: !this.state.liked});
    },

    render: function() {
        var text = this.state.liked ? 'yes' : 'no';
        return (
            <p onClick={this.handleClick}>
                你<b>{text}</b>我。点我切换状态。
            </p>
        );
    }
});

React.render(
    <LikeButton />,
    document.getElementById('example')
);*/
var Hello = React.createClass({
    getInitialState: function () {
        return {
            opacity: 1.0
        };
    },

    componentDidMount: function () {
        var opacity = this.state.opacity;
        this.timer = setInterval(function () {
            opacity -= .05;
            if (opacity < 0.1) {
                opacity = 1.0;
            }
            this.setState({
                opacity: opacity
            });
        }.bind(this), 100);
    },

    render: function () {
        return (
            <div style={{opacity: this.state.opacity}}>
                Hello {this.props.name}
                <Hello1/>
            </div>
        );
    }
});

var Hello1 = React.createClass({
    getInitialState: function () {
        return {
            opacity: 1.0
        };
    },
    componentWillReceiveProps: function (nextProps) {
        console.log('子组件状态有变化了000');
        console.log(JSON.stringify(nextProps))
    },
    render: function () {
        console.log('123123');
       return (
         <div>
             123456

         </div>
       )
    }
});

ReactDOM.render(
    <Hello name="world"/>,
    document.body
);