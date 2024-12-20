import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration} from '../configuration'
import { Observable, of, from } from '../rxjsStub';
import {mergeMap, map} from  '../rxjsStub';
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

import { AuthApiRequestFactory, AuthApiResponseProcessor} from "../apis/AuthApi";
export class ObservableAuthApi {
    private requestFactory: AuthApiRequestFactory;
    private responseProcessor: AuthApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: AuthApiRequestFactory,
        responseProcessor?: AuthApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new AuthApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new AuthApiResponseProcessor();
    }

    /**
     * Login
     * @param login
     */
    public loginLoginPostWithHttpInfo(login: Login, _options?: Configuration): Observable<HttpInfo<TokenPair>> {
        const requestContextPromise = this.requestFactory.loginLoginPost(login, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.loginLoginPostWithHttpInfo(rsp)));
            }));
    }

    /**
     * Login
     * @param login
     */
    public loginLoginPost(login: Login, _options?: Configuration): Observable<TokenPair> {
        return this.loginLoginPostWithHttpInfo(login, _options).pipe(map((apiResponse: HttpInfo<TokenPair>) => apiResponse.data));
    }

    /**
     * Refresh Tokens
     * @param refreshToken
     */
    public refreshTokensRefreshPostWithHttpInfo(refreshToken: string, _options?: Configuration): Observable<HttpInfo<TokenPair>> {
        const requestContextPromise = this.requestFactory.refreshTokensRefreshPost(refreshToken, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.refreshTokensRefreshPostWithHttpInfo(rsp)));
            }));
    }

    /**
     * Refresh Tokens
     * @param refreshToken
     */
    public refreshTokensRefreshPost(refreshToken: string, _options?: Configuration): Observable<TokenPair> {
        return this.refreshTokensRefreshPostWithHttpInfo(refreshToken, _options).pipe(map((apiResponse: HttpInfo<TokenPair>) => apiResponse.data));
    }

    /**
     * Registration
     * @param register
     */
    public registrationRegistrationPostWithHttpInfo(register: Register, _options?: Configuration): Observable<HttpInfo<TokenPair>> {
        const requestContextPromise = this.requestFactory.registrationRegistrationPost(register, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.registrationRegistrationPostWithHttpInfo(rsp)));
            }));
    }

    /**
     * Registration
     * @param register
     */
    public registrationRegistrationPost(register: Register, _options?: Configuration): Observable<TokenPair> {
        return this.registrationRegistrationPostWithHttpInfo(register, _options).pipe(map((apiResponse: HttpInfo<TokenPair>) => apiResponse.data));
    }

}

