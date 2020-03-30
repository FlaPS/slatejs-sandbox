import {Editor, Location, Node, Range, Text, Transforms} from 'slate'
import {ReactEditor} from 'slate-react'
import {LeafFormat, WorkoutLinkElement} from './types'

const isSelectionEmpty = (editor: ReactEditor) =>
    !editor.selection ||
    !ReactEditor.isFocused(editor) ||
    Range.isCollapsed(editor.selection) ||
    Editor.string(editor, editor.selection) === ''

const isFormatActive = (editor: Editor, format: LeafFormat) => {
    const [match] = Editor.nodes(editor, {
        match: n => n[format] === true,
        mode: 'all',
    })
    return !!match
}

const toggleFormat = (editor: Editor, format: LeafFormat) =>
    Transforms.setNodes(
        editor,
        { [format]: isFormatActive(editor, format) ? null : true },
        { match: Text.isText, split: true },
    )

const isLinkNode = (n: Node) =>
    n.type === 'link'

const isLinkActive = (editor: Editor, at?: Location) => {
    const [link] = Editor.nodes( editor, { match: isLinkNode, at })
    return !!link
}

const unwrapLink = (editor: Editor, at?: Location) =>
    Transforms.unwrapNodes(editor, { match: isLinkNode, at })

const wrapLink = (editor: Editor, url: string, at?: Location) => {
    if (isLinkActive(editor, at))
        unwrapLink(editor, at)

    const link: WorkoutLinkElement = {
        type: 'link',
        url,
        children: [],
    }

    Transforms.wrapNodes(editor, link, { split: true, at })
    Transforms.collapse(editor, { edge: 'end' })
}

const insertLink = (editor: Editor, url: string, location: Location | null | undefined) =>
    location && wrapLink(editor, url, location)


export default {
    ...Editor,
    isSelectionEmpty,
    isLinkActive,
    unwrapLink,
    wrapLink,
    isFormatActive,
    isLinkNode,
    toggleFormat,
    insertLink,
}
