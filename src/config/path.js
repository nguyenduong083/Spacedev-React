const PROFILE_PATH = '/profile'
const COURSE_PATH = '/course'

export const PATH = {
    home: '/',
    project: '/project',
    team: '/team',
    payment: '/payment',
    signup: '/signup',
    signin: '/signin',
    contact: '/contact',
    courseRegister: '/register/:slug/:id',
    coin: '/coin',
    course: COURSE_PATH,
    courseDetail: COURSE_PATH + '/:slug/:id',
    faq: '/faq',
    resetPassword: '/reset-password',
    profile: {
        index: PROFILE_PATH,
        course: PROFILE_PATH + '/course',
        project: PROFILE_PATH + '/project',
        payment: PROFILE_PATH + '/payment',
        coin: PROFILE_PATH + '/coin',
    }
}