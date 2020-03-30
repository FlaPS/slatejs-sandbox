import React from 'react'
import {Editable} from 'slate-react'
import {EditableProps} from 'slate-react/dist/components/editable'
import {renderWorkoutElement, renderWorkoutLeaf} from './elements/'

export const WorkoutEditable = (props: EditableProps) =>
    <Editable
        renderElement={renderWorkoutElement}
        renderLeaf={renderWorkoutLeaf}
        {...props}
    />
