export const CustomHttpException = {
  UNAUTHORIZED_ACCOUNT: {
    statusCode: 401,
    code: 'UNAUTHORIZED_ACCOUNT',
    message: '잘못된 아이디 또는 패스워드입니다.',
  },
  FORBIDDEN_POST: {
    statusCode: 403,
    code: 'FORBIDDEN_POST',
    message: '해당 포스트의 접근 권한이 없습니다.',
  },
  CONFLICT_USERNAME: {
    statusCode: 409,
    code: 'CONFLICT_USERNAME',
    message: '이미 사용중인 사용자명입니다.',
  },
  DB_SERVER_ERROR: {
    statusCode: 500,
    code: 'DB_SERVER_ERROR',
    message: 'DB 서버 에러. 관리자에게 문의해주세요.',
  },
};
