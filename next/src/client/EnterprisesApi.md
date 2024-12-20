# .EnterprisesApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getCompaniesInfoEnterprisesEnterprisesInfoGet**](EnterprisesApi.md#getCompaniesInfoEnterprisesEnterprisesInfoGet) | **GET** /enterprises/enterprises-info | Get Companies Info
[**registerCompanyEnterprisesRegisterPost**](EnterprisesApi.md#registerCompanyEnterprisesRegisterPost) | **POST** /enterprises/register | Register Company
[**uploadImagesEnterprisesUploadImagesEnterpriseIdPost**](EnterprisesApi.md#uploadImagesEnterprisesUploadImagesEnterpriseIdPost) | **POST** /enterprises/upload_images/{enterprise_id} | Upload Images


# **getCompaniesInfoEnterprisesEnterprisesInfoGet**
> Array<EnterpriseInfo> getCompaniesInfoEnterprisesEnterprisesInfoGet()


### Example


```typescript
import { createConfiguration, EnterprisesApi } from '';

const configuration = createConfiguration();
const apiInstance = new EnterprisesApi(configuration);

const request = {};

const data = await apiInstance.getCompaniesInfoEnterprisesEnterprisesInfoGet(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**Array<EnterpriseInfo>**

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

# **registerCompanyEnterprisesRegisterPost**
> ResponseSchema registerCompanyEnterprisesRegisterPost(registerCompany)


### Example


```typescript
import { createConfiguration, EnterprisesApi } from '';
import type { EnterprisesApiRegisterCompanyEnterprisesRegisterPostRequest } from '';

const configuration = createConfiguration();
const apiInstance = new EnterprisesApi(configuration);

const request: EnterprisesApiRegisterCompanyEnterprisesRegisterPostRequest = {
  
  registerCompany: {
    name: "name_example",
    type: "type_example",
    inn: "inn_example",
    ogrn: "ogrn_example",
    address: "address_example",
    generalTypeActivity: "generalTypeActivity_example",
  },
};

const data = await apiInstance.registerCompanyEnterprisesRegisterPost(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **registerCompany** | **RegisterCompany**|  |


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

# **uploadImagesEnterprisesUploadImagesEnterpriseIdPost**
> ResponseSchema uploadImagesEnterprisesUploadImagesEnterpriseIdPost()


### Example


```typescript
import { createConfiguration, EnterprisesApi } from '';
import type { EnterprisesApiUploadImagesEnterprisesUploadImagesEnterpriseIdPostRequest } from '';

const configuration = createConfiguration();
const apiInstance = new EnterprisesApi(configuration);

const request: EnterprisesApiUploadImagesEnterprisesUploadImagesEnterpriseIdPostRequest = {
  
  enterpriseId: 1,
  
  image: { data: Buffer.from(fs.readFileSync('/path/to/file', 'utf-8')), name: '/path/to/file' },
};

const data = await apiInstance.uploadImagesEnterprisesUploadImagesEnterpriseIdPost(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **enterpriseId** | [**number**] |  | defaults to undefined
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


