export const ownerLookupAggregateQuery = {
    $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "uuid",
        as: "owner"
    }
}


export const clientLookupAggregateQuery = {
    $lookup: {
        from: "clients",
        localField: "client",
        foreignField: "uuid",
        as: "client"
    }
}