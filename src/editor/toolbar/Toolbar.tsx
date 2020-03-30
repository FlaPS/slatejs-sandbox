import React, {useEffect} from 'react'
import { Popper} from '@material-ui/core'
import {useSlate} from 'slate-react'
import {Location} from 'slate'
import useToolbarStyles from './useToolbarStyles'
import FormatStateView from './FormatStateView'
import LinkStateView from './LinkStateView'
import {WorkoutEditor} from '../data'

const getDOMSelectionRect = () =>
    window
      .getSelection()!
      .getRangeAt(0)
      .getBoundingClientRect()


const reactsAreEquals = (rect1: DOMRect, rect2: DOMRect) =>
    rect1 &&
    rect2 &&
    rect1.x === rect2.x &&
    rect1.y === rect2.y &&
    rect1.width === rect2.width &&
    rect1.height === rect2.height


const createVirtualReferenceFromRect = (rect: DOMRect | undefined) =>
    rect
        ? {
            clientWidth: rect.width,
            clientHeight: rect.height,
            getBoundingClientRect: () => rect,
        }
        : null


const Toolbar = () => {

  const styles = useToolbarStyles()
  const editor = useSlate()

  const [linkLocation, setLinkLocation] = React.useState(undefined as Location | undefined)
  const [anchorRect, setAnchorRect] = React.useState(undefined as DOMRect | undefined);

  const selection = editor.selection ? editor.selection : undefined

  useEffect(() => {
        // link is in edit mode
        if (linkLocation)
          return

        const selectionIsEmpty = WorkoutEditor.isSelectionEmpty(editor)

        // anchor defined - with no selection
        if (selectionIsEmpty) {
          if (anchorRect)
            setAnchorRect(undefined)
          return
        }

        const rect: DOMRect = getDOMSelectionRect()

        if (!anchorRect || !reactsAreEquals(anchorRect, rect))
          setAnchorRect(rect)

      }
  )

  // force open state changed hence selection location was changed - force kill LinkStateView with internal state
  useEffect( () => setLinkLocation(undefined), [anchorRect])

  const anchorEl = React.useMemo( () =>
          createVirtualReferenceFromRect(anchorRect),
      [anchorRect]
  )

  const startEditLink = () =>
    setLinkLocation(selection ? selection : undefined)

  return (
    <Popper
        className={styles.root}
        placement={'top'}
        anchorEl={anchorEl}
        open={anchorEl !== null}
    >
        {
          linkLocation === undefined
            ? <FormatStateView
                onLink={startEditLink}
            />
            : <LinkStateView
                location={linkLocation}
                onClose={() => {
                  setLinkLocation(undefined)

                }}
            />
        }
    </Popper>
  )
}

export default Toolbar
