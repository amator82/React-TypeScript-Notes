import { useOutletContext } from 'react-router-dom'
import { Note } from '../types/note'

export function useNote() {
    return useOutletContext<Note>()
}
