import React from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import PropTypes from 'prop-types'

export default class RichTextEditor extends React.Component {
    static propTypes = {
        detail: PropTypes.string
    }
    constructor(props) {
        super(props);
       this.state = {
            editorState: BraftEditor.createEditorState(this.props.detail)
        }
    }

  /*   componentDidMount () {
        假设此处从服务端获取html格式的编辑器内容
        const htmlContent =  "三玖天下第一"
        使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorState数据
        this.setState({
            editorState: BraftEditor.createEditorState(htmlContent)
        })
    }*/

   /* submitContent = async () => {
        // 在编辑器获得焦点时按下ctrl+s会执行此方法
        // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
        const htmlContent = this.state.editorState.toHTML()
        const result = await saveEditorContent(htmlContent)
    }*/
    // 一旦内容发生变化，触发的回调
    handleEditorChange = (editorState) => {
        this.setState({ editorState })
    }

    render () {

        const { editorState } = this.state

        return (
            <div style={{border:'1px solid #d9d9d9',height: 230 , borderRadius: 4}}>
                <BraftEditor
                    value={editorState}
                    onChange={this.handleEditorChange}
                />
            </div>
        )

    }

}