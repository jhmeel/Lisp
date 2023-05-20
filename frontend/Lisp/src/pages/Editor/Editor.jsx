
import React, { useState, useRef,useEffect } from "react";
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import MetaData from '../../components/Layouts/metaData';
import SpinLoader from '../../components/Spinloader/Spinloader';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, addNewPost} from "../../../actions/postActions"
import BackdropLoader from '../../components/backdropLoader/BackdropLoader';
import './style.css'

const Editor = () => {
  const [selectedFontSize, setSelectedFontSize] = useState("15px");
  const contentRef = useRef();
  const imageUploadRef = useRef();
  const selectedImageRef = useRef();

  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar();

  function handleFontSizeChange(event) {
    document.execCommand("fontSize", false, event.target.value);
    setSelectedFontSize(`${event.target.value}px`);
  }

  function handleRealignmentClick() {
    document.execCommand("justifyFull", false, null);
  }

  function handleUndoClick() {
    document.execCommand("undo", false, null);
  }

  function handleRedoClick() {
    document.execCommand("redo", false, null);
  }

  function handleImageUploadChange() {
    const file = imageUploadRef.current.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      selectedImageRef.current.src = reader.result;
    });
    reader.readAsDataURL(file);
  }

  function handlePublishClick() {
   dispatch(contentRef)
  }

  return (
    <div className="blog-editor">
      
      <main>
        <div className="image-tab">
          <img draggable="false" className="selected-image" ref={selectedImageRef} />
        </div>
        <section className="editor">
          <section className="toolbar">
            <button onClick={() => document.execCommand("bold", false, null)}>
              <b>B</b>
            </button>
            <button onClick={() => document.execCommand("italic", false, null)}>
              <i>i</i>
            </button>
            <button onClick={() => document.execCommand("justifyCenter", false, null)}>
              <img src="center-icon.svg" alt="Center" />
            </button>
            <span>
              A+
              <input
                type="range"
                value={selectedFontSize.slice(0, -2)}
                max="30"
                onChange={handleFontSizeChange}
              />
            </span>
            <button onClick={handleRealignmentClick}>
              <img src="realign-icon.svg" alt="Realign" />
            </button>
            <button onClick={() => document.execCommand("justifyRight", false, null)}>Right</button>
            <button onClick={handleUndoClick}>
              <img src="undo-icon.svg" alt="Undo" />
            </button>
            <button onClick={handleRedoClick}>
              <img src="redo-icon.svg" alt="Redo" />
            </button>
            <label htmlFor="image-upload">
              <img src="image-icon.svg" alt="Image" />
            </label>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              ref={imageUploadRef}
              onChange={handleImageUploadChange}
            />
          </section>
          <div
            id="content"
            contentEditable="true"
            ref={contentRef}
          ></div>
        </section>
        <button id="publish"type="submit" onClick={handlePublishClick}>
          Publish
        </button>
      </main>
     
    </div>
  );
}

export default Editor

