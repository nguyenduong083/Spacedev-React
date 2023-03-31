/* rules = {
    name : [
        {required:true}
    ],
    email : [
        {required:true, message :'Xin vui lòng điền email'},
        {regexp : 'email', message :'Xin vui lòng nhập đúng địa chỉ email'}
    ]
}

form ={
    name:'Nguyen Huynh Hai Duong',
    email:'haiduong@gmail.com'
}

errorObject = {
    email :'Xin vui lòng điền email'
} */
/**
 * 
 * @param {*} rules 
 * @param {*} forms 
 */

import { message } from "antd"

const REGEXP = {
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    phone: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
    url: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
    website :/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
}

const ERROR_MESSAGE ={
    required: 'Xin vui lòng điền vào',
    regexp :'Xin vui lòng nhập đúng',
    minMax: (min, max) =>  `Xin vui lòng nhập từ ${min}-${max} ký tự`,
    confirm : (field) => `Các mật khẩu đã nhập không khớp. Hãy thử lại ${field}.`
}

export const validate = (rules, forms) => {
    const errorObject = {}
    for(let name in rules){
        for(let rule of rules[name]){
            if(rule.required){
                if(typeof forms[name] === 'boolean' && !forms[name]) {

                }else if (typeof forms[name] !== 'boolean' && !forms[name]?.trim?.()) {
                    errorObject[name] = rule.message || ERROR_MESSAGE.required
                    break;
                }
            }
                // if(!forms[name]?.trim()){
                //     errorObject[name]= rule.message || ERROR_MESSAGE.required
                // }

            if(rule.regexp && forms[name]){
                let regexp = rule.regexp
                /* nếu regexp có trong REGEXP => regexp = REGEXP */
                if(regexp in REGEXP){
                    regexp = REGEXP[regexp]
                }else if(!(regexp instanceof RegExp)){
                    regexp = new RegExp()
                }
                if(!regexp.test(forms[name])){
                    errorObject[name] = rule.message || ERROR_MESSAGE.regexp
                }
            }
            // ERROR ĐĂNG KÝ  ĐỘ DÀI PASSWORD
            if(rule.min || rule.max){
                if(forms[name]?.length < rule.min || forms[name]?.length > rule.max){
                    errorObject[name] = rule.message || ERROR_MESSAGE.minMax(rule.min, rule.max)
                }
            }
            // ERROR ĐĂNG KÝ NHẬP LẠI PASSWORD
            if(rule.confirm){
                if(forms[rule.confirm] !== forms[name]){
                    errorObject[name] = rule.message || ERROR_MESSAGE.confirm(rule.confirm)
                }
            }    
        }
    }

    return errorObject
}

export const required = (message) => ({
    required:true,
    message
})

export const regexp = (pattern, message) => ({
    regexp:pattern,
    message
})

export const minMax=(min, max, message) => ({
    min , max , message
})

export const confirm = (field) => ({
    confirm: field
})