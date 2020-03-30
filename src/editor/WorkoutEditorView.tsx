import React from 'react'
import { createEditor } from 'slate'
import { withReact, Slate } from 'slate-react'
import { Toolbar } from './toolbar/'
import {WorkoutEditable} from './WorkoutEditable'
import {withLinksEditor, WorkoutNode} from './data'

export type WorkoutEditorProps = {
  value: WorkoutNode[]
  onChange: (value: WorkoutNode[]) => void
  placeholder?: string
  autoFocus?: boolean
  spellCheck?: boolean
}

export const WorkoutEditorView = (props: WorkoutEditorProps) => {
  const {
    value,
    onChange,
    ...other
  } = props

  const editor = React.useMemo(() => withLinksEditor(withReact(createEditor())), [])

  return (
    <Slate editor={editor} value={value} onChange={onChange as any}>
      <div >
        <WorkoutEditable
          {...other}
        />
        <Toolbar />
      </div>
    </Slate>
  )
}
