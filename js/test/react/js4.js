
    var NotesList = React.createClass({
        render: function() {
            return (
                <ol>
                    {
                        React.Children.map(this.props.children, function (child) {
                            return <li>{child}2<span>4</span></li>;
                        })
                    }
                </ol>
            );
        }
    });

ReactDOM.render(
    <NotesList>
    <span>hello</span>
    <span>world</span>
    </NotesList>,
    document.body
);
