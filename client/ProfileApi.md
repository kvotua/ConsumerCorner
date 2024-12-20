# .ProfileApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getAllUsersProfileAllGet**](ProfileApi.md#getAllUsersProfileAllGet) | **GET** /profile/all | Get All Users
[**getUsersMeProfileChangePatch**](ProfileApi.md#getUsersMeProfileChangePatch) | **PATCH** /profile/change | Get Users Me
[**getUsersMeProfileMeGet**](ProfileApi.md#getUsersMeProfileMeGet) | **GET** /profile/me | Get Users Me


# **getAllUsersProfileAllGet**
> any getAllUsersProfileAllGet()


### Example


```typescript
import { createConfiguration, ProfileApi } from '';

const configuration = createConfiguration();
const apiInstance = new ProfileApi(configuration);

const request = {};

const data = await apiInstance.getAllUsersProfileAllGet(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


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

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getUsersMeProfileChangePatch**
> ResponseSchema getUsersMeProfileChangePatch(changeUserSchema)


### Example


```typescript
import { createConfiguration, ProfileApi } from '';
import type { ProfileApiGetUsersMeProfileChangePatchRequest } from '';

const configuration = createConfiguration();
const apiInstance = new ProfileApi(configuration);

const request: ProfileApiGetUsersMeProfileChangePatchRequest = {
  
  changeUserSchema: {
    newPhone: "newPhone_example",
    newFio: "newFio_example",
    newEmail: "newEmail_example",
  },
};

const data = await apiInstance.getUsersMeProfileChangePatch(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **changeUserSchema** | **ChangeUserSchema**|  |


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

# **getUsersMeProfileMeGet**
> UserSchema getUsersMeProfileMeGet()


### Example


```typescript
import { createConfiguration, ProfileApi } from '';

const configuration = createConfiguration();
const apiInstance = new ProfileApi(configuration);

const request = {};

const data = await apiInstance.getUsersMeProfileMeGet(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**UserSchema**

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


