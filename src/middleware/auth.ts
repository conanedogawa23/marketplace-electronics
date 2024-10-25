import { GraphQLError } from 'graphql';
import { type IncomingMessage } from 'http';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import jwt, { type JwtPayload } from 'jsonwebtoken';
// customer defined modules
import { User } from '../models/user.ts';

const authenticate = async ({ req }: { req: IncomingMessage }) => {
    // Get the JWT token from the request headers
    const token = req?.headers?.authorization?.split(' ')[1];

    if (!token) {
        throw new GraphQLError(ReasonPhrases.UNAUTHORIZED, {
            extensions: {
                code: StatusCodes.UNAUTHORIZED,
                http: { status: StatusCodes.UNAUTHORIZED }
            }
        })
    }

    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env?.SECRET_KEY as string) as JwtPayload;
        const [userInfo] = await User.aggregate([
            {
                $match: {
                    email: decoded?.email
                }
            },
            {
                $lookup: {
                    let: { roleId: '$role' },
                    from: 'roles',
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ['$_id', '$$roleId']
                                }
                            }
                        },
                        {
                            $lookup: {
                                let: { permissionId: '$permissions' },
                                from: 'permissions',
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $in: ['$_id', '$$permissionId']
                                            }
                                        }
                                    }
                                ],
                                as: 'permissions'
                            }
                        }
                    ],
                    as: 'role'
                }
            },
            {
                $unwind: {
                    path: '$role',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $addFields: {
                    permissions: '$role.permissions'
                }
            }
        ]);
        return { user: userInfo }
        // Proceed to the next middleware or route handler
    } catch (error) {
        throw new GraphQLError(ReasonPhrases.UNAUTHORIZED, {
            extensions: {
                code: 'Invalid token',
                http: { status: StatusCodes.UNAUTHORIZED }
            }
        })
    }
};

export default authenticate;