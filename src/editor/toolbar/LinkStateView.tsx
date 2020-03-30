import React from 'react'
import {ClickAwayListener, Input} from '@material-ui/core'
import {Close} from '@material-ui/icons'
import {useSlate} from 'slate-react'
import {Location} from 'slate'
import useToolbarStyles from './useToolbarStyles'
import {WorkoutEditor} from '../data/'

type LinkStateViewProps = {
    location: Location
    onClose: () => void
}

export const LinkStateView = ({location, onClose}: LinkStateViewProps) => {

    const [value, setValue] = React.useState('')
    const styles = useToolbarStyles()
    const editor = useSlate()

    const handleLink = () =>
        (value && value.length)
            ? setLink()
            : cancelLink()

    const setLink = () => {
        WorkoutEditor.insertLink(editor, value, location)
        onClose()
    }

    const cancelLink = () => {
        WorkoutEditor.unwrapLink(editor, location)
        onClose()
    }

    return  <ClickAwayListener onClickAway={handleLink}>
                <form
                    onSubmit={ event => {
                        event.preventDefault()
                        handleLink()
                    }}
                >
                    <Input
                        className={styles.input}
                        type='url'
                        value={value}
                        onChange={event => {
                            setValue(event.target.value)
                        }}
                        onBlur={handleLink}
                        endAdornment={
                            <Close
                                className={styles.close}
                                onMouseDown={cancelLink}
                            />
                        }
                        placeholder='https://'
                        disableUnderline
                        fullWidth
                        autoFocus
                    />
                </form>
            </ClickAwayListener>

}
