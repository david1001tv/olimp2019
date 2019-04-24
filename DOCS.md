# API DOCS
/api 

## actions
**user log in**
- **POST:** `/auth/login`
  - **headers:**
      - `Content-Type` : `application/json`
  - **body:**
      - `email` - **`REQUIRED`** , `string`, user's email,
      - `password` - **`REQUIRED`** , `string`, user's password
```

**user register**
- **POST:** `/auth/register`
  - **headers:**
      - `Content-Type` : `application/json`
  - **body:**
      - `firstName` - **`REQUIRED`** , `string`, user's first name,
      - `lastName` - **`REQUIRED`** , `string`, user's last name,
      - `email` - **`REQUIRED`** , `string`, user's email,
      - `password` - **`REQUIRED`** , `string`, user's password
```

**user Google register**
- **POST:** `/auth/google-register`
  - **headers:**
      - `Content-Type` : `application/json`
  - **body:**
      - `email` - **`REQUIRED`** , `string`, user's email,
      - `firstName` - **`REQUIRED`** , `string`, user's first name,
      - `lastName` - **`REQUIRED`** , `string`, user's last name,
      - `idToken` - **`REQUIRED`** , `string`, user's Google token id,
      - `userId` - **`REQUIRED`** , `string`, user's id
```

**user Google login**
- **POST:** `/auth/google-login`
  - **headers:**
      - `Content-Type` : `application/json`
  - **body:**
      - `idToken` - **`REQUIRED`** , `string`, user's Google token id,
      - `userId` - **`REQUIRED`** , `string`, user's id
```

**user save history**
- **POST:** `/history/state/:state`
  - **headers:**
      - `Content-Type` : `application/json`
      - `x-access-token` : token,
  - **body:**
      - `state` - **`REQUIRED`** , `object`, current quest,
      - `time` - **`REQUIRED`** , `time`, quest time,
      - `score` - **`REQUIRED`** , `string`, quest points
```

**get user's history**
- **GET:** `/history/all`
  - **headers:**
      - `Content-Type` : `application/json`
      - `x-access-token` : token
```

**send user feedback**
- **POST:** `/feedback`
  - **headers:**
      - `Content-Type` : `application/json`
      - `x-access-token` : token,
  - **body:**
      - `email` - **`REQUIRED`** , `string`, user's email,
      - `message` - **`REQUIRED`** , `string`, user's message
```

**get user's like**
- **GET:** `/like`
  - **headers:**
      - `Content-Type` : `application/json`
      - `x-access-token` : token
```

**get all likes**
- **GET:** `/like/all`
  - **headers:**
      - `Content-Type` : `application/json`
```

**user like**
- **POST:** `/like`
  - **headers:**
      - `Content-Type` : `application/json`
      - `x-access-token` : token
```

**get game report**
- **GET:** `/report/json`
  - **headers:**
      - `Content-Type` : `application/json`
      - `x-access-token` : token
```