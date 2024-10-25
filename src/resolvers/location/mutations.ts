import { Location, LocationDocument, Warehouse, WarehouseDocument, Area, AreaDocument,
    Rack, RackDocument, Shelf, ShelfDocument, Bin, BinDocument
 } from "../../models/locations.ts";
import { MutationResolvers } from "../../generated/graphql.ts";
import { GraphQLError } from "graphql";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export const locationMutations: MutationResolvers = {
    locationCreate: async (parent, args, context, info) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info ${info}\n
        `)
        const { location } = args
        // inner checks for area and other children dependency
        const newLocation = new Location({
            ...location,
            createdBy: context?.user?.uuid,
            updatedBy: context?.user?.uuid,
            status: 'active',
        })
        const newLocationSaved = await newLocation.save()
        return newLocationSaved.toObject()
    },
    locationUpdate: async (parent, args, context, info) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info ${info}\n
        `)
        const { location } = args
        const locationValue = await Location.findOne({ uuid: location?.uuid }).lean()
        if (!locationValue) {
            throw new GraphQLError(ReasonPhrases.NOT_FOUND, {
                extensions: {
                    code: StatusCodes.NOT_FOUND,
                    http: { status: StatusCodes.NOT_FOUND }
                }
            })
        }
        const updatedLocationValue = {
            ...location,
            updatedBy: context?.user?.uuid,
            updatedAt: new Date().toISOString()
        }
        const updatedLocation = await Location.findOneAndUpdate({ uuid: location?.uuid }, { ...updatedLocationValue }, { upsert: true }) as unknown as LocationDocument
        return updatedLocation?.toObject()
    },
    locationDelete: async (parent, args, context, info) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info ${info}\n
        `)
        const { location } = args
        const locationValue = await Location.findOne({ uuid: location?.uuid }).lean()
        if (!locationValue) {
            throw new GraphQLError(ReasonPhrases.NOT_FOUND, {
                extensions: {
                    code: StatusCodes.NOT_FOUND,
                    http: { status: StatusCodes.NOT_FOUND }
                }
            })
        }
        const deletedLocation = await Location.findOneAndUpdate({ uuid: location?.uuid }, {
            deleted: true,
            deletedAt: new Date().toISOString(),
            updatedBy: context?.user?.uuid,
            deletedReason: location?.reason,
            deletedNote: location?.note
        }, { upsert: true }) as unknown as LocationDocument
        return deletedLocation?.toObject()
    },
    warehouseCreate: async (parent, args, context, info) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info ${info}\n
        `)
        const { warehouse } = args
        // inner checks for area and other children dependency
        const newWarehouse = new Warehouse({
            ...warehouse,
            createdBy: context?.user?.uuid,
            updatedBy: context?.user?.uuid,
            status: 'active',
        })
        const newWarehouseSaved = await newWarehouse.save()
        return newWarehouseSaved.toObject()
    },
    warehouseUpdate: async (parent, args, context, info) => {
        console.log(
            `parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info ${info}\n`
        )
        const { warehouse } = args
        const availableWarehouse = await Warehouse.findOne({ uuid: warehouse?.uuid }).lean() as unknown as WarehouseDocument
        if (!availableWarehouse) {
            throw new GraphQLError(ReasonPhrases.NOT_FOUND + ' No Warehouse with the given uuid. '+warehouse?.uuid, {
                extensions: {
                    code: StatusCodes.NOT_FOUND,
                    http: { status: StatusCodes.NOT_FOUND }
                }
            })
        }
        const uuid = warehouse?.uuid
        
        delete warehouse.uuid

        const updatedWarehouse = await Warehouse.findOneAndUpdate({ uuid }, {
            ...warehouse,
            updatedBy: context?.user?.uuid,
            updatedAt: new Date().toISOString()
        }, { upsert: true }) as unknown as WarehouseDocument

        return updatedWarehouse?.toObject()
    },
    warehouseDelete: async (parent, args, context, info) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info ${info}\n
        `)
        const { warehouse } = args
        const availableWarehouse = await Warehouse.findOne({ uuid: warehouse?.uuid }).lean() as unknown as WarehouseDocument
        if (!availableWarehouse) {
            throw new GraphQLError(ReasonPhrases.NOT_FOUND + ' No Warehouse with the given uuid. '+warehouse?.uuid, {
                extensions: {
                    code: StatusCodes.NOT_FOUND,
                    http: { status: StatusCodes.NOT_FOUND }
                }
            })
        }

        const uuid = warehouse?.uuid

        const deletedWarehouse = await Warehouse.findOneAndUpdate({ uuid }, {
            deleted: true,
            deletedAt: new Date().toISOString(),
            updatedBy: context?.user?.uuid,
            deletedReason: warehouse?.reason,
            deletedNote: warehouse?.note
        }, { upsert: true }) as unknown as WarehouseDocument
        
        return deletedWarehouse?.toObject()
    },
    areaCreate: async (parent, args, context, info) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info ${info}\n
        `)
        const { area } = args
        // inner checks for area and other children dependency
        const newArea = new Area({
            ...area,
            createdBy: context?.user?.uuid,
            updatedBy: context?.user?.uuid,
            status: 'active',
        })
        const newAreaSaved = await newArea.save()
        return newAreaSaved.toObject()
    },
    rackCreate: async (parent, args, context, info) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info ${info}\n
        `)
        const { rack } = args
        // inner checks for area and other children dependency
        const newRack = new Rack({
            ...rack,
            createdBy: context?.user?.uuid,
            updatedBy: context?.user?.uuid,
            status: 'active',
        })
        const newRackSaved = await newRack.save()
        return newRackSaved.toObject()
    },
    shelfCreate: async (parent, args, context, info) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info ${info}\n
        `)
        const { shelf } = args
        // inner checks for area and other children dependency
        const newShelf = new Shelf({
            ...shelf,
            createdBy: context?.user?.uuid,
            updatedBy: context?.user?.uuid,
            status: 'active',
        })
        const newShelfSaved = await newShelf.save()
        return newShelfSaved.toObject()
    },
    binCreate: async (parent, args, context, info) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info ${info}\n
        `)
        const { bin } = args
        // inner checks for area and other children dependency
        const newBin = new Bin({
            ...bin,
            createdBy: context?.user?.uuid,
            updatedBy: context?.user?.uuid,
            status: 'active',
        })
        const newBinSaved = await newBin.save()
        return newBinSaved.toObject()
    }
}