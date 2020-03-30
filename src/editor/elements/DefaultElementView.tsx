import React from 'react'
import { Typography, TypographyProps } from '@material-ui/core'

export default React.forwardRef(
  (
    props: TypographyProps,
    ref: React.Ref<HTMLElement>
  ) => {
  return <Typography ref={ref} {...props} />
})
