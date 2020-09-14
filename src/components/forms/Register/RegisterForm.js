import React, {Component} from 'react';
import {Link} from "react-router-dom"
import {getAllStoreCategory} from "../../../apis/Categories/CategoriesApi";
import Swal from "sweetalert2";
import imageLoader from "../../../assets/img/loader2.gif";
import {storeRegister} from "../../../apis/Auth/AuthApis";
import {createBrowserHistory} from "history";

class RegisterForm extends Component {
    state = {
        registerData: [],
        storeCategory: [],
        isLoaded: false
    }

    registerAccount = () => {
        const data = this.state.registerData
        const history = createBrowserHistory()
        storeRegister(data)
            .then(() => {
                Swal.fire("Good job!", "Register Succesfull", "success").then(()=>{
                    history.push('/login')
                    history.go(0)
                })
            }).catch(() => {
            Swal.fire("Oops", "Something when wrong", "error");
        })
    }

    getAllSoreCategory = () => {
        getAllStoreCategory()
            .then((res) => {

                this.setState({
                    isLoaded: true,
                    storeCategory: res,
                });
            })
            .catch(() => {
                Swal.fire("Oops", "Connection Timeout !!!", "error")
            });
    };

    handleChangeInput = (e) => {
        const name = e.target.name;
        const value = e.target.value
        this.setState(prevState => ({
            registerData: {
                ...prevState.registerData,
                [name]: [value]
            }
        }))
    }


    handleCategoriesChange = (e) => {
        const val = e.target.value
        this.setState(prevState => ({
            registerData: {
                ...prevState.registerData,
                storeCategoryId: [val]

            }
        }))
    }

    componentDidMount() {
        this.getAllSoreCategory()
    }


    render() {
        const {go} = this.props
        const data = this.state.registerData
        return (
            <div>
                <h5 className="card-title text-center">Register Store</h5>
                {this.state.isLoaded ?
                    <div className="form-signin">
                        <div className="row">
                            <div className="col-8">
                                <div className="form-label-group">
                                    <input type="text" id="storeName" name="storeName" className="form-control"
                                           placeholder="Store Name"
                                           required
                                           value={data.storeName}
                                           onChange={(e) => this.handleChangeInput(e)}/>
                                    <label htmlFor="storeName">Store Name</label>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="form-label-group">
                                    <select name="storeCategoryID" onChange={(e) => this.handleCategoriesChange(e)}
                                            className="custom-select" style={{borderRadius: "10rem", height: "3rem"}}>
                                        <option selected>Select Category</option>
                                        {this.state.storeCategory.map((storeCategory) =>
                                            <option
                                                value={storeCategory.storeCategoryID}>{storeCategory.storeCategoryName}</option>
                                        )}
                                    </select>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-label-group">
                                    <input type="text" id="storeOwner" name="storeOwner" className="form-control"
                                           placeholder="Store Owner"
                                           required
                                           value={data.storeOwner}
                                           onChange={(e) => this.handleChangeInput(e)}/>
                                    <label htmlFor="storeOwner">Store Owner</label>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-label-group">
                                    <input type="text" id="storeUsername" name="storeUsername" className="form-control"
                                           placeholder="storeUsername"
                                           required
                                           value={data.storeUsername}
                                           onChange={(e) => this.handleChangeInput(e)}/>
                                    <label htmlFor="storeUsername">Store Username</label>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-label-group">
                                    <input type="password" id="storePassword" name="storePassword"
                                           className="form-control" placeholder="Store Password"
                                           required
                                           value={data.storePassword}
                                           onChange={(e) => this.handleChangeInput(e)}/>
                                    <label htmlFor="storePassword">Store Password</label>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-label-group">
                                <textarea style={{borderRadius: "1rem"}} name="storeAddress" id="storeAddress"
                                          className="form-control" placeholder="Store Address"
                                          value={data.storeAddress}
                                          required/>

                                </div>
                            </div>
                        </div>
                        <hr/>
                        <button className="btn btn-lg btn-warning btn-block text-uppercase" onClick={() => {
                            this.registerAccount()
                        }} name="submit" id="submit" type="submit">Register
                        </button>
                        <Link className="d-block text-center mt-2 small" to={go}>Have an account ? Login here</Link>
                    </div>
                    : <div className="text-center">
                        <img width="150px" src={imageLoader} alt="loading"/>
                        <p>loading...</p>
                    </div>
                }

            </div>
        );
    }
}

export default RegisterForm;