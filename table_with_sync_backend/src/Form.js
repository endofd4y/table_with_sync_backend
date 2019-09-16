import React, { Component } from 'react';

class Form extends Component {
    render () {
        return (
            <div>
          <form on>
              <input type="text" name="_id" placeholder="_id" />
          </form> 
          
        <button onClick={this.showTable}>View</button>
        {this.state.show &&
        <div>
        <form on>
            <input type="text" name="_id" placeholder="_id" />
        </form>  
        </div>}
       
          </div>
        );
    }
}



export default Form;