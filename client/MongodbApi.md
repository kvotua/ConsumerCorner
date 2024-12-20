# .MongodbApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getDocumentMongoDocumentIdGet**](MongodbApi.md#getDocumentMongoDocumentIdGet) | **GET** /mongo/document/{id} | Get Document
[**getImageMongoImageIdGet**](MongodbApi.md#getImageMongoImageIdGet) | **GET** /mongo/image/{id} | Get Image
[**uploadDocumentMongoDocumentPost**](MongodbApi.md#uploadDocumentMongoDocumentPost) | **POST** /mongo/document | Upload Document
[**uploadImageMongoImagePost**](MongodbApi.md#uploadImageMongoImagePost) | **POST** /mongo/image | Upload Image


# **getDocumentMongoDocumentIdGet**
> DocumentModel getDocumentMongoDocumentIdGet()


### Example


```typescript
import { createConfiguration, MongodbApi } from '';
import type { MongodbApiGetDocumentMongoDocumentIdGetRequest } from '';

const configuration = createConfiguration();
const apiInstance = new MongodbApi(configuration);

const request: MongodbApiGetDocumentMongoDocumentIdGetRequest = {
  
  id: "id_example",
};

const data = await apiInstance.getDocumentMongoDocumentIdGet(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**string**] |  | defaults to undefined


### Return type

**DocumentModel**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getImageMongoImageIdGet**
> ImageModel getImageMongoImageIdGet()


### Example


```typescript
import { createConfiguration, MongodbApi } from '';
import type { MongodbApiGetImageMongoImageIdGetRequest } from '';

const configuration = createConfiguration();
const apiInstance = new MongodbApi(configuration);

const request: MongodbApiGetImageMongoImageIdGetRequest = {
  
  id: "id_example",
};

const data = await apiInstance.getImageMongoImageIdGet(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**string**] |  | defaults to undefined


### Return type

**ImageModel**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **uploadDocumentMongoDocumentPost**
> UploadDocumentModel uploadDocumentMongoDocumentPost()


### Example


```typescript
import { createConfiguration, MongodbApi } from '';
import type { MongodbApiUploadDocumentMongoDocumentPostRequest } from '';

const configuration = createConfiguration();
const apiInstance = new MongodbApi(configuration);

const request: MongodbApiUploadDocumentMongoDocumentPostRequest = {
  
  file: { data: Buffer.from(fs.readFileSync('/path/to/file', 'utf-8')), name: '/path/to/file' },
};

const data = await apiInstance.uploadDocumentMongoDocumentPost(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **file** | [**HttpFile**] |  | defaults to undefined


### Return type

**UploadDocumentModel**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **uploadImageMongoImagePost**
> UploadImageModel uploadImageMongoImagePost()


### Example


```typescript
import { createConfiguration, MongodbApi } from '';
import type { MongodbApiUploadImageMongoImagePostRequest } from '';

const configuration = createConfiguration();
const apiInstance = new MongodbApi(configuration);

const request: MongodbApiUploadImageMongoImagePostRequest = {
  
  file: { data: Buffer.from(fs.readFileSync('/path/to/file', 'utf-8')), name: '/path/to/file' },
};

const data = await apiInstance.uploadImageMongoImagePost(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **file** | [**HttpFile**] |  | defaults to undefined


### Return type

**UploadImageModel**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


