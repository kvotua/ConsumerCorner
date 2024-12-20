# .InnApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**resultPageInnInnInfoGet**](InnApi.md#resultPageInnInnInfoGet) | **GET** /inn/inn_info | Result Page


# **resultPageInnInnInfoGet**
> any resultPageInnInnInfoGet()


### Example


```typescript
import { createConfiguration, InnApi } from '';
import type { InnApiResultPageInnInnInfoGetRequest } from '';

const configuration = createConfiguration();
const apiInstance = new InnApi(configuration);

const request: InnApiResultPageInnInnInfoGetRequest = {
  
  inn: "390000001190",
};

const data = await apiInstance.resultPageInnInnInfoGet(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **inn** | [**string**] |  | defaults to undefined


### Return type

**any**

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


