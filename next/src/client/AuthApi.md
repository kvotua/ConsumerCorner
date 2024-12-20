# .AuthApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**loginLoginPost**](AuthApi.md#loginLoginPost) | **POST** /login | Login
[**refreshTokensRefreshPost**](AuthApi.md#refreshTokensRefreshPost) | **POST** /refresh | Refresh Tokens
[**registrationRegistrationPost**](AuthApi.md#registrationRegistrationPost) | **POST** /registration | Registration


# **loginLoginPost**
> TokenPair loginLoginPost(login)


### Example


```typescript
import { createConfiguration, AuthApi } from '';
import type { AuthApiLoginLoginPostRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AuthApi(configuration);

const request: AuthApiLoginLoginPostRequest = {
  
  login: {
    phone: "phone_example",
    password: "password_example",
  },
};

const data = await apiInstance.loginLoginPost(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **login** | **Login**|  |


### Return type

**TokenPair**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **refreshTokensRefreshPost**
> TokenPair refreshTokensRefreshPost()


### Example


```typescript
import { createConfiguration, AuthApi } from '';
import type { AuthApiRefreshTokensRefreshPostRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AuthApi(configuration);

const request: AuthApiRefreshTokensRefreshPostRequest = {
  
  refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjoxNzM1OTIxMzg5LCJ0eXBlIjoicmVmcmVzaCJ9.SDZcJf2hmbnYYer5R-VZKyQL2ztSu3WgzcZ6tFojx38",
};

const data = await apiInstance.refreshTokensRefreshPost(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **refreshToken** | [**string**] |  | defaults to undefined


### Return type

**TokenPair**

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

# **registrationRegistrationPost**
> TokenPair registrationRegistrationPost(register)


### Example


```typescript
import { createConfiguration, AuthApi } from '';
import type { AuthApiRegistrationRegistrationPostRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AuthApi(configuration);

const request: AuthApiRegistrationRegistrationPostRequest = {
  
  register: {
    phone: "phone_example",
    fio: "fio_example",
    password: "password_example",
  },
};

const data = await apiInstance.registrationRegistrationPost(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **register** | **Register**|  |


### Return type

**TokenPair**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


