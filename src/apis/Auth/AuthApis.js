import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
import {cleanCookies} from "universal-cookie/cjs/utils";

const cookies = new Cookies();
export const authToken = localStorage.getItem('utoken')
export const bToken = cookies.get('btoken')

export const AuthApis = async (user, password) => {
    const userData = {
        username: user,
        password:password
    }
    let result = await axios.post(`/user/login`,  userData )
    return result.data
}

export const StoreLogin = async (user, password) => {
    const userData = {
        storeUsername: user,
        storePassword: password
    }
    let result = await axios.post(`/store/login`,  userData )
    return result.data
}

export const storeRegister = async (data) => {
    let res = await axios.post('/store/register',{
        storeName : data.storeName.toString(),
        storeAddress : data.storeAddress,
        storeOwner : data.storeOwner.toString(),
        storeUsername : data.storeUsername.toString(),
        storePassword : data.storePassword.toString(),
        storeCategory : {
            storeCategoryID:data.storeCategoryId.toString()
        }
    })
    return res.data
}

export const isLogin = (history) => {
    if (localStorage.getItem('utoken') !== null) {
        if (localStorage.getItem('utoken') === cookies.get('btoken')) {
            history.push("/");
        }else {
            localStorage.clear()
            sessionStorage.clear()
            cleanCookies()
            Swal.fire("Oops", "You need login first", "error");
            history.push('/login');
        }
    } else {
        if (window.location.pathname !== '/login' && window.location.pathname !== '/register' && window.location.pathname !== '/devmas') {
            Swal.fire("Oops", "You need login first", "error");
            history.push('/login');
        }
        else {
            localStorage.clear()
            sessionStorage.clear()
            cleanCookies()
        }
    }
}
