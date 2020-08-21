const { GraphQLServer } = require('graphql-yoga')
const { PrismaClient } = require('@prisma/client')


const prisma = new PrismaClient()

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')

const resolvers = {
    Query,
    Mutation,
    User,
    Link
    // Query: {
    //     info: () => `This is the API`,
    //     feed: async (parent, args, context, info) => {
    //         const allLinks = await context.prisma.link.findMany()
    //         return allLinks
    //     },
    // },
    // Mutation: {
    //     post: (parent, args, context, info) => {
    //         const newLink = context.prisma.link.create({
    //             data: {
    //                 url: args.url,
    //                 description: args.description
    //             }
    //         })
    //         return newLink
    //     },
    //     updateLink: async (parent, args, context, info) => {
    //         const result = await context.prisma.link.update({
    //             data: {
    //                 description: args.description,
    //                 url: args.url
    //             },
    //             where: {
    //                 id: args.id
    //             }
    //         })
    //         return result
    //     },
    //     deleteLink: async (parent, args, context, info) => {
    //         return context.prisma.link.delete({
    //             where: {
    //                 id: args.id
    //             }
    //         })
    //     }
    // }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: request => {
        return {
            ...request,
            prisma,
        }
    }
})

server.start(()=> console.log(`Server is running at 4000`));
