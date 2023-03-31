import React, { useState } from 'react'
import { useAsync } from '../hooks/useAsync'
import { userService } from '../services/user'
import Button from '../components/Button'
import { useForm } from '../hooks/useForm'
import { confirm, minMax, regexp, required } from '../utils/validate'
import styled from 'styled-components'
import { message } from 'antd'
import { Input } from '../components/Input'
import { LoadingOutlined } from '@ant-design/icons'
import classNames from 'classnames'
const ErrorText = styled.p`
    color: red;
`

export default function Signup() {
    const { loading: resendEmailLoading, excute: resendEmailService } = useAsync(userService.resendEmail)
    const { excute: signupService, loading } = useAsync(userService.signup)
    const [isSignupSuccess, setIsSignupSuccess] = useState(false)
    const { values, validate, register } = useForm({
         name : [
            required('vui lòng nhập họ tên của bạn')
         ],
         password : [
            required(),
            minMax(6, 32)
         ],
         confirmPassword : [
            required(),
            confirm('password')
         ],
         username :[
            required('vui lòng nhập Email của bạn'),
            regexp('email', 'Xin vui lòng nhập đúng Email')
         ]
    })

    const onSubmit = async ()=>{
        if(validate()){
           try{
            await signupService(values)
            setIsSignupSuccess(true)
            message.success('Tạo tài khoản thành công, vui lòng kiểm tra email để kích hoạt')
            }catch(err){
                if(err?.response?.data?.message)
                message.error(err?.response?.data?.message)
            }     
        } 
    }

    const onResendEmail = async (ev) =>{
        ev.preventDefault()
        try{
            await resendEmailService({
                username: values.username
            })
            message.success('Email kích hoạt đã được gửi lại thành công')
        }catch(err){
            console.error(err)
            if(err?.response?.data?.message)
            message.error(err?.response?.data?.message)
        }
    }

    return (
        <main className="auth" id="main">
            {
                isSignupSuccess ? (
                    <div className='container wrap flex flex-col text-center gap-10'>
                        <h1 className='text-2xl font-bold'>Đăng ký tài khoản thành công</h1>
                        <p>Vui lòng kiểm tra email để kích hoạt. Nếu bạn không nhận được email, vui lòng bấm <span className='font-bold'>"Gửi lại email kích hoạt"</span> bên dưới</p>
                        <div className='flex justify-center'>
                            <a onClick={onResendEmail} href="#" className={classNames('link flex gap-2', {
                                'opacity-50 pointer-events-none': resendEmailLoading
                            })}>
                                {
                                    resendEmailLoading && <LoadingOutlined />
                                }
                                Gửi lại email kích hoạt
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="wrap">
                        <h2 className="title">Đăng ký</h2>
                        <Input {...register('username')} className="mb-5" placeholder="Tải khoản" />
                        <Input {...register('name')} className="mb-5" placeholder="Họ và tên" />
                        <Input {...register('password')} className="mb-5" type="password" placeholder="Mật khẩu" />
                        <Input {...register('confirmPassword')} className="mb-5" type="password" placeholder="Nhập lại mật khẩu" />

                        <p className="policy">
                            Bằng việc đăng kí, bạn đã đồng ý <a href="#">Điều khoản bảo mật</a> của Spacedev
                        </p>
                        <Button loading={loading} onClick={onSubmit} className="btn-login btn main rect" >
                            Đăng ký
                        </Button>
                    </div>
                )
            }
        </main>
    )
}