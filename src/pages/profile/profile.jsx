import { useAuth } from '@/components/AuthContext'
import Button from '@/components/Button'
import Field from '@/components/Field'
import { useAsync } from '@/hooks/useAsync'
import { useForm } from '@/hooks/useForm'
import { userService } from '@/services/user'
import { handleError } from '@/utils/handleError'
import { regexp, required } from '@/utils/validate'
import { message } from 'antd'
import React from 'react'

export default function Profile() {
    const {user, setUser}= useAuth()
    const {loading, excute: updateInfoService} = useAsync(userService.updateInfo)
    const { register, values, validate } = useForm({
        name : [
            required()
        ],
        phone :[
            required(),
            regexp('phone')
        ],
        fb :[
            required(),
            regexp('url')
        ]
    },user)
    const onSubmit = async () => {
        try {
            if(validate()) {
                const res = await updateInfoService(values)
                const user = await userService.updateInfo()
                setUser(user.data)
                message.success('Bạn đã cập nhật thông tin tài khoản thành công')
            }
        } catch (err) {
            handleError(err)
        }
    }
    return (
        <div className="tab1">
            <Field {...register('name')} placeholder="Nguyễn Văn A" label="Họ và tên" required/>
            <Field {...register('phone')} placeholder="0949******" label="Số điện thoại" required/>
            <Field {...register('username')} disabled label="Email"/>
            <Field {...register('fb')} placeholder="Facebook url" label="Facebook"/>
            <Button loading={loading} onClick={onSubmit} >LƯU LẠI</Button>
        </div>
    )
}