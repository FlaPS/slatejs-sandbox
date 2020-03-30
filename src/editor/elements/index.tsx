import React from 'react'
import {RenderElementProps, RenderLeafProps} from 'slate-react'
import LinkElementView from './LinkElementView'
import DefaultElementView from './DefaultElementView'
import LeafView from './LeafView'

export const renderWorkoutElement = ({ children, element }: RenderElementProps) => {
    switch (element.type) {
        case 'link':
            return  <LinkElementView href={element.url}>
                        {children}
                    </LinkElementView>

        default:
            return  <DefaultElementView>
                        {children}
                    </DefaultElementView>
    }
}


export const renderWorkoutLeaf = (props: RenderLeafProps) =>
    <LeafView {...props} />

