import request from '@/utils/request'

export const login = (data) =>{
    return request({
        method:'POST',
        url:'/app/v1_0/authorizations',
        data
    })
}
export const sendsms = mobile => {
    return request({
        method: 'GET',
        url:`/app/v1_0/sms/codes/${mobile}`
    })
}
export const getCurrentUser = () => {
    return request({
        method: 'GET',
        url:'/app/v1_0/user'
      
    })
}
export const getUserChannels = () => {
    return request({
        method:'GET',
        url:'/app/v1_0/user/channels'
    })
}