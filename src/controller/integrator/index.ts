import { Request, Response } from "express"
import { ExternalIntegratorAuditLog } from "../../models/externalIntegratorAuditLog.ts";
import axios, { AxiosError } from "axios";
import { saveProjectItemsIntoDb, saveAllJetbuiltProjectsIntoDb, saveAllJetbuiltPurchaseOrdersIntoDb } from "./scripts/index.ts";

async function pullProjectItems(req: Request, res: Response) {
    try {
        res.sendStatus(200);
        await saveProjectItemsIntoDb();
    } catch (err: any) {
        console.log("*** error *** \n");
        console.log(err instanceof AxiosError ? err.response?.status : "");
        console.log(err instanceof AxiosError ? err.response?.statusText : "");
        console.log(err instanceof AxiosError ? err.response?.data : err);

        if (!axios.isAxiosError(err)) {
            const log = new ExternalIntegratorAuditLog({
                success: false,
                error: {
                    err: `${err.message}\n\n${err.stack}`
                },
                type: "GLOBAL"
            })

            await log.save();
        }

        // res.sendStatus(500);
    }
}

async function pullProjects(req: Request, res: Response) {
    try {
        res.sendStatus(200);
        await saveAllJetbuiltProjectsIntoDb();
    } catch (err: any) {
        console.log("*** error *** \n");
        console.log(err instanceof AxiosError ? err.response?.status : "");
        console.log(err instanceof AxiosError ? err.response?.statusText : "");
        console.log(err instanceof AxiosError ? err.response?.data : err);

        if (!axios.isAxiosError(err)) {
            const log = new ExternalIntegratorAuditLog({
                success: false,
                error: {
                    err: `${err.message}\n\n${err.stack}`
                },
                type: "GLOBAL"
            })

            await log.save();
        }

        // res.sendStatus(500);
    }
}

async function pullPurchaseOrders(req: Request, res: Response) {
    try {
        res.sendStatus(200);
        await saveAllJetbuiltPurchaseOrdersIntoDb();
    } catch (err: any) {
        console.log("*** error *** \n");
        console.log(err instanceof AxiosError ? err.response?.status : "");
        console.log(err instanceof AxiosError ? err.response?.statusText : "");
        console.log(err instanceof AxiosError ? err.response?.data : err);

        if (!axios.isAxiosError(err)) {
            const log = new ExternalIntegratorAuditLog({
                success: false,
                error: {
                    err: `${err.message}\n\n${err.stack}`
                },
                type: "GLOBAL"
            })

            await log.save();
        }

        // res.sendStatus(500);
    }
}

export default { pullProjectItems, pullProjects, pullPurchaseOrders }