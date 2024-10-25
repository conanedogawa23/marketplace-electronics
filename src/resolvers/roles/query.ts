import { Role } from "../../models/roles.ts";
import { QueryResolvers } from "../../generated/graphql.ts";
import { Permission } from "../../models/permissions.ts";
import { transformFilterFields } from "../../utils/index.ts";

export const rolesQueries: QueryResolvers = {
    roleList: async (parent, args: any, context, info) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info ${info}\n
        `)
        const { filters } = args;
        let searchConditions = {}
        if (filters) {
            searchConditions = transformFilterFields(filters)
        }
        return await Role.find(searchConditions).lean();
    },
    findRole: async (parent, args, context, info) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info ${info}\n
        `)
        const roleId = args?._id
        return await Role.findById(roleId).lean();
    },
    permissionList: async (parent: any, args: any, context: any, info: any) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info ${info}\n
        `)
        const { filters } = args;
        let searchConditions = {}
        if (filters) {
            searchConditions = {
                ...filters
            }
        }
        const moduleBasedPermissions = await Permission.aggregate([
            {
                $match: {
                    ...searchConditions
                }
            },
            {
                $group: {
                    _id: '$module',
                    permissions: {
                        $push: '$$ROOT'
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    module: '$_id',
                    permissions: 1
                }
            }
        ])
        return moduleBasedPermissions
    },
    findPermission: async (parent, args, context, info) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info ${info}\n
        `)
        const permissionId = args?._id
        return await Permission.findById(permissionId).lean();
    },
}