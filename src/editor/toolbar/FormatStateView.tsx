import React from 'react'
import {ToggleButton, ToggleButtonProps} from '@material-ui/lab'
import {FormatBold, FormatItalic, FormatUnderlined, Link} from '@material-ui/icons'
import {useSlate} from 'slate-react'
import {useTheme} from '@material-ui/core'
import {LeafFormat, WorkoutEditor} from '../data/'
import useToolbarStyles from './useToolbarStyles'

export const FormatStateView = ({onLink}: {onLink: () => void}) => {
    const editor = useSlate()
    const theme = useTheme()
    const styles = useToolbarStyles()

    const getFormatButtonProps = (format: LeafFormat): ToggleButtonProps => {
        const selected = WorkoutEditor.isFormatActive(editor, format)
        return {
            className: styles.button,
            selected,
            value: format,
            style: {color: selected ? theme.palette.success.light : theme.palette.common.white},
            onMouseDown: event => {
                event.preventDefault()
                WorkoutEditor.toggleFormat(editor, format)
            },
            onMouseUp: event => {
                event.preventDefault()
            }
        }
    }

    const isLinkActive = WorkoutEditor.isLinkActive(editor)

    return <React.Fragment>
                <ToggleButton
                    {...getFormatButtonProps('bold')}
                >
                    <FormatBold />
                </ToggleButton>
                <ToggleButton
                    {...getFormatButtonProps('italic')}
                >
                    <FormatItalic />
                </ToggleButton>
                <ToggleButton
                    {...getFormatButtonProps('underlined')}
                >
                    <FormatUnderlined />
                </ToggleButton>
                <ToggleButton
                    value={'link'}
                    className={styles.button}
                    selected={isLinkActive}
                    style={{
                        color: isLinkActive
                            ? theme.palette.success.light
                            : theme.palette.common.white
                    }}
                    onMouseDown={ event => {
                        event.preventDefault()
                        isLinkActive
                            ? WorkoutEditor.unwrapLink(editor)
                            : onLink()
                    }}
                >
                    <Link />
                </ToggleButton>
            </React.Fragment>
}
