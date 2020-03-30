import React from 'react'
import { Typography } from '@material-ui/core'
import { RenderLeafProps } from 'slate-react'


// TODO: use Typography or not for nested formats, squash nesting with css rules ?
export default React.forwardRef(
    (
      { attributes, children, leaf }: RenderLeafProps,
      ref: React.Ref<HTMLElement>
    ) => {

        if (leaf.bold)
          children = <strong>{children}</strong>

        if (leaf.italic)
          children = <em>{children}</em>

        if (leaf.underlined)
          children = <u>{children}</u>

        return  <Typography {...attributes}  ref={ref} component={'span'}>
                    {children}
                </Typography>
  }
)
