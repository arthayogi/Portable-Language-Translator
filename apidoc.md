# Portable Travel Translator

Description : A simple portable app designed for Indonesian people to translate text and use text-to-speech
to help pronounce important phrase during travel

## List end-points

Available for public
- `POST /login`
- `POST /register`

Need Authentication
- `PATCH /profiles`
- `GET /profiles`
- `DEL /profiles`
- `POST /translate-jp`
- `POST /translate-en`
- `POST /translate-kr`

## 1. POST /login

Description :
- Login to access endroutes

Request :
- Body :
```
{
    "email": "string" (required),
    "password": "string (required)
}
```


_Response (200 - OK)_
```
{
    "message": "User yogi@mail.com Login Sukses",
    "access_token": [access token (string)]
}
```

_Response (401 - Unauthorized)_
```
{
    "message": "Email / Password salah"
}
```

&nbsp;

## 2. POST /register

Description :
- Register to access endroutes

Request :
- Body :
```
{
    "email": "string" (required),
    "password": "string (required)
}
```


_Response (201 - OK)_
```
{
    "message": "User baru berhasil terdaftar",
    "email": "mika@mail.com"
}
```

_Response (400 - Bad Request)_
```
{
    "message": "Tolong masukkan email anda"
}

or

{
    "message": "Tolong masukkan password anda"
}

or

{
    "message": "Email sudah digunakan"
}
```

&nbsp;

## 3. PATCH /profiles

Description :
- To change username

Request :

- Header :
```
{
    Authorization: "Bearer [access token]"
}
```

- Body :
```
{
    "username": "string" (required)
}
```


_Response (200 - OK)_
```
{
    "message": "Hai, nama kamu sudah diubah menjadi Budi"
}
```

_Response (400 - Bad Request)_
```
{
    "message": "Tolong masukkan nama anda"
}
```

&nbsp;

## 4. GET /profiles

Description :
- To view username

Request :

- Header :
```
{
    Authorization: "Bearer [access token]"
}
```

_Response (200 - OK)_
```
{
    "username": "Budi"
}
```

&nbsp;

## 4. DELETE /profiles

Description :
- To delete profile

Request :

- Header :
```
{
    Authorization: "Bearer [access token]"
}
```

_Response (200 - OK)_
```
{
    "message": "User Budi berhasil dihapus"
}
```

&nbsp;

## 6. POST /translate-jp

Description :
- Translate input to Japanese

Request :

- Header :
```
{
    Authorization: "Bearer [access token]"
}
```

- Body :
```
{
    "input": "string" (required)
}
```


_Response (200 - OK)_
```
{
    "message": "はじめまして、私の名前はブディです。 (Hajimemashite, watashi no namae wa Budi desu.)"
}
```

_Response (400 - Bad Request)_
```
{
    "message": "Tolong masukkan text untuk ditranslate"
}
```

&nbsp;

## 7. POST /translate-en

Description :
- Translate input to English

Request :

- Header :
```
{
    Authorization: "Bearer [access token]"
}
```

- Body :
```
{
    "input": "string" (required)
}
```


_Response (200 - OK)_
```
{
    "message": "Hello, my name is Budi."
}
```

_Response (400 - Bad Request)_
```
{
    "message": "Tolong masukkan text untuk ditranslate"
}
```

&nbsp;

## 8. POST /translate-kr

Description :
- Translate input to Korean

Request :

- Header :
```
{
    Authorization: "Bearer [access token]"
}
```

- Body :
```
{
    "input": "string" (required)
}
```


_Response (200 - OK)_
```
{
    "message": "안녕하세요, 제 이름은 부디입니다."
}
```

_Response (400 - Bad Request)_
```
{
    "message": "Tolong masukkan text untuk ditranslate"
}
```

&nbsp;

## Global error

_Response (401 - Unauthorized)_
```
{
    "message": "Token tidak sesuai"
}
```

_Response (500 - Internal server error)_

```
{
    "message": "Internal Server Error"
}
```