import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import { Table, Button, ButtonGroup } from 'reactstrap';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export default class Dashboard extends Component {

    constructor() {
        super();
        this.detallesUsuario = this.detallesUsuario.bind(this);
        this.state = {
            clients: [],
            user_id: 1,
            user: {},
        }
    }

    detallesUsuario(user_id) {
        const token = localStorage.getItem('token');
        const baseURL = process.env.REACT_APP_API
        fetch(baseURL + '/clients/'+ user_id, { headers: new Headers({ 'Authorization': `Bearer ${token}` })})
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error("Oops! Ocurrio un error. :(");
        })
        .then(user => {
          this.setState({ user })
          return MySwal.fire({
            title: '<strong>Detalles de Usuario</strong>',
            //icon: 'success',
            html:'<hr><table class="table" cellspacing="3"><tr><th>Nombre</th><td>' + this.state.user.username + '</td><tr><th>Email</th><td>' + this.state.user.email + '</td></tr><tr><th>Fecha de creacion</th><td>' + this.state.user.created_at + '</td><tr><th>Fecha de Actualización</th><td>' + this.state.user.updated_at + '</td></table>',
            showCloseButton: true,
            showCancelButton: false,
            focusConfirm: false,

          })
        })
        .catch(e => console.log(e));



    }

    componentDidMount() {

        const token = localStorage.getItem('token');
        const baseURL = process.env.REACT_APP_API
        fetch(baseURL + '/clients', { headers: new Headers({ 'Authorization': `Bearer ${token}` })})
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error("Oops! Ocurrio un error. :(");
        })
        .then(clients => this.setState({ clients })
        )
        .catch(e => console.log(e));
    }

    render() {


        return (
            <div className="col-md-8">
                <Header title="Clientes" />
                <hr className="my-3" />
                <div>
                <Table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nombre</th>
                      <th>Email</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.state.clients.map((user =>
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>
                      <ButtonGroup>
                        <Button onClick={()=>this.detallesUsuario(user.id)} color="primary" size="sm">Detalles</Button>

                      </ButtonGroup>
                      </td>
                    </tr>
                    ))}
                  </tbody>
                </Table>
                </div>
                <div className="text-center" style={{marginBottom: 150}}>
                    <Link to="/logout" className="btn btn-outline-primary"> Cerrar Sesión </Link>
                </div>
            </div>
        );
    }
}