import { CommentsApiRequestFactory, CommentsApiResponseProcessor} from "../apis/CommentsApi";
export class ObservableCommentsApi {
    private requestFactory: CommentsApiRequestFactory;
    private responseProcessor: CommentsApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: CommentsApiRequestFactory,
        responseProcessor?: CommentsApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new CommentsApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new CommentsApiResponseProcessor();
    }

    /**
     * Add Coment
     * @param pointId
     * @param commentsData
     * @param [images]
     */
    public addComentCommentsPointIdPostWithHttpInfo(pointId: number, commentsData: CommentData, images?: Array<HttpFile>, _options?: Configuration): Observable<HttpInfo<ResponseSchema>> {
        const requestContextPromise = this.requestFactory.addComentCommentsPointIdPost(pointId, commentsData, images, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.addComentCommentsPointIdPostWithHttpInfo(rsp)));
            }));
    }

    /**
     * Add Coment
     * @param pointId
     * @param commentsData
     * @param [images]
     */
    public addComentCommentsPointIdPost(pointId: number, commentsData: CommentData, images?: Array<HttpFile>, _options?: Configuration): Observable<ResponseSchema> {
        return this.addComentCommentsPointIdPostWithHttpInfo(pointId, commentsData, images, _options).pipe(map((apiResponse: HttpInfo<ResponseSchema>) => apiResponse.data));
    }

    /**
     * Get Comments
     * @param pointId
     */
    public getCommentsCommentsGetWithHttpInfo(pointId: number, _options?: Configuration): Observable<HttpInfo<Array<CommentsSchema>>> {
        const requestContextPromise = this.requestFactory.getCommentsCommentsGet(pointId, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getCommentsCommentsGetWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get Comments
     * @param pointId
     */
    public getCommentsCommentsGet(pointId: number, _options?: Configuration): Observable<Array<CommentsSchema>> {
        return this.getCommentsCommentsGetWithHttpInfo(pointId, _options).pipe(map((apiResponse: HttpInfo<Array<CommentsSchema>>) => apiResponse.data));
    }

}

import { EnterprisesApiRequestFactory, EnterprisesApiResponseProcessor} from "../apis/EnterprisesApi";
export class ObservableEnterprisesApi {
    private requestFactory: EnterprisesApiRequestFactory;
    private responseProcessor: EnterprisesApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: EnterprisesApiRequestFactory,
        responseProcessor?: EnterprisesApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new EnterprisesApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new EnterprisesApiResponseProcessor();
    }

    /**
     * Get Companies Info
     */
    public getCompaniesInfoEnterprisesEnterprisesInfoGetWithHttpInfo(_options?: Configuration): Observable<HttpInfo<Array<EnterpriseInfo>>> {
        const requestContextPromise = this.requestFactory.getCompaniesInfoEnterprisesEnterprisesInfoGet(_options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getCompaniesInfoEnterprisesEnterprisesInfoGetWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get Companies Info
     */
    public getCompaniesInfoEnterprisesEnterprisesInfoGet(_options?: Configuration): Observable<Array<EnterpriseInfo>> {
        return this.getCompaniesInfoEnterprisesEnterprisesInfoGetWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<Array<EnterpriseInfo>>) => apiResponse.data));
    }

    /**
     * Register Company
     * @param registerCompany
     */
    public registerCompanyEnterprisesRegisterPostWithHttpInfo(registerCompany: RegisterCompany, _options?: Configuration): Observable<HttpInfo<ResponseSchema>> {
        const requestContextPromise = this.requestFactory.registerCompanyEnterprisesRegisterPost(registerCompany, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.registerCompanyEnterprisesRegisterPostWithHttpInfo(rsp)));
            }));
    }

    /**
     * Register Company
     * @param registerCompany
     */
    public registerCompanyEnterprisesRegisterPost(registerCompany: RegisterCompany, _options?: Configuration): Observable<ResponseSchema> {
        return this.registerCompanyEnterprisesRegisterPostWithHttpInfo(registerCompany, _options).pipe(map((apiResponse: HttpInfo<ResponseSchema>) => apiResponse.data));
    }

    /**
     * Upload Images
     * @param enterpriseId
     * @param [image]
     */
    public uploadImagesEnterprisesUploadImagesEnterpriseIdPostWithHttpInfo(enterpriseId: number, image?: HttpFile, _options?: Configuration): Observable<HttpInfo<ResponseSchema>> {
        const requestContextPromise = this.requestFactory.uploadImagesEnterprisesUploadImagesEnterpriseIdPost(enterpriseId, image, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.uploadImagesEnterprisesUploadImagesEnterpriseIdPostWithHttpInfo(rsp)));
            }));
    }

    /**
     * Upload Images
     * @param enterpriseId
     * @param [image]
     */
    public uploadImagesEnterprisesUploadImagesEnterpriseIdPost(enterpriseId: number, image?: HttpFile, _options?: Configuration): Observable<ResponseSchema> {
        return this.uploadImagesEnterprisesUploadImagesEnterpriseIdPostWithHttpInfo(enterpriseId, image, _options).pipe(map((apiResponse: HttpInfo<ResponseSchema>) => apiResponse.data));
    }

}

import { InnApiRequestFactory, InnApiResponseProcessor} from "../apis/InnApi";
export class ObservableInnApi {
    private requestFactory: InnApiRequestFactory;
    private responseProcessor: InnApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: InnApiRequestFactory,
        responseProcessor?: InnApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new InnApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new InnApiResponseProcessor();
    }

    /**
     * Result Page
     * @param inn
     */
    public resultPageInnInnInfoGetWithHttpInfo(inn: string, _options?: Configuration): Observable<HttpInfo<any>> {
        const requestContextPromise = this.requestFactory.resultPageInnInnInfoGet(inn, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.resultPageInnInnInfoGetWithHttpInfo(rsp)));
            }));
    }

    /**
     * Result Page
     * @param inn
     */
    public resultPageInnInnInfoGet(inn: string, _options?: Configuration): Observable<any> {
        return this.resultPageInnInnInfoGetWithHttpInfo(inn, _options).pipe(map((apiResponse: HttpInfo<any>) => apiResponse.data));
    }

}

import { MongodbApiRequestFactory, MongodbApiResponseProcessor} from "../apis/MongodbApi";
export class ObservableMongodbApi {
    private requestFactory: MongodbApiRequestFactory;
    private responseProcessor: MongodbApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: MongodbApiRequestFactory,
        responseProcessor?: MongodbApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new MongodbApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new MongodbApiResponseProcessor();
    }

    /**
     * Get Document
     * @param id
     */
    public getDocumentMongoDocumentIdGetWithHttpInfo(id: string, _options?: Configuration): Observable<HttpInfo<DocumentModel>> {
        const requestContextPromise = this.requestFactory.getDocumentMongoDocumentIdGet(id, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getDocumentMongoDocumentIdGetWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get Document
     * @param id
     */
    public getDocumentMongoDocumentIdGet(id: string, _options?: Configuration): Observable<DocumentModel> {
        return this.getDocumentMongoDocumentIdGetWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<DocumentModel>) => apiResponse.data));
    }

    /**
     * Get Image
     * @param id
     */
    public getImageMongoImageIdGetWithHttpInfo(id: string, _options?: Configuration): Observable<HttpInfo<ImageModel>> {
        const requestContextPromise = this.requestFactory.getImageMongoImageIdGet(id, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getImageMongoImageIdGetWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get Image
     * @param id
     */
    public getImageMongoImageIdGet(id: string, _options?: Configuration): Observable<ImageModel> {
        return this.getImageMongoImageIdGetWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<ImageModel>) => apiResponse.data));
    }

    /**
     * Upload Document
     * @param file
     */
    public uploadDocumentMongoDocumentPostWithHttpInfo(file: HttpFile, _options?: Configuration): Observable<HttpInfo<UploadDocumentModel>> {
        const requestContextPromise = this.requestFactory.uploadDocumentMongoDocumentPost(file, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.uploadDocumentMongoDocumentPostWithHttpInfo(rsp)));
            }));
    }

    /**
     * Upload Document
     * @param file
     */
    public uploadDocumentMongoDocumentPost(file: HttpFile, _options?: Configuration): Observable<UploadDocumentModel> {
        return this.uploadDocumentMongoDocumentPostWithHttpInfo(file, _options).pipe(map((apiResponse: HttpInfo<UploadDocumentModel>) => apiResponse.data));
    }

    /**
     * Upload Image
     * @param file
     */
    public uploadImageMongoImagePostWithHttpInfo(file: HttpFile, _options?: Configuration): Observable<HttpInfo<UploadImageModel>> {
        const requestContextPromise = this.requestFactory.uploadImageMongoImagePost(file, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.uploadImageMongoImagePostWithHttpInfo(rsp)));
            }));
    }

    /**
     * Upload Image
     * @param file
     */
    public uploadImageMongoImagePost(file: HttpFile, _options?: Configuration): Observable<UploadImageModel> {
        return this.uploadImageMongoImagePostWithHttpInfo(file, _options).pipe(map((apiResponse: HttpInfo<UploadImageModel>) => apiResponse.data));
    }

}

import { PointsApiRequestFactory, PointsApiResponseProcessor} from "../apis/PointsApi";
export class ObservablePointsApi {
    private requestFactory: PointsApiRequestFactory;
    private responseProcessor: PointsApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: PointsApiRequestFactory,
        responseProcessor?: PointsApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new PointsApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new PointsApiResponseProcessor();
    }

    /**
     * Add Document
     * @param pointId
     * @param [documents]
     */
    public addDocumentPointsDocumentPointIdPostWithHttpInfo(pointId: number, documents?: Array<HttpFile>, _options?: Configuration): Observable<HttpInfo<ResponseSchema>> {
        const requestContextPromise = this.requestFactory.addDocumentPointsDocumentPointIdPost(pointId, documents, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.addDocumentPointsDocumentPointIdPostWithHttpInfo(rsp)));
            }));
    }

    /**
     * Add Document
     * @param pointId
     * @param [documents]
     */
    public addDocumentPointsDocumentPointIdPost(pointId: number, documents?: Array<HttpFile>, _options?: Configuration): Observable<ResponseSchema> {
        return this.addDocumentPointsDocumentPointIdPostWithHttpInfo(pointId, documents, _options).pipe(map((apiResponse: HttpInfo<ResponseSchema>) => apiResponse.data));
    }

    /**
     * Add Social
     * @param pointId
     * @param socialSchema
     */
    public addSocialPointsSocialPointIdPostWithHttpInfo(pointId: number, socialSchema: SocialSchema, _options?: Configuration): Observable<HttpInfo<ResponseSchema>> {
        const requestContextPromise = this.requestFactory.addSocialPointsSocialPointIdPost(pointId, socialSchema, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.addSocialPointsSocialPointIdPostWithHttpInfo(rsp)));
            }));
    }

    /**
     * Add Social
     * @param pointId
     * @param socialSchema
     */
    public addSocialPointsSocialPointIdPost(pointId: number, socialSchema: SocialSchema, _options?: Configuration): Observable<ResponseSchema> {
        return this.addSocialPointsSocialPointIdPostWithHttpInfo(pointId, socialSchema, _options).pipe(map((apiResponse: HttpInfo<ResponseSchema>) => apiResponse.data));
    }

    /**
     * Change Point
     * @param pointId
     * @param changePointSchema
     */
    public changePointPointsChangePointIdPatchWithHttpInfo(pointId: number, changePointSchema: ChangePointSchema, _options?: Configuration): Observable<HttpInfo<ResponseSchema>> {
        const requestContextPromise = this.requestFactory.changePointPointsChangePointIdPatch(pointId, changePointSchema, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.changePointPointsChangePointIdPatchWithHttpInfo(rsp)));
            }));
    }

    /**
     * Change Point
     * @param pointId
     * @param changePointSchema
     */
    public changePointPointsChangePointIdPatch(pointId: number, changePointSchema: ChangePointSchema, _options?: Configuration): Observable<ResponseSchema> {
        return this.changePointPointsChangePointIdPatchWithHttpInfo(pointId, changePointSchema, _options).pipe(map((apiResponse: HttpInfo<ResponseSchema>) => apiResponse.data));
    }

    /**
     * Delete Point
     * @param pointId
     */
    public deletePointPointsDeletePointIdDeleteWithHttpInfo(pointId: number, _options?: Configuration): Observable<HttpInfo<ResponseSchema>> {
        const requestContextPromise = this.requestFactory.deletePointPointsDeletePointIdDelete(pointId, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.deletePointPointsDeletePointIdDeleteWithHttpInfo(rsp)));
            }));
    }

    /**
     * Delete Point
     * @param pointId
     */
    public deletePointPointsDeletePointIdDelete(pointId: number, _options?: Configuration): Observable<ResponseSchema> {
        return this.deletePointPointsDeletePointIdDeleteWithHttpInfo(pointId, _options).pipe(map((apiResponse: HttpInfo<ResponseSchema>) => apiResponse.data));
    }

    /**
     * Delete Social
     * @param pointId
     * @param socialID
     */
    public deleteSocialPointsSocialPointIdDeleteWithHttpInfo(pointId: number, socialID: SocialID, _options?: Configuration): Observable<HttpInfo<ResponseSchema>> {
        const requestContextPromise = this.requestFactory.deleteSocialPointsSocialPointIdDelete(pointId, socialID, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.deleteSocialPointsSocialPointIdDeleteWithHttpInfo(rsp)));
            }));
    }

    /**
     * Delete Social
     * @param pointId
     * @param socialID
     */
    public deleteSocialPointsSocialPointIdDelete(pointId: number, socialID: SocialID, _options?: Configuration): Observable<ResponseSchema> {
        return this.deleteSocialPointsSocialPointIdDeleteWithHttpInfo(pointId, socialID, _options).pipe(map((apiResponse: HttpInfo<ResponseSchema>) => apiResponse.data));
    }

    /**
     * Get Points Info
     */
    public getPointsInfoPointsGetWithHttpInfo(_options?: Configuration): Observable<HttpInfo<Array<PointInfo>>> {
        const requestContextPromise = this.requestFactory.getPointsInfoPointsGet(_options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getPointsInfoPointsGetWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get Points Info
     */
    public getPointsInfoPointsGet(_options?: Configuration): Observable<Array<PointInfo>> {
        return this.getPointsInfoPointsGetWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<Array<PointInfo>>) => apiResponse.data));
    }

    /**
     * Get Points Info
     * @param pointId
     */
    public getPointsInfoPointsPointIdGetWithHttpInfo(pointId: number, _options?: Configuration): Observable<HttpInfo<PointInfo>> {
        const requestContextPromise = this.requestFactory.getPointsInfoPointsPointIdGet(pointId, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getPointsInfoPointsPointIdGetWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get Points Info
     * @param pointId
     */
    public getPointsInfoPointsPointIdGet(pointId: number, _options?: Configuration): Observable<PointInfo> {
        return this.getPointsInfoPointsPointIdGetWithHttpInfo(pointId, _options).pipe(map((apiResponse: HttpInfo<PointInfo>) => apiResponse.data));
    }

    /**
     * Get Socials
     * @param pointId
     */
    public getSocialsPointsSocialPointIdGetWithHttpInfo(pointId: number, _options?: Configuration): Observable<HttpInfo<any>> {
        const requestContextPromise = this.requestFactory.getSocialsPointsSocialPointIdGet(pointId, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getSocialsPointsSocialPointIdGetWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get Socials
     * @param pointId
     */
    public getSocialsPointsSocialPointIdGet(pointId: number, _options?: Configuration): Observable<any> {
        return this.getSocialsPointsSocialPointIdGetWithHttpInfo(pointId, _options).pipe(map((apiResponse: HttpInfo<any>) => apiResponse.data));
    }

    /**
     * Register Point
     * @param registerPoint
     */
    public registerPointPointsRegisterPostWithHttpInfo(registerPoint: RegisterPoint, _options?: Configuration): Observable<HttpInfo<ResponseSchema>> {
        const requestContextPromise = this.requestFactory.registerPointPointsRegisterPost(registerPoint, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.registerPointPointsRegisterPostWithHttpInfo(rsp)));
            }));
    }

    /**
     * Register Point
     * @param registerPoint
     */
    public registerPointPointsRegisterPost(registerPoint: RegisterPoint, _options?: Configuration): Observable<ResponseSchema> {
        return this.registerPointPointsRegisterPostWithHttpInfo(registerPoint, _options).pipe(map((apiResponse: HttpInfo<ResponseSchema>) => apiResponse.data));
    }

    /**
     * Upload Images
     * @param pointId
     * @param [image]
     */
    public uploadImagesPointsUploadImagesPointIdPostWithHttpInfo(pointId: number, image?: HttpFile, _options?: Configuration): Observable<HttpInfo<ResponseSchema>> {
        const requestContextPromise = this.requestFactory.uploadImagesPointsUploadImagesPointIdPost(pointId, image, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.uploadImagesPointsUploadImagesPointIdPostWithHttpInfo(rsp)));
            }));
    }

    /**
     * Upload Images
     * @param pointId
     * @param [image]
     */
    public uploadImagesPointsUploadImagesPointIdPost(pointId: number, image?: HttpFile, _options?: Configuration): Observable<ResponseSchema> {
        return this.uploadImagesPointsUploadImagesPointIdPostWithHttpInfo(pointId, image, _options).pipe(map((apiResponse: HttpInfo<ResponseSchema>) => apiResponse.data));
    }

}

