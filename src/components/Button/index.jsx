import React, { memo } from 'react'
import { LoadingOutlined } from '@ant-design/icons';
import { ButtonStyle } from './style';

export const Button = memo(({ loading, children, ...props }) => {
    console.log('button-rerender')
    return (
        <ButtonStyle {...props} disabled={loading} className={`btn main rect flex gap-3 ${props.className ?? ''}`} >
            {loading && <LoadingOutlined style={{ fontSize: 20 }} />}
            {children}
        </ButtonStyle>
    )
})
 export default Button