import React from 'react'
import {Link, LinkProps} from '@material-ui/core'

export default React.forwardRef(
    (
        props: LinkProps,
        ref: React.Ref<HTMLElement>
    ) => {
        return <Link ref={ref} {...props} />
    })
