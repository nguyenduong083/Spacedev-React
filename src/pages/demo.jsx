import React, { createContext, useContext, useState } from 'react'
import styled from 'styled-components'
import Button from '../components/Button'

const Context = createContext({ demo: 100 })

export default function Demo() {

    const [count1, setCount1] = useState(0)
    const [count2, setCount2] = useState(100)

    return (
        <Context.Provider value={{ count: count1, setCount: setCount1, aaaaaaa: 1 }}>

            <div style={{ padding: '100px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Count />
                <Context.Provider value={{ count: count2, setCount: setCount2, bbbb: 2 }}>
                    <Count />
                </Context.Provider>
            </div>
        </Context.Provider>

    )
}


const CountStyle = styled.div`
    border: 1px solid #ccc;
    padding: 40px;
    width: 500px;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 100px;
`


export const Count = () => {
    const state = useContext(Context)
    console.log(state)
    const { count, setCount } = state
    return (
        <CountStyle>
            <Button onClick={() => setCount(count - 10)}>-10</Button>
            {count}
            <Button onClick={() => setCount(count + 10)}>+10</Button>
        </CountStyle>
    )
}

/**
 * Context API
 * 1. Những component con, cháu, chắt,... trong Provider sẽ lấy các giá trị Provider thông qua useContext
 * 2. Trong trường hợp component không đặt trong Provider đó, defaultValue khi tạo Context sẽ được return về
 * 3. Nếu component được bọc bởi nhiều Provider cùng chức năng, component sẽ lấy giá trị từ Provider gần nhất
 * 4. Thường mỗi Context sẽ làm một nhiệm vụ riêng biệt ví dụ: ThemeContext, AuthContext, PageContext,.... và 1 app được cài đặt nhiều Context
 */





// import React, { createContext, useContext, useState } from 'react'
// import styled from 'styled-components'
// import Button from '../components/Button'
// import { useDispatch, useSelector } from 'react-redux'
// import { DECREMENT_ACTION, INCREMENT_ACTION } from '@/stores/action'


// /**
//  * Local state và global state
//  * Khi nào cần sử dụng global state ?
//  * Cách khai báo global state và cách sử dụng
//  * Những lưu ý khi sử dụng Content API
//  */

// export default function Demo() {



//     return (
//         <div style={{ padding: '100px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//             <Count />
//             <Count />
//         </div>

//     )
// }


// const CountStyle = styled.div`
//     border: 1px solid #ccc;
//     padding: 40px;
//     width: 500px;
//     height: 500px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-size: 100px;
// `


// export const Count = () => {
//     const count = useSelector(store => store.count )
//     const dispatch = useDispatch()
//     // const state = useContext(Context)
//     return (
//         <CountStyle>
//             <Button onClick={() => dispatch({type: DECREMENT_ACTION})}>-1</Button>
//             {count}
//             <Button onClick={() => dispatch({type: INCREMENT_ACTION})}>+1</Button>
//         </CountStyle>
//     )
// }

// /**
//  * ueSelector: Lấy ra state từ trong store redux. selectorFn: chỉ định rõ giá trị nào cần lấy
//  * useDispatch: Lấy ra function dispatch dùng để trigger 1 action
//  * 
//  * So sánh Redux và Context API:
//  * 
//  * Context API
//  *  - Nhiều store khác nhau, lưu bất kỳ giá trị nào
//  *  - Có thể sử dụng để truyền dữ liệu giữa 1 nhóm các component, Có thể dùng để xây dựng compound component
//  * 
//  * Redux:
//  *  - Tất cả chung 1 store, quản lý bằng các reducer
//  *  - Chỉ dùng để lưu data, không lưu function
//  *  - Chỉ sử dụng để giữ global state cho toàn ứng dụng, Không dùng để xây dựng compound component (Được nhưng ko cần thiết)
//  *  
//  * 
//  */