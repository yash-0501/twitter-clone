import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

class Navbar extends Component{
    render(){
        return(
            <nav className="navbar navbar-expand">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src="" alt="Zwitter" srcset=""/>
                    </Link>
                </div>
                <ul className="nav navbar-nav navbar-right">
                    <li>
                        <Link to="/signup">
                            SignUp
                        </Link>
                    </li>
                    <li>
                    <Link to="/signin">
                            SignIn
                        </Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

let mapStateToProps = (state) =>{
    return{
        currentUser: state.currentUser
    }  
}

export default connect(mapStateToProps, null)(Navbar);