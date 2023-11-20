# 환경변수
- PORT
- DB_USERNAME
- DB_PASSWORD
- DB_NAME
- DB_HOST
- JWT_SECRET

# API 명세서 URL
- [https://docs.google.com/spreadsheets/d/1opo-v5MbDiXLkowz1O_vQfZAkqc2XvjZiQ8jn-bDOp4/edit#gid=0]

# ERD URL
- [https://www.erdcloud.com/d/TcTXkPxkXjy2wrtTj]

# 더 고민해 보기

1. **암호화 방식**
- Hash는 `단방향 암호화`에 해당합니다.
- Hash된 값을 저장함으로써, 원본 비밀번호를 노출하지 않고 안전하게 저장할 수 있습니다.

2. **인증 방식**
- Access Token이 노출되면 토큰을 탈취해 인증을 할 수 있습니다.
- 토큰 유효 기간을 짧게 설정하거나, Refresh Token을 사용하여 주기적으로 갱신하는 방법이 있습니다.

3. **인증과 인가**
- 인증은 사용자가 자신임을 확인하는 과정, 인가는 특정 상품에 대한 권한이 있는지 확인하는 과정입니다.
- Middleware는 인증에 해당합니다. 사용자의 토큰을 확인하여 요청이 유효한지 검증합니다.

4. **Http Status Code**
- 200 OK: 성공
- 201 Created: 리소스 생성 성공(POST, PUT 등 쓰는, 넣는 작업 성공)
- 400 Bad Request: 요청 형식이 잘못됨(이메일, 유저, 비밀번호, 등등의... 형식)
- 401 Unauthorized: 권한이 없음(비밀번호, 토큰 인증 실패)
- 403 Forbidden: 금지된 접근 시도(인증은 했지만 권한은 없는 경우)
- 404 Not Found: 찾을 수 없음
- 500 Internal Server Error: 서버 오류

5. **리팩토링**
- 코드 변경이 있었을 것이며, 주로 모델 정의 및 라우터 부분에서 변경이 있었을 것입니다.
- DB 연동 변경에 대비해 ORM을 사용하고, 데이터베이스 관련 코드를 모듈화하여 유지보수성을 높일 수 있습니다.

6. **서버 장애 복구**
- AWS EC2 인스턴스가 재시작될 때, PM2의 기능 중 하나인 `startup` 옵션을 사용하여 자동으로 Express 서버를 실행할 수 있습니다.

7. **개발 환경**
- nodemon은 소스 코드 변경 감지 후 자동으로 서버를 재시작해주는 도구입니다.(정말로 말도 안되게 편리합니다...)
- npm 패키지를 일반으로 설치하면 프로젝트 내에서만 사용 가능하고, 글로벌로 설치하면 시스템 전역에서 사용 가능합니다. 개발용 패키지는 주로 개발 시에만 필요한 패키지를 설치할 때 사용됩니다.
- `npm install nodemon --save-dev`로 nodemon을 개발용 패키지로 설치할 수 있습니다.
