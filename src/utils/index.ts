import e from "express";

export function convertPriceObjectToDollars(cost: any): number {
    /* cents can be equal to 0 so
    the condition "if(cost?.cents)" is not safe to use */
    if (cost && typeof (cost.cents) !== "undefined") return Number(cost.cents) / 100;
    return Number(cost || 0);
}

export async function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function transformFilterFields(filters: any, textSearchFilters?: any, fieldPrefix?: string): any {
    let $and: any[] = [];
    let $or: any[] = [];

    if (filters) {
        /***
         * Temporarily fix for the issue where the filter object contains an array
         */
        // Object.entries(filters).forEach(([key, value]) => {
        //     if (!(value instanceof Array)) $and.push({ [key]: value })
        // });

        Object.entries(filters).forEach(([key, value]) => {
            const keyName = fieldPrefix ? `${fieldPrefix}.${key}` : key;
            if (typeof value === "string") { 
                $or.push({ [keyName]: { $regex: value, $options: "i" } })
            }else{
                $and.push({ [key]: value })
            }
        })
    }


    if (textSearchFilters) {
        Object.entries(textSearchFilters).forEach(([key, value]) => {
            const keyName = fieldPrefix ? `${fieldPrefix}.${key}` : key;
            $or.push({ [keyName]: { $regex: value, $options: "i" } })
        })
    }

    if ($or.length !== 0) $and.push({ $or });
    if ($and.length === 0) return {}

    return { $and }

}