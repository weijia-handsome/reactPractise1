import React, { Component } from 'react'
import { message } from 'antd'

export default class indexDEMO extends Component {
    //定义构造函数
    //构造函数只是从缓存中获取数据/定义状态
    constructor() {
        super()
        //一进来就要从缓存中获取有没有token
        const str = localStorage.getItem('upload_token')

        if (str) {
            //如果是有内容的字符串,说明之前存储过token
            //这里没有必要判断token是否已经过期,只需要把从缓存中拿到的值,赋值给state就可以
            //把缓存中字符串拿到,转成对象,对象中有uploadToken,expires
            //从七牛中获取
            const res = JSON.parse(str)
            this.state = {
                expires: res.expires,
                uploadToken: res.uploadToken
            }
        } else {
            //没有内容 undefined,没有存储过
            this.state = {
                expires: 0,
                uploadToken: ''
            }
        }
    }
    //上传视频之前用
    handleBeforeUpload = (file) => {
        return new Promise(async (resolve, reject) => {
            if (file.size > MAX_VIDEO_SIZE) {
                message.error('视频太大,不能超过20M')
                reject('视频太大,不能超过20M')
                return
            }
            //在请求之前,只需要判断token是否过期
            if (Date.now() > this.state.expires) {
                //过期了就要重新获取
                const { uploadToken, expires } = await
                    reqGetQiniuToken()
                //将数据存储起来
                //state里面有最新的数据,本地缓存中也是有最新的数据
                this.saveUploadToken && this.saveUploadToken(uploadToken, expires)
            }
        })
    }
    render() {
        return (
            <div>

            </div>
        )
    }
}
