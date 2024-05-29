import { language } from '@/lib/lenguage';
const _language = language('español');

export const errorCodes = {
  'UNAUTHENTICATED': {
    image: '',
    errorMessage: _language.error.code.UNAUTHENTICATED,
    buttonMessage: _language.goToBegin,
    onRetry: null,
    urlRetry: '/',
    children: null
  },
  "AUTH_TOKEN_FAIL":{
    image: null,
    errorMessage: _language.error.code.AUTH_TOKEN_FAIL,
    buttonMessage: _language.goToBegin,
    onRetry: null,
    urlRetry: '/',
    children: null
  },
  "ECONNREFUSED":{
    image: null,
    errorMessage: _language.error.code.ECONNREFUSED,
    buttonMessage: '',
    onRetry: null,
    children: null
  },
  "RUTINE_LESS": {
    image: null,
    errorMessage: null,
    buttonMessage: '',
    onRetry: null,
    children: (<span className="!w-96">
      <p>{_language.hi},</p>
      <p>{_language.error.code.RUTINE_LESS}</p>
      <br></br>
      <p>{_language.thanks1}</p>
    </span>)
  }

}

export const  getDataErrorCode = (errorId) => {
  console.error(errorId);
  try {debugger
    const pageJson = errorCodes[errorId] || errorCodes['UNAUTHENTICATED']
    return pageJson;
  } catch (error) {
    console.error(error);
    let _error = errorCodes['UNAUTHENTICATED'];
    _error.errorMessage = errorId;
    return _error
  }
}