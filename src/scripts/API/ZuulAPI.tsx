import * as ApiFx from "./ApiFunctions";
import { environments } from "./environment";
import { KahlilApi, UidPwd } from "@customtypes/index";
import {POSTKahlil, POSTKahlilAuthenticated} from "./ApiFunctions";

let Kahlil: KahlilApi = {
    host: environments[process.env.REACT_APP_DEV as keyof typeof environments].Zuul,
    //version: "", // add a / to end of string if version is included
    //key: "",
    //secret: "",
    url: ""
};
Kahlil.url = Kahlil.host + /*Kahlil.version +*/ "api/"

export const Zuul = {
    login: {
        authenticate: async ( credentials: UidPwd ) => {
            return await ApiFx.POSTKahlil("Auth/Login", Kahlil, credentials)
                .then(async res=>{
                    return res.data;
                })
        }
    },
    contract: {
        getAll: async () => {
            return await ApiFx.POSTKahlilAuthenticated("Contract/GetAll", Kahlil, "")
                .then(async res => {
                    return res.data;
                })
        }
    }
    /*admin: {
        get: async ( id: Guid|string|null, companyUser: Omit<CompanyUser, keyof Base> ) => {
            return await ApiFx.POSTKahlilAuthenticated("User/Get", Kahlil, {Id: id}, companyUser)
                .then(async res=>{return res.data})
        },
        getAll: async (companyUser: Omit<CompanyUser, keyof Base>) => {
            return await ApiFx.POSTKahlilAuthenticated("User/GetAll", Kahlil, "", companyUser)
                .then(async res=>{return res.data})
        },
        update: async (data: Admin, companyUser: Omit<CompanyUser, keyof Base> ) => {
            return await ApiFx.POSTKahlilAuthenticated("User/Update", Kahlil, data, companyUser)
                .then(async res => {return res.data})
        },
        add: async (data: Admin, companyUser: Omit<CompanyUser, keyof Base> ) => {
            return await ApiFx.POSTKahlilAuthenticated("User/Add", Kahlil, data, companyUser)
                .then(async res => {return res.data})
        },
        delete: async (id: Guid|string, companyUser: Omit<CompanyUser, keyof Base> ) => {
            return await ApiFx.POSTKahlilAuthenticated("User/Delete", Kahlil, {Id: id}, companyUser)
                .then(async res => {return res.data})
        }
    },
    contract: {
        get: async ( id: Guid|string|null, companyUser: Omit<CompanyUser, keyof Base> ) => {
            return await ApiFx.POSTKahlilAuthenticated("Contract/Get", Kahlil, {Id: id}, companyUser)
                .then(async res=>{return res.data})
        },
        getAll: async (companyUser: Omit<CompanyUser, keyof Base>) => {
            return await ApiFx.POSTKahlilAuthenticated("Contract/GetAll", Kahlil, "", companyUser)
                .then(async res=>{return res.data})
        },
        update: async (data: Admin, companyUser: Omit<CompanyUser, keyof Base> ) => {
            return await ApiFx.POSTKahlilAuthenticated("Contract/Update", Kahlil, data, companyUser)
                .then(async res => {return res.data})
        },
        add: async (data: Admin, companyUser: Omit<CompanyUser, keyof Base> ) => {
            return await ApiFx.POSTKahlilAuthenticated("Contract/Add", Kahlil, data, companyUser)
                .then(async res => {return res.data})
        },
        delete: async (id: Guid|string, companyUser: Omit<CompanyUser, keyof Base> ) => {
            return await ApiFx.POSTKahlilAuthenticated("Contract/Delete", Kahlil, {Id: id}, companyUser)
                .then(async res => {return res.data})
        }
    }*/
}
