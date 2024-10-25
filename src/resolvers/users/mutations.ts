import { MutationResolvers } from "../../generated/graphql.ts";
import { User, UserSchema } from "../../models/user.ts";
import { DateTime } from "luxon";
import { GraphQLError } from "graphql";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Role } from "../../models/roles.ts";
import { Department } from "../../models/department.ts";
import { Permission } from "../../models/permissions.ts";
import { Project } from "../../models/project.ts";
import { Attachment } from "../../models/attachment.ts";

export const userMutations: MutationResolvers = {
    createUser: async (parent, args, context, info) => {
        console.log(`
            parent: ${JSON.stringify(parent)},\n 
            args: ${JSON.stringify(args)},\n 
            context: ${context},\n 
            info: ${JSON.stringify(info)}\n
        `);
        const { user } = args;
        const { image, department, role, permissions, projects } = user;

        if (image) {
            let availAttachments = await Attachment.find({ uuid: image }).lean()
            if (!availAttachments) {
                throw new GraphQLError(ReasonPhrases.NOT_FOUND + ' Attachments not found for id:: ' + image, {
                    extensions: {
                        code: StatusCodes.NOT_FOUND,
                        http: { status: StatusCodes.NOT_FOUND }
                    }
                })
            }
            console.log('attachements available for user: ' + image)
        }

        const [userDepartment, userRole, userPermissions, project] = await Promise.allSettled([
            Department.findOne({ uuid: department }).lean(),
            Role.findOne({ uuid: role }).lean(),
            Permission.find({ uuid: { $in: permissions } }).lean(),
            Project.find({ uuid: { $in: projects } }).lean()
        ])
        if(!userDepartment || !userRole || !userPermissions || !project) {
            throw new GraphQLError(Department.name + ReasonPhrases.NOT_FOUND + ' User department, role, permission, and project details are missing', {
                extensions: {
                    code: StatusCodes.NOT_FOUND,
                    http: { status: StatusCodes.NOT_FOUND }
                }
            });
        }
        const newUserRequestPayload = new User(user)
        let userPayload = await newUserRequestPayload.save();
        if(!userPayload) {
            throw new GraphQLError(ReasonPhrases.INTERNAL_SERVER_ERROR + ' User payload not saved', {
                extensions: {
                    code: StatusCodes.INTERNAL_SERVER_ERROR,
                    http: { status: StatusCodes.INTERNAL_SERVER_ERROR }
                }
            });
        }
        return {
            ...userPayload.toObject(),
            createdAt: userPayload?.createdAt?.toISOString(),
            updatedAt: userPayload?.updatedAt?.toISOString(),
            deletedAt: userPayload?.deletedAt?.toISOString(),
            dateOfBirth: userPayload?.dateOfBirth?.toISOString(),
            hireDate: userPayload?.hireDate?.toISOString()
        };
    },
    updateUser: async (parent, args, context, info) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info: ${info}\n
        `);
        const { user } = args;
        const { uuid } = user;
        if(!uuid) {
            throw new GraphQLError(ReasonPhrases.NOT_FOUND, {
                extensions: {
                    code: StatusCodes.NOT_FOUND,
                    http: { status: StatusCodes.NOT_FOUND }
                }
            });
        }
        const updateUser = await User.updateOne({ uuid }, user, { upsert: true }).lean() as unknown as UserSchema;
        const updatedUser = await User.findOne({ uuid }).lean();
        return {
            ...updatedUser,
            createdAt: updateUser?.createdAt?.toISOString(),
            updatedAt: updateUser?.updatedAt?.toISOString(),
            deletedAt: updateUser?.deletedAt?.toISOString(),
            dateOfBirth: updateUser?.dateOfBirth?.toISOString(),
            hireDate: updateUser?.hireDate?.toISOString()
        }
    },
    deleteUser: async (parent, args, context, info) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info: ${info}\n
        `);
        const deletedUser = await User.findOneAndUpdate({
            uuid: args?.user?.uuid
        }, { 
            deleted: true, deletedAt: DateTime.now(),
            deletedReason: args?.user?.reason, 
            deletedNote: args?.user?.note,
        }, { upsert: true }) as unknown as UserSchema;
        return {
            ...deletedUser,
            createdAt: deletedUser?.createdAt?.toISOString(),
            updatedAt: deletedUser?.updatedAt?.toISOString(),
            deletedAt: deletedUser?.deletedAt?.toISOString(),
            dateOfBirth: deletedUser?.dateOfBirth?.toISOString(),
            hireDate: deletedUser?.hireDate?.toISOString()
        }
    },
    // send email to user in case of forget password
    // reset password and associate new password to a user
    resetPassword: async (parent, args: any, context: any, info) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info: ${info}\n
        `);
        const newPassword = args?.newPwdData?.newPassword;
        if(!newPassword || !args?.newPwdData?.uuid) {
            throw new GraphQLError(ReasonPhrases.NOT_FOUND, {
                extensions: {
                    code: StatusCodes.NOT_FOUND,
                    http: { status: StatusCodes.NOT_FOUND }
                }
            });
        }
        const userInfo = await User.findOne({ uuid: args?.newPwdData?.uuid}).lean();
        if (!userInfo) {
            throw new GraphQLError(ReasonPhrases.NOT_FOUND, {
                extensions: {
                    code: StatusCodes.NOT_FOUND,
                    http: { status: StatusCodes.NOT_FOUND }
                }
            });
        }
        const updatedUser = await User.updateOne({ uuid: userInfo?.uuid }, { password: newPassword, resetPassword: true }, { upsert: true });
        if (updatedUser?.modifiedCount === 0) {
            throw new GraphQLError(ReasonPhrases.BAD_REQUEST, {
                extensions: {
                    code: StatusCodes.BAD_REQUEST,
                    http: { status: StatusCodes.BAD_REQUEST }
                }
            });
        }
        return { message: 'Password has been reset', password: newPassword };
    }
}