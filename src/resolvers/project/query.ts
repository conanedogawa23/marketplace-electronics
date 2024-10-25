import { GraphQLError } from "graphql";
import { QueryResolvers } from "../../generated/graphql.ts";
import { Project, ProjectDocument } from "../../models/project.ts";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ProjectProduct } from "../../models/projectProduct.ts";
import { categoryLookupAggregateQuery, locationProductLookupAggregateQuery, manufacturerLookupAggregateQuery, pricingLookupAggregateQuery, serializedProductLookupAggregateQuery, uomLookupAggregateQuery } from "../product/lookupQueries.ts"
import { clientLookupAggregateQuery, ownerLookupAggregateQuery } from "./lookupQueries.ts";
import { transformFilterFields } from "../../utils/index.ts";

export const projectQueries: QueryResolvers = {
    project: async (parent: any, args: any, context: any, info: any) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info ${info}\n
        `)
        const { uuid } = args
        const availableProject: any = await Project.findOne({ uuid })
            .populate({
                path: "owner",
                localField: "owner",
                foreignField: "uuid"
            })
            .populate({
                path: "client",
                localField: "client",
                foreignField: "uuid"
            }).exec();

        return {
            _id: availableProject._id,
            uuid: availableProject.uuid,
            name: availableProject.name,
            description: availableProject.description,
            deleted: availableProject.deleted,
            deletedBy: availableProject.deletedBy,
            deletedReason: availableProject.deletedReason,
            deletedNote: availableProject.deletedNote,
            createdBy: availableProject.createdBy,
            updatedBy: availableProject.updatedBy,
            status: availableProject.status,
            project_type: availableProject.project_type,
            stage: availableProject.stage,
            payment_schedule: availableProject.payment_schedule,
            sales_tax: availableProject.sales_tax,
            labor_tax: availableProject.labor_tax,
            total_margin: availableProject.total_margin,
            equipment_margin: availableProject.equipment_margin,
            equipment_total: availableProject.equipment_total,
            labor_total: availableProject.labor_total,
            shipping_total: availableProject.shipping_total,
            tax_total: availableProject.tax_total,
            budget: availableProject.budget,
            address: availableProject.address,
            city: availableProject.city,
            state: availableProject.state,
            zipcode: availableProject.zipcode,
            country: availableProject.country,
            owner: availableProject.owner,
            client: availableProject.client,
            primary_contact_id: availableProject.primary_contact_id,
            company_location_id: availableProject.company_location_id,
            company_location_name: availableProject.company_location_name,
            createdAt: (new Date(availableProject.createdAt as string)).toISOString(),
            updatedAt: (new Date(availableProject.updatedAt as string)).toISOString(),
            deletedAt: availableProject.deletedAt ? (new Date(availableProject.deletedAt)).toISOString() : null
        }
    },
    projectList: async (parent: any, args: any, context: any, info: any) => {
        try {
            console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info ${info}\n
        `)
            const { filters, textSearchFilters } = args
            let searchConditions = {}
            let { first } = args
            if (!first || first < 1) {
                first = 10;
            }
            let { after } = args
            if (!after || after < 0) {
                after = 0;
            }
            if (filters || textSearchFilters) {
                searchConditions = transformFilterFields(filters, textSearchFilters);
                console.log(searchConditions);
            }

            // searchConditions = {
            //     $and: [
            //         { uuid: filters.uuid },
            //         {
            //             ...filters.name && {
            //                 $or: [
            //                     { name: { $regex: filters.name, $options: 'i' } }
            //                 ]
            //             }
            //         }
            //     ]
            // }

            const projectsResults = await Project.aggregate([
                {
                    $match: searchConditions
                },
                ownerLookupAggregateQuery,
                { $unwind: { path: "$owner", preserveNullAndEmptyArrays: true } },
                clientLookupAggregateQuery,
                { $unwind: { path: "$client", preserveNullAndEmptyArrays: true } },
                {
                    $project: {
                        uuid: 1,
                        name: 1,
                        description: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        deleted: 1,
                        deletedAt: 1,
                        deletedBy: 1,
                        deletedReason: 1,
                        deletedNote: 1,
                        createdBy: 1,
                        updatedBy: 1,
                        status: 1,
                        project_type: 1,
                        stage: 1,
                        payment_schedule: 1,
                        sales_tax: 1,
                        labor_tax: 1,
                        total_margin: 1,
                        equipment_margin: 1,
                        equipment_total: 1,
                        labor_total: 1,
                        shipping_total: 1,
                        tax_total: 1,
                        budget: "$total",
                        address: 1,
                        city: 1,
                        state: 1,
                        zipcode: 1,
                        country: 1,
                        owner: 1,
                        client: 1,
                        primary_contact_id: 1,
                        company_location_id: 1,
                        company_location_name: 1
                    }
                },
                {
                    $facet: {
                        results: [
                            { $sort: { 'createdAt': -1 } },
                            { $skip: after },
                            { $limit: first },
                        ],
                        totalCount: [
                            { $count: 'count' }
                        ]
                    }
                },
            ])

            return {
                projects: projectsResults[0]?.results,
                hasMore: projectsResults?.[0].totalCount?.[0]?.count > first + after
            }
        } catch (error) {
            console.log(error);

            throw new GraphQLError(ReasonPhrases.BAD_REQUEST, {
                extensions: {
                    code: StatusCodes.BAD_REQUEST,
                    http: { status: StatusCodes.BAD_REQUEST }
                }
            })
        }
    },
    projectItemsList: async (parent: any, args: any, context: any, info: any) => {
        try {
            console.log(`
                parent: ${parent},\n 
                args: ${args},\n 
                context: ${context},\n 
                info ${info}\n
            `)
            const { projectId, filters, textSearchFilters } = args
            let { first } = args
            if (!first || first < 1) {
                first = 10;
            }
            let { after } = args
            if (!after || after < 0) {
                after = 0;
            }

            const projectItemsLookup = await ProjectProduct.aggregate([
                {
                    $match: {
                        project: projectId
                    }
                },
                {
                    $lookup: {
                        from: "products",
                        let: { product: "$product" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: { $eq: ["$uuid", "$$product"] },
                                    ...transformFilterFields(filters, textSearchFilters)
                                }
                            },
                            {
                                $project: {
                                    name: 1,
                                    description: 1,
                                    tags: 1,
                                    width: 1,
                                    height: 1,
                                    weight: 1,
                                    length: 1,
                                    quantity: 1,
                                    status: 1,
                                    uuid: 1,
                                    sku: 1,
                                    serialized: 1,
                                    location: 1
                                }
                            }
                        ],
                        as: "product",
                    },
                },
                {
                    $unwind: { path: '$product', preserveNullAndEmptyArrays: true }
                },
                { $sort: { "createdAt": -1 } },
                {
                    $facet: {
                        results: [
                            { $skip: after },
                            { $limit: first },
                        ],
                        totalCount: [
                            { $count: 'count' }
                        ]
                    }
                },
            ])

            const projectItems = projectItemsLookup?.[0].results.map((item: any) => {
                if (item.product) {
                    return {
                        ...item.product,
                        quantity: item.quantity
                    }
                }
            }).filter((k: any) => k)
            return {
                projectItems,
                hasMore: projectItemsLookup?.[0].totalCount?.[0]?.count > after + first
            }
        } catch (error) {
            console.log(error);
            throw new GraphQLError(ReasonPhrases.BAD_REQUEST, {
                extensions: {
                    code: StatusCodes.BAD_REQUEST,
                    http: { status: StatusCodes.BAD_REQUEST }
                }
            })
        }
    }
}
