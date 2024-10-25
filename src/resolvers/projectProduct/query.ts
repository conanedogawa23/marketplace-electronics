import { QueryResolvers } from "../../generated/graphql.ts";
import { GraphQLError } from "graphql";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ProjectProduct } from "../../models/projectProduct.ts";
import { transformFilterFields } from "../../utils/index.ts";

export const projectProductQueries: QueryResolvers = {
    projectProductList: async (parent, args, context, info) => {
        console.log(`
            parent: ${parent},\n
            args: ${args},\n
            context: ${context},\n
            info ${info}\n
        `)
        const { filters } = args
        let searchConditions = {}
        let { first } = args
        if (!first || first < 1) {
            first = 10;
        }
        let { after } = args
        if (!after || after < 0) {
            after = 0;
        }
        if (filters) {
            searchConditions = transformFilterFields(filters)
        }
        const projectProducts = await ProjectProduct.aggregate([
            {
                $match: searchConditions
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'product',
                    foreignField: 'uuid',
                    as: 'product'
                }
            },
            {
                $unwind: {
                    path: '$product',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'projects',
                    localField: 'project',
                    foreignField: 'uuid',
                    as: 'project'
                }
            },
            {
                $unwind: {
                    path: '$project',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'locations',
                    let: { product_location: '$product_location' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ['$uuid', '$$product_location']
                                }
                            }
                        },
                        {
                            $lookup: {
                                from: 'areas',
                                localField: 'area',
                                foreignField: 'uuid',
                                as: 'area'
                            }
                        },
                        {
                            $unwind: {
                                path: '$area',
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        // lookup rack
                        {
                            $lookup: {
                                from: 'racks',
                                localField: 'rack',
                                foreignField: 'uuid',
                                as: 'rack'
                            }
                        },
                        {
                            $unwind: {
                                path: '$rack',
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        // lookup shelf
                        {
                            $lookup: {
                                from: 'shelves',
                                localField: 'shelf',
                                foreignField: 'uuid',
                                as: 'shelf'
                            }
                        },
                        {
                            $unwind: {
                                path: '$shelf',
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        // lookup bin
                        {
                            $lookup: {
                                from: 'bins',
                                localField: 'bin',
                                foreignField: 'uuid',
                                as: 'bin'
                            }
                        },
                        {
                            $unwind: {
                                path: '$bin',
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        // lookup warehouse
                        {
                            $lookup: {
                                from: 'warehouses',
                                localField: 'warehouse',
                                foreignField: 'uuid',
                                as: 'warehouse'
                            }
                        },
                        {
                            $unwind: {
                                path: '$warehouse',
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        // project
                        {
                            $project: {
                                _id: 0,
                                uuid: 1,
                                name: 1,
                                area: {
                                    uuid: 1,
                                    name: 1
                                },
                                rack: {
                                    uuid: 1,
                                    name: 1
                                },
                                shelf: {
                                    uuid: 1,
                                    name: 1
                                },
                                bin: {
                                    uuid: 1,
                                    name: 1
                                },
                                warehouse: {
                                    uuid: 1,
                                    name: 1
                                }
                            }
                        }
                    ],
                    as: 'product_location'
                }
            },
            {
                $unwind: {
                    path: '$product_location',
                    preserveNullAndEmptyArrays: true
                }
            },
        ])

        const hasNextPage = projectProducts.length > first
        const projectProductList = hasNextPage ? projectProducts.slice(0, first) : projectProducts
        console.log('projectProductList', projectProductList)

        return {
            projectProducts: projectProductList,
            hasMore: hasNextPage
        }
    }
}