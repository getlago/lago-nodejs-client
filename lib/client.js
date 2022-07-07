import fetch from 'node-fetch';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const packageJson = require("../package.json");

export default class Client {
    BASE_URL = 'https://api.getlago.com';
    API_PATH = '/api/v1'

    constructor(apiKey, apiUrl) {
        this.apiKey = apiKey;
        this.baseUrl = apiUrl || this.BASE_URL;
    }

    headers = function(method = 'get') {
        let bearer = `Bearer ${this.apiKey}`;
        let headers = {
            'Authorization': bearer,
            'User-Agent': `Lago NodeJS v${packageJson.version}`,
        };

        if (method === 'post' || method === 'delete' || method === 'put') {
            headers['Content-Type'] = 'application/json';
        }

        return headers;
    }

    async apiRequest(path, method, body = null) {
        let fullUrl = `${this.baseUrl}${this.API_PATH}${path}`;
        let requestHeaders = this.headers(method)
        let options = {
            method: method,
            headers: requestHeaders
        }

        if (method === 'post' || method === 'delete' || method === 'put') {
            options.body = JSON.stringify(body)
        }

        let data;
        await fetch(fullUrl, options).then(response => {
            if (response.ok) {
                if (method === 'get') {
                    data = response.text();
                }
                else if (method === 'post' && response.body._readableState.length === 0) {
                    data = true;
                } else {
                    data = response.json();
                }
            } else {
                throw new LagoApiError(`The HTTP status of the response: ${response.status}, URL: ${fullUrl}`);
            }
        });
        return data;
    }

    ////////////// CLIENT METHODS ///////////

    async applyCoupon(inputAppliedCoupon) {
        let response;
        await this.apiRequest('/applied_coupons', 'post', inputAppliedCoupon.wrapAttributes())
            .then(res => response = res.applied_coupon);

        return response;
    }

    async createEvent(inputEvent){
        let response;
        await this.apiRequest(`/events`, 'post', inputEvent.wrapAttributes())
            .then(res => response = res);

        return response;
    }

    async findEvent(transactionId){
        let response;
        await this.apiRequest(`/events/${transactionId}`, 'get')
            .then(res => response = res.event);

        return response;
    }

    async createCustomer(inputCustomer){
        let response;
        await this.apiRequest(`/customers`, 'post', inputCustomer.wrapAttributes())
            .then(res => response = res.customer);

        return response;
    }

    async updateInvoiceStatus(input){
        let body = {
            invoice: {
                status: input.status || null
            }
        }

        let response;
        await this.apiRequest(`/invoices/${input.lagoId}`, 'put', body)
            .then(res => response = res.invoice);

        return response;
    }

    async createSubscription(inputSubscription){
        let response;
        await this.apiRequest(`/subscriptions`, 'post', inputSubscription.wrapAttributes())
            .then(res => response = res.subscription);

        return response;
    }

    async deleteSubscription(input){
        let body = {
            customer_id: input.customerId || null
        }

        let response;
        await this.apiRequest(`/subscriptions`, 'delete', body)
            .then(res => response = res.subscription);

        return response;
    }

    async webhookPublicKey(){
        let response;
        await this.apiRequest(`/webhooks/public_key`, 'get').then(res => response = res);

        let buff = new Buffer(response, 'base64');
        let key = buff.toString('ascii');

        return key;
    }

    async applyAddOn(inputAppliedAddOn){
        let response;
        await this.apiRequest(`/applied_add_ons`, 'post', inputAppliedAddOn.wrapAttributes())
            .then(res => response = res.applied_add_on);

        return response;
    }

    // BILLABLE METRICS

    async createBillableMetric(inputBillableMetric){
        let response;
        await this.apiRequest(`/billable_metrics`, 'post', inputBillableMetric.wrapAttributes())
            .then(res => response = res.billable_metric);

        return response;
    }

    async updateBillableMetric(input, identifier){
        let payload = {}
        if (input.hasOwnProperty('name')) payload.name = input.name;
        if (input.hasOwnProperty('code')) payload.code = input.code;
        if (input.hasOwnProperty('description')) payload.description = input.description;
        if (input.hasOwnProperty('aggregationType')) payload.aggregation_type = input.aggregationType;
        if (input.hasOwnProperty('fieldName')) payload.field_name = input.fieldName;

        let body = {
            billable_metric: payload
        }

        let response;
        await this.apiRequest(`/billable_metrics/${identifier}`, 'put', body)
            .then(res => response = res.billable_metric);

        return response;
    }

    async findBillableMetric(identifier){
        let response;
        await this.apiRequest(`/billable_metrics/${identifier}`, 'get')
            .then(res => response = res.billable_metric);

        return response;
    }

    async destroyBillableMetric(transactionId){
        let response;
        await this.apiRequest(`/billable_metrics/${transactionId}`, 'delete')
            .then(res => response = res.billable_metric);

        return response;
    }

    async findAllBillableMetrics(options = null){
        let path = `/billable_metrics`

        if (options !== null && JSON.stringify(options) !== '{}'){
            path = `/billable_metrics?${new URLSearchParams(options).toString()}`
        }

        let response;
        await this.apiRequest(path, 'get')
            .then(res => response = res.billable_metrics);

        return response;
    }
}

class LagoApiError extends Error {}
