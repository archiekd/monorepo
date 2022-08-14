// import DataLoader, { BatchLoadFn } from "dataloader"
// import { getConnection } from "typeorm"
// import { addResolveFunctionsToSchema } from "apollo-server-express"
// import { GraphQLSchema } from "graphql"

// export const addDataLoaderResolvers = (schema: GraphQLSchema) => {
//   return addResolveFunctionsToSchema({
//     schema,
//     resolvers: generateResolversFromModels(),
//     resolverValidationOptions: {
//       allowResolversNotInSchema: true
//     }
//   })
// }

// export const generateResolversFromModels = () => {
//   const resolvers: any = {}

//   getConnection().entityMetadatas.forEach((entityMetadata) => {
//     const resolverName = entityMetadata.targetName

//     if (!resolverName) return

//     if (!resolvers[resolverName]) resolvers[resolverName] = {}
//     entityMetadata.relations.forEach((relation) => {
//       // make sure not to override method if it was defined by user
//       resolvers[resolverName][relation.propertyName] = (parent: any, args: any, context: any, info: any) => {
//         // make sure not to override method if it was defined by user
//         if (parent[`__${relation.propertyName}__`] !== undefined) return parent[`__${relation.propertyName}__`]

//         if (!context.dataLoaders) context.dataLoaders = {}

//         if (!context.dataLoaders[resolverName]) context.dataLoaders[resolverName] = {}

//         // define data loader for this method if it was not defined yet
//         if (!context.dataLoaders[resolverName][relation.propertyName]) {
//           context.dataLoaders[resolverName][relation.propertyName] = new DataLoader(async (keys: any) => {
//             const entities = keys.map((key: any) => key.parent)

//             return getConnection()
//               .relationIdLoader.loadManyToManyRelationIdsAndGroup(relation, entities)
//               .then((groups) => groups.map((group) => group.related))
//           })
//         }
//         return context.dataLoaders[resolverName][relation.propertyName].load({
//           parent,
//           args,
//           context,
//           info
//         })
//       }
//     })
//   })

//   return resolvers
// }

// export const generateDataloaders = () => {
//   const dataLoader = {
//     initialized: true,
//     loaders: {}
//   }

//   const loaders = dataLoader.loaders!

//   getConnection().entityMetadatas.forEach((entityMetadata) => {
//     const resolverName = entityMetadata.targetName
//     if (!resolverName) {
//       return
//     }

//     if (!loaders[resolverName]) {
//       loaders[resolverName] = {}
//     }

//     entityMetadata.relations.forEach((relation) => {
//       // define data loader for this method if it was not defined yet
//       if (!loaders[resolverName][relation.propertyName]) {
//         loaders[resolverName][relation.propertyName] = new DataLoader((entities) => {
//           return getConnection()
//             .relationIdLoader.loadManyToManyRelationIdsAndGroup(relation, entities)
//             .then((groups) => groups.map((group) => group.related))
//         })
//       }
//     })
//   })

//   return dataLoader
// }
