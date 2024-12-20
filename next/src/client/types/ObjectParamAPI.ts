import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration} from '../configuration'

import { BodyCheckCodeVerifyPhoneCheckPost } from '../models/BodyCheckCodeVerifyPhoneCheckPost';
import { ChangePointSchema } from '../models/ChangePointSchema';
import { ChangeUserSchema } from '../models/ChangeUserSchema';
import { CommentData } from '../models/CommentData';
import { CommentsSchema } from '../models/CommentsSchema';
import { DocumentModel } from '../models/DocumentModel';
import { EmailSchema } from '../models/EmailSchema';
import { EnterpriseInfo } from '../models/EnterpriseInfo';
import { HTTPValidationError } from '../models/HTTPValidationError';
import { ImageModel } from '../models/ImageModel';
import { Login } from '../models/Login';
import { PointInfo } from '../models/PointInfo';
import { Register } from '../models/Register';
import { RegisterCompany } from '../models/RegisterCompany';
import { RegisterPoint } from '../models/RegisterPoint';
import { ReqID } from '../models/ReqID';
import { ResponseSchema } from '../models/ResponseSchema';
import { SocialID } from '../models/SocialID';
import { SocialSchema } from '../models/SocialSchema';
import { TokenPair } from '../models/TokenPair';
import { UploadDocumentModel } from '../models/UploadDocumentModel';
import { UploadImageModel } from '../models/UploadImageModel';
import { UserSchema } from '../models/UserSchema';
import { ValidationError } from '../models/ValidationError';
import { ValidationErrorLocInner } from '../models/ValidationErrorLocInner';
import { VerifePhone } from '../models/VerifePhone';

import { ObservableAuthApi } from "./ObservableAPI";
import { AuthApiRequestFactory, AuthApiResponseProcessor} from "../apis/AuthApi";

export interface AuthApiLoginLoginPostRequest {
    /**
     * 
     * @type Login
     * @memberof AuthApiloginLoginPost
     */
    login: Login
}

export interface AuthApiRefreshTokensRefreshPostRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof AuthApirefreshTokensRefreshPost
     */
    refreshToken: string
}

export interface AuthApiRegistrationRegistrationPostRequest {
    /**
     * 
     * @type Register
     * @memberof AuthApiregistrationRegistrationPost
     */
    register: Register
}

export class ObjectAuthApi {
    private api: ObservableAuthApi

    public constructor(configuration: Configuration, requestFactory?: AuthApiRequestFactory, responseProcessor?: AuthApiResponseProcessor) {
        this.api = new ObservableAuthApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Login
     * @param param the request object
     */
    public loginLoginPostWithHttpInfo(param: AuthApiLoginLoginPostRequest, options?: Configuration): Promise<HttpInfo<TokenPair>> {
        return this.api.loginLoginPostWithHttpInfo(param.login,  options).toPromise();
    }

    /**
     * Login
     * @param param the request object
     */
    public loginLoginPost(param: AuthApiLoginLoginPostRequest, options?: Configuration): Promise<TokenPair> {
        return this.api.loginLoginPost(param.login,  options).toPromise();
    }

    /**
     * Refresh Tokens
     * @param param the request object
     */
    public refreshTokensRefreshPostWithHttpInfo(param: AuthApiRefreshTokensRefreshPostRequest, options?: Configuration): Promise<HttpInfo<TokenPair>> {
        return this.api.refreshTokensRefreshPostWithHttpInfo(param.refreshToken,  options).toPromise();
    }

    /**
     * Refresh Tokens
     * @param param the request object
     */
    public refreshTokensRefreshPost(param: AuthApiRefreshTokensRefreshPostRequest, options?: Configuration): Promise<TokenPair> {
        return this.api.refreshTokensRefreshPost(param.refreshToken,  options).toPromise();
    }

    /**
     * Registration
     * @param param the request object
     */
    public registrationRegistrationPostWithHttpInfo(param: AuthApiRegistrationRegistrationPostRequest, options?: Configuration): Promise<HttpInfo<TokenPair>> {
        return this.api.registrationRegistrationPostWithHttpInfo(param.register,  options).toPromise();
    }

    /**
     * Registration
     * @param param the request object
     */
    public registrationRegistrationPost(param: AuthApiRegistrationRegistrationPostRequest, options?: Configuration): Promise<TokenPair> {
        return this.api.registrationRegistrationPost(param.register,  options).toPromise();
    }

}

import { ObservableCommentsApi } from "./ObservableAPI";
import { CommentsApiRequestFactory, CommentsApiResponseProcessor} from "../apis/CommentsApi";

export interface CommentsApiAddComentCommentsPointIdPostRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof CommentsApiaddComentCommentsPointIdPost
     */
    pointId: number
    /**
     * 
     * Defaults to: undefined
     * @type CommentData
     * @memberof CommentsApiaddComentCommentsPointIdPost
     */
    commentsData: CommentData
    /**
     * 
     * Defaults to: undefined
     * @type Array&lt;HttpFile&gt;
     * @memberof CommentsApiaddComentCommentsPointIdPost
     */
    images?: Array<HttpFile>
}

