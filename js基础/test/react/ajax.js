/**
 * Created by Z10002053 on 2016/5/18.
 */
var UserGist = React.createClass({
    getInitialState: function() {
        return {
            username: '',
            lastGistUrl: ''
        };
    },

    componentDidMount: function() {
        this.serverRequest = $.get(this.props.source, function (result) {
            var lastGist = result[0];
            this.setState({
                username: lastGist.owner.login,
                lastGistUrl: lastGist.html_url
            });
        }.bind(this));
    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    render: function() {
        return (
            <div>
                {this.state.username} 用户最新的 Gist 共享地址：
                <a href={this.state.lastGistUrl}>{this.state.lastGistUrl}</a>
            </div>
        );
    }
});

ReactDOM.render(
    <UserGist source="https://api.github.com/users/octocat/gists" />,
    document.getElementById('example')
);