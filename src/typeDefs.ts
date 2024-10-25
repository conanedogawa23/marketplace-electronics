import { readFile } from "fs/promises"
import path from "path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseGraphQLConfig = await readFile(path.join(__dirname, 'schema.graphql'), 'utf-8')
const userGraphQLConfig = await readFile(path.join(__dirname, 'resolvers/users/user.graphql'), 'utf-8')
const productGraphQLConfig = await readFile(path.join(__dirname, 'resolvers/product/product.graphql'), 'utf-8')
const categoryGraphQLConfig = await readFile(path.join(__dirname, 'resolvers/category/category.graphql'), 'utf-8')
const manufacturerGraphQLConfig = await readFile(path.join(__dirname, 'resolvers/manufacturer/manufacturer.graphql'), 'utf-8')
const uomGraphQLConfig = await readFile(path.join(__dirname, 'resolvers/uom/uom.graphql'), 'utf-8')
const vendorGraphQLConfig = await readFile(path.join(__dirname, 'resolvers/vendor/vendor.graphql'), 'utf-8')
const departmentGraphQLConfig = await readFile(path.join(__dirname, 'resolvers/department/department.graphql'), 'utf-8')
const projectGraphQLConfig = await readFile(path.join(__dirname, 'resolvers/project/project.graphql'), 'utf-8')
const inventoryGraphQLConfig = await readFile(path.join(__dirname, 'resolvers/inventory/inventory.graphql'), 'utf-8')
const locationGraphQLConfig = await readFile(path.join(__dirname, 'resolvers/location/location.graphql'), 'utf-8')
const locationProductGraphQLConfig = await readFile(path.join(__dirname, 'resolvers/locationProduct/locationProduct.graphql'), 'utf-8')
const vendorProductGraphQLConfig = await readFile(path.join(__dirname, 'resolvers/vendorProduct/vendorProduct.graphql'), 'utf-8')
const purchaseOrderGraphQLConfig = await readFile(path.join(__dirname, 'resolvers/purchaseOrder/purchaseOrder.graphql'), 'utf-8')
const projectProductGraphQLConfig = await readFile(path.join(__dirname, 'resolvers/projectProduct/projectProduct.graphql'), 'utf-8')
const receiveOrderGraphQLConfig = await readFile(path.join(__dirname, 'resolvers/receiveOrder/receiveOrder.graphql'), 'utf-8')
const activityGraphQL = await readFile(path.join(__dirname, 'resolvers/activity/activity.graphql'), 'utf-8')

export const typeDefs = [
    baseGraphQLConfig,
    userGraphQLConfig,
    productGraphQLConfig,
    categoryGraphQLConfig,
    manufacturerGraphQLConfig,
    uomGraphQLConfig,
    vendorGraphQLConfig,
    departmentGraphQLConfig,
    projectGraphQLConfig,
    inventoryGraphQLConfig,
    locationGraphQLConfig,
    locationProductGraphQLConfig,
    vendorProductGraphQLConfig,
    purchaseOrderGraphQLConfig,
    projectProductGraphQLConfig,
    receiveOrderGraphQLConfig,
    activityGraphQL
]