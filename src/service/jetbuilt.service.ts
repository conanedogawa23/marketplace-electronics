// Jetbuilt API Client

import axios, { AxiosResponse, AxiosInstance, AxiosHeaders } from "axios";
import { AllProjects } from "../interfaces/jetbuilt/projects.response.ts";
import { LineItem, ProjectItemsResponse } from "../interfaces/jetbuilt/projectItems.response.ts";
import { ExternalIntegratorAuditLog, ErrorLog, RequestLog, IExternalIntegratorAuditLog } from "../models/externalIntegratorAuditLog.ts";
import { PurchaseOrderObject, PurchaseOrderResponse } from "../interfaces/jetbuilt/purchaseOrders.response.ts";
import { sleep } from "../utils/index.ts";

type ApiClient = (headers?: AxiosHeaders, params?: any) => AxiosInstance;

interface jetbuiltParams {
    page?: string
}

interface purchaseOrdersParams extends jetbuiltParams {
    project_id?: string
    min_created_at?: string
    max_created_at?: string
    min_updated_at?: string
    max_updated_at?: string
}

class JetBuiltApi {

    constructor(baseUrl: string, apiToken: string, version: string) {
        this.#client = function (headers, params) {
            const client: AxiosInstance = axios.create({
                baseURL: baseUrl,
                headers: {
                    "Authorization": `Token token=${apiToken}`,
                    "Accept": `${version}`,
                    ...headers,
                },
                params
            })

            // delay requests
            // client.interceptors.request.use(async (config) => {
            //     await sleep(200);
            //     return config;
            // }, (error) => Promise.reject(error));

            client.interceptors.response.use(async (config) => await this.#requestSuccess(config), async (err) => await this.#requestError(err))

            return client;
        }
    }

    #client: ApiClient;

    #getLinks(links: string) {
        const pattern = /<([^>]+)\?[^>]*page=(\d+)[^>]*>; rel="([^"]+)"/g;
        let matches;
        const result: any = {};

        while ((matches = pattern.exec(links)) !== null) {
            const link = matches[1];
            const page = matches[2];
            const rel = matches[3];
            result[rel] = { link, page };
        }

        return result;
    }

    async #requestSuccess(config: AxiosResponse) {
        const request = config.config;
        const { method, baseURL, url, headers, params } = request;
        const { status } = config;

        const requestConfig = {
            method,
            baseURL,
            url,
            params,
            headers: headers
        }

        const auditLog: IExternalIntegratorAuditLog = {
            type: "JETBUILT API",
            external_resource: {
                requestConfig,
                statusCode: String(status)
            }
        }

        const doc = new ExternalIntegratorAuditLog(auditLog);
        await doc.save();

        return config;
    }

    async #requestError(error: any) {
        if (axios.isAxiosError(error)) {
            const { config } = error;
            const requestConfig: RequestLog = {
                method: config?.method,
                baseURL: config?.baseURL,
                url: config?.url,
                params: config?.params,
                headers: config?.headers
            }

            const errorObject: ErrorLog = {
                code: error.code,
                status: String(error.response?.status) || String(error.status),
                message: error.response?.statusText || error.message,
                data: error.response?.data
            }

            const auditLog: IExternalIntegratorAuditLog = {
                success: false,
                type: "JETBUILT API",
                error: errorObject,
                external_resource: {
                    requestConfig,
                    statusCode: String(error.response?.status)
                }
            }

            const doc = new ExternalIntegratorAuditLog(auditLog);
            await doc.save();
        }

        return Promise.reject(error);
    }

    async #collectPaginatedResults(url: string, params?: jetbuiltParams | purchaseOrdersParams) {
        let results: any = {};
        let nextLink: any = true;
        let page = "0";
        let reqUrl = url;

        while (nextLink) {
            reqUrl = url;
            if (page !== "0") {
                // const [base, params] = reqUrl.split('?');
                // console.log(base, params);
                // reqUrl = base + `?page=${page}`
                // reqUrl = params ? reqUrl + `&${params}` : reqUrl;
                params = { ...params, page }
            }

            console.log(reqUrl, params);
            const response = await this.#client(undefined, params).get(`${reqUrl}`);
            const responseData = response.data;

            results[page] = responseData;

            const links = this.#getLinks(response.headers["link"]);
            if (links) {
                nextLink = links["next"] || "";
                page = nextLink?.link ? nextLink.page : 0;
            }
        }

        return results;
    }

    // API FUNCTIONS
    async GetProject(projectId: number | string) {
        const response = await this.#client().get(`/projects/${projectId}`);
        return response.data;
    }

    async GetAllProjects() {
        const response: { [x: string]: AllProjects } = await this.#collectPaginatedResults("/projects");

        let projects: AllProjects = [];
        Object.keys(response).forEach(pageNumber => {
            projects.push(...response[pageNumber])
        })

        return projects;
    }

    async GetAllProjectItems(projectId: number | string) {
        const response: { [x: string]: ProjectItemsResponse } = await this.#collectPaginatedResults(`/projects/${projectId}/items`);

        let projectItems: LineItem[] = [];
        Object.keys(response).forEach(pageNumber => {
            projectItems.push(...response[pageNumber].line_items)
        })

        return projectItems;
    }

    async GetPurchaseOrder(orderId: number | string) {
        const response = await this.#client().get(`/purchase_orders/${orderId}`);
        return response.data;
    }

    async GetAllPurchaseOrders(filters?: purchaseOrdersParams) {
        const response: { [x: string]: PurchaseOrderResponse } = await this.#collectPaginatedResults(`/purchase_orders`, filters);

        let purchaseOrder: PurchaseOrderObject[] = [];
        Object.keys(response).forEach(pageNumber => {
            purchaseOrder.push(...response[pageNumber])
        })

        return purchaseOrder;
    }

    async GetPurchasingSource(sourceId: number | string) {
        const response = await this.#client().get(`/purchasing/sources/${sourceId}`);
        return response.data;
    }

    async GetClient(clientId: number | string) {
        const result = await this.#client().get(`clients/${clientId}`);
        return result.data;
    }
}

export default JetBuiltApi