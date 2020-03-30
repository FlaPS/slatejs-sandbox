import {Element, Editor} from 'slate'

export type LeafFormat =
    | 'bold'
    | 'italic'
    | 'underlined'


export type NodeType =
    | 'link'
    | 'paragraph'


type WorkoutBaseElement = {
    children: Element['children']
}

export type WorkoutLeaf =
    & Partial<{[key in LeafFormat]: LeafFormat}>
    & {
        text: string
    }

export type WorkoutLinkElement =
    & WorkoutBaseElement
    & {
        type: NodeType
        url: string
    }

export type WorkoutParagraphElement =
    & WorkoutBaseElement
    & {
        type: NodeType
    }

export type WorkoutElement =
    | WorkoutLinkElement
    | WorkoutParagraphElement

export type WorkoutNode =
    | Editor
    | WorkoutElement
    | WorkoutLeaf

