# .PointsApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addDocumentPointsDocumentPointIdPost**](PointsApi.md#addDocumentPointsDocumentPointIdPost) | **POST** /points/document/{point_id} | Add Document
[**addSocialPointsSocialPointIdPost**](PointsApi.md#addSocialPointsSocialPointIdPost) | **POST** /points/social/{point_id} | Add Social
[**changePointPointsChangePointIdPatch**](PointsApi.md#changePointPointsChangePointIdPatch) | **PATCH** /points/change/{point_id} | Change Point
[**deletePointPointsDeletePointIdDelete**](PointsApi.md#deletePointPointsDeletePointIdDelete) | **DELETE** /points/delete/{point_id} | Delete Point
[**deleteSocialPointsSocialPointIdDelete**](PointsApi.md#deleteSocialPointsSocialPointIdDelete) | **DELETE** /points/social/{point_id} | Delete Social
[**getPointsInfoPointsGet**](PointsApi.md#getPointsInfoPointsGet) | **GET** /points/ | Get Points Info
[**getPointsInfoPointsPointIdGet**](PointsApi.md#getPointsInfoPointsPointIdGet) | **GET** /points/{point_id} | Get Points Info
[**getSocialsPointsSocialPointIdGet**](PointsApi.md#getSocialsPointsSocialPointIdGet) | **GET** /points/social/{point_id} | Get Socials
[**registerPointPointsRegisterPost**](PointsApi.md#registerPointPointsRegisterPost) | **POST** /points/register | Register Point
[**uploadImagesPointsUploadImagesPointIdPost**](PointsApi.md#uploadImagesPointsUploadImagesPointIdPost) | **POST** /points/upload_images/{point_id} | Upload Images


# **addDocumentPointsDocumentPointIdPost**
> ResponseSchema addDocumentPointsDocumentPointIdPost()


### Example


```typescript
import { createConfiguration, PointsApi } from '';
import type { PointsApiAddDocumentPointsDocumentPointIdPostRequest } from '';

const configuration = createConfiguration();
const apiInstance = new PointsApi(configuration);

const request: PointsApiAddDocumentPointsDocumentPointIdPostRequest = {
  
  pointId: 1,
  
  documents: [
    { data: Buffer.from(fs.readFileSync('/path/to/file', 'utf-8')), name: '/path/to/file' },
  ],
};

const data = await apiInstance.addDocumentPointsDocumentPointIdPost(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **pointId** | [**number**] |  | defaults to undefined
 **documents** | **Array&lt;HttpFile&gt;** |  | (optional) defaults to undefined


### Return type

**ResponseSchema**

### Authorization

[JWTBearer](README.md#JWTBearer)

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **addSocialPointsSocialPointIdPost**
> ResponseSchema addSocialPointsSocialPointIdPost(socialSchema)


### Example


```typescript
import { createConfiguration, PointsApi } from '';
import type { PointsApiAddSocialPointsSocialPointIdPostRequest } from '';

const configuration = createConfiguration();
const apiInstance = new PointsApi(configuration);

const request: PointsApiAddSocialPointsSocialPointIdPostRequest = {
  
  pointId: 1,
  
  socialSchema: {
    name: "name_example",
    link: "link_example",
  },
};

const data = await apiInstance.addSocialPointsSocialPointIdPost(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **socialSchema** | **SocialSchema**|  |
 **pointId** | [**number**] |  | defaults to undefined


### Return type

**ResponseSchema**

### Authorization

[JWTBearer](README.md#JWTBearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **changePointPointsChangePointIdPatch**
> ResponseSchema changePointPointsChangePointIdPatch(changePointSchema)


### Example


```typescript
import { createConfiguration, PointsApi } from '';
import type { PointsApiChangePointPointsChangePointIdPatchRequest } from '';

const configuration = createConfiguration();
const apiInstance = new PointsApi(configuration);

const request: PointsApiChangePointPointsChangePointIdPatchRequest = {
  
  pointId: 1,
  
  changePointSchema: {
    title: "title_example",
    address: "address_example",
    openingTime: "openingTime_example",
    closingTime: "closingTime_example",
    phone: "phone_example",
    typeActivity: "typeActivity_example",
  },
};

const data = await apiInstance.changePointPointsChangePointIdPatch(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **changePointSchema** | **ChangePointSchema**|  |
 **pointId** | [**number**] |  | defaults to undefined


### Return type

**ResponseSchema**

### Authorization

[JWTBearer](README.md#JWTBearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **deletePointPointsDeletePointIdDelete**
> ResponseSchema deletePointPointsDeletePointIdDelete()


### Example


```typescript
import { createConfiguration, PointsApi } from '';
import type { PointsApiDeletePointPointsDeletePointIdDeleteRequest } from '';

const configuration = createConfiguration();
const apiInstance = new PointsApi(configuration);

const request: PointsApiDeletePointPointsDeletePointIdDeleteRequest = {
  
  pointId: 1,
};

const data = await apiInstance.deletePointPointsDeletePointIdDelete(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **pointId** | [**number**] |  | defaults to undefined


### Return type

**ResponseSchema**

### Authorization

[JWTBearer](README.md#JWTBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **deleteSocialPointsSocialPointIdDelete**
> ResponseSchema deleteSocialPointsSocialPointIdDelete(socialID)


### Example


```typescript
import { createConfiguration, PointsApi } from '';
import type { PointsApiDeleteSocialPointsSocialPointIdDeleteRequest } from '';

const configuration = createConfiguration();
const apiInstance = new PointsApi(configuration);

const request: PointsApiDeleteSocialPointsSocialPointIdDeleteRequest = {
  
  pointId: 1,
  
  socialID: {
    socialId: 1.0,
  },
};

const data = await apiInstance.deleteSocialPointsSocialPointIdDelete(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **socialID** | **SocialID**|  |
 **pointId** | [**number**] |  | defaults to undefined


### Return type

**ResponseSchema**

### Authorization

[JWTBearer](README.md#JWTBearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getPointsInfoPointsGet**
> Array<PointInfo> getPointsInfoPointsGet()


### Example


```typescript
import { createConfiguration, PointsApi } from '';

const configuration = createConfiguration();
const apiInstance = new PointsApi(configuration);

const request = {};

const data = await apiInstance.getPointsInfoPointsGet(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**Array<PointInfo>**

### Authorization

[JWTBearer](README.md#JWTBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getPointsInfoPointsPointIdGet**
> PointInfo getPointsInfoPointsPointIdGet()


### Example


```typescript
import { createConfiguration, PointsApi } from '';
import type { PointsApiGetPointsInfoPointsPointIdGetRequest } from '';

const configuration = createConfiguration();
const apiInstance = new PointsApi(configuration);

const request: PointsApiGetPointsInfoPointsPointIdGetRequest = {
  
  pointId: 1,
};

const data = await apiInstance.getPointsInfoPointsPointIdGet(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **pointId** | [**number**] |  | defaults to undefined


### Return type

**PointInfo**

### Authorization

[JWTBearer](README.md#JWTBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getSocialsPointsSocialPointIdGet**
> any getSocialsPointsSocialPointIdGet()


### Example


```typescript
import { createConfiguration, PointsApi } from '';
import type { PointsApiGetSocialsPointsSocialPointIdGetRequest } from '';

const configuration = createConfiguration();
const apiInstance = new PointsApi(configuration);

const request: PointsApiGetSocialsPointsSocialPointIdGetRequest = {
  
  pointId: 1,
};

const data = await apiInstance.getSocialsPointsSocialPointIdGet(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **pointId** | [**number**] |  | defaults to undefined


### Return type

**any**

### Authorization

[JWTBearer](README.md#JWTBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **registerPointPointsRegisterPost**
> ResponseSchema registerPointPointsRegisterPost(registerPoint)


### Example


```typescript
import { createConfiguration, PointsApi } from '';
import type { PointsApiRegisterPointPointsRegisterPostRequest } from '';

const configuration = createConfiguration();
const apiInstance = new PointsApi(configuration);

const request: PointsApiRegisterPointPointsRegisterPostRequest = {
  
  registerPoint: {
    title: "title_example",
    enterpriseId: 1.0,
    address: "address_example",
    openingTime: "openingTime_example",
    closingTime: "closingTime_example",
    phone: "phone_example",
    typeActivity: "typeActivity_example",
  },
};

const data = await apiInstance.registerPointPointsRegisterPost(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **registerPoint** | **RegisterPoint**|  |


### Return type

**ResponseSchema**

### Authorization

[JWTBearer](README.md#JWTBearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **uploadImagesPointsUploadImagesPointIdPost**
> ResponseSchema uploadImagesPointsUploadImagesPointIdPost()


### Example


```typescript
import { createConfiguration, PointsApi } from '';
import type { PointsApiUploadImagesPointsUploadImagesPointIdPostRequest } from '';

const configuration = createConfiguration();
const apiInstance = new PointsApi(configuration);

const request: PointsApiUploadImagesPointsUploadImagesPointIdPostRequest = {
  
  pointId: 1,
  
  image: { data: Buffer.from(fs.readFileSync('/path/to/file', 'utf-8')), name: '/path/to/file' },
};

const data = await apiInstance.uploadImagesPointsUploadImagesPointIdPost(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **pointId** | [**number**] |  | defaults to undefined
 **image** | [**HttpFile**] |  | (optional) defaults to undefined


### Return type

**ResponseSchema**

### Authorization

[JWTBearer](README.md#JWTBearer)

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


