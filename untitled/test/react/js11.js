/*

var UserGist = React.createClass({
    getInitialState: function() {
        return {
            username: '',
            lastGistUrl: ''
        };
    },

    componentDidMount: function() {
        $.get(this.props.source, function(result) {
            var lastGist = result[0];
            if (this.isMounted()) {
                this.setState({
                    username: lastGist.owner.login,
                    lastGistUrl: lastGist.html_url
                });
            }
        }.bind(this));
    },

    render: function() {
        return (
            <div>
                {this.state.username}'s last gist is
                <a href={this.state.lastGistUrl}>here</a>.
            </div>
        );
    }
});

ReactDOM.render(
    <UserGist source="https://api.github.com/users/octocat/gists" />,
    document.body
);
*/



var RepoList = React.createClass({
    getInitialState: function() {
        return {
            loading: true,
            error: null,
            data: null
        };
    },

    componentDidMount() {
        this.props.promise.then(
                value => this.setState({loading: false, data: value}),
                error => this.setState({loading: false, error: error})
        );
    },

    render: function() {
        if (this.state.loading) {
            return <span>Loading...</span>;
        }
        else if (this.state.error !== null) {
            return <span>Error: {this.state.error.message}</span>;
        }
        else {
            var repos = this.state.data.items;

            var repoList = repos.map(function (repo) {
                return (
                    <li>
                        <a href={repo.html_url}>{repo.name}</a> ({repo.stargazers_count} stars) <br/> {repo.description}
                    </li>
                );
            });
            return (
                <main>
                    <h1>Most Popular JavaScript Projects in Github</h1>
                    <ol>{repoList}</ol>
                </main>
            );
        }
    }
});


ReactDOM.render(
    <RepoList
        promise={$.getJSON('https://api.github.com/search/repositories?q=javascript&sort=stars')}
        />,
    document.body
);
