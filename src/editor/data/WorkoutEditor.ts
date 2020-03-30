import {Editor, Location, Range, Text, Transforms} from 'slate'
import {LeafFormat} from './types'
import {ReactEditor} from 'slate-react'

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

const unwrapLink = (editor: Editor, selection?: Location) =>
    Transforms.unwrapNodes(editor,
        {
            match: n => n.type === 'link',
            at: selection,
        }
    )

const wrapLink = (editor: Editor, url: string, selection?: Location) => {
    if (isLinkActive(editor, selection))
        unwrapLink(editor, selection)

    const link = {
        type: 'link',
        url,
        children: [],
    }

    Transforms.wrapNodes(editor, link,
        {
            split: true,
            at: selection,
        }
    )
    Transforms.collapse(editor, { edge: 'end' })
}

const insertLink = (editor: Editor, url: string, location: Location | null | undefined) =>
    location && wrapLink(editor, url, location)

const isLinkActive = (editor: Editor, selection?: Location) => {
    const [link] = Editor.nodes(
        editor,
        {
            match: n => n.type === 'link',
            at: selection,
        }
    )
    return !!link
}

const isSelectionEmpty = (editor: ReactEditor) =>
    !editor.selection ||
    !ReactEditor.isFocused(editor) ||
    Range.isCollapsed(editor.selection) ||
    Editor.string(editor, editor.selection) === ''

export default {
    ...Editor,
    isSelectionEmpty,
    isLinkActive,
    unwrapLink,
    wrapLink,
    isFormatActive,
    toggleFormat,
    insertLink,
}
