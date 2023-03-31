import { useState } from "react"
import { validate } from "../utils/validate"

/**
 * 
 * @param {*} rules 
 * @returns values, errors, register, validate
 */
export const useForm = (rules, initialValue = {}) => {
    const [values, setForm] = useState(initialValue)
    const [errors, setError] = useState({})

    const register = (name) => {
        return {
            error: errors[name],
            value: values[name] || '',
            onChange: (ev) => {
                let _values = {...values, [name]: ev.target.value}
                if(rules[name]){
                    const error = validate({
                        [name] : rules[name]
                    },_values)
                    setError(prev => ({...prev, [name]: error[name] || ''}))
                }
                setForm(prev =>({...prev, [name]: ev.target.value}))
            }
        }
    }

    const _validate = ()=>{
        const errorObject = validate(rules, values)
        setError(errorObject)
        return Object.keys(errorObject).length === 0
    }
    const reset = () =>{
        setForm({})
    }
    return{
        values,
        errors,
        register,
        validate : _validate,
        reset,
    }
}