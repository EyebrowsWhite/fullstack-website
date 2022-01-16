import React, { FC } from "react";

import Editor from '../../components/TEditor/Editor';
import "@toast-ui/editor/dist/toastui-editor.css";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";

const BlogEditor: FC = () => {

  return (
    <div className="blog-editor">
      <Editor
        initialValue={''}
        placeholder="Please start your creation!"
        previewStyle="vertical"
        height="calc(100vh - 46px)"
        initialEditType="markdown"
        useCommandShortcut={true}
        usageStatistics={false}
        toolbarItems={[
          ["hr", "task", "indent", "outdent"],
          ["table", "image", "link"],
        ]}
        plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
      />
    </div>
  );
};

export default BlogEditor;
