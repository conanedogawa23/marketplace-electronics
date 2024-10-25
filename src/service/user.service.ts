import { ReasonPhrases, StatusCodes } from "http-status-codes"
import { Attachment, AttachmentSchema } from "../models/attachment.ts"
import { User, UserSchema } from '../models/user.ts'
import { Product, ProductDocument } from "../models/product.ts"
import { LocationProduct } from "../models/locationProduct.ts"
import { Location } from "../models/locations.ts"
import { GraphQLError } from "graphql"
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { SerializedProduct } from "../models/serializedProduct.ts"
import { ulid } from "ulid"
import { RoleStatus } from "../config/common/status.ts"
import { getAttachments } from "./product.service.ts"

const client = new S3Client({ 
    region: process.env.AWS_DEFAULT_REGION ?? 'us-east-2',  
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
    } 
})

export const associateUserWithAttachment = async (user: UserSchema, attachment: AttachmentSchema) => {
    const userAvail = await User.findOne({ uuid: user?.uuid }).lean()
    if (!userAvail) {
        throw new GraphQLError(ReasonPhrases.NOT_FOUND + ' User with id:: ' + user?.uuid, {
            extensions: {
                code: StatusCodes.NOT_FOUND,
                http: { status: StatusCodes.NOT_FOUND }
            }
        })
    }
    const attachmentInfo = await Attachment.findOne({ uuid: attachment?.uuid }).lean()
    if (!attachmentInfo) {
        throw new GraphQLError(ReasonPhrases.NOT_FOUND + ' Attachment with id:: ' + attachment?.uuid, {
            extensions: {
                code: StatusCodes.NOT_FOUND,
                http: { status: StatusCodes.NOT_FOUND }
            }
        })
    }
    // private files
    const getObjSignedUrl = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME ?? 'test-doc-bucket-bala',
        Key: `test/${attachment?.uuid}`,
        ResponseExpires: new Date(Date.now() + 1000 * 60 * 60)
    })

    const attachmentPresignedUrl = await client.send(getObjSignedUrl)
    return attachmentPresignedUrl
}

export const getAllAttachmentsRelatedToUser = async (uuids: String[]) => {
    try {
        const attachmentUrlList = await getAttachments(uuids)
        return attachmentUrlList
    } catch (error: any) {
        console.error(error)
        throw new Error(error?.message as string)
    }
}