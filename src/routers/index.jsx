import { AuthRoute } from "../components/AuthRoute";
import { PATH } from "../config/path";
import { lazy } from "react";
import { profile } from "./profile";

const MainLayout = lazy (() => import("../layouts/MainLayout"));
const Home = lazy (() => import("../pages"));
const Coin = lazy (() => import("../pages/coin"));
const Contact = lazy (() => import("../pages/contact"));
const Course = lazy (() => import("../pages/course"));
const CourseDetail = lazy (() => import("../pages/course/[slug]"));
const FAQ = lazy (() => import("../pages/faq"));
const Payment = lazy (() => import("../pages/payment"));
const Project = lazy (() => import("../pages/project"));
const Register = lazy (() => import("../pages/register/[slug]-id[id]"));
const ResetPassword = lazy (() => import("../pages/reset-password"));
const Signin = lazy (() => import ("../pages/signin"))
const Signup = lazy (() => import("../pages/signup"));
const Team = lazy (() => import("../pages/team"));
const Page404 = lazy (() => import("../pages/404"));

export const routes = [
    {
        element: <MainLayout/>,
        children: [
            {
                element: <Home />,
                index: true
            },
            {
                element: <Contact />,
                path: PATH.contact
            },
            {
                path: PATH.course,
                children: [
                    {
                        element: <Course />,
                        index: true
                    },
                    {
                        element: <CourseDetail />,
                        path: PATH.courseDetail
                    }
                ]
            },
            {
                element: <Team />,
                path: PATH.team
            },
            {
                element: <Register />,
                path: PATH.courseRegister
            },
            {
                element: <Project />,
                path: PATH.project
            },
            {
                element: <FAQ />,
                path: PATH.faq
            },
            {
                element: <Payment />,
                path: PATH.payment
            },
            {
                element: <Coin />,
                path: PATH.coin
            },
            {
                element: <AuthRoute redirect={PATH.profile.index}  />,
                children: [
                    {
                        element: <Signin/>,
                        path: PATH.signin
                    },
                    {
                        element: <Signup />,
                        path: PATH.signup
                    },
                    {
                        element: <ResetPassword />,
                        path: PATH.resetPassword
                    }
                ]
            },
            profile(),
            {
                element: <Page404 />,
                path: '*'
            }
        ]
    }
]