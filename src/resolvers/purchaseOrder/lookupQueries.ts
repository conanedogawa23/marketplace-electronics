export const projectLookupAggregateQuery = {
    $lookup: {
        from: "projects",
        localField: "project",
        foreignField: "uuid",
        as: "project"
    }
}


export const purchasingSourceLookupAggregateQuery = {
    $lookup: {
        from: "purchasingsources",
        localField: "purchasingSource",
        foreignField: "uuid",
        as: "purchasingSource"
    }
}