/*var HelloMessage = React.createClass({
    render:function(){
        return <h1>Hello {this.props.name}</h1>;
    }
});

ReactDOM.render(
<HelloMessage name="react" />,
    document.getElementById('example'));*/

/*
var WebSite = React.createClass({
    render: function() {
        return (
            <div>
                <Name name={this.props.name} />
                <Link site={this.props.site} />
            </div>
        );
    }
});

var Name = React.createClass({
    render: function() {
        return (
            <h1>{this.props.name}</h1>
        );
    }
});

var Link = React.createClass({
    render: function() {
        return (
            <a href={this.props.site}>
                {this.props.site}
            </a>
        );
    }
});

React.render(
    <WebSite name="hello" site=" http://www.baidu.com" />,
    document.getElementById('example')
);*/
/*
var LikeButton = React.createClass({
    getInitialState: function() {
        return {liked: false};
    },
    handleClick: function(event) {
        this.setState({liked: !this.state.liked});
    },
    render: function() {
        var text = this.state.liked ? 'ϲ��' : '��ϲ��';
        return (
            <p onClick={this.handleClick}>
                ��<b>{text}</b>�ҡ������л�״̬��
            </p>
        );
    }
});

React.render(
    <LikeButton />,
    document.getElementById('example')
);*/

var Counter = React.createClass({//创建一个类
    getInitialState: function () {
        return { clickCount: 0 };
    },
    handleClick: function () {
        this.setState(function(state) {
            return {clickCount: state.clickCount + 1};
        });
    },
    render: function () {
        return (<h2 onClick={this.handleClick}>click me！counter: {this.state.clickCount}</h2>);
    }
});
ReactDOM.render(
    <Counter/>,
    document.getElementById('message')
);

ReactDOM.render(
    <Counter/>,
    document.getElementById('message2')
);