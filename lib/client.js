import fetch from 'node-fetch';
import { createRequire } from 'module';
import { isJSON } from './helpers/common.js';
import { appendParams } from './helpers/parameters.js';

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
        await fetch(fullUrl, options).then(async (response) => {
            if (response.ok) {
                if (method === 'get') {
                    data = await response.text();

                    if (isJSON(data)) {
                        data = JSON.parse(data);
                    }
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

    async findAllAppliedCoupons(options = null){
      let path = `/applied_coupons`

      if (options !== null && JSON.stringify(options) !== '{}'){
        path = `/applied_coupons?${new URLSearchParams(options).toString()}`
      }

      let response;
      await this.apiRequest(path, 'get')
        .then(res => response = res.applied_coupons);

      return response;
    }

    async createEvent(inputEvent){
        let response;
        await this.apiRequest(`/events`, 'post', inputEvent.wrapAttributes())
            .then(res => response = res);

        return response;
    }

    async createBatchEvent(inputEvent){
        let response;
        await this.apiRequest(`/events/batch`, 'post', inputEvent.wrapAttributes())
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

    async customerCurrentUsage(externalCustomerId, externalSubscriptionId){
        let response;
        await this.apiRequest(`/customers/${externalCustomerId}/current_usage?external_subscription_id=${externalSubscriptionId}`, 'get')
            .then(res => response = res.customer_usage);

        return response;
    }

    async findCustomer(externalCustomerId){
        let response;
        await this.apiRequest(`/customers/${externalCustomerId}`, 'get')
            .then(res => response = res.customer);

        return response;
    }

    async findAllCustomers(options = null) {
        let path = appendParams('/customers', options);

        let response;
        await this.apiRequest(path, 'get')
            .then(res => response = res.customers);

        return response;
    }

    // INVOICES

    async updateInvoicePaymentStatus(input){
        let body = {
            invoice: {
                paymentStatus: input.paymentStatus || null
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

    async retryInvoicePayment(input) {
      let response;
      await this.apiRequest(`/invoices/${input}/retry_payment`, 'post')
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
        let path = appendParams('/invoices', options);

        let response;
        await this.apiRequest(path, 'get')
            .then(res => response = res.invoices);

        return response;
    }

    async refreshInvoice(identifier) {
        let response;
        await this.apiRequest(`/invoices/${identifier}/refresh`, 'put')
            .then(res => response = res.invoice);

        return response;
    }

    async finalizeInvoice(identifier) {
        let response;
        await this.apiRequest(`/invoices/${identifier}/finalize`, 'put')
            .then(res => response = res.invoice);

        return response;
    }

    // SUBSCRIPTIONS

    async createSubscription(inputSubscription){
        let response;
        await this.apiRequest(`/subscriptions`, 'post', inputSubscription.wrapAttributes())
            .then(res => response = res.subscription);

        return response;
    }

    async destroySubscription(identifier){
        let response;
        await this.apiRequest(`/subscriptions/${identifier}`, 'delete')
            .then(res => response = res.subscription);

        return response;
    }

    async updateSubscription(inputSubscription, identifier){
        let response;
        await this.apiRequest(`/subscriptions/${identifier}`, 'put', inputSubscription.wrapAttributes())
            .then(res => response = res.subscription);

        return response;
    }

    async findAllSubscriptions(options = null){
        let path = appendParams('/subscriptions', options);

        let response;
        await this.apiRequest(path, 'get')
            .then(res => response = res.subscriptions);

        return response;
    }

    // WEBHOOKS

    async webhookPublicKey(){
        let response;
        await this.apiRequest(`/webhooks/json_public_key`, 'get').then(res => response = res.webhook);

        let buff = new Buffer.from(response.public_key, 'base64');
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
        let path = appendParams('/billable_metrics', options);

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
        let path = appendParams('/coupons', options);

        let response;
        await this.apiRequest(path, 'get')
            .then(res => response = res.coupons);

        return response;
    }

    // CREDIT NOTES

    async createCreditNote(inputCreditNote) {
        let response;
        await this.apiRequest('/credit_notes', 'post', inputCreditNote.wrapAttributes())
            .then(res => response = res.credit_note);

        return response;
    }

    async updateCreditNote(inputCreditNote, identifier){
        let response;
        await this.apiRequest(`/credit_notes/${identifier}`, 'put', inputCreditNote.wrapAttributes())
            .then(res => response = res.coupon);

        return response;
    }

    async findCreditNote(identifier) {
        let response;
        await this.apiRequest(`/credit_notes/${identifier}`, 'get')
            .then(res => response = res.credit_note);

        return response;
    }

    async downloadCreditNote(input) {
        let response;
        await this.apiRequest(`/credit_notes/${input}/download`, 'post')
            .then(res => response = res.credit_note);

        return response;
    }

    async findAllCreditNotes(options = null) {
        let path = appendParams('/credit_notes', options);

        let response;
        await this.apiRequest(path, 'get')
            .then(res => response = res.credit_notes)

        return response;
    }

    async voidCreditNote(input) {
        let response;
        await this.apiRequest(`/credit_notes/${input}/void`, 'put')
            .then(res => response = res.credit_note);

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
        let path = appendParams('/add_ons', options);

        let response;
        await this.apiRequest(path, 'get')
            .then(res => response = res.add_ons);

        return response;
    }

     // GROUPS

    async findAllGroups(metricCode, options = null) {
        let path = `/billable_metrics/${metricCode}/groups`

        if (options !== null && JSON.stringify(options) !== '{}'){
            path = `/billable_metrics/${metricCode}/groups?${new URLSearchParams(options).toString()}`
        }

        let response;
        await this.apiRequest(path, 'get')
            .then(res => response = res.groups)

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
        let path = appendParams('/plans', options);

        let response;
        await this.apiRequest(path, 'get')
            .then(res => response = res.plans);

        return response;
    }

    // WALLETS

    async createWallet(inputWallet){
        let response;
        await this.apiRequest(`/wallets`, 'post', inputWallet.wrapAttributes())
            .then(res => response = res.wallet);

        return response;
    }

    async updateWallet(inputWallet, identifier){
        let response;
        await this.apiRequest(`/wallets/${identifier}`, 'put', inputWallet.wrapAttributes())
            .then(res => response = res.wallet);

        return response;
    }

    async findWallet(identifier){
        let response;
        await this.apiRequest(`/wallets/${identifier}`, 'get')
            .then(res => response = res.wallet);

        return response;
    }

    async destroyWallet(identifier){
        let response;
        await this.apiRequest(`/wallets/${identifier}`, 'delete')
            .then(res => response = res.wallet);

        return response;
    }

    async findAllWallets(options = null){
        let path = appendParams('/wallets', options);

        let response;
        await this.apiRequest(path, 'get')
            .then(res => response = res.wallets);

        return response;
    }

    // WALLET TRANSACTIONS

    async createWalletTransaction(inputWalletTransaction){
        let response;
        await this.apiRequest(`/wallet_transactions`, 'post', inputWalletTransaction.wrapAttributes())
            .then(res => response = res.wallet_transactions);

        return response;
    }

    async findAllWalletTransactions(walletId, options = null) {
      let path = `/wallets/${walletId}/wallet_transactions`

      if (options !== null && JSON.stringify(options) !== '{}'){
        path = `/wallets/${walletId}/wallet_transactions?${new URLSearchParams(options).toString()}`
      }

      let response;
      await this.apiRequest(path, 'get')
        .then(res => response = res.wallet_transactions)

      return response;
    }
}

class LagoApiError extends Error {}
