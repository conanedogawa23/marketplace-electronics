// src/resolvers.ts
import { Resolvers } from './generated/graphql.ts';
import { User } from './models/user.ts';
import jwt from 'jsonwebtoken';
import { compare } from 'bcrypt';

import { userMutations } from './resolvers/users/mutations.ts';
import { inventoryMutations } from './resolvers/inventory/mutation.ts';
import { rolesMutations } from './resolvers/roles/mutation.ts';
import { productMutations } from './resolvers/product/mutation.ts';
import { categoryMutations } from './resolvers/category/mutation.ts';
import { manufacturerMutations } from './resolvers/manufacturer/mutation.ts';
import { uomMutations } from './resolvers/uom/mutation.ts';
import { vendorMutations } from './resolvers/vendor/mutation.ts';
import { departmentMutations } from './resolvers/department/mutation.ts';
import { locationMutations } from './resolvers/location/mutations.ts';
import { projectMutations } from './resolvers/project/mutation.ts';
import { locationProductMutations } from './resolvers/locationProduct/mutations.ts';
import { vendorProductMutations } from './resolvers/vendorProduct/mutation.ts';
import { projectProductMutations } from './resolvers/projectProduct/mutations.ts';
import { activityMutations } from './resolvers/activity/mutation.ts';

import { inventoryQueries } from './resolvers/inventory/query.ts';
import { userResolvers } from './resolvers/users/query.ts';
import { rolesQueries } from './resolvers/roles/query.ts';
import { productQueries } from './resolvers/product/query.ts';
import { manufacturerQueries } from './resolvers/manufacturer/query.ts';
import { categoryQueries } from './resolvers/category/query.ts';
import { uomQueries } from './resolvers/uom/query.ts';
import { vendorQueries } from './resolvers/vendor/query.ts';
import { departmentQueries } from './resolvers/department/query.ts';
import { projectQueries } from './resolvers/project/query.ts';
import { locationQueries } from './resolvers/location/query.ts';
import { locationProductQueries } from './resolvers/locationProduct/query.ts';
import { vendorProductQueries } from './resolvers/vendorProduct/query.ts';
import { purchaseOrderQueries } from './resolvers/purchaseOrder/query.ts'
import { projectProductQueries } from './resolvers/projectProduct/query.ts';
import { activityQueries } from './resolvers/activity/query.ts';
import { receiveOrderQueries } from './resolvers/receiveOrder/query.ts';

export const resolvers: Resolvers = {
    Query: {
        ...inventoryQueries,
        ...userResolvers,
        ...rolesQueries,
        ...productQueries,
        ...manufacturerQueries,
        ...categoryQueries,
        ...uomQueries,
        ...vendorQueries,
        ...departmentQueries,
        ...projectQueries,
        ...receiveOrderQueries,
        ...locationQueries,
        ...locationProductQueries,
        ...vendorProductQueries,
        ...purchaseOrderQueries,
        ...projectProductQueries,
        ...activityQueries
    },
    Mutation: {
        ...departmentMutations,
        ...inventoryMutations,
        ...userMutations,
        ...rolesMutations,
        ...productMutations,
        ...manufacturerMutations,
        ...categoryMutations,
        ...uomMutations,
        ...vendorMutations,
        ...projectMutations,
        ...locationMutations,
        ...locationProductMutations,
        ...vendorProductMutations,
        ...projectProductMutations,
        ...activityMutations,
        loginUser: async (parent, args, context, info) => {
            console.log(`
                parent: ${parent},\n 
                args: ${JSON.stringify(args)},\n 
                context: ${context},\n 
                info: ${info}\n
            `)
            const user = await User.findOne({ email: args?.email }).lean();
            if (!user) {
                throw new Error('User not found');
            }

            const ifPwdMatch = await compare(args?.password, user.password);
            if (!ifPwdMatch) {
                throw new Error('Invalid password');
            }
            const userToken = await jwt.sign({ email: user.email }, process.env.SECRET_KEY!, { expiresIn: '1d' });
            const userData = {
                ...user,
                deletedAt: user?.deletedAt?.toString(),
                token: userToken,
                createdAt: user?.createdAt?.toString(),
                updatedAt: user?.updatedAt?.toString(),
                hireDate: user?.hireDate?.toString(),
                dateOfBirth: user?.dateOfBirth?.toString(),
                employmentStatus: user?.employmentStatus as string
            };
            const response = {
                user: userData,
                token: userToken
            };
            return response;
        }
    }
};