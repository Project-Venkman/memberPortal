import axios from "axios";
import CryptoJS from "crypto-js";
import { KahlilApi, CompanyUser } from "@customtypes/index";


export const POSTKahlil = async (method: string, host: KahlilApi, data: any) => {
    let { dts, signature, payload } = generateSignature(method, host, data);
    return await axios.post(host.url + method, payload, generateConfig(dts, signature))
}

export const POSTKahlilAuthenticated = async (method: string, host: KahlilApi, data?: any) => {
    let { dts, signature, payload } = generateSignature(method, host, data);
    return await axios.post(host.url + method, payload, generateConfigAuthenticated(dts, signature))
}

export const GETKahlilAuthenticated = async (method: string, host: KahlilApi, data: any) => {
    return await axios.get(host.url + method)
}

const generateSignature = (method: string, host: KahlilApi, data: any) => {
    let dts = new Date().toISOString(); // format yyyy-mm-ddThh:mm:ss.000Z
    //    let payload = data // serialized post data (form fields)
    // if (!data) throw new Error("No data provided");
    let payload = data ? JSON.stringify(data) : {} // serialized post data (form fields)
    let string_to_sign = dts + ' ' + host.host + '/' + method + '/' /*+ host.version*/ + ' ' + CryptoJS.SHA256(payload).toString(); // create the string to sign
    let hash = CryptoJS.HmacSHA256(string_to_sign, ""/*, host.secret*/);
    let signature = hash.toString();
    return {
        dts: dts,
        signature: signature,
        payload: payload
    }
}

const generateConfig = (dts: string, signature: string) => {

    return {
        //ode: 'no-cors',
        headers: {
            ...baseHeaders
            /*"API-key": Kahlil.key,*/
            /*"API-version": Kahlil.version,*/
            /*"API-date": dts,*/
            /*"API-signature": signature*/
        }
    }
}

const generateConfigAuthenticated = (dts: string, signature: string/*, CompanyUser: CompanyUser, ContractId?: string*/) => {
    const cu: CompanyUser = JSON.parse(window.sessionStorage.getItem("sessionData")!);
    return {
        withCredentials: true,
        headers: {

            // "CompanyId": cu ? cu.companyId as string : "C8494FD1-D34A-461F-A176-B79BB578C17F",
            // "UserId": "00000000-0000-0000-0000-000000000000",
            // "SessionId": cu ? cu.sessionId as string : "",
            // "ContractType": "40000000-0001-0001-0002-000000000001",
            //"ContractType": ContractId ? ContractId : "00000004-0001-0001-0002-000000000002",
            ...baseHeaders
        }
    };
}

const baseHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
}
