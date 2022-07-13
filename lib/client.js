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
            if (body === null) {
                options.body = ""
            } else {
                options.body = JSON.stringify(body)
            }
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

    async customerCurrentUsage(customerId){
        let response;
        await this.apiRequest(`/customers/${customerId}/current_usage`, 'get')
            .then(res => response = res.customer_usage);

        return response;
    }

    // INVOICES

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

    async findInvoice(identifier){
        let response;
        await this.apiRequest(`/invoices/${identifier}`, 'get')
            .then(res => response = res.invoice);

        return response;
    }

    async findAllInvoices(options = null){
        let path = `/invoices`

        if (options !== null && JSON.stringify(options) !== '{}'){
            path = `/invoices?${new URLSearchParams(options).toString()}`
        }

        let response;
        await this.apiRequest(path, 'get')
            .then(res => response = res.invoices);

        return response;
    }

    // SUBSCRIPTIONS

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

    // WEBHOOKS

    async webhookPublicKey(){
        let response;
        await this.apiRequest(`/webhooks/public_key`, 'get').then(res => response = res);

        let buff = new Buffer.from(response, 'base64');
        let key = buff.toString('ascii');

        return key;
    }

    // APPLY ADD-ON

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

    async updateBillableMetric(inputBillableMetric, identifier){
        let response;
        await this.apiRequest(`/billable_metrics/${identifier}`, 'put', inputBillableMetric.wrapAttributes())
            .then(res => response = res.billable_metric);

        return response;
    }

    async findBillableMetric(identifier){
        let response;
        await this.apiRequest(`/billable_metrics/${identifier}`, 'get')
            .then(res => response = res.billable_metric);

        return response;
    }

    async destroyBillableMetric(identifier){
        let response;
        await this.apiRequest(`/billable_metrics/${identifier}`, 'delete')
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

    // COUPONS

    async createCoupon(inputCoupon){
        let response;
        await this.apiRequest(`/coupons`, 'post', inputCoupon.wrapAttributes())
            .then(res => response = res.coupon);

        return response;
    }

    async updateCoupon(inputCoupon, identifier){
        let response;
        await this.apiRequest(`/coupons/${identifier}`, 'put', inputCoupon.wrapAttributes())
            .then(res => response = res.coupon);

        return response;
    }

    async findCoupon(identifier){
        let response;
        await this.apiRequest(`/coupons/${identifier}`, 'get')
            .then(res => response = res.coupon);

        return response;
    }

    async destroyCoupon(identifier){
        let response;
        await this.apiRequest(`/coupons/${identifier}`, 'delete')
            .then(res => response = res.coupon);

        return response;
    }

    async findAllCoupons(options = null){
        let path = `/coupons`

        if (options !== null && JSON.stringify(options) !== '{}'){
            path = `/coupons?${new URLSearchParams(options).toString()}`
        }

        let response;
        await this.apiRequest(path, 'get')
            .then(res => response = res.coupons);

        return response;
    }

    // ADD-ONS

    async createAddOn(inputAddOn){
        let response;
        await this.apiRequest(`/add_ons`, 'post', inputAddOn.wrapAttributes())
            .then(res => response = res.add_on);

        return response;
    }

    async updateAddOn(inputAddOn, identifier){
        let response;
        await this.apiRequest(`/add_ons/${identifier}`, 'put', inputAddOn.wrapAttributes())
            .then(res => response = res.add_on);

        return response;
    }

    async findAddOn(identifier){
        let response;
        await this.apiRequest(`/add_ons/${identifier}`, 'get')
            .then(res => response = res.add_on);

        return response;
    }

    async destroyAddOn(identifier){
        let response;
        await this.apiRequest(`/add_ons/${identifier}`, 'delete')
            .then(res => response = res.add_on);

        return response;
    }

    async findAllAddOns(options = null){
        let path = `/add_ons`

        if (options !== null && JSON.stringify(options) !== '{}'){
            path = `/add_ons?${new URLSearchParams(options).toString()}`
        }

        let response;
        await this.apiRequest(path, 'get')
            .then(res => response = res.add_ons);

        return response;
    }

    // ORGANIZATIONS

    async updateOrganization(inputOrganization){
        let response;
        await this.apiRequest(`/organizations`, 'put', inputOrganization.wrapAttributes())
            .then(res => response = res.organization);

        return response;
    }

    // PLANS

    async createPlan(inputPlan){
        let response;
        await this.apiRequest(`/plans`, 'post', inputPlan.wrapAttributes())
            .then(res => response = res.plan);

        return response;
    }

    async updatePlan(input, identifier){
        let response;
        await this.apiRequest(`/plans/${identifier}`, 'put', input.wrapAttributes())
            .then(res => response = res.plan);

        return response;
    }

    async findPlan(identifier){
        let response;
        await this.apiRequest(`/plans/${identifier}`, 'get')
            .then(res => response = res.plan);

        return response;
    }

    async destroyPlan(identifier){
        let response;
        await this.apiRequest(`/plans/${identifier}`, 'delete')
            .then(res => response = res.plan);

        return response;
    }

    async findAllPlans(options = null){
        let path = `/plans`

        if (options !== null && JSON.stringify(options) !== '{}'){
            path = `/plans?${new URLSearchParams(options).toString()}`
        }

        let response;
        await this.apiRequest(path, 'get')
            .then(res => response = res.plans);

        return response;
    }
}

class LagoApiError extends Error {}
