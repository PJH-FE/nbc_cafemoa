import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/toastui-editor.css';

const toolbar = [['heading', 'bold', 'italic', 'strike'], ['hr', 'quote', 'ul', 'ol'], ['image']];

function TuiEditor({ content, editorRef, imageHandler }) {
  const handleImage = async (file, callback) => {
    console.log(file, callback);
  };

  return (
    <Editor
      initialValue={content ?? ' '}
      initialEditType="wysiwyg"
      autofocus={false}
      ref={editorRef}
      toolbarItems={toolbar}
      hideModeSwitch
      height="500px"
      hooks={{ addImageBlobHook: handleImage }}
    />
  );
}

export default TuiEditor;
