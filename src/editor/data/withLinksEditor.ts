import { ReactEditor } from 'slate-react'
import isUrl from 'is-url'
import WorkoutEditor from './WorkoutEditor'

export default (editor: ReactEditor) => {

    const { isInline, insertText, insertData } = editor

    editor.isInline = element => {
        return element.type === 'link'
            ? true
            : isInline(element)
    }

    editor.insertText = text => {
        if (text && isUrl(text)) {
            WorkoutEditor.wrapLink(editor, text)
        } else {
            insertText(text)
        }
    }

    editor.insertData = data => {
        const text: string = data.getData('text/plain');

        (text && isUrl(text))
            ? WorkoutEditor.wrapLink(editor, text)
            : insertData(data)

    }

    return editor
}
