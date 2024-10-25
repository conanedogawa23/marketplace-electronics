import { Location } from "graphql"

export const categoryLookupAggregateQuery = {
    $lookup: {
        from: 'categories',
        let: { category: '$category' },
        pipeline: [{
            $match: {
                $expr: {
                    $and: [
                        { $eq: ['$uuid', '$$category'] },
                        { $eq: ['$deleted', false] }
                    ]
                }
            },
        },
        {
            $project: {
                _id: 0,
                uuid: 1,
                name: 1
            }
        }
        ],
        as: 'category'
    }
}

export const manufacturerLookupAggregateQuery = {
    $lookup: {
        from: 'manufacturers',
        let: { manufacturer: '$manufacturer' },
        pipeline: [{
            $match: {
                $expr: {
                    $and: [
                        { $eq: ['$uuid', '$$manufacturer'] },
                        { $eq: ['$deleted', false] }
                    ]
                }
            },
        },
        {
            $project: {
                _id: 0,
                uuid: 1,
                name: 1
            }
        }
        ],
        as: 'manufacturer'
    }
}

export const uomLookupAggregateQuery = {
    $lookup: {
        from: 'uoms',
        let: { uom: '$uom' },
        pipeline: [{
            $match: {
                $expr: {
                    $and: [
                        { $eq: ['$uuid', '$$uom'] },
                        { $eq: ['$deleted', false] }
                    ]
                }
            },
        },
        {
            $project: {
                _id: 0,
                uuid: 1,
                name: 1
            }
        }
        ],
        as: 'uom'
    }
}

export const attachmentLookupAggregateQuery = {
    $lookup: {
        from: 'attachments',
        let: { attachments: '$attachments' },
        pipeline: [
            {
                $match: {
                    $expr: {
                        $in: ['$uuid', '$$attachments']
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    uuid: 1,
                    name: 1,
                    url: 1,
                    type: 1,
                    size: 1,
                    createdAt: 1,
                    updatedAt: 1
                }
            }
        ],
        as: 'attachments'
    }
}


export const vendorLookupAggregateQuery = {
    $lookup: {
        from: 'vendors',
        let: { vendors: '$vendors' },
        pipeline: [
            {
                $match: {
                    $expr: {
                        $in: ['$uuid', '$$vendors']
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    uuid: 1,
                    name: 1
                }
            }
        ],
        as: 'vendors'
    }
}

export const pricingLookupAggregateQuery = {
    $lookup: {
        from: 'pricings',
        let: { pricing: '$price' },
        pipeline: [
            {
                $match: {
                    $expr: {
                        $and: [
                            {
                                $eq: ['$uuid', '$$pricing']
                            },
                            {
                                $eq: ['$deleted', false]
                            }
                        ]
                    }
                }
            }
        ],
        as: 'pricing'
    }
}

export const serializedProductLookupAggregateQuery = {
    $lookup: {
        from: 'serializedproducts',
        let: { product: '$uuid' },
        pipeline: [
            { $match: { $expr: { $and: [{ $eq: ['$deleted', false] }, { $eq: ['$product', '$$product'] }] } } },
            { $project: { _id: 0, uuid: 1, number: 1, project: 1 } }
        ],
        as: 'serializedProducts'
    }
}

export const receiveStockTrackingLookupAggregateQuery = {
    $lookup: {
        from: 'receivestocktrackings',
        let: { product: '$uuid' },
        pipeline: [
            { $match: { $expr: { $and: [{ $eq: ['$deleted', false] }, { $eq: ['$product', '$$product'] }] } } },
            { $project: { received_quantity: 1, location: 1, note: 1, product: 1, location_product: 1, type: 1 } }
        ],
        as: 'receiveStockProducts'
    }
}

export const locationProductLookupAggregateQuery = {
    $lookup: {
        from: 'locationproducts',
        let: { product: '$uuid' },
        pipeline: [
            { $match: { $expr: { $eq: ['$product', '$$product'] } } },
            {
                $lookup: {
                    from: 'locations',
                    let: { location: '$location' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ['$uuid', '$$location']
                                }
                            }
                        },
                        {
                            $lookup: {
                                from: 'areas',
                                let: { area: '$area' },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $eq: ['$uuid', '$$area']
                                            }
                                        }
                                    },
                                    {
                                        $project: {
                                            _id: 0,
                                            uuid: 1,
                                            name: 1
                                        }
                                    }
                                ],
                                as: 'area'
                            }
                        },
                        {
                            $lookup: {
                                from: 'racks',
                                let: { rack: '$rack' },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $eq: ['$uuid', '$$rack']
                                            }
                                        }
                                    },
                                    {
                                        $project: {
                                            _id: 0,
                                            uuid: 1,
                                            name: 1
                                        }
                                    }
                                ],
                                as: 'rack'
                            }
                        },
                        {
                            $lookup: {
                                from: 'shelves',
                                let: { shelf: '$shelf' },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $eq: ['$uuid', '$$shelf']
                                            }
                                        }
                                    },
                                    {
                                        $project: {
                                            _id: 0,
                                            uuid: 1,
                                            name: 1
                                        }
                                    }
                                ],
                                as: 'shelf'
                            }
                        },
                        {
                            $lookup: {
                                from: 'bins',
                                let: { bin: '$bin' },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $eq: ['$uuid', '$$bin']
                                            }
                                        }
                                    },
                                    {
                                        $project: {
                                            _id: 0,
                                            uuid: 1,
                                            name: 1
                                        }
                                    }
                                ],
                                as: 'bin'
                            }
                        },
                        {
                            $lookup: {
                                from : 'warehouses',
                                let : { warehouse : '$warehouse' },
                                pipeline : [
                                    {
                                        $match : {
                                            $expr : {
                                                $eq : ['$uuid', '$$warehouse']
                                            }
                                        }
                                    },
                                    {
                                        $project : {
                                            _id : 0,
                                            uuid : 1,
                                            name : 1
                                        }
                                    }
                                ],
                                as : 'warehouse'
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                uuid: 1,
                                name: 1,
                                area: 1,
                                rack: 1,
                                shelf: 1,
                                bin: 1,
                                warehouse : 1
                            }
                        },
                        { $unwind: { path: '$area', preserveNullAndEmptyArrays: true } },
                        { $unwind: { path: '$rack', preserveNullAndEmptyArrays: true } },
                        { $unwind: { path: '$shelf', preserveNullAndEmptyArrays: true } },
                        { $unwind: { path: '$bin', preserveNullAndEmptyArrays: true } },
                        { $unwind: { path: '$warehouse', preserveNullAndEmptyArrays: true } }
                    ],
                    as: 'location'
                }
            },
            { $unwind: { path: '$location', preserveNullAndEmptyArrays: true } },
            { $project: { location: 1, quantity: 1, onUsed: 1,  _id: 0 } }
        ],
        as: 'locations'
    }
}

export const activityLogAggregateQuery = {
    $lookup: {
        from: 'activitylogs',
        let: { activityId: '$uuid' },
        pipeline: [
            {
                $match: { $expr: { $eq: ['$activityId', '$$activityId'] } }
            }
        ],
        as: 'activityLog'
    }
}