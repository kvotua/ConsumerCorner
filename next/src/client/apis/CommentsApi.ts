// TODO: better import syntax?
import {BaseAPIRequestFactory, RequiredError, COLLECTION_FORMATS} from './baseapi';
import {Configuration} from '../configuration';
import {RequestContext, HttpMethod, ResponseContext, HttpFile, HttpInfo} from '../http/http';
import {ObjectSerializer} from '../models/ObjectSerializer';
import {ApiException} from './exception';
import {canConsumeForm, isCodeInRange} from '../util';
import {SecurityAuthentication} from '../auth/auth';


import { CommentData } from '../models/CommentData';
import { CommentsSchema } from '../models/CommentsSchema';
import { HTTPValidationError } from '../models/HTTPValidationError';
import { ResponseSchema } from '../models/ResponseSchema';

/**
 * no description
 */
export class CommentsApiRequestFactory extends BaseAPIRequestFactory {

    /**
     * Add Coment
     * @param pointId 
     * @param commentsData 
     * @param images 
     */
    public async addComentCommentsPointIdPost(pointId: number, commentsData: CommentData, images?: Array<HttpFile>, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'pointId' is not null or undefined
        if (pointId === null || pointId === undefined) {
            throw new RequiredError("CommentsApi", "addComentCommentsPointIdPost", "pointId");
        }


        // verify required parameter 'commentsData' is not null or undefined
        if (commentsData === null || commentsData === undefined) {
            throw new RequiredError("CommentsApi", "addComentCommentsPointIdPost", "commentsData");
        }



        // Path Params
        const localVarPath = '/comments/{point_id}'
            .replace('{' + 'point_id' + '}', encodeURIComponent(String(pointId)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Form Params
        const useForm = canConsumeForm([
            'multipart/form-data',
        ]);

        let localVarFormParams
        if (useForm) {
            localVarFormParams = new FormData();
        } else {
            localVarFormParams = new URLSearchParams();
        }

        if (commentsData !== undefined) {
             // TODO: replace .append with .set
             localVarFormParams.append('comments_data', commentsData as any);
        }
        if (images) {
            // TODO: replace .append with .set
            localVarFormParams.append('images', images.join(COLLECTION_FORMATS["csv"]));
        }

        requestContext.setBody(localVarFormParams);

        if(!useForm) {
            const contentType = ObjectSerializer.getPreferredMediaType([
                "multipart/form-data"
            ]);
            requestContext.setHeaderParam("Content-Type", contentType);
        }

        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Get Comments
     * @param pointId 
     */
    public async getCommentsCommentsGet(pointId: number, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'pointId' is not null or undefined
        if (pointId === null || pointId === undefined) {
            throw new RequiredError("CommentsApi", "getCommentsCommentsGet", "pointId");
        }


        // Path Params
        const localVarPath = '/comments/';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (pointId !== undefined) {
            requestContext.setQueryParam("point_id", ObjectSerializer.serialize(pointId, "number", ""));
        }


        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

}

export class CommentsApiResponseProcessor {

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to addComentCommentsPointIdPost
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async addComentCommentsPointIdPostWithHttpInfo(response: ResponseContext): Promise<HttpInfo<ResponseSchema >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: ResponseSchema = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ResponseSchema", ""
            ) as ResponseSchema;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange("422", response.httpStatusCode)) {
            const body: HTTPValidationError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "HTTPValidationError", ""
            ) as HTTPValidationError;
            throw new ApiException<HTTPValidationError>(response.httpStatusCode, "Validation Error", body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ResponseSchema = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ResponseSchema", ""
            ) as ResponseSchema;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to getCommentsCommentsGet
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async getCommentsCommentsGetWithHttpInfo(response: ResponseContext): Promise<HttpInfo<Array<CommentsSchema> >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: Array<CommentsSchema> = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Array<CommentsSchema>", ""
            ) as Array<CommentsSchema>;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange("422", response.httpStatusCode)) {
            const body: HTTPValidationError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "HTTPValidationError", ""
            ) as HTTPValidationError;
            throw new ApiException<HTTPValidationError>(response.httpStatusCode, "Validation Error", body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: Array<CommentsSchema> = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Array<CommentsSchema>", ""
            ) as Array<CommentsSchema>;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

}
