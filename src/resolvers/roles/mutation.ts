import { Role } from "../../models/roles.ts";
import { MutationResolvers } from "../../generated/graphql.ts";
import { DateTime } from "luxon";
import { Permission } from "../../models/permissions.ts";

export const rolesMutations: MutationResolvers = {
    createRole: async (parent, args, context, info) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info: ${info}\n
        `);
        const rolePayload = new Role(args?.role);
        const newRole = await rolePayload.save()
        return await newRole.toObject()
    },
    updateRole: async (parent, args, context, info) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info: ${info}\n
        `);
        return await Role.findByIdAndUpdate(args?.role?._id, args?.role, { upsert: true });
    },
    deleteRole: async (parent, args, context, info) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info: ${info}\n
        `);
        return await Role.findByIdAndUpdate(args?._id, { deleted: true, deletedAt: DateTime.now() }, { upsert: true });     
    },
    createPermission: async (parent, args, context, info) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info: ${info}\n
        `);
        // Create permission logic here
        const permissionPayload = new Permission(args?.permission);
        const newPermission = await permissionPayload.save();
        return newPermission.toObject();
    },
    updatePermission: async (parent, args, context, info) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info: ${info}\n
        `);
        return await Permission.findByIdAndUpdate(args?.permission?._id, args?.permission, { upsert: true });
    },
    deletePermission: async (parent, args, context, info) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info: ${info}\n
        `);
        return await Permission.findByIdAndUpdate(args?._id, { deleted: true, deletedAt: DateTime.now() }, { upsert: true });
    },
}