import JoditEditor from "jodit-react";

import { useRef } from "react";

const RichTextEditor = ({ setContent }) => {
  const editor = useRef(null);

  return (
    <JoditEditor ref={editor} onChange={(content) => setContent(content)} />
  );
};

export default RichTextEditor;
