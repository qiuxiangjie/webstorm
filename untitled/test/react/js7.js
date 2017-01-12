/**
 * Created by Z10002053 on 2016/8/11.
 */
var MyComponent = React.createClass({
    handleClick:function(){
        this.refs.test.focus()
    },
    render:function(){
        return <div>
            <input type="text" ref = 'test'/>
            <p onClick = { this.handleClick}> 点我,我让上面的表单focus</p>
        </div>
    }
});

ReactDOM.render(<MyComponent/>,document.body);