export interface CommentsApiGetCommentsCommentsGetRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof CommentsApigetCommentsCommentsGet
     */
    pointId: number
}

export class ObjectCommentsApi {
    private api: ObservableCommentsApi

    public constructor(configuration: Configuration, requestFactory?: CommentsApiRequestFactory, responseProcessor?: CommentsApiResponseProcessor) {
        this.api = new ObservableCommentsApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Add Coment
     * @param param the request object
     */
    public addComentCommentsPointIdPostWithHttpInfo(param: CommentsApiAddComentCommentsPointIdPostRequest, options?: Configuration): Promise<HttpInfo<ResponseSchema>> {
        return this.api.addComentCommentsPointIdPostWithHttpInfo(param.pointId, param.commentsData, param.images,  options).toPromise();
    }

    /**
     * Add Coment
     * @param param the request object
     */
    public addComentCommentsPointIdPost(param: CommentsApiAddComentCommentsPointIdPostRequest, options?: Configuration): Promise<ResponseSchema> {
        return this.api.addComentCommentsPointIdPost(param.pointId, param.commentsData, param.images,  options).toPromise();
    }

    /**
     * Get Comments
     * @param param the request object
     */
    public getCommentsCommentsGetWithHttpInfo(param: CommentsApiGetCommentsCommentsGetRequest, options?: Configuration): Promise<HttpInfo<Array<CommentsSchema>>> {
        return this.api.getCommentsCommentsGetWithHttpInfo(param.pointId,  options).toPromise();
    }

    /**
     * Get Comments
     * @param param the request object
     */
    public getCommentsCommentsGet(param: CommentsApiGetCommentsCommentsGetRequest, options?: Configuration): Promise<Array<CommentsSchema>> {
        return this.api.getCommentsCommentsGet(param.pointId,  options).toPromise();
    }

}

import { ObservableEnterprisesApi } from "./ObservableAPI";
import { EnterprisesApiRequestFactory, EnterprisesApiResponseProcessor} from "../apis/EnterprisesApi";

export interface EnterprisesApiGetCompaniesInfoEnterprisesEnterprisesInfoGetRequest {
}

export interface EnterprisesApiRegisterCompanyEnterprisesRegisterPostRequest {
    /**
     * 
     * @type RegisterCompany
     * @memberof EnterprisesApiregisterCompanyEnterprisesRegisterPost
     */
    registerCompany: RegisterCompany
}

export interface EnterprisesApiUploadImagesEnterprisesUploadImagesEnterpriseIdPostRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof EnterprisesApiuploadImagesEnterprisesUploadImagesEnterpriseIdPost
     */
    enterpriseId: number
    /**
     * 
     * Defaults to: undefined
     * @type HttpFile
     * @memberof EnterprisesApiuploadImagesEnterprisesUploadImagesEnterpriseIdPost
     */
    image?: HttpFile
}

export class ObjectEnterprisesApi {
    private api: ObservableEnterprisesApi

    public constructor(configuration: Configuration, requestFactory?: EnterprisesApiRequestFactory, responseProcessor?: EnterprisesApiResponseProcessor) {
        this.api = new ObservableEnterprisesApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Get Companies Info
     * @param param the request object
     */
    public getCompaniesInfoEnterprisesEnterprisesInfoGetWithHttpInfo(param: EnterprisesApiGetCompaniesInfoEnterprisesEnterprisesInfoGetRequest = {}, options?: Configuration): Promise<HttpInfo<Array<EnterpriseInfo>>> {
        return this.api.getCompaniesInfoEnterprisesEnterprisesInfoGetWithHttpInfo( options).toPromise();
    }

    /**
     * Get Companies Info
     * @param param the request object
     */
    public getCompaniesInfoEnterprisesEnterprisesInfoGet(param: EnterprisesApiGetCompaniesInfoEnterprisesEnterprisesInfoGetRequest = {}, options?: Configuration): Promise<Array<EnterpriseInfo>> {
        return this.api.getCompaniesInfoEnterprisesEnterprisesInfoGet( options).toPromise();
    }

    /**
     * Register Company
     * @param param the request object
     */
    public registerCompanyEnterprisesRegisterPostWithHttpInfo(param: EnterprisesApiRegisterCompanyEnterprisesRegisterPostRequest, options?: Configuration): Promise<HttpInfo<ResponseSchema>> {
        return this.api.registerCompanyEnterprisesRegisterPostWithHttpInfo(param.registerCompany,  options).toPromise();
    }

    /**
     * Register Company
     * @param param the request object
     */
    public registerCompanyEnterprisesRegisterPost(param: EnterprisesApiRegisterCompanyEnterprisesRegisterPostRequest, options?: Configuration): Promise<ResponseSchema> {
        return this.api.registerCompanyEnterprisesRegisterPost(param.registerCompany,  options).toPromise();
    }

    /**
     * Upload Images
     * @param param the request object
     */
    public uploadImagesEnterprisesUploadImagesEnterpriseIdPostWithHttpInfo(param: EnterprisesApiUploadImagesEnterprisesUploadImagesEnterpriseIdPostRequest, options?: Configuration): Promise<HttpInfo<ResponseSchema>> {
        return this.api.uploadImagesEnterprisesUploadImagesEnterpriseIdPostWithHttpInfo(param.enterpriseId, param.image,  options).toPromise();
    }

    /**
     * Upload Images
     * @param param the request object
     */
    public uploadImagesEnterprisesUploadImagesEnterpriseIdPost(param: EnterprisesApiUploadImagesEnterprisesUploadImagesEnterpriseIdPostRequest, options?: Configuration): Promise<ResponseSchema> {
        return this.api.uploadImagesEnterprisesUploadImagesEnterpriseIdPost(param.enterpriseId, param.image,  options).toPromise();
    }

}

import { ObservableInnApi } from "./ObservableAPI";
import { InnApiRequestFactory, InnApiResponseProcessor} from "../apis/InnApi";

export interface InnApiResultPageInnInnInfoGetRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof InnApiresultPageInnInnInfoGet
     */
    inn: string
}

export class ObjectInnApi {
    private api: ObservableInnApi

    public constructor(configuration: Configuration, requestFactory?: InnApiRequestFactory, responseProcessor?: InnApiResponseProcessor) {
        this.api = new ObservableInnApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Result Page
     * @param param the request object
     */
    public resultPageInnInnInfoGetWithHttpInfo(param: InnApiResultPageInnInnInfoGetRequest, options?: Configuration): Promise<HttpInfo<any>> {
        return this.api.resultPageInnInnInfoGetWithHttpInfo(param.inn,  options).toPromise();
    }

    /**
     * Result Page
     * @param param the request object
     */
    public resultPageInnInnInfoGet(param: InnApiResultPageInnInnInfoGetRequest, options?: Configuration): Promise<any> {
        return this.api.resultPageInnInnInfoGet(param.inn,  options).toPromise();
    }

}

import { ObservableMongodbApi } from "./ObservableAPI";
import { MongodbApiRequestFactory, MongodbApiResponseProcessor} from "../apis/MongodbApi";

export interface MongodbApiGetDocumentMongoDocumentIdGetRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof MongodbApigetDocumentMongoDocumentIdGet
     */
    id: string
}

export interface MongodbApiGetImageMongoImageIdGetRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof MongodbApigetImageMongoImageIdGet
     */
    id: string
}

export interface MongodbApiUploadDocumentMongoDocumentPostRequest {
    /**
     * 
     * Defaults to: undefined
     * @type HttpFile
     * @memberof MongodbApiuploadDocumentMongoDocumentPost
     */
    file: HttpFile
}

export interface MongodbApiUploadImageMongoImagePostRequest {
    /**
     * 
     * Defaults to: undefined
     * @type HttpFile
     * @memberof MongodbApiuploadImageMongoImagePost
     */
    file: HttpFile
}

export class ObjectMongodbApi {
    private api: ObservableMongodbApi

    public constructor(configuration: Configuration, requestFactory?: MongodbApiRequestFactory, responseProcessor?: MongodbApiResponseProcessor) {
        this.api = new ObservableMongodbApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Get Document
     * @param param the request object
     */
    public getDocumentMongoDocumentIdGetWithHttpInfo(param: MongodbApiGetDocumentMongoDocumentIdGetRequest, options?: Configuration): Promise<HttpInfo<DocumentModel>> {
        return this.api.getDocumentMongoDocumentIdGetWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * Get Document
     * @param param the request object
     */
    public getDocumentMongoDocumentIdGet(param: MongodbApiGetDocumentMongoDocumentIdGetRequest, options?: Configuration): Promise<DocumentModel> {
        return this.api.getDocumentMongoDocumentIdGet(param.id,  options).toPromise();
    }

    /**
     * Get Image
     * @param param the request object
     */
    public getImageMongoImageIdGetWithHttpInfo(param: MongodbApiGetImageMongoImageIdGetRequest, options?: Configuration): Promise<HttpInfo<ImageModel>> {
        return this.api.getImageMongoImageIdGetWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * Get Image
     * @param param the request object
     */
    public getImageMongoImageIdGet(param: MongodbApiGetImageMongoImageIdGetRequest, options?: Configuration): Promise<ImageModel> {
        return this.api.getImageMongoImageIdGet(param.id,  options).toPromise();
    }

    /**
     * Upload Document
     * @param param the request object
     */
    public uploadDocumentMongoDocumentPostWithHttpInfo(param: MongodbApiUploadDocumentMongoDocumentPostRequest, options?: Configuration): Promise<HttpInfo<UploadDocumentModel>> {
        return this.api.uploadDocumentMongoDocumentPostWithHttpInfo(param.file,  options).toPromise();
    }

    /**
     * Upload Document
     * @param param the request object
     */
    public uploadDocumentMongoDocumentPost(param: MongodbApiUploadDocumentMongoDocumentPostRequest, options?: Configuration): Promise<UploadDocumentModel> {
        return this.api.uploadDocumentMongoDocumentPost(param.file,  options).toPromise();
    }

    /**
     * Upload Image
     * @param param the request object
     */
    public uploadImageMongoImagePostWithHttpInfo(param: MongodbApiUploadImageMongoImagePostRequest, options?: Configuration): Promise<HttpInfo<UploadImageModel>> {
        return this.api.uploadImageMongoImagePostWithHttpInfo(param.file,  options).toPromise();
    }

    /**
     * Upload Image
     * @param param the request object
     */
    public uploadImageMongoImagePost(param: MongodbApiUploadImageMongoImagePostRequest, options?: Configuration): Promise<UploadImageModel> {
        return this.api.uploadImageMongoImagePost(param.file,  options).toPromise();
    }

}

import { ObservablePointsApi } from "./ObservableAPI";
import { PointsApiRequestFactory, PointsApiResponseProcessor} from "../apis/PointsApi";

export interface PointsApiAddDocumentPointsDocumentPointIdPostRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof PointsApiaddDocumentPointsDocumentPointIdPost
     */
    pointId: number
    /**
     * 
     * Defaults to: undefined
     * @type Array&lt;HttpFile&gt;
     * @memberof PointsApiaddDocumentPointsDocumentPointIdPost
     */
    documents?: Array<HttpFile>
}

export interface PointsApiAddSocialPointsSocialPointIdPostRequest {
    /**
     * 
     * Minimum: 1
     * Defaults to: undefined
     * @type number
     * @memberof PointsApiaddSocialPointsSocialPointIdPost
     */
    pointId: number
    /**
     * 
     * @type SocialSchema
     * @memberof PointsApiaddSocialPointsSocialPointIdPost
     */
    socialSchema: SocialSchema
}

export interface PointsApiChangePointPointsChangePointIdPatchRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof PointsApichangePointPointsChangePointIdPatch
     */
    pointId: number
    /**
     * 
     * @type ChangePointSchema
     * @memberof PointsApichangePointPointsChangePointIdPatch
     */
    changePointSchema: ChangePointSchema
}

export interface PointsApiDeletePointPointsDeletePointIdDeleteRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof PointsApideletePointPointsDeletePointIdDelete
     */
    pointId: number
}

export interface PointsApiDeleteSocialPointsSocialPointIdDeleteRequest {
    /**
     * 
     * Minimum: 1
     * Defaults to: undefined
     * @type number
     * @memberof PointsApideleteSocialPointsSocialPointIdDelete
     */
    pointId: number
    /**
     * 
     * @type SocialID
     * @memberof PointsApideleteSocialPointsSocialPointIdDelete
     */
    socialID: SocialID
}

export interface PointsApiGetPointsInfoPointsGetRequest {
}

export interface PointsApiGetPointsInfoPointsPointIdGetRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof PointsApigetPointsInfoPointsPointIdGet
     */
    pointId: number
}

export interface PointsApiGetSocialsPointsSocialPointIdGetRequest {
    /**
     * 
     * Minimum: 1
     * Defaults to: undefined
     * @type number
     * @memberof PointsApigetSocialsPointsSocialPointIdGet
     */
    pointId: number
}

export interface PointsApiRegisterPointPointsRegisterPostRequest {
    /**
     * 
     * @type RegisterPoint
     * @memberof PointsApiregisterPointPointsRegisterPost
     */
    registerPoint: RegisterPoint
}

export interface PointsApiUploadImagesPointsUploadImagesPointIdPostRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof PointsApiuploadImagesPointsUploadImagesPointIdPost
     */
    pointId: number
    /**
     * 
     * Defaults to: undefined
     * @type HttpFile
     * @memberof PointsApiuploadImagesPointsUploadImagesPointIdPost
     */
    image?: HttpFile
}

export class ObjectPointsApi {
    private api: ObservablePointsApi

    public constructor(configuration: Configuration, requestFactory?: PointsApiRequestFactory, responseProcessor?: PointsApiResponseProcessor) {
        this.api = new ObservablePointsApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Add Document
     * @param param the request object
     */
    public addDocumentPointsDocumentPointIdPostWithHttpInfo(param: PointsApiAddDocumentPointsDocumentPointIdPostRequest, options?: Configuration): Promise<HttpInfo<ResponseSchema>> {
        return this.api.addDocumentPointsDocumentPointIdPostWithHttpInfo(param.pointId, param.documents,  options).toPromise();
    }

    /**
     * Add Document
     * @param param the request object
     */
    public addDocumentPointsDocumentPointIdPost(param: PointsApiAddDocumentPointsDocumentPointIdPostRequest, options?: Configuration): Promise<ResponseSchema> {
        return this.api.addDocumentPointsDocumentPointIdPost(param.pointId, param.documents,  options).toPromise();
    }

    /**
     * Add Social
     * @param param the request object
     */
    public addSocialPointsSocialPointIdPostWithHttpInfo(param: PointsApiAddSocialPointsSocialPointIdPostRequest, options?: Configuration): Promise<HttpInfo<ResponseSchema>> {
        return this.api.addSocialPointsSocialPointIdPostWithHttpInfo(param.pointId, param.socialSchema,  options).toPromise();
    }

    /**
     * Add Social
     * @param param the request object
     */
    public addSocialPointsSocialPointIdPost(param: PointsApiAddSocialPointsSocialPointIdPostRequest, options?: Configuration): Promise<ResponseSchema> {
        return this.api.addSocialPointsSocialPointIdPost(param.pointId, param.socialSchema,  options).toPromise();
    }

    /**
     * Change Point
     * @param param the request object
     */
    public changePointPointsChangePointIdPatchWithHttpInfo(param: PointsApiChangePointPointsChangePointIdPatchRequest, options?: Configuration): Promise<HttpInfo<ResponseSchema>> {
        return this.api.changePointPointsChangePointIdPatchWithHttpInfo(param.pointId, param.changePointSchema,  options).toPromise();
    }

    /**
     * Change Point
     * @param param the request object
     */
    public changePointPointsChangePointIdPatch(param: PointsApiChangePointPointsChangePointIdPatchRequest, options?: Configuration): Promise<ResponseSchema> {
        return this.api.changePointPointsChangePointIdPatch(param.pointId, param.changePointSchema,  options).toPromise();
    }

    /**
     * Delete Point
     * @param param the request object
     */
    public deletePointPointsDeletePointIdDeleteWithHttpInfo(param: PointsApiDeletePointPointsDeletePointIdDeleteRequest, options?: Configuration): Promise<HttpInfo<ResponseSchema>> {
        return this.api.deletePointPointsDeletePointIdDeleteWithHttpInfo(param.pointId,  options).toPromise();
    }

    /**
     * Delete Point
     * @param param the request object
     */
    public deletePointPointsDeletePointIdDelete(param: PointsApiDeletePointPointsDeletePointIdDeleteRequest, options?: Configuration): Promise<ResponseSchema> {
        return this.api.deletePointPointsDeletePointIdDelete(param.pointId,  options).toPromise();
    }

    /**
     * Delete Social
     * @param param the request object
     */
    public deleteSocialPointsSocialPointIdDeleteWithHttpInfo(param: PointsApiDeleteSocialPointsSocialPointIdDeleteRequest, options?: Configuration): Promise<HttpInfo<ResponseSchema>> {
        return this.api.deleteSocialPointsSocialPointIdDeleteWithHttpInfo(param.pointId, param.socialID,  options).toPromise();
    }

    /**
     * Delete Social
     * @param param the request object
     */
    public deleteSocialPointsSocialPointIdDelete(param: PointsApiDeleteSocialPointsSocialPointIdDeleteRequest, options?: Configuration): Promise<ResponseSchema> {
        return this.api.deleteSocialPointsSocialPointIdDelete(param.pointId, param.socialID,  options).toPromise();
    }

    /**
     * Get Points Info
     * @param param the request object
     */
    public getPointsInfoPointsGetWithHttpInfo(param: PointsApiGetPointsInfoPointsGetRequest = {}, options?: Configuration): Promise<HttpInfo<Array<PointInfo>>> {
        return this.api.getPointsInfoPointsGetWithHttpInfo( options).toPromise();
    }

    /**
     * Get Points Info
     * @param param the request object
     */
    public getPointsInfoPointsGet(param: PointsApiGetPointsInfoPointsGetRequest = {}, options?: Configuration): Promise<Array<PointInfo>> {
        return this.api.getPointsInfoPointsGet( options).toPromise();
    }

    /**
     * Get Points Info
     * @param param the request object
     */
    public getPointsInfoPointsPointIdGetWithHttpInfo(param: PointsApiGetPointsInfoPointsPointIdGetRequest, options?: Configuration): Promise<HttpInfo<PointInfo>> {
        return this.api.getPointsInfoPointsPointIdGetWithHttpInfo(param.pointId,  options).toPromise();
    }

    /**
     * Get Points Info
     * @param param the request object
     */
    public getPointsInfoPointsPointIdGet(param: PointsApiGetPointsInfoPointsPointIdGetRequest, options?: Configuration): Promise<PointInfo> {
        return this.api.getPointsInfoPointsPointIdGet(param.pointId,  options).toPromise();
    }

    /**
     * Get Socials
     * @param param the request object
     */
    public getSocialsPointsSocialPointIdGetWithHttpInfo(param: PointsApiGetSocialsPointsSocialPointIdGetRequest, options?: Configuration): Promise<HttpInfo<any>> {
        return this.api.getSocialsPointsSocialPointIdGetWithHttpInfo(param.pointId,  options).toPromise();
    }

    /**
     * Get Socials
     * @param param the request object
     */
    public getSocialsPointsSocialPointIdGet(param: PointsApiGetSocialsPointsSocialPointIdGetRequest, options?: Configuration): Promise<any> {
        return this.api.getSocialsPointsSocialPointIdGet(param.pointId,  options).toPromise();
    }

    /**
     * Register Point
     * @param param the request object
     */
    public registerPointPointsRegisterPostWithHttpInfo(param: PointsApiRegisterPointPointsRegisterPostRequest, options?: Configuration): Promise<HttpInfo<ResponseSchema>> {
        return this.api.registerPointPointsRegisterPostWithHttpInfo(param.registerPoint,  options).toPromise();
    }

    /**
     * Register Point
     * @param param the request object
     */
    public registerPointPointsRegisterPost(param: PointsApiRegisterPointPointsRegisterPostRequest, options?: Configuration): Promise<ResponseSchema> {
        return this.api.registerPointPointsRegisterPost(param.registerPoint,  options).toPromise();
    }

    /**
     * Upload Images
     * @param param the request object
     */
    public uploadImagesPointsUploadImagesPointIdPostWithHttpInfo(param: PointsApiUploadImagesPointsUploadImagesPointIdPostRequest, options?: Configuration): Promise<HttpInfo<ResponseSchema>> {
        return this.api.uploadImagesPointsUploadImagesPointIdPostWithHttpInfo(param.pointId, param.image,  options).toPromise();
    }

    /**
     * Upload Images
     * @param param the request object
     */
    public uploadImagesPointsUploadImagesPointIdPost(param: PointsApiUploadImagesPointsUploadImagesPointIdPostRequest, options?: Configuration): Promise<ResponseSchema> {
        return this.api.uploadImagesPointsUploadImagesPointIdPost(param.pointId, param.image,  options).toPromise();
    }

}

import { ObservableProfileApi } from "./ObservableAPI";
import { ProfileApiRequestFactory, ProfileApiResponseProcessor} from "../apis/ProfileApi";

export interface ProfileApiGetAllUsersProfileAllGetRequest {
}

export interface ProfileApiGetUsersMeProfileChangePatchRequest {
    /**
     * 
     * @type ChangeUserSchema
     * @memberof ProfileApigetUsersMeProfileChangePatch
     */
    changeUserSchema: ChangeUserSchema
}

export interface ProfileApiGetUsersMeProfileMeGetRequest {
}

export class ObjectProfileApi {
    private api: ObservableProfileApi

    public constructor(configuration: Configuration, requestFactory?: ProfileApiRequestFactory, responseProcessor?: ProfileApiResponseProcessor) {
        this.api = new ObservableProfileApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Get All Users
     * @param param the request object
     */
    public getAllUsersProfileAllGetWithHttpInfo(param: ProfileApiGetAllUsersProfileAllGetRequest = {}, options?: Configuration): Promise<HttpInfo<any>> {
        return this.api.getAllUsersProfileAllGetWithHttpInfo( options).toPromise();
    }

    /**
     * Get All Users
     * @param param the request object
     */
    public getAllUsersProfileAllGet(param: ProfileApiGetAllUsersProfileAllGetRequest = {}, options?: Configuration): Promise<any> {
        return this.api.getAllUsersProfileAllGet( options).toPromise();
    }

    /**
     * Get Users Me
     * @param param the request object
     */
    public getUsersMeProfileChangePatchWithHttpInfo(param: ProfileApiGetUsersMeProfileChangePatchRequest, options?: Configuration): Promise<HttpInfo<ResponseSchema>> {
        return this.api.getUsersMeProfileChangePatchWithHttpInfo(param.changeUserSchema,  options).toPromise();
    }

    /**
     * Get Users Me
     * @param param the request object
     */
    public getUsersMeProfileChangePatch(param: ProfileApiGetUsersMeProfileChangePatchRequest, options?: Configuration): Promise<ResponseSchema> {
        return this.api.getUsersMeProfileChangePatch(param.changeUserSchema,  options).toPromise();
    }

    /**
     * Get Users Me
     * @param param the request object
     */
    public getUsersMeProfileMeGetWithHttpInfo(param: ProfileApiGetUsersMeProfileMeGetRequest = {}, options?: Configuration): Promise<HttpInfo<UserSchema>> {
        return this.api.getUsersMeProfileMeGetWithHttpInfo( options).toPromise();
    }

    /**
     * Get Users Me
     * @param param the request object
     */
    public getUsersMeProfileMeGet(param: ProfileApiGetUsersMeProfileMeGetRequest = {}, options?: Configuration): Promise<UserSchema> {
        return this.api.getUsersMeProfileMeGet( options).toPromise();
    }

}

import { ObservableVerifyApi } from "./ObservableAPI";
import { VerifyApiRequestFactory, VerifyApiResponseProcessor} from "../apis/VerifyApi";

export interface VerifyApiCheckCodeVerifyPhoneCheckPostRequest {
    /**
     * 
     * @type BodyCheckCodeVerifyPhoneCheckPost
     * @memberof VerifyApicheckCodeVerifyPhoneCheckPost
     */
    bodyCheckCodeVerifyPhoneCheckPost: BodyCheckCodeVerifyPhoneCheckPost
}

export interface VerifyApiCheckEmailVerifyGetRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof VerifyApicheckEmailVerifyGet
     */
    emailCode: string
}

export interface VerifyApiOnlyForTestingVerifyGetSessionsSmsGetRequest {
}

export interface VerifyApiSendEmailVerifyEmailSendPostRequest {
    /**
     * 
     * @type EmailSchema
     * @memberof VerifyApisendEmailVerifyEmailSendPost
     */
    emailSchema: EmailSchema
}

export interface VerifyApiSendMessageVerifyPhoneSendPostRequest {
}

export class ObjectVerifyApi {
    private api: ObservableVerifyApi

    public constructor(configuration: Configuration, requestFactory?: VerifyApiRequestFactory, responseProcessor?: VerifyApiResponseProcessor) {
        this.api = new ObservableVerifyApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Check Code
     * @param param the request object
     */
    public checkCodeVerifyPhoneCheckPostWithHttpInfo(param: VerifyApiCheckCodeVerifyPhoneCheckPostRequest, options?: Configuration): Promise<HttpInfo<VerifePhone>> {
        return this.api.checkCodeVerifyPhoneCheckPostWithHttpInfo(param.bodyCheckCodeVerifyPhoneCheckPost,  options).toPromise();
    }

    /**
     * Check Code
     * @param param the request object
     */
    public checkCodeVerifyPhoneCheckPost(param: VerifyApiCheckCodeVerifyPhoneCheckPostRequest, options?: Configuration): Promise<VerifePhone> {
        return this.api.checkCodeVerifyPhoneCheckPost(param.bodyCheckCodeVerifyPhoneCheckPost,  options).toPromise();
    }

    /**
     * Check Email
     * @param param the request object
     */
    public checkEmailVerifyGetWithHttpInfo(param: VerifyApiCheckEmailVerifyGetRequest, options?: Configuration): Promise<HttpInfo<ResponseSchema>> {
        return this.api.checkEmailVerifyGetWithHttpInfo(param.emailCode,  options).toPromise();
    }

    /**
     * Check Email
     * @param param the request object
     */
    public checkEmailVerifyGet(param: VerifyApiCheckEmailVerifyGetRequest, options?: Configuration): Promise<ResponseSchema> {
        return this.api.checkEmailVerifyGet(param.emailCode,  options).toPromise();
    }

    /**
     * Only For Testing
     * @param param the request object
     */
    public onlyForTestingVerifyGetSessionsSmsGetWithHttpInfo(param: VerifyApiOnlyForTestingVerifyGetSessionsSmsGetRequest = {}, options?: Configuration): Promise<HttpInfo<any>> {
        return this.api.onlyForTestingVerifyGetSessionsSmsGetWithHttpInfo( options).toPromise();
    }

    /**
     * Only For Testing
     * @param param the request object
     */
    public onlyForTestingVerifyGetSessionsSmsGet(param: VerifyApiOnlyForTestingVerifyGetSessionsSmsGetRequest = {}, options?: Configuration): Promise<any> {
        return this.api.onlyForTestingVerifyGetSessionsSmsGet( options).toPromise();
    }

    /**
     * Send Email
     * @param param the request object
     */
    public sendEmailVerifyEmailSendPostWithHttpInfo(param: VerifyApiSendEmailVerifyEmailSendPostRequest, options?: Configuration): Promise<HttpInfo<any>> {
        return this.api.sendEmailVerifyEmailSendPostWithHttpInfo(param.emailSchema,  options).toPromise();
    }

    /**
     * Send Email
     * @param param the request object
     */
    public sendEmailVerifyEmailSendPost(param: VerifyApiSendEmailVerifyEmailSendPostRequest, options?: Configuration): Promise<any> {
        return this.api.sendEmailVerifyEmailSendPost(param.emailSchema,  options).toPromise();
    }

    /**
     * Send Message
     * @param param the request object
     */
    public sendMessageVerifyPhoneSendPostWithHttpInfo(param: VerifyApiSendMessageVerifyPhoneSendPostRequest = {}, options?: Configuration): Promise<HttpInfo<ReqID>> {
        return this.api.sendMessageVerifyPhoneSendPostWithHttpInfo( options).toPromise();
    }

    /**
     * Send Message
     * @param param the request object
     */
    public sendMessageVerifyPhoneSendPost(param: VerifyApiSendMessageVerifyPhoneSendPostRequest = {}, options?: Configuration): Promise<ReqID> {
        return this.api.sendMessageVerifyPhoneSendPost( options).toPromise();
    }

}
