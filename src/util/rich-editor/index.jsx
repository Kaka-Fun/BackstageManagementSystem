/*
 * @Author: wyatt 
 * @Date: 2018-07-12 22:33:40 
 * @Last Modified by: wyatt
 * @Last Modified time: 2018-07-16 15:18:58
 */


import React from 'react'
import Simditor from 'simditor'
import 'simditor/styles/simditor.scss'
import './index.scss'
export default class RichEditor extends React.Component{
    constructor(props){
        super(props);
        this.state={
            
        }
    }
    componentDidMount(){
        this.loadEditor()
    }
    loadEditor(){
        let element = this.refs['textarea']
        this.simditor = new Simditor({
            textarea: $(element),
            defaultValue: this.props.placeholder || '请输入内容',
            upload:{
                url: '/manage/product/richtext_img_upload.do',
                defaultImage: '',
                fileKey: 'upload_file'
            }
        })
        this.bindEditorEvent()
    }
    componentWillReceiveProps(nextProps){
        let detailChange = this.props.defaultDetail !== nextProps.defaultDetail
        if (!detailChange) {
            return
        }
        this.simditor.setValue(nextProps.defaultDetail)
    }
    // 初始化富文本编辑器事件
    bindEditorEvent(){
        this.simditor.on('valuechanged', (e)=>{
            this.props.onValueChange(this.simditor.getValue())
        })
    }
    render(){
        return(
            <div className="rich-editor">
                <textarea ref="textarea"></textarea>
            </div>
        )
    }
}