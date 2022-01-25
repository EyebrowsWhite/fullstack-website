import React, {FC} from "react";
import {useQuery} from "@apollo/client";
import {user} from "../graphql";

import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const UploadFile: FC = () => {
    const { Dragger } = Upload;
    const filename = 'file.jpg';

    const props = {
        name: filename,
        multiple: false,
        action: `/api/upload/${filename}`,
        onChange(info:any) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e:any) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };
    return (
        <div>
            <h2>you have permission</h2>
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                    band files
                </p>
            </Dragger>,
        </div>
    );
};

const UploadPage: FC = () => {
    const { data } = useQuery(user.ME);
    return (
        <div>
            <h1>Upload</h1>
            {
                data && data.me && data.me.permission === 'SUPERADMIN'
                ?
                <UploadFile />
                :
                <span>you don't have this permission</span>
            }
        </div>
    );
};

export default UploadPage;