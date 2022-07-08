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
        await this-this.apiRequest(`/events/${transactionId}`, 'get')
            .then(res => response = res.event);

        return response;
    }

    async createCustomer(inputCustomer){
        let response;
        await this.apiRequest(`/customers`, 'post', inputCustomer.wrapAttributes())
            .then(res => response = res.customer);

        return response;
    }

    async customerCurrentUsage(customerId){
        let response;
        await this.apiRequest(`/customers/${customerId}/current_usage`, 'get')
            .then(res => response = res.customer_usage);

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

    async downloadInvoice(input) {
        let response;
        await this.apiRequest(`/invoices/${input}/download`, 'post')
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

        let buff = new Buffer.from(response, 'base64');
        let key = buff.toString('ascii');

        return key;
    }

    async applyAddOn(inputAppliedAddOn){
        let response;
        await this.apiRequest(`/applied_add_ons`, 'post', inputAppliedAddOn.wrapAttributes())
            .then(res => response = res.applied_add_on);

        return response;
    }
}

class LagoApiError extends Error {}
