
var MyTitle = React.createClass({
    propTypes: {
        title: React.PropTypes.string.isRequired
    },

    render: function() {
        return <h1> {this.props.title} </h1>;
    }
});


var data = 456;

ReactDOM.render(
    <MyTitle title={data} />,
    document.body
);
