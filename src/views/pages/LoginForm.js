import React from 'react';
import TextFieldGroup from './TextFieldGroup';
import validateInput from '../../redux/actions/auth/login';
import { connect } from 'react-redux';
import { login } from '../../redux/actions/auth/authActions';
import PropTypes from "prop-types";
var CryptoJS = require("crypto-js");

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: {},
            isLoading: false,
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    isValid() {
        const { errors, isValid } = validateInput(this.state);

        if (!isValid) {
            this.setState({ errors });
        }

        return isValid;
    }
    onSubmit(e) {
        e.preventDefault();
        let EncUserName = CryptoJS.AES.encrypt(this.state.username, 'secret').toString();
        let EncUserPass = CryptoJS.AES.encrypt(this.state.password, 'secret').toString();
        let UserData = {
            username: EncUserName,
            password: EncUserPass
        }
        if (this.isValid()) {
            this.setState({ errors: {}, isLoading: true });

            this.props.login(UserData)
                .then(
                    (res) => {
                        if (res.roleId === '1') {
                            this.context.router.history.push('/auctions/viewAuctionPage')
                        }
                        else if (res.roleId === '2') {
                            this.context.router.history.push('/auctions/viewAuctionPage')
                        }
                        else if (res.roleId === '3') {
                            this.context.router.history.push('/customers')
                        }
                    },


                    (err) =>
                        this.setState({ errors: err.response.data, isLoading: false })
                );
        }
    }

    onChange(e) {

        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { errors, username, password, isLoading } = this.state;
        return (
            <form onSubmit={this.onSubmit} required>


                <TextFieldGroup
                    field="username"
                    value={username}
                    placeholder="Email Id"
                    error={errors.username}
                    onChange={this.onChange}
                />

                <TextFieldGroup
                    field="password"
                    value={password}
                    placeholder="Password"
                    error={errors.password}
                    onChange={this.onChange}
                    type="password"
                />

                {<div className="login_error">{errors.message}</div>}

                <div className="form-group1"><button className="btn btn-danger" disabled={isLoading}>Login</button></div>
            </form>
        );
    }
}

LoginForm.propTypes = {
    login: PropTypes.func.isRequired
}

LoginForm.contextTypes = {
    router: PropTypes.object.isRequired
}

export default connect(null, { login })(LoginForm);