import { message } from 'antd'
import { createContext, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { authService } from '../../services/auth'
import { userService } from '../../services/user'
import { clearToken, clearUser, getUser, setToken, setUser } from '../../utils/token'
import { PATH } from '../../config/path'


const AuthContext = createContext({})

export const AuthProvider = ({children}) =>{
    const navigate = useNavigate()
    const { state } = useLocation()
    const [user, _setUser] = useState(getUser)
    useEffect(() => {
        setUser(user || null)
    }, [user])
    const login = async (data) =>{
        try{
            const res = await authService.login(data)
            if(res.data){
                setToken(res.data)
                await getProfile()
            }
        }catch(err){
            console.error(err)
            if(err?.response?.data?.message){
                message.error(err.response.data.message)
            }
        }
    }

    const getProfile = async ()=>{
        const user = await userService.getProfile()
        _setUser(user.data)
        message.success('Đăng nhập tài khoản thành công')

        if(state?.redirect){
            navigate(state?.redirect)
        }else{
            navigate(PATH.profile.index)
        }
    }

    const logout =() =>{
        clearToken()
        clearUser()
        _setUser(null)
        message.success('Đăng xuất tài khoản thành công')
    }
    

    return <AuthContext.Provider value={{user, login, logout, setUser: _setUser, getProfile}}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
