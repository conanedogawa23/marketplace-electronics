import { ExternalIntegratorAuditLog } from "../models/externalIntegratorAuditLog.ts";
import axios, { AxiosError } from "axios";
import { NextFunction, Request, Response } from "express"

export async function isAuthorised(req: Request, res: Response, next: NextFunction) {
    try {

        const headers = req.headers;
        const token = headers["x-api-key"];

        /* MISSING TOKEN */
        if (!token) {
            const log = new ExternalIntegratorAuditLog({
                success: false,
                error: {
                    err: `Missing/Blank x-api-key header; Request to - ${req.path}`
                },
                type: "EXTERNAL INTEGRATOR AUTH MIDDLEWARE"
            })

            await log.save();
            res.sendStatus(400);
        }

        /* TOKEN MISMATCH */
        if (token !== process.env.EXTERNAL_INTEGRATOR_AUTH_TOKEN) {
            const log = new ExternalIntegratorAuditLog({
                success: false,
                error: {
                    err: `Auth token incorrect; Request to - ${req.path}`
                },
                type: "EXTERNAL INTEGRATOR AUTH MIDDLEWARE"
            })

            await log.save();
            res.sendStatus(400);
        }

        next();
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
                type: "EXTERNAL INTEGRATOR AUTH MIDDLEWARE"
            })

            await log.save();
        }

        res.sendStatus(500);
    }
}