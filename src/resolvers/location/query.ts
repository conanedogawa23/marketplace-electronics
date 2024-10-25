import { Location, Warehouse, Area, Rack, Shelf, Bin } from "../../models/locations.ts";
import { QueryResolvers } from "../../generated/graphql.ts";
import { GraphQLError } from "graphql";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { LocationTypes } from "../../config/common/status.ts";
import { LocationProduct } from "../../models/locationProduct.ts";
import { transformFilterFields } from "../../utils/index.ts";

export const locationQueries: QueryResolvers = {
    location: async (parent: any, args: any, context: any, info: any) => {
        console.log(`
            parent: ${parent},\n
            args: ${args},\n
            context: ${context},\n
            info ${info}\n
        `)
        const { uuid } = args
        const [locationValue] = await Location.aggregate([
            {
                $match: { uuid }
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
            {
                $project: {
                    _id: 0,
                    uuid: 1,
                    name: 1,
                    description: 1,
                    type: 1,
                    area: '$area.name',
                    rack: '$rack.name',
                    shelf: '$shelf.name',
                    bin: '$bin.name',
                    status: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    deletedAt: 1,
                    deleted: 1,
                    deletedBy: 1,
                    deletedReason: 1,
                    deletedNote: 1
                }
            }
        ])
        if (!locationValue) {
            throw new GraphQLError(ReasonPhrases.BAD_REQUEST, {
                extensions: {
                    code: StatusCodes.BAD_REQUEST,
                    http: { status: StatusCodes.BAD_REQUEST }
                }
            })
        }
        return locationValue
    },
    locationList: async (parent: any, args: any, context: any, info: any) => {
        console.log(`
            parent: ${parent},\n
            args: ${args},\n
            context: ${context},\n
            info ${info}\n
        `)
        const { filters, textSearchFilters } = args
        let searchConditions: any = {}
        let { first } = args
        if (!first || first < 1) {
            first = 10;
        }
        let { after } = args
        if (!after || after < 0) {
            after = 0;
        }
        const { name, description } = filters;
        if (filters || textSearchFilters) {
            searchConditions = transformFilterFields(filters, textSearchFilters);
        }

        delete searchConditions.name;
        delete searchConditions.description;

        const locations = await Location.aggregate([
            {
                $match: searchConditions,
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
            {
                $project: {
                    _id: 0,
                    uuid: 1,
                    name: 1,
                    description: 1,
                    type: 1,
                    area: '$area.name',
                    rack: '$rack.name',
                    shelf: '$shelf.name',
                    bin: '$bin.name',
                    status: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    deletedAt: 1,
                    deleted: 1,
                    deletedBy: 1,
                    deletedReason: 1,
                    deletedNote: 1,
                    warehouse: 1
                }
            },
            {
                $sort: {
                    createdAt: -1
                },
            },
            {
                $skip: after
            },
            {
                $limit: first + 1
            }
        ]);
        const hasNextPage = locations.length > first;
        const locationList = hasNextPage ? locations.slice(0, -1) : locations;
        return {
            locations: locationList,
            hasMore: locations.length > first
        }
    },
    locationTypes: (parent: any, args: any, context: any, info: any) => {
        try {
            console.log(
                `parent: ${parent},\n
                args: ${args},\n
                context: ${context},\n
                info ${info}\n
            `)
            return Object.keys(LocationTypes);
        } catch (error) {
            throw new GraphQLError(ReasonPhrases.BAD_REQUEST, {
                extensions: {
                    code: StatusCodes.BAD_REQUEST,
                    http: { status: StatusCodes.BAD_REQUEST }
                }
            })
        }
    },
    warehouseList: async (parent: any, args: any, context: any, info: any) => {
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
            searchConditions = transformFilterFields(filters, textSearchFilters)
        }

        const warehouses = await Warehouse.find(searchConditions).sort({ createdAt: -1 }).skip(after).limit(first + 1).lean()

        return { warehouses, hasMore: warehouses.length > first }
    },
    areaList: async (parent: any, args: any, context: any, info: any) => {
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
        }
        const areas = await Area.find(searchConditions).sort({
            createdAt: -1
        }).skip(after).limit(first + 1).lean()
        return {
            areas,
            hasMore: areas.length > first
        }
    },
    rackList: async (parent: any, args: any, context: any, info: any) => {
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
            searchConditions = transformFilterFields(filters);
        }
        const racks = await Rack.find(searchConditions).sort({
            createdAt: -1
        }).skip(after).limit(first + 1).lean()
        return {
            racks,
            hasMore: racks.length > first
        }
    },
    shelfList: async (parent: any, args: any, context: any, info: any) => {
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
            searchConditions = transformFilterFields(filters);
        }
        const shelves = await Shelf.find(searchConditions).sort({
            createdAt: -1
        }).skip(after).limit(first + 1).lean()
        return {
            shelves,
            hasMore: shelves.length > first
        }
    },
    binList: async (parent: any, args: any, context: any, info: any) => {
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
            searchConditions = transformFilterFields(filters);
        }
        const bins = await Bin.find(searchConditions).sort({
            createdAt: -1
        }).skip(after).limit(first + 1).lean()
        return {
            bins,
            hasMore: bins.length > first
        }
    },
}