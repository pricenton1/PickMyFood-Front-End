import React, {Component} from 'react';
import Pagination from "../../../components/Pagination/Pagination";
import UserSearch from "../../../variables/admin/UserSearch";
import AllUserData from "../../../variables/admin/AllUserData";
import {connect} from "react-redux";
import Swal from "sweetalert2";
import {getAllUsers} from "../../../apis/Admin/AdminUser";
import imageLoader from "../../../assets/img/loader2.gif";

class UserManagement extends Component {

    state = {
        isLoaded: false
    }

    getAllUsersData = () => {
        getAllUsers()
            .then((res) => {
                this.props.UserListData(res)
                this.setState({
                    isLoaded: true,
                });
            })
            .catch(() => {
                Swal.fire("Oops", "Connection Timeout !!!", "error")
            });
    };


    componentDidMount() {
        this.getAllUsersData()
    }

    render() {

        const allUser = this.props.allUsersData

        return (
            <>

                <div className="card">
                    {this.state.isLoaded ?
                        <>
                            <div className="card-body">
                                <UserSearch/>
                                <hr/>
                                <AllUserData data={allUser}/>
                            </div>
                            <div className="card-footer">
                                <Pagination/>
                            </div>
                        </>
                        : <div className="text-center">
                            <img width="150px" src={imageLoader} alt="loading"/>
                            <p>loading...</p>
                        </div>}
                </div>
            </>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        allUsersData: state.fetchReducer.FetchAction.allUserData

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        UserListData: (data) => {
            dispatch({
                type: 'GETALLUSERS',
                JsonData: data
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);