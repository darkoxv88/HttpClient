/**
  * 
	* @author Darko Petrovic
  * @Link Facebook: https://www.facebook.com/WitchkingOfAngmarr
  * @Link GitHub: https://github.com/darkoxv88
  * 
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.


exports:

  window.HttpClient;

**/

declare namespace HttpClient {
  export enum HttpStatusCodeEnum { 
    Continue = 100,
    SwitchingProtocols = 101,
    Processing = 102,
    EarlyHints = 103,
    Ok = 200,
    Created = 201,
    Accepted = 202,
    NonAuthoritativeInformation = 203,
    NoContent = 204,
    ResetContent = 205,
    PartialContent = 206,
    MultiStatus = 207,
    AlreadyReported = 208,
    ImUsed = 226,
    MultipleChoices = 300,
    MovedPermanently = 301,
    Found = 302,
    SeeOther = 303,
    NotModified = 304,
    UseProxy = 305,
    Unused = 306,
    TemporaryRedirect = 307,
    PermanentRedirect = 308,
    BadRequest = 400,
    Unauthorized = 401,
    PaymentRequired = 402,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    NotAcceptable = 406,
    ProxyAuthenticationRequired = 407,
    RequestTimeout = 408,
    Conflict = 409,
    Gone = 410,
    LengthRequired = 411,
    PreconditionFailed = 412,
    PayloadTooLarge = 413,
    UriTooLong = 414,
    UnsupportedMediaType = 415,
    RangeNotSatisfiable = 416,
    ExpectationFailed = 417,
    ImATeapot = 418,
    MisdirectedRequest = 421,
    UnprocessableEntity = 422,
    Locked = 423,
    FailedDependency = 424,
    TooEarly = 425,
    UpgradeRequired = 426,
    PreconditionRequired = 428,
    TooManyRequests = 429,
    RequestHeaderFieldsTooLarge = 431,
    UnavailableForLegalReasons = 451,
    InternalServerError = 500,
    NotImplemented = 501,
    BadGateway = 502,
    ServiceUnavailable = 503,
    GatewayTimeout = 504,
    HttpVersionNotSupported = 505,
    VariantAlsoNegotiates = 506,
    InsufficientStorage = 507,
    LoopDetected = 508,
    NotExtended = 510,
    NetworkAuthenticationRequired = 511,
  }
  
  export interface ResponseHeaders {
    has(key: string): boolean;
    get(key: string): string | undefined;
  }
  
  export interface HttpOnProgressEvent {
    type: string;
    processed: number;
    total: number;
    partialText: string;
  }
  
  export interface BaseHttpResponse {
    get headers(): ResponseHeaders;
    get status(): number;
    get ok(): boolean;
    get statusText(): string;
  }
  
  export interface HttpErrorResponseEvent extends BaseHttpResponse {
    get timeStamp(): number;
    get url(): string;
    get name(): 'HttpErrorResponse';
    get error(): any;
  }
  
  export interface HttpResponseEvent<T> extends BaseHttpResponse {
    get timeStamp(): number;
    get url(): string;
    get name(): 'HttpResponse';
    get body(): T;
  }
  
  export class AjaxHeaders {
    constructor(headers?: AjaxHeaders);
  
    public keys(): Array<string>;
    public iterate(callback: (key: string, value: string) => void): void;
    public getHeader(key: string): string;
    public getHeaders(key: string): Array<string>;
    public getHeadersMap(): Map<string, Array<string>>;
    public cloneHeadersMap(): Map<string, Array<string>>;
    public setHeader(key: string, value: string): void;
  }
  
  export class AjaxParams {
    constructor(params?: AjaxParams);
  
    public has(key: string): boolean;
    public keys(): Array<string>;
    public get(key: string): string;
    public getAll(key: string): Array<string>;
    public cloneParamsMap(): Map<string, Array<string>>;
    public append(key: string, value: string): void;
    public deleteByKey(key: string): void;
    public toString(): string;
    public getQueryString(): string;
  }
  
  export interface AjaxOptions {
    timeout?: number;
    responseType?: '' | 'text' | 'json' | 'blob' | 'arraybuffer' | 'document' | 'ms-stream';
    withCredentials?: boolean;
    params?: AjaxParams;
    delay?: number;
  }

  export interface Observer<T> {
    unsubscribe(): void;
    then(onFulfilled: (value: T) => void, onRejected: (error: any) => void, onFinally: () => void): this;
    catch(onRejected: (error: any) => void, onFinally: () => void): this;
    finally(onFinally: () => void): this;
    toPromise() : Promise<T>;
  }
  
  export interface JSONP<T> {
    params: AjaxParams;
  
    fetch(): Observer<T>;
  }
  
  export interface Ajax<T> {
    params: AjaxParams;
  
    get type(): string;
    get state(): number;
  
    onUpload(callback: null | ((ev: HttpOnProgressEvent) => void)): this;
    onDownload(callback: null | ((ev: HttpOnProgressEvent) => void)): this;
    setHeader(key: string, value: string): this;
    appendParam(key: string, value: string): this;
    request(): Observer<HttpResponseEvent<T>>;
    abort(): void;
  }

  export function setErrorInterceptor(interceptor: (error: HttpErrorResponseEvent) => void): void;

  export function setResponseInterceptor(interceptor: (response: HttpResponseEvent<any>) => void): void;

  export function jsonp<T>(url: string, options?: AjaxOptions, callbackParamName?: string, callbackName?: string): JSONP<T>;

  export function get<T = any>(url: string, headers?: AjaxHeaders, options?: AjaxOptions): Ajax<T>;

  function _delete<T = any>(url: string, headers?: AjaxHeaders, options?: AjaxOptions): Ajax<T>;
  export { _delete as delete };

  export function head<T = any>(url: string, headers?: AjaxHeaders, options?: AjaxOptions): Ajax<T>;

  export function post<T = any>(url: string, body: any, headers?: AjaxHeaders, options?: AjaxOptions): Ajax<T>;

  export function put<T = any>(url: string, body: any, headers?: AjaxHeaders, options?: AjaxOptions): Ajax<T>;

  export function patch<T = any>(url: string, body: any, headers?: AjaxHeaders, options?: AjaxOptions): Ajax<T>;

  export function options<T = any>(url: string, body: any, headers?: AjaxHeaders, options?: AjaxOptions): Ajax<T>;

  export function createRequestHeaders(headers?: AjaxHeaders): AjaxHeaders;

  export function createRequestOptions(): AjaxOptions;

  export function createRequestParams(params?: AjaxParams): AjaxParams;
}
