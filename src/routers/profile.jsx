import { lazy } from "react";
import { PrivateRoute } from "../components/PrivateRoute";
import { PATH } from "../config/path";

const ProfileLayout = lazy (() => import ( "../layouts/ProfileLayout"));
const MyCoin = lazy (() => import ( "../pages/profile/coin"));
const MyCourse = lazy (() => import ( "../pages/profile/course"));
const MyPayment = lazy (() => import ( "../pages/profile/payment"));
const Profile = lazy (() => import ( "../pages/profile/profile"));
const MyProject = lazy (() => import ( "../pages/profile/project"));

export const profile = () => {
    return  {
        element: <PrivateRoute redirect={PATH.signin}/>,
        children: [
            {
                element: <ProfileLayout/>,
                path: PATH.profile.index,
                children: [
                    {
                        element: <Profile />,
                        index: true
                    },
                    {
                        element: <MyCourse />,
                        path: PATH.profile.course
                    },
                    {
                        element: <MyCoin />,
                        path: PATH.profile.coin
                    },
                    {
                        element: <MyProject />,
                        path: PATH.profile.project
                    },
                    {
                        element: <MyPayment />,
                        path: PATH.profile.payment
                    }
                ]
            }
        ]
    }
}