/*
 * @Author: wyatt 
 * @Date: 2018-07-12 16:10:58 
 * @Last Modified by: wyatt
 * @Last Modified time: 2018-07-12 21:35:40
 */

import React from 'react'
import FileUpload from './fileupload.jsx'
export default class FileUploader extends React.Component{
    constructor(props){
        super(props);
        this.state={
            categoryId: 0,
            parentCategoryId: 0
        }
    }
    render(){
        /*set properties*/
        const options={
            baseUrl:'/manage/product/upload.do',
            fileFieldName: 'upload_file',
            chooseAndUpload: true,
            dataType: 'json',
            uploadSuccess: (res) => {this.props.onSuccess(res.data)},
            uploadError: (err) => {this.props.onError(err.message || '上传图片出错啦')},
        }
        
        return (
            <FileUpload options={options}>
                <button className="btn btn-defalut" ref="chooseAndUpload">选择图片</button>
            </FileUpload>
        )	        
    }
}