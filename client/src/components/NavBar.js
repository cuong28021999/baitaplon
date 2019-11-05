import React, { Component } from 'react'
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    Button,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap'

import { LoginContext } from '../contexts/Login'
import Cookies from 'js-cookie'

import { Link } from 'react-router-dom'

class NavBar extends Component {
    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="md">
                    <NavbarBrand href="/">Testawesome</NavbarBrand>
                    <Nav navbar>
                        <NavItem>
                            <Link 
                                to="/"
                                className="nav-link"
                            >Home</Link>
                        </NavItem>
                        <NavItem>
                            <Link 
                                to="/about"
                                className="nav-link"
                            >About</Link>
                        </NavItem>
                        <NavItem>
                            <Link 
                                to="/class"
                                className="nav-link"
                            >Classes</Link>
                        </NavItem>
                    </Nav>
                    <Nav className="ml-auto" navbar>
                        <LoginContext.Consumer>
                            {
                                ({ isLogin, handleEmail, handlePassword, onSubmitLogin, onSignOut }) => {
                                    if (!isLogin) return (
                                        <form
                                            onSubmit={onSubmitLogin}
                                            method="post"
                                            className="form-inline"
                                        >
                                            <input
                                                type="text"
                                                name="email"
                                                placeholder="Email"
                                                className="form-control bg-dark text-light border-primary"
                                                onChange={handleEmail}
                                                required
                                            />
                                            <input
                                                type="password"
                                                name="password"
                                                placeholder="Password"
                                                className="form-control bg-dark text-light border-primary ml-2"
                                                onChange={handlePassword}
                                                required
                                            />
                                            <input
                                                type="submit"
                                                name="submit"
                                                value="Login"
                                                className="btn btn-primary ml-2"
                                            />
                                        </form>
                                    )
                                    else return (
                                        <UncontrolledDropdown nav inNavbar>
                                            <DropdownToggle nav caret>
                                                {Cookies.get('username')}
                                            </DropdownToggle>
                                            <DropdownMenu right>
                                                <DropdownItem>
                                                    Info
                                                </DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem className="bg-danger text-light" onClick={onSignOut}>
                                                    Sign out
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    )
                                }
                            }
                        </LoginContext.Consumer>
                        <Button href="/register" color="danger" className="ml-2">Register</Button>{' '}
                    </Nav>
                </Navbar>
            </div>
        );
    }
}

export default NavBar;