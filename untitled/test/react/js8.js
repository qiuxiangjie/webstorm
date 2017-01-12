/**
 * Created by Z10002053 on 2016/8/11.
 */
var MyComponent = React.createClass({
   getInitialState:function(){
       return{
           like:false
       }
   },
    handleClick:function(){
        this.setState({
            like:!this.state.like
        })
    },
   render:function(){
       var statName = this.state.like?'like':'dot like';

       return <div>
           <p>I {statName} you</p>
           <p onClick = {this.handleClick}>click me</p>
       </div>
   }
});

ReactDOM.render(<MyComponent/>,document.body);