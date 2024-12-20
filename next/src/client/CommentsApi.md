# .CommentsApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addComentCommentsPointIdPost**](CommentsApi.md#addComentCommentsPointIdPost) | **POST** /comments/{point_id} | Add Coment
[**getCommentsCommentsGet**](CommentsApi.md#getCommentsCommentsGet) | **GET** /comments/ | Get Comments


# **addComentCommentsPointIdPost**
> ResponseSchema addComentCommentsPointIdPost()


### Example


```typescript
import { createConfiguration, CommentsApi } from '';
import type { CommentsApiAddComentCommentsPointIdPostRequest } from '';

const configuration = createConfiguration();
const apiInstance = new CommentsApi(configuration);

const request: CommentsApiAddComentCommentsPointIdPostRequest = {
  
  pointId: 1,
  
  commentsData: {
    text: "text_example",
    stars: 1.0,
  },
  
  images: [
    { data: Buffer.from(fs.readFileSync('/path/to/file', 'utf-8')), name: '/path/to/file' },
  ],
};

const data = await apiInstance.addComentCommentsPointIdPost(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **pointId** | [**number**] |  | defaults to undefined
 **commentsData** | **CommentData** |  | defaults to undefined
 **images** | **Array&lt;HttpFile&gt;** |  | (optional) defaults to undefined


### Return type

**ResponseSchema**

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

# **getCommentsCommentsGet**
> Array<CommentsSchema> getCommentsCommentsGet()


### Example


```typescript
import { createConfiguration, CommentsApi } from '';
import type { CommentsApiGetCommentsCommentsGetRequest } from '';

const configuration = createConfiguration();
const apiInstance = new CommentsApi(configuration);

const request: CommentsApiGetCommentsCommentsGetRequest = {
  
  pointId: 1,
};

const data = await apiInstance.getCommentsCommentsGet(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **pointId** | [**number**] |  | defaults to undefined


### Return type

**Array<CommentsSchema>**

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


