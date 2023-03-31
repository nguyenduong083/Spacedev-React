import Button from '@/components/Button'
import { Input } from '@/components/Input'
import { useAsync } from '@/hooks/useAsync'
import { useAuth } from '@/components/AuthContext'
import { useForm } from '@/hooks/useForm'
import { userService } from '@/services/user'
import { handleError } from '@/utils/handleError'
import { setToken } from '@/utils/token'
import { confirm, regexp, required } from '@/utils/validate'
import { message } from 'antd'
import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function ResetPassword() {
    const [search] = useSearchParams()
    const { getProfile } =  useAuth()
    const [isSussess, setIsSussess] = useState(true)

    const {excute: sendEmailResetPasswordService, loading: sendEmailResetPasswordLoading} = useAsync(userService.sendEmailResetPassword)
    const {excute: resetPasswordByCodeService, loading: resetPasswordByCodeLoading} = useAsync(userService.resetPasswordByCode)

    const code = search.get('code')

    const resetPasswordForm = useForm({
        password:[
            required()
        ],
        confirmPassword: [
            required(),
            confirm('password')
        ]
    })
    const sendEmailForm = useForm({
        username :[
            required(),
            regexp('email')
        ]
    })

    const onSendEmail = async () =>{
        try{
            if(sendEmailForm.validate()){
                const res = await sendEmailResetPasswordService (sendEmailForm.values)
                message.success(res.message)
            }
        }catch(err){
            handleError(err)
        }
    }
    const onResetPassword = async () =>{
        try{
            if(resetPasswordForm.validate()){
                const res = await resetPasswordByCodeService ({
                    password : resetPasswordForm.values.password,
                    code
                })
                setToken(res.data)
                getProfile()
            }
        }catch(err){
            handleError(err)
        }
    }

    return (
        <main className="auth" id="main">
            {
                code ? (
                    <div className="wrap">
                        <h2 className="title">Thay đổi mật khẩu</h2>
                        <Input className="mb-5" {...resetPasswordForm.register('password')} type="password" placeholder="Mật khẩu" />
                        <Input className="mb-5" {...resetPasswordForm.register('confirmPassword')} type="password" placeholder="Nhập lại mật khẩu" />
                        <Button onClick={onResetPassword} loading={resetPasswordByCodeLoading}>Đổi mật khẩu</Button>
                    </div>
                ) : (
                    isSussess ? (
                        <div className='flex flex-col gap-10 text-center max-w-2xl m-auto pt-10 pb-10'>
                            <h1 className='text-2xl font-bold'>Gửi email lấy lại mật khẩu thành công</h1>
                            <p>Chúng tôi đã gửi cho bạn email lấy lại mật khẩu, xin vui lòng kiểm tra email</p>
                        </div>
                    ) : 
                        <div className="wrap">
                            <h2 className="title">Đặt lại mật khẩu</h2>
                            <Input className="mb-5" {...sendEmailForm.register('username')} type="text" placeholder="Email" />
                            <Button onClick={onSendEmail} loading={sendEmailResetPasswordLoading}>Tiếp theo</Button>
                        </div>
                )
            }
            {/* <div className="wrap">
                <h2 className="title">Nhập mã code</h2>
                <p style={{ marginBottom: '15px' }}>Vui lòng nhập mã code nhận được từ email</p>
                <input type="text" placeholder="Code" />
                <p style={{ marginBottom: '15px' }}>Nếu chưa nhận được email nào, vui lòng bấm nút <a className="link" href="#">Gửi lại</a> trong 20 giây</p>
                <div className="btn rect main btn-next">Xác nhận</div>
            </div> */}
        </main>
    )
}