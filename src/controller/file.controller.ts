import { formidable } from "formidable"
import { readFile } from "node:fs/promises"
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { Attachment } from "../models/attachment.ts"

const client = new S3Client({ 
    region: process.env.AWS_DEFAULT_REGION ?? 'us-east-2',  
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
    } 
})

export const fileController = async (req: any, res: any, next: any) => {
    try {
        const form = formidable()
        const [fields, { files }] = await form.parse(req)
        // add code to create new attachments records
        const attachmentRecordArr = []
        for (let i = 0; i < files.length; i++) {
            attachmentRecordArr.push({
                name: files[i].originalFilename,
                description: fields?.description[i],
                url: files[i].newFilename,
                createdBy: req?.user?.uuid,
                status: 'active'
            })
        }

        const newAttachments = await Attachment.create(attachmentRecordArr)
        if(!newAttachments?.length) {
            return res.status(400).json({ message: 'No files uploaded' })
        }
        const uploadedAttachments = newAttachments.map((attachment) => attachment.uuid)

        const processToS3Arr = []
        for(let i = 0; i < newAttachments.length; i++) {
            const fileData = await readFile(files[i].filepath)
            const command = new PutObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME ?? 'test-doc-bucket-bala',
                Key: `test/${uploadedAttachments[i]}`,
                Body: fileData,
                ContentType: files[i].mimetype,
            })
            const putObjResp = client.send(command)
            processToS3Arr.push(putObjResp)
        }

        const uploadedResponsesFromS3 = await Promise.all(processToS3Arr)

        return res.status(200).json({ 
            message: 'Files uploaded successfully', 
            data: {
                s3Response: uploadedResponsesFromS3,
                uploadedAttachments
            }
        })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
}