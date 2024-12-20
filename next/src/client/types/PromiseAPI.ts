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
import { ObservableAuthApi } from './ObservableAPI';

import { AuthApiRequestFactory, AuthApiResponseProcessor} from "../apis/AuthApi";
export class PromiseAuthApi {
    private api: ObservableAuthApi

    public constructor(
        configuration: Configuration,
        requestFactory?: AuthApiRequestFactory,
        responseProcessor?: AuthApiResponseProcessor
    ) {
        this.api = new ObservableAuthApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Login
     * @param login
     */
    public loginLoginPostWithHttpInfo(login: Login, _options?: Configuration): Promise<HttpInfo<TokenPair>> {
        const result = this.api.loginLoginPostWithHttpInfo(login, _options);
        return result.toPromise();
    }

    /**
     * Login
     * @param login
     */
    public loginLoginPost(login: Login, _options?: Configuration): Promise<TokenPair> {
        const result = this.api.loginLoginPost(login, _options);
        return result.toPromise();
    }

    /**
     * Refresh Tokens
     * @param refreshToken
     */
    public refreshTokensRefreshPostWithHttpInfo(refreshToken: string, _options?: Configuration): Promise<HttpInfo<TokenPair>> {
        const result = this.api.refreshTokensRefreshPostWithHttpInfo(refreshToken, _options);
        return result.toPromise();
    }

    /**
     * Refresh Tokens
     * @param refreshToken
     */
    public refreshTokensRefreshPost(refreshToken: string, _options?: Configuration): Promise<TokenPair> {
        const result = this.api.refreshTokensRefreshPost(refreshToken, _options);
        return result.toPromise();
    }

    /**
     * Registration
     * @param register
     */
    public registrationRegistrationPostWithHttpInfo(register: Register, _options?: Configuration): Promise<HttpInfo<TokenPair>> {
        const result = this.api.registrationRegistrationPostWithHttpInfo(register, _options);
        return result.toPromise();
    }

    /**
     * Registration
     * @param register
     */
    public registrationRegistrationPost(register: Register, _options?: Configuration): Promise<TokenPair> {
        const result = this.api.registrationRegistrationPost(register, _options);
        return result.toPromise();
    }


}



import { ObservableCommentsApi } from './ObservableAPI';

import { CommentsApiRequestFactory, CommentsApiResponseProcessor} from "../apis/CommentsApi";
export class PromiseCommentsApi {
    private api: ObservableCommentsApi

    public constructor(
        configuration: Configuration,
        requestFactory?: CommentsApiRequestFactory,
        responseProcessor?: CommentsApiResponseProcessor
    ) {
        this.api = new ObservableCommentsApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Add Coment
     * @param pointId
     * @param commentsData
     * @param [images]
     */
    public addComentCommentsPointIdPostWithHttpInfo(pointId: number, commentsData: CommentData, images?: Array<HttpFile>, _options?: Configuration): Promise<HttpInfo<ResponseSchema>> {
        const result = this.api.addComentCommentsPointIdPostWithHttpInfo(pointId, commentsData, images, _options);
        return result.toPromise();
    }

    /**
     * Add Coment
     * @param pointId
     * @param commentsData
     * @param [images]
     */
    public addComentCommentsPointIdPost(pointId: number, commentsData: CommentData, images?: Array<HttpFile>, _options?: Configuration): Promise<ResponseSchema> {
        const result = this.api.addComentCommentsPointIdPost(pointId, commentsData, images, _options);
        return result.toPromise();
    }

    /**
     * Get Comments
     * @param pointId
     */
    public getCommentsCommentsGetWithHttpInfo(pointId: number, _options?: Configuration): Promise<HttpInfo<Array<CommentsSchema>>> {
        const result = this.api.getCommentsCommentsGetWithHttpInfo(pointId, _options);
        return result.toPromise();
    }

    /**
     * Get Comments
     * @param pointId
     */
    public getCommentsCommentsGet(pointId: number, _options?: Configuration): Promise<Array<CommentsSchema>> {
        const result = this.api.getCommentsCommentsGet(pointId, _options);
        return result.toPromise();
    }


}



import { ObservableEnterprisesApi } from './ObservableAPI';

import { EnterprisesApiRequestFactory, EnterprisesApiResponseProcessor} from "../apis/EnterprisesApi";
export class PromiseEnterprisesApi {
    private api: ObservableEnterprisesApi

    public constructor(
        configuration: Configuration,
        requestFactory?: EnterprisesApiRequestFactory,
        responseProcessor?: EnterprisesApiResponseProcessor
    ) {
        this.api = new ObservableEnterprisesApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Get Companies Info
     */
    public getCompaniesInfoEnterprisesEnterprisesInfoGetWithHttpInfo(_options?: Configuration): Promise<HttpInfo<Array<EnterpriseInfo>>> {
        const result = this.api.getCompaniesInfoEnterprisesEnterprisesInfoGetWithHttpInfo(_options);
        return result.toPromise();
    }

    /**
     * Get Companies Info
     */
    public getCompaniesInfoEnterprisesEnterprisesInfoGet(_options?: Configuration): Promise<Array<EnterpriseInfo>> {
        const result = this.api.getCompaniesInfoEnterprisesEnterprisesInfoGet(_options);
        return result.toPromise();
    }

    /**
     * Register Company
     * @param registerCompany
     */
    public registerCompanyEnterprisesRegisterPostWithHttpInfo(registerCompany: RegisterCompany, _options?: Configuration): Promise<HttpInfo<ResponseSchema>> {
        const result = this.api.registerCompanyEnterprisesRegisterPostWithHttpInfo(registerCompany, _options);
        return result.toPromise();
    }

    /**
     * Register Company
     * @param registerCompany
     */
    public registerCompanyEnterprisesRegisterPost(registerCompany: RegisterCompany, _options?: Configuration): Promise<ResponseSchema> {
        const result = this.api.registerCompanyEnterprisesRegisterPost(registerCompany, _options);
        return result.toPromise();
    }

    /**
     * Upload Images
     * @param enterpriseId
     * @param [image]
     */
    public uploadImagesEnterprisesUploadImagesEnterpriseIdPostWithHttpInfo(enterpriseId: number, image?: HttpFile, _options?: Configuration): Promise<HttpInfo<ResponseSchema>> {
        const result = this.api.uploadImagesEnterprisesUploadImagesEnterpriseIdPostWithHttpInfo(enterpriseId, image, _options);
        return result.toPromise();
    }

    /**
     * Upload Images
     * @param enterpriseId
     * @param [image]
     */
    public uploadImagesEnterprisesUploadImagesEnterpriseIdPost(enterpriseId: number, image?: HttpFile, _options?: Configuration): Promise<ResponseSchema> {
        const result = this.api.uploadImagesEnterprisesUploadImagesEnterpriseIdPost(enterpriseId, image, _options);
        return result.toPromise();
    }


}



import { ObservableInnApi } from './ObservableAPI';

import { InnApiRequestFactory, InnApiResponseProcessor} from "../apis/InnApi";
export class PromiseInnApi {
    private api: ObservableInnApi

    public constructor(
        configuration: Configuration,
        requestFactory?: InnApiRequestFactory,
        responseProcessor?: InnApiResponseProcessor
    ) {
        this.api = new ObservableInnApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Result Page
     * @param inn
     */
    public resultPageInnInnInfoGetWithHttpInfo(inn: string, _options?: Configuration): Promise<HttpInfo<any>> {
        const result = this.api.resultPageInnInnInfoGetWithHttpInfo(inn, _options);
        return result.toPromise();
    }

    /**
     * Result Page
     * @param inn
     */
    public resultPageInnInnInfoGet(inn: string, _options?: Configuration): Promise<any> {
        const result = this.api.resultPageInnInnInfoGet(inn, _options);
        return result.toPromise();
    }


}



import { ObservableMongodbApi } from './ObservableAPI';

import { MongodbApiRequestFactory, MongodbApiResponseProcessor} from "../apis/MongodbApi";
export class PromiseMongodbApi {
    private api: ObservableMongodbApi

    public constructor(
        configuration: Configuration,
        requestFactory?: MongodbApiRequestFactory,
        responseProcessor?: MongodbApiResponseProcessor
    ) {
        this.api = new ObservableMongodbApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Get Document
     * @param id
     */
    public getDocumentMongoDocumentIdGetWithHttpInfo(id: string, _options?: Configuration): Promise<HttpInfo<DocumentModel>> {
        const result = this.api.getDocumentMongoDocumentIdGetWithHttpInfo(id, _options);
        return result.toPromise();
    }

    /**
     * Get Document
     * @param id
     */
    public getDocumentMongoDocumentIdGet(id: string, _options?: Configuration): Promise<DocumentModel> {
        const result = this.api.getDocumentMongoDocumentIdGet(id, _options);
        return result.toPromise();
    }

    /**
     * Get Image
     * @param id
     */
    public getImageMongoImageIdGetWithHttpInfo(id: string, _options?: Configuration): Promise<HttpInfo<ImageModel>> {
        const result = this.api.getImageMongoImageIdGetWithHttpInfo(id, _options);
        return result.toPromise();
    }

    /**
     * Get Image
     * @param id
     */
    public getImageMongoImageIdGet(id: string, _options?: Configuration): Promise<ImageModel> {
        const result = this.api.getImageMongoImageIdGet(id, _options);
        return result.toPromise();
    }

    /**
     * Upload Document
     * @param file
     */
    public uploadDocumentMongoDocumentPostWithHttpInfo(file: HttpFile, _options?: Configuration): Promise<HttpInfo<UploadDocumentModel>> {
        const result = this.api.uploadDocumentMongoDocumentPostWithHttpInfo(file, _options);
        return result.toPromise();
    }

    /**
     * Upload Document
     * @param file
     */
    public uploadDocumentMongoDocumentPost(file: HttpFile, _options?: Configuration): Promise<UploadDocumentModel> {
        const result = this.api.uploadDocumentMongoDocumentPost(file, _options);
        return result.toPromise();
    }

    /**
     * Upload Image
     * @param file
     */
    public uploadImageMongoImagePostWithHttpInfo(file: HttpFile, _options?: Configuration): Promise<HttpInfo<UploadImageModel>> {
        const result = this.api.uploadImageMongoImagePostWithHttpInfo(file, _options);
        return result.toPromise();
    }

    /**
     * Upload Image
     * @param file
     */
    public uploadImageMongoImagePost(file: HttpFile, _options?: Configuration): Promise<UploadImageModel> {
        const result = this.api.uploadImageMongoImagePost(file, _options);
        return result.toPromise();
    }


}



import { ObservablePointsApi } from './ObservableAPI';

import { PointsApiRequestFactory, PointsApiResponseProcessor} from "../apis/PointsApi";
export class PromisePointsApi {
    private api: ObservablePointsApi

    public constructor(
        configuration: Configuration,
        requestFactory?: PointsApiRequestFactory,
        responseProcessor?: PointsApiResponseProcessor
    ) {
        this.api = new ObservablePointsApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Add Document
     * @param pointId
     * @param [documents]
     */
    public addDocumentPointsDocumentPointIdPostWithHttpInfo(pointId: number, documents?: Array<HttpFile>, _options?: Configuration): Promise<HttpInfo<ResponseSchema>> {
        const result = this.api.addDocumentPointsDocumentPointIdPostWithHttpInfo(pointId, documents, _options);
        return result.toPromise();
    }

    /**
     * Add Document
     * @param pointId
     * @param [documents]
     */
    public addDocumentPointsDocumentPointIdPost(pointId: number, documents?: Array<HttpFile>, _options?: Configuration): Promise<ResponseSchema> {
        const result = this.api.addDocumentPointsDocumentPointIdPost(pointId, documents, _options);
        return result.toPromise();
    }

    /**
     * Add Social
     * @param pointId
     * @param socialSchema
     */
    public addSocialPointsSocialPointIdPostWithHttpInfo(pointId: number, socialSchema: SocialSchema, _options?: Configuration): Promise<HttpInfo<ResponseSchema>> {
        const result = this.api.addSocialPointsSocialPointIdPostWithHttpInfo(pointId, socialSchema, _options);
        return result.toPromise();
    }

    /**
     * Add Social
     * @param pointId
     * @param socialSchema
     */
    public addSocialPointsSocialPointIdPost(pointId: number, socialSchema: SocialSchema, _options?: Configuration): Promise<ResponseSchema> {
        const result = this.api.addSocialPointsSocialPointIdPost(pointId, socialSchema, _options);
        return result.toPromise();
    }

    /**
     * Change Point
     * @param pointId
     * @param changePointSchema
     */
    public changePointPointsChangePointIdPatchWithHttpInfo(pointId: number, changePointSchema: ChangePointSchema, _options?: Configuration): Promise<HttpInfo<ResponseSchema>> {
        const result = this.api.changePointPointsChangePointIdPatchWithHttpInfo(pointId, changePointSchema, _options);
        return result.toPromise();
    }

    /**
     * Change Point
     * @param pointId
     * @param changePointSchema
     */
    public changePointPointsChangePointIdPatch(pointId: number, changePointSchema: ChangePointSchema, _options?: Configuration): Promise<ResponseSchema> {
        const result = this.api.changePointPointsChangePointIdPatch(pointId, changePointSchema, _options);
        return result.toPromise();
    }

    /**
     * Delete Point
     * @param pointId
     */
    public deletePointPointsDeletePointIdDeleteWithHttpInfo(pointId: number, _options?: Configuration): Promise<HttpInfo<ResponseSchema>> {
        const result = this.api.deletePointPointsDeletePointIdDeleteWithHttpInfo(pointId, _options);
        return result.toPromise();
    }

    /**
     * Delete Point
     * @param pointId
     */
    public deletePointPointsDeletePointIdDelete(pointId: number, _options?: Configuration): Promise<ResponseSchema> {
        const result = this.api.deletePointPointsDeletePointIdDelete(pointId, _options);
        return result.toPromise();
    }

    /**
     * Delete Social
     * @param pointId
     * @param socialID
     */
    public deleteSocialPointsSocialPointIdDeleteWithHttpInfo(pointId: number, socialID: SocialID, _options?: Configuration): Promise<HttpInfo<ResponseSchema>> {
        const result = this.api.deleteSocialPointsSocialPointIdDeleteWithHttpInfo(pointId, socialID, _options);
        return result.toPromise();
    }

    /**
     * Delete Social
     * @param pointId
     * @param socialID
     */
    public deleteSocialPointsSocialPointIdDelete(pointId: number, socialID: SocialID, _options?: Configuration): Promise<ResponseSchema> {
        const result = this.api.deleteSocialPointsSocialPointIdDelete(pointId, socialID, _options);
        return result.toPromise();
    }

    /**
     * Get Points Info
     */
    public getPointsInfoPointsGetWithHttpInfo(_options?: Configuration): Promise<HttpInfo<Array<PointInfo>>> {
        const result = this.api.getPointsInfoPointsGetWithHttpInfo(_options);
        return result.toPromise();
    }

    /**
     * Get Points Info
     */
    public getPointsInfoPointsGet(_options?: Configuration): Promise<Array<PointInfo>> {
        const result = this.api.getPointsInfoPointsGet(_options);
        return result.toPromise();
    }

    /**
     * Get Points Info
     * @param pointId
     */
    public getPointsInfoPointsPointIdGetWithHttpInfo(pointId: number, _options?: Configuration): Promise<HttpInfo<PointInfo>> {
        const result = this.api.getPointsInfoPointsPointIdGetWithHttpInfo(pointId, _options);
        return result.toPromise();
    }

    /**
     * Get Points Info
     * @param pointId
     */
    public getPointsInfoPointsPointIdGet(pointId: number, _options?: Configuration): Promise<PointInfo> {
        const result = this.api.getPointsInfoPointsPointIdGet(pointId, _options);
        return result.toPromise();
    }

    /**
     * Get Socials
     * @param pointId
     */
    public getSocialsPointsSocialPointIdGetWithHttpInfo(pointId: number, _options?: Configuration): Promise<HttpInfo<any>> {
        const result = this.api.getSocialsPointsSocialPointIdGetWithHttpInfo(pointId, _options);
        return result.toPromise();
    }

    /**
     * Get Socials
     * @param pointId
     */
    public getSocialsPointsSocialPointIdGet(pointId: number, _options?: Configuration): Promise<any> {
        const result = this.api.getSocialsPointsSocialPointIdGet(pointId, _options);
        return result.toPromise();
    }

    /**
     * Register Point
     * @param registerPoint
     */
    public registerPointPointsRegisterPostWithHttpInfo(registerPoint: RegisterPoint, _options?: Configuration): Promise<HttpInfo<ResponseSchema>> {
        const result = this.api.registerPointPointsRegisterPostWithHttpInfo(registerPoint, _options);
        return result.toPromise();
    }

    /**
     * Register Point
     * @param registerPoint
     */
    public registerPointPointsRegisterPost(registerPoint: RegisterPoint, _options?: Configuration): Promise<ResponseSchema> {
        const result = this.api.registerPointPointsRegisterPost(registerPoint, _options);
        return result.toPromise();
    }

    /**
     * Upload Images
     * @param pointId
     * @param [image]
     */
    public uploadImagesPointsUploadImagesPointIdPostWithHttpInfo(pointId: number, image?: HttpFile, _options?: Configuration): Promise<HttpInfo<ResponseSchema>> {
        const result = this.api.uploadImagesPointsUploadImagesPointIdPostWithHttpInfo(pointId, image, _options);
        return result.toPromise();
    }

    /**
     * Upload Images
     * @param pointId
     * @param [image]
     */
    public uploadImagesPointsUploadImagesPointIdPost(pointId: number, image?: HttpFile, _options?: Configuration): Promise<ResponseSchema> {
        const result = this.api.uploadImagesPointsUploadImagesPointIdPost(pointId, image, _options);
        return result.toPromise();
    }


}



import { ObservableProfileApi } from './ObservableAPI';

import { ProfileApiRequestFactory, ProfileApiResponseProcessor} from "../apis/ProfileApi";
export class PromiseProfileApi {
    private api: ObservableProfileApi

    public constructor(
        configuration: Configuration,
        requestFactory?: ProfileApiRequestFactory,
        responseProcessor?: ProfileApiResponseProcessor
    ) {
        this.api = new ObservableProfileApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Get All Users
     */
    public getAllUsersProfileAllGetWithHttpInfo(_options?: Configuration): Promise<HttpInfo<any>> {
        const result = this.api.getAllUsersProfileAllGetWithHttpInfo(_options);
        return result.toPromise();
    }

    /**
     * Get All Users
     */
    public getAllUsersProfileAllGet(_options?: Configuration): Promise<any> {
        const result = this.api.getAllUsersProfileAllGet(_options);
        return result.toPromise();
    }

    /**
     * Get Users Me
     * @param changeUserSchema
     */
    public getUsersMeProfileChangePatchWithHttpInfo(changeUserSchema: ChangeUserSchema, _options?: Configuration): Promise<HttpInfo<ResponseSchema>> {
        const result = this.api.getUsersMeProfileChangePatchWithHttpInfo(changeUserSchema, _options);
        return result.toPromise();
    }

    /**
     * Get Users Me
     * @param changeUserSchema
     */
    public getUsersMeProfileChangePatch(changeUserSchema: ChangeUserSchema, _options?: Configuration): Promise<ResponseSchema> {
        const result = this.api.getUsersMeProfileChangePatch(changeUserSchema, _options);
        return result.toPromise();
    }

    /**
     * Get Users Me
     */
    public getUsersMeProfileMeGetWithHttpInfo(_options?: Configuration): Promise<HttpInfo<UserSchema>> {
        const result = this.api.getUsersMeProfileMeGetWithHttpInfo(_options);
        return result.toPromise();
    }

    /**
     * Get Users Me
     */
    public getUsersMeProfileMeGet(_options?: Configuration): Promise<UserSchema> {
        const result = this.api.getUsersMeProfileMeGet(_options);
        return result.toPromise();
    }


}



import { ObservableVerifyApi } from './ObservableAPI';

import { VerifyApiRequestFactory, VerifyApiResponseProcessor} from "../apis/VerifyApi";
export class PromiseVerifyApi {
    private api: ObservableVerifyApi

    public constructor(
        configuration: Configuration,
        requestFactory?: VerifyApiRequestFactory,
        responseProcessor?: VerifyApiResponseProcessor
    ) {
        this.api = new ObservableVerifyApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Check Code
     * @param bodyCheckCodeVerifyPhoneCheckPost
     */
    public checkCodeVerifyPhoneCheckPostWithHttpInfo(bodyCheckCodeVerifyPhoneCheckPost: BodyCheckCodeVerifyPhoneCheckPost, _options?: Configuration): Promise<HttpInfo<VerifePhone>> {
        const result = this.api.checkCodeVerifyPhoneCheckPostWithHttpInfo(bodyCheckCodeVerifyPhoneCheckPost, _options);
        return result.toPromise();
    }

    /**
     * Check Code
     * @param bodyCheckCodeVerifyPhoneCheckPost
     */
    public checkCodeVerifyPhoneCheckPost(bodyCheckCodeVerifyPhoneCheckPost: BodyCheckCodeVerifyPhoneCheckPost, _options?: Configuration): Promise<VerifePhone> {
        const result = this.api.checkCodeVerifyPhoneCheckPost(bodyCheckCodeVerifyPhoneCheckPost, _options);
        return result.toPromise();
    }

    /**
     * Check Email
     * @param emailCode
     */
    public checkEmailVerifyGetWithHttpInfo(emailCode: string, _options?: Configuration): Promise<HttpInfo<ResponseSchema>> {
        const result = this.api.checkEmailVerifyGetWithHttpInfo(emailCode, _options);
        return result.toPromise();
    }

    /**
     * Check Email
     * @param emailCode
     */
    public checkEmailVerifyGet(emailCode: string, _options?: Configuration): Promise<ResponseSchema> {
        const result = this.api.checkEmailVerifyGet(emailCode, _options);
        return result.toPromise();
    }

    /**
     * Only For Testing
     */
    public onlyForTestingVerifyGetSessionsSmsGetWithHttpInfo(_options?: Configuration): Promise<HttpInfo<any>> {
        const result = this.api.onlyForTestingVerifyGetSessionsSmsGetWithHttpInfo(_options);
        return result.toPromise();
    }

    /**
     * Only For Testing
     */
    public onlyForTestingVerifyGetSessionsSmsGet(_options?: Configuration): Promise<any> {
        const result = this.api.onlyForTestingVerifyGetSessionsSmsGet(_options);
        return result.toPromise();
    }

    /**
     * Send Email
     * @param emailSchema
     */
    public sendEmailVerifyEmailSendPostWithHttpInfo(emailSchema: EmailSchema, _options?: Configuration): Promise<HttpInfo<any>> {
        const result = this.api.sendEmailVerifyEmailSendPostWithHttpInfo(emailSchema, _options);
        return result.toPromise();
    }

    /**
     * Send Email
     * @param emailSchema
     */
    public sendEmailVerifyEmailSendPost(emailSchema: EmailSchema, _options?: Configuration): Promise<any> {
        const result = this.api.sendEmailVerifyEmailSendPost(emailSchema, _options);
        return result.toPromise();
    }

    /**
     * Send Message
     */
    public sendMessageVerifyPhoneSendPostWithHttpInfo(_options?: Configuration): Promise<HttpInfo<ReqID>> {
        const result = this.api.sendMessageVerifyPhoneSendPostWithHttpInfo(_options);
        return result.toPromise();
    }

    /**
     * Send Message
     */
    public sendMessageVerifyPhoneSendPost(_options?: Configuration): Promise<ReqID> {
        const result = this.api.sendMessageVerifyPhoneSendPost(_options);
        return result.toPromise();
    }


}



