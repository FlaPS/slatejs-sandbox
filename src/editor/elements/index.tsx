import React from 'react'
import {RenderElementProps, RenderLeafProps} from 'slate-react'
import LinkElementView from './LinkElementView'
import DefaultElementView from './DefaultElementView'
import LeafView from './LeafView'
import {WorkoutEditor} from '../data'

export const renderWorkoutElement = ({ children, element }: RenderElementProps) =>
    WorkoutEditor.isLinkNode(element)
        ?   <LinkElementView href={element.url}>
                        {children}
            </LinkElementView>
        :   <DefaultElementView>
                        {children}
            </DefaultElementView>


export const renderWorkoutLeaf = (props: RenderLeafProps) =>
    <LeafView {...props} />