import { ProfileApiRequestFactory, ProfileApiResponseProcessor} from "../apis/ProfileApi";
export class ObservableProfileApi {
    private requestFactory: ProfileApiRequestFactory;
    private responseProcessor: ProfileApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: ProfileApiRequestFactory,
        responseProcessor?: ProfileApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new ProfileApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new ProfileApiResponseProcessor();
    }

    /**
     * Get All Users
     */
    public getAllUsersProfileAllGetWithHttpInfo(_options?: Configuration): Observable<HttpInfo<any>> {
        const requestContextPromise = this.requestFactory.getAllUsersProfileAllGet(_options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getAllUsersProfileAllGetWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get All Users
     */
    public getAllUsersProfileAllGet(_options?: Configuration): Observable<any> {
        return this.getAllUsersProfileAllGetWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<any>) => apiResponse.data));
    }

    /**
     * Get Users Me
     * @param changeUserSchema
     */
    public getUsersMeProfileChangePatchWithHttpInfo(changeUserSchema: ChangeUserSchema, _options?: Configuration): Observable<HttpInfo<ResponseSchema>> {
        const requestContextPromise = this.requestFactory.getUsersMeProfileChangePatch(changeUserSchema, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getUsersMeProfileChangePatchWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get Users Me
     * @param changeUserSchema
     */
    public getUsersMeProfileChangePatch(changeUserSchema: ChangeUserSchema, _options?: Configuration): Observable<ResponseSchema> {
        return this.getUsersMeProfileChangePatchWithHttpInfo(changeUserSchema, _options).pipe(map((apiResponse: HttpInfo<ResponseSchema>) => apiResponse.data));
    }

    /**
     * Get Users Me
     */
    public getUsersMeProfileMeGetWithHttpInfo(_options?: Configuration): Observable<HttpInfo<UserSchema>> {
        const requestContextPromise = this.requestFactory.getUsersMeProfileMeGet(_options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getUsersMeProfileMeGetWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get Users Me
     */
    public getUsersMeProfileMeGet(_options?: Configuration): Observable<UserSchema> {
        return this.getUsersMeProfileMeGetWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<UserSchema>) => apiResponse.data));
    }

}

