import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import { routes } from './routers'
import './assets/css/taildwin.css' 
import './assets/css/custom.css'

function App() {
  // {
  //   const [user, setUser] = useState(()=>{
  //     try{
  //         return JSON.parse(localStorage.getItem('user'))
  //     }catch(err){
  //       return null
  //     }
  //   })
  //   useEffect(() => {
  //     localStorage.setItem('user', JSON.stringify(user))
  //   },[user])

  //   const login = () =>{
  //     setUser({
  //       name:"Dang Thuyen Vuong",
  //       avatar : "/img/avt.png",
  //     })
  //   }

  //   const logout = () => {
  //     setUser()
  //   }
  // }
  

  const element = useRoutes(routes)
  return (
    <Suspense fallback={ <div>Loading...</div> }>
      {element}
    </Suspense>
  )
}
export default App
