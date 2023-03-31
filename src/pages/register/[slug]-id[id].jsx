import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import Field from '../../components/Field'
import { useForm } from '../../hooks/useForm'
import { regexp, required, validate } from '../../utils/validate'
import { courseService } from '../../services/course'
import { currency } from '../../utils/currency'
import { useFetch } from '../../hooks/useFetch'
import Page404 from '../404'
import { Select } from '@/components/Select'
import Checkbox from '@/components/Checkbox'
import { useAuth } from '@/components/AuthContext'
import { message } from 'antd'
import { PATH } from '@/config/path'
import { useAsync } from '@/hooks/useAsync'
import Button from '@/components/Button'
import { handleError } from '@/utils/handleError'

const Success = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    margin: 40px auto;
`
export default function Register() {
    const { id } = useParams()

    const { data, loading } = useFetch(() => courseService.getCourseDetail(id))

    const { loading: registerLoading, excute: courseRegisterService } = useAsync(courseService.register)

    const { pathname } = useLocation()
    const navigate = useNavigate()
    const { user } = useAuth()
    /* const [detail, setDetail] = useState(()=>{
        return courseService.getCourseDetail(parseInt(id))
    }) */
    useEffect(() => {
        if (!user) {
            message.warning('Vui lòng đăng nhập trước khi đăng ký khóa học')
            navigate(PATH.signin, { state: { redirect: pathname } })
        }
    }, [user])

    const { validate, register, values } = useForm({
        name: [
            required('vui lòng nhập họ tên của bạn')
        ],
        email: [
            required('vui lòng nhập Email của bạn'),
            regexp('email', 'Xin vui lòng nhập đúng Email')
        ],
        phone: [
            required('vui lòng nhập số điện thoại của bạn'),
            regexp('phone', 'Xin vui lòng nhập đúng số điện thoại')
        ],
        fb: [
            required('vui lòng nhập địa chỉ facebook của bạn'),
            regexp(/(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/,
                'Xin vui lòng nhập đúng địa chỉ facebook')
        ],
        payment: [
            required()
        ],
    }, {
        email: user.username,
        phone: user.phone,
        name: user.name,
        fb: user.fb
    })

    const [isSuccess, setIsSuccess] = useState(false)

    const onSubmit = async (ev) => {
        try {
            ev.preventDefault()
            if (validate()) {
                await courseRegisterService(id, values)
                setIsSuccess(true)
            } else {
                console.log('validate error')
            }
        } catch (err) {
            handleError(err)
        }
    }
    let { data: detail } = { data }
    if (loading) return null
    if (!detail) return <Page404/>

    return (
        <main className="register-course" id="main">
            {
                isSuccess ? (
                    <Success>
                        <div className="contain max-w-2xl mt-20" style={{ maxWidth: '42rem' }}>
                            <div className="main-title">đăng ký thành công</div>
                            <p className='text-xl mw' style={{ textAlign: 'center', maxWidth: '490px' }} >
                                Chào mừng <strong>{values.name}</strong> đã trở thành thành viên mới của Spacede   Team. <br />
                                <br />
                                Bây giờ bạn có thể vào <strong>spacedev</strong> để tiến hành học các khóa học onlin   của bạn.
                            </p>
                            <Link to={PATH.profile.course} className="btn main rect" style={{ width: '100%', marginTop: '20px' }}>về trang chủ</Link>
                        </div>
                    </Success>
                ) : (
                    <section>
                        <div className="container">
                            <div className="wrap container">
                                <div className="main-sub-title">ĐĂNG KÝ</div>
                                <h1 className="main-title">{detail.title}</h1>
                                <div className="main-info">
                                    <div className="date"><strong>Khai giảng:</strong> 15/11/2020</div>
                                    <div className="time"><strong>Thời lượng:</strong> 18 buổi</div>
                                    <div className="time"><strong>Học phí:</strong>{currency(detail.money)} VND</div>
                                </div>
                                <div className="form">
                                    <Field label="Họ và tên" required placeholder="Họ và tên bạn" {...register('name')} />
                                    <Field label="Số điện thoại" required placeholder="Số điện thoại" {...register('phone')} />
                                    <Field label="Email" disabled required placeholder="Email của bạn" {...register('email')} />
                                    <Field label="URL Facebook" placeholder="URL Facebook" {...register('fb')} />
                                    <Field label="Ý kiến cá nhân" placeholder="Mong muốn cá nhân và lịch bạn có thể học." renderInput={(props) => <textarea cols={30} rows={10} {...props} />} {...register('content')} />
                                    <Field
                                        {...register('coin')}
                                        label="Sử dụng COIN"
                                        renderInput={(props) => (
                                            <Checkbox {...props}>
                                                Hiện có <strong>300 COIN</strong>

                                            </Checkbox>
                                        )}
                                    />
                                    <Field
                                        label="Hình thức thanh toán"
                                        renderInput={(props) => (
                                            <Select
                                                {...register('payment')}
                                                placholder="Hình thức thanh toán"
                                                options={[
                                                    { value: 'chuyen-khoang', label: 'Chuyển Khoản' },
                                                    { value: 'thanh-toan-tien-mat', label: 'Thanh toán tiền mặt' },
                                                ]}
                                                {...props}
                                            />
                                        )}
                                    />
                                    <Button loading={registerLoading} onClick={onSubmit} className="btn main rect">đăng ký</Button>
                                </div>
                            </div>
                        </div>
                    </section>
                )
            }
        </main>
    )
}