import { VerifyApiRequestFactory, VerifyApiResponseProcessor} from "../apis/VerifyApi";
export class ObservableVerifyApi {
    private requestFactory: VerifyApiRequestFactory;
    private responseProcessor: VerifyApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: VerifyApiRequestFactory,
        responseProcessor?: VerifyApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new VerifyApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new VerifyApiResponseProcessor();
    }

    /**
     * Check Code
     * @param bodyCheckCodeVerifyPhoneCheckPost
     */
    public checkCodeVerifyPhoneCheckPostWithHttpInfo(bodyCheckCodeVerifyPhoneCheckPost: BodyCheckCodeVerifyPhoneCheckPost, _options?: Configuration): Observable<HttpInfo<VerifePhone>> {
        const requestContextPromise = this.requestFactory.checkCodeVerifyPhoneCheckPost(bodyCheckCodeVerifyPhoneCheckPost, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.checkCodeVerifyPhoneCheckPostWithHttpInfo(rsp)));
            }));
    }

    /**
     * Check Code
     * @param bodyCheckCodeVerifyPhoneCheckPost
     */
    public checkCodeVerifyPhoneCheckPost(bodyCheckCodeVerifyPhoneCheckPost: BodyCheckCodeVerifyPhoneCheckPost, _options?: Configuration): Observable<VerifePhone> {
        return this.checkCodeVerifyPhoneCheckPostWithHttpInfo(bodyCheckCodeVerifyPhoneCheckPost, _options).pipe(map((apiResponse: HttpInfo<VerifePhone>) => apiResponse.data));
    }

    /**
     * Check Email
     * @param emailCode
     */
    public checkEmailVerifyGetWithHttpInfo(emailCode: string, _options?: Configuration): Observable<HttpInfo<ResponseSchema>> {
        const requestContextPromise = this.requestFactory.checkEmailVerifyGet(emailCode, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.checkEmailVerifyGetWithHttpInfo(rsp)));
            }));
    }

    /**
     * Check Email
     * @param emailCode
     */
    public checkEmailVerifyGet(emailCode: string, _options?: Configuration): Observable<ResponseSchema> {
        return this.checkEmailVerifyGetWithHttpInfo(emailCode, _options).pipe(map((apiResponse: HttpInfo<ResponseSchema>) => apiResponse.data));
    }

    /**
     * Only For Testing
     */
    public onlyForTestingVerifyGetSessionsSmsGetWithHttpInfo(_options?: Configuration): Observable<HttpInfo<any>> {
        const requestContextPromise = this.requestFactory.onlyForTestingVerifyGetSessionsSmsGet(_options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.onlyForTestingVerifyGetSessionsSmsGetWithHttpInfo(rsp)));
            }));
    }

    /**
     * Only For Testing
     */
    public onlyForTestingVerifyGetSessionsSmsGet(_options?: Configuration): Observable<any> {
        return this.onlyForTestingVerifyGetSessionsSmsGetWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<any>) => apiResponse.data));
    }

    /**
     * Send Email
     * @param emailSchema
     */
    public sendEmailVerifyEmailSendPostWithHttpInfo(emailSchema: EmailSchema, _options?: Configuration): Observable<HttpInfo<any>> {
        const requestContextPromise = this.requestFactory.sendEmailVerifyEmailSendPost(emailSchema, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.sendEmailVerifyEmailSendPostWithHttpInfo(rsp)));
            }));
    }

    /**
     * Send Email
     * @param emailSchema
     */
    public sendEmailVerifyEmailSendPost(emailSchema: EmailSchema, _options?: Configuration): Observable<any> {
        return this.sendEmailVerifyEmailSendPostWithHttpInfo(emailSchema, _options).pipe(map((apiResponse: HttpInfo<any>) => apiResponse.data));
    }

    /**
     * Send Message
     */
    public sendMessageVerifyPhoneSendPostWithHttpInfo(_options?: Configuration): Observable<HttpInfo<ReqID>> {
        const requestContextPromise = this.requestFactory.sendMessageVerifyPhoneSendPost(_options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.sendMessageVerifyPhoneSendPostWithHttpInfo(rsp)));
            }));
    }

    /**
     * Send Message
     */
    public sendMessageVerifyPhoneSendPost(_options?: Configuration): Observable<ReqID> {
        return this.sendMessageVerifyPhoneSendPostWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<ReqID>) => apiResponse.data));
    }

}
