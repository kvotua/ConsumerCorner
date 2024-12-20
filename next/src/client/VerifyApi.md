# .VerifyApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**checkCodeVerifyPhoneCheckPost**](VerifyApi.md#checkCodeVerifyPhoneCheckPost) | **POST** /verify/phone/check | Check Code
[**checkEmailVerifyGet**](VerifyApi.md#checkEmailVerifyGet) | **GET** /verify/ | Check Email
[**onlyForTestingVerifyGetSessionsSmsGet**](VerifyApi.md#onlyForTestingVerifyGetSessionsSmsGet) | **GET** /verify/get-sessions-sms | Only For Testing
[**sendEmailVerifyEmailSendPost**](VerifyApi.md#sendEmailVerifyEmailSendPost) | **POST** /verify/email/send | Send Email
[**sendMessageVerifyPhoneSendPost**](VerifyApi.md#sendMessageVerifyPhoneSendPost) | **POST** /verify/phone/send | Send Message


# **checkCodeVerifyPhoneCheckPost**
> VerifePhone checkCodeVerifyPhoneCheckPost(bodyCheckCodeVerifyPhoneCheckPost)


### Example


```typescript
import { createConfiguration, VerifyApi } from '';
import type { VerifyApiCheckCodeVerifyPhoneCheckPostRequest } from '';

const configuration = createConfiguration();
const apiInstance = new VerifyApi(configuration);

const request: VerifyApiCheckCodeVerifyPhoneCheckPostRequest = {
  
  bodyCheckCodeVerifyPhoneCheckPost: {
    reqId: "reqId_example",
    smsCode: "smsCode_example",
  },
};

const data = await apiInstance.checkCodeVerifyPhoneCheckPost(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **bodyCheckCodeVerifyPhoneCheckPost** | **BodyCheckCodeVerifyPhoneCheckPost**|  |


### Return type

**VerifePhone**

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

# **checkEmailVerifyGet**
> ResponseSchema checkEmailVerifyGet()


### Example


```typescript
import { createConfiguration, VerifyApi } from '';
import type { VerifyApiCheckEmailVerifyGetRequest } from '';

const configuration = createConfiguration();
const apiInstance = new VerifyApi(configuration);

const request: VerifyApiCheckEmailVerifyGetRequest = {
  
  emailCode: "email_code_example",
};

const data = await apiInstance.checkEmailVerifyGet(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **emailCode** | [**string**] |  | defaults to undefined


### Return type

**ResponseSchema**

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

# **onlyForTestingVerifyGetSessionsSmsGet**
> any onlyForTestingVerifyGetSessionsSmsGet()


### Example


```typescript
import { createConfiguration, VerifyApi } from '';

const configuration = createConfiguration();
const apiInstance = new VerifyApi(configuration);

const request = {};

const data = await apiInstance.onlyForTestingVerifyGetSessionsSmsGet(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


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

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **sendEmailVerifyEmailSendPost**
> any sendEmailVerifyEmailSendPost(emailSchema)


### Example


```typescript
import { createConfiguration, VerifyApi } from '';
import type { VerifyApiSendEmailVerifyEmailSendPostRequest } from '';

const configuration = createConfiguration();
const apiInstance = new VerifyApi(configuration);

const request: VerifyApiSendEmailVerifyEmailSendPostRequest = {
  
  emailSchema: {
    email: "email_example",
  },
};

const data = await apiInstance.sendEmailVerifyEmailSendPost(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **emailSchema** | **EmailSchema**|  |


### Return type

**any**

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

# **sendMessageVerifyPhoneSendPost**
> ReqID sendMessageVerifyPhoneSendPost()


### Example


```typescript
import { createConfiguration, VerifyApi } from '';

const configuration = createConfiguration();
const apiInstance = new VerifyApi(configuration);

const request = {};

const data = await apiInstance.sendMessageVerifyPhoneSendPost(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**ReqID**

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


