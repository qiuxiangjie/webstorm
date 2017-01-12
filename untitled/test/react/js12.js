var CheckLink = React.createClass({
    render: function() {
        // 这样会把 CheckList 所有的 props 复制到 <a>
        return <a {...this.props}> {'√ '} {this.props.children}</a>;
    }
});

React.render(
    <CheckLink href="/checked.html" className = 'f' id = 'ff' >
        Click here!
    </CheckLink>,
    document.body
);
