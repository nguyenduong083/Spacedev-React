import React, { memo } from 'react'
import { ErrorP } from './style'

function Field({label,error, required, type ='text',renderInput,...props}){
  console.log('rerender', props.value)
  return (
    <label className='relative'>
        <p>{label}{required && <span>*</span>}</p>
        {
            renderInput ? renderInput?.(props) : <input {...props} type={type} />
        }
        {error && <ErrorP>{error}</ErrorP>}
    </label>
  )
}
export default memo(Field, (oldProps, newProps) => {
  return oldProps.value === newProps.value && oldProps.error === newProps.error
})
