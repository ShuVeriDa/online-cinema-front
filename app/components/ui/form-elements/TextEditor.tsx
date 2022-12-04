import {FC, useEffect, useState} from 'react';

import styles from './Form.module.scss';
import {ITextEditor} from "@/ui/form-elements/form.interface";
import {ContentState, convertToRaw, EditorState} from "draft-js";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import cn from "classnames";
import {Editor} from "react-draft-wysiwyg";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

interface ITextEditorProps {
}

const TextEditor: FC<ITextEditor> = ({onChange, value, placeholder, error}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const [isUpdated, setIsUpdated] = useState(false)

  useEffect(() => {
    if (isUpdated) return

    const defaultValue = value || ''
    const blocksFromHtml = htmlToDraft(defaultValue)

    const contentState = ContentState.createFromBlockArray(
      blocksFromHtml.contentBlocks,
      blocksFromHtml.entityMap
    )

    const newEditorState = EditorState.createWithContent(contentState)
    setEditorState(newEditorState)
  }, [value, isUpdated])

  const onEditorStateChange = (editorState: EditorState) => {
    setIsUpdated(true)
    setEditorState(editorState)

    return onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  }

  return (
    <div className={cn(styles.common, styles.editorWrapper, 'animate-fade')}>
      <label>
        <span>{placeholder}</span>
        <div className={styles.wrapper}>
          <Editor
            toolbarClassName={styles.toolbar}
            editorClassName={styles.editor}
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            spellCheck
            toolbar={{
              options: ['inline', 'blockType', 'list'],
              inline: {
                inDropdown: false,
                className: undefined,
                component: undefined,
                dropdownClassName: undefined,
                options: ['bold', 'italic', 'underline', 'strikethrough'],
              },
              blockType: {
                inDropdown: false,
                options: [],
              },
              list: {
                inDrodown: false,
                options: ['unordered', 'ordered'],
              },
            }}
          />
        </div>
      </label>
    </div>
  );
};

export default TextEditor