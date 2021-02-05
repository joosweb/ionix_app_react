import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';

import Header from '../../components/Header';

export default class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            message : this.props.location.state?this.props.location.state.message: '',
        };
    }

    signIn = () => {
        const data = { email: this.email, password: this.password };
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        };

        const baseURL = process.env.REACT_APP_API

        fetch(baseURL + '/login', requestInfo)
        .then(response => {
            if(response.ok) {
                return response.json()
            }
            throw new Error("Login inválido...");
        })
        .then(token => {
            //console.log(token)
            localStorage.setItem('token', token.access_token.token);
            this.props.history.push("/clients");
            return;
        })
        .catch(e => {
            this.setState({ message: e.message });
        });
    }

    render() {
        return (

            <div className="col-md-4" >
            <div className="card" style={{padding:50}}>
                <Header title="Iniciar Sesión" />
                <hr  className="my-3"/>
                {
                    this.state.message !== ''? (
                        <Alert color="danger" className="text-center"> {this.state.message} </Alert>
                    ) : ''
                }
                <Form>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="text" id="email" onChange={e => this.email = e.target.value} placeholder="Ingrese su e-mail" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Contraseña</Label>
                        <Input type="password" id="password" onChange={e => this.password = e.target.value} placeholder="Ingrese su contraseña" />
                    </FormGroup>
                    <Button color="primary" block onClick={this.signIn}> Entrar </Button>
                </Form>
            </div>
            </div>
        );
    }
}
