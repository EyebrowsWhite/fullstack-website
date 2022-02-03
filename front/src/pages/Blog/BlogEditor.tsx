import React, { FC } from "react";
import {Button, Modal, Form, Input, message} from "antd";
import { TEditor } from '../../components/TEditor';
import "@toast-ui/editor/dist/toastui-editor.css";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";

import Editor from "@toast-ui/editor";
import {useMutation, useQuery} from "@apollo/client";
import {blog, user} from "../../graphql";

const { TextArea } = Input;

const BlogEditor: FC = () => {
  const [form] = Form.useForm();

  const [instance, setInstance] = React.useState<Editor | null>(null);
  const [visible, setVisible] = React.useState(false);
  const [content, setContent] = React.useState("");
  const { data:userInfo } = useQuery(user.ME);
  const [createBlog] = useMutation(blog.CREATE_BLOG);

  const showModal = () => {
    const mdContent = instance!.getMarkdown();
    setContent(mdContent);
    setVisible(true);
    if (mdContent) {
      form.setFieldsValue({
        title: mdContent.split("\n")[0]?.slice(2),
        outline: mdContent.split("\n").slice(1, 5).join(" "),
      });
    }
  };

  const closePublishModal = () => {
    setVisible(false);
    form.resetFields();
  };

  const onFinish = async (values: any) => {
    const result = await createBlog({variables: {
        title: values.title,
        outline: values.outline,
        content,
        author: userInfo && userInfo.me && userInfo.me.username || 'none'
      }});
    if (result && result.data && result.data.createBlog && result.data.createBlog.id) {
      setVisible(false);
      form.resetFields();
      instance!.setMarkdown("");
      setContent('');
      message.success('发布成功');
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    message.error("发布失败");
  };

  return (
    <div className="blog-editor">
      <div className="blog-btn-groups">
        <Button className="publish-blog" onClick={showModal}>
          Publish
        </Button>
        <Modal
          title="Create a new blog"
          visible={visible}
          footer={null}
          onCancel={closePublishModal}
        >
          <Form
            name="publish-blog"
            form={form}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 18 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Title"
              name="title"
            >
              <Input showCount allowClear/>
            </Form.Item>
            <Form.Item
              label="Outline "
              name="outline"
            >
              <TextArea showCount allowClear rows={5}/>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 18, span: 4 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>

          </Form>
        </Modal>
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
