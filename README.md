# rune-demo-apis

--- 

## 소개

rune-demo-client를 위한 apis 서버

## 구조
- **controllers**: 라우터 관리
- **services**: 비지니스 로직
- **repositories**: 디비 조회 로직
- **db**: 디비 관련 설정


## 환경 변수

```
DB_HOST=localhost
DB_USER=postgres
DB_PWD=11223344
DB_NAME=demo_db

API_PORT=5002
```

## 사용

postgreSQL 서버 띄우기

`docker compose up -d`

API 서버

`npm run dev`