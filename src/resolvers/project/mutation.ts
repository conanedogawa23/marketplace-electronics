import { Project, ProjectDocument } from "../../models/project.ts";
import { MutationResolvers } from "../../generated/graphql.ts";
import { GraphQLError } from "graphql";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export const projectMutations: MutationResolvers = {
    projectCreate: async (parent: any, args: any, context: any, info: any) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info ${info}\n
        `)
        const { project } = args
        const newProject = new Project({
            ...project,
            createdBy: context?.user?.uuid,
            updatedBy: context?.user?.uuid
        })

        const newProjectValue = await newProject.save()
        return newProjectValue.toObject()
    },
    projectDelete: async (parent: any, args: any, context: any, info: any) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info ${info}\n
        `)
        const { uuid } = args
        const availableProject = await Project.findOne({ uuid }).lean()
        if (!availableProject) {
            throw new GraphQLError(ReasonPhrases.NOT_FOUND, {
                extensions: {
                    code: StatusCodes.NOT_FOUND,
                    http: { status: StatusCodes.NOT_FOUND }
                }
            })
        }
        const deletedProject = await Project.findOneAndUpdate({ uuid }, {
            deleted: true,
            deletedAt: new Date()
        }, { new: true }) as unknown as ProjectDocument
        return deletedProject?.toObject()
    },
    projectUpdate: async (parent: any, args: any, context: any, info: any) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info ${info}\n
        `)
        const { project } = args
        const availableProject = await Project.findOne({ uuid: project?.uuid }).lean()
        if (!availableProject) {
            throw new GraphQLError(ReasonPhrases.NOT_FOUND, {
                extensions: {
                    code: StatusCodes.NOT_FOUND,
                    http: { status: StatusCodes.NOT_FOUND }
                }
            })
        }
        const updatedProject = await Project.findOneAndUpdate({ uuid: project?.uuid }, {
            ...project
        }, { new: true }) as unknown as ProjectDocument
        return updatedProject?.toObject()
    }
}