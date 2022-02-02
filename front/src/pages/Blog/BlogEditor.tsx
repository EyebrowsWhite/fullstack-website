import React, { FC } from "react";
import { Button, message } from "antd";
import { TEditor } from '../../components/TEditor';
import "@toast-ui/editor/dist/toastui-editor.css";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";

import Editor from "@toast-ui/editor";
// import {useMutation} from "@apollo/client";
// import {blog} from "../../graphql";

const BlogEditor: FC = () => {
  const [instance, setInstance] = React.useState<Editor | null>(null);
  // const [content, setContent] = React.useState("");
  // const [createBlog] = useMutation(blog.CREATE_BLOG);


  const saveBlog = () => {
    if (instance) {
      console.log(instance.getMarkdown());
    } else {
      message.error('instance init error')
    }
  };

  const handleClickSave = () => {
    saveBlog();
  };

  return (
    <div className="blog-editor">
      <div className="blog-btn-groups">
        <Button className="save-blog" onClick={handleClickSave}>
          Save
        </Button>
        <Button className="publish-blog">
          Publish
        </Button>
      </div>
      <TEditor
        initialValue={''}
        placeholder="Please start your creation!"
        previewStyle="vertical"
        height="calc(100vh - var(--header-height))"
        initialEditType="markdown"
        useCommandShortcut={true}
        usageStatistics={false}
        toolbarItems={[
          ["hr", "task", "indent", "outdent"],
          ["table", "image", "link"],
        ]}
        hideModeSwitch={true}
        plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
        previewHighlight={true}
        onLoad={(editor: Editor) => {
          setInstance(editor);
        }}
      />
    </div>
  );
};

export default BlogEditor;
