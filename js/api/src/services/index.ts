/** Generate by swagger-axios-codegen */
// @ts-nocheck
/* eslint-disable */

/** Generate by swagger-axios-codegen */
/* eslint-disable */
// @ts-nocheck
import axiosStatic, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

export interface IRequestOptions extends AxiosRequestConfig {
  /**
   * show loading status
   */
  loading?: boolean;
  /**
   * display error message
   */
  showError?: boolean;
  /**
   * data security, extended fields are encrypted using the specified algorithm
   */
  security?: Record<string, 'md5' | 'sha1' | 'aes' | 'des'>;
  /**
   * indicates whether Authorization credentials are required for the request
   * @default true
   */
  withAuthorization?: boolean;
}

export interface IRequestConfig {
  method?: any;
  headers?: any;
  url?: any;
  data?: any;
  params?: any;
}

// Add options interface
export interface ServiceOptions {
  axios?: AxiosInstance;
  /** only in axios interceptor config*/
  loading: boolean;
  showError: boolean;
}

// Add default options
export const serviceOptions: ServiceOptions = {};

// Instance selector
export function axios(configs: IRequestConfig, resolve: (p: any) => void, reject: (p: any) => void): Promise<any> {
  if (serviceOptions.axios) {
    return serviceOptions.axios
      .request(configs)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  } else {
    throw new Error('please inject yourself instance like axios  ');
  }
}

export function getConfigs(method: string, contentType: string, url: string, options: any): IRequestConfig {
  const configs: IRequestConfig = {
    loading: serviceOptions.loading,
    showError: serviceOptions.showError,
    ...options,
    method,
    url
  };
  configs.headers = {
    ...options.headers,
    'Content-Type': contentType
  };
  return configs;
}

export const basePath = '';

export interface IList<T> extends Array<T> {}
export interface List<T> extends Array<T> {}
export interface IDictionary<TValue> {
  [key: string]: TValue;
}
export interface Dictionary<TValue> extends IDictionary<TValue> {}

export interface IListResult<T> {
  items?: T[];
}

export class ListResultDto<T> implements IListResult<T> {
  items?: T[];
}

export interface IPagedResult<T> extends IListResult<T> {
  totalCount?: number;
  items?: T[];
}

export class PagedResultDto<T = any> implements IPagedResult<T> {
  totalCount?: number;
  items?: T[];
}

// customer definition
// empty

export class AbpApiDefinitionService {
  /**
   *
   */
  static get(
    params: {
      /**  */
      includeTypes?: boolean;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<ApplicationApiDescriptionModel> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/abp/api-definition';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { IncludeTypes: params['includeTypes'] };

      axios(configs, resolve, reject);
    });
  }
}

export class AbpApplicationConfigurationService {
  /**
   *
   */
  static get(
    params: {
      /**  */
      includeLocalizationResources?: boolean;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<ApplicationConfigurationDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/abp/application-configuration';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { IncludeLocalizationResources: params['includeLocalizationResources'] };

      axios(configs, resolve, reject);
    });
  }
}

export class AbpApplicationLocalizationService {
  /**
   *
   */
  static get(
    params: {
      /**  */
      cultureName: string;
      /**  */
      onlyDynamics?: boolean;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<ApplicationLocalizationDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/abp/application-localization';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { CultureName: params['cultureName'], OnlyDynamics: params['onlyDynamics'] };

      axios(configs, resolve, reject);
    });
  }
}

export class DiagnosisService {
  /**
   *
   */
  static create(
    params: {
      /** requestBody */
      body?: CreateUpdateDiagnosisDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<DiagnosisDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/app/diagnosis';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static getList(
    params: {
      /**  */
      sorting?: string;
      /**  */
      skipCount?: number;
      /**  */
      maxResultCount?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<DiagnosisDtoPagedResultDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/app/diagnosis';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        Sorting: params['sorting'],
        SkipCount: params['skipCount'],
        MaxResultCount: params['maxResultCount']
      };

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static update(
    params: {
      /**  */
      id: string;
      /** requestBody */
      body?: CreateUpdateDiagnosisDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<DiagnosisDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/app/diagnosis/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static delete(
    params: {
      /**  */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/app/diagnosis/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static get(
    params: {
      /**  */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<DiagnosisDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/app/diagnosis/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
}

export class GeneService {
  /**
   *
   */
  static create(
    params: {
      /** requestBody */
      body?: CreateUpdateGeneDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<GeneDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/app/gene';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static getList(
    params: {
      /**  */
      sorting?: string;
      /**  */
      skipCount?: number;
      /**  */
      maxResultCount?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<GeneDtoPagedResultDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/app/gene';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        Sorting: params['sorting'],
        SkipCount: params['skipCount'],
        MaxResultCount: params['maxResultCount']
      };

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static update(
    params: {
      /**  */
      id: string;
      /** requestBody */
      body?: CreateUpdateGeneDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<GeneDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/app/gene/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static delete(
    params: {
      /**  */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/app/gene/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static get(
    params: {
      /**  */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<GeneDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/app/gene/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
}

export class IllnessService {
  /**
   *
   */
  static create(
    params: {
      /** requestBody */
      body?: CreateUpdateIllnessDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<IllnessDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/app/illness';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static getList(
    params: {
      /**  */
      sorting?: string;
      /**  */
      skipCount?: number;
      /**  */
      maxResultCount?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<IllnessDtoPagedResultDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/app/illness';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        Sorting: params['sorting'],
        SkipCount: params['skipCount'],
        MaxResultCount: params['maxResultCount']
      };

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static update(
    params: {
      /**  */
      id: string;
      /** requestBody */
      body?: CreateUpdateIllnessDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<IllnessDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/app/illness/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static delete(
    params: {
      /**  */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/app/illness/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static get(
    params: {
      /**  */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<IllnessDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/app/illness/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
}

export class MutationService {
  /**
   *
   */
  static create(
    params: {
      /** requestBody */
      body?: CreateUpdateMutationDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<MutationDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/app/mutation';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static getList(
    params: {
      /**  */
      sorting?: string;
      /**  */
      skipCount?: number;
      /**  */
      maxResultCount?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<MutationDtoPagedResultDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/app/mutation';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        Sorting: params['sorting'],
        SkipCount: params['skipCount'],
        MaxResultCount: params['maxResultCount']
      };

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static update(
    params: {
      /**  */
      id: string;
      /** requestBody */
      body?: CreateUpdateMutationDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<MutationDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/app/mutation/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static delete(
    params: {
      /**  */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/app/mutation/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static get(
    params: {
      /**  */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<MutationDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/app/mutation/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
}

export class RecommendationService {
  /**
   *
   */
  static create(
    params: {
      /** requestBody */
      body?: CreateUpdateRecommendationDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<RecommendationDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/app/recommendation';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static getList(
    params: {
      /**  */
      sorting?: string;
      /**  */
      skipCount?: number;
      /**  */
      maxResultCount?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<RecommendationDtoPagedResultDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/app/recommendation';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        Sorting: params['sorting'],
        SkipCount: params['skipCount'],
        MaxResultCount: params['maxResultCount']
      };

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static update(
    params: {
      /**  */
      id: string;
      /** requestBody */
      body?: CreateUpdateRecommendationDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<RecommendationDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/app/recommendation/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static delete(
    params: {
      /**  */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/app/recommendation/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static get(
    params: {
      /**  */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<RecommendationDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/app/recommendation/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
}

export class StaffService {
  /**
   *
   */
  static create(
    params: {
      /** requestBody */
      body?: CreateUpdateStaffMemberDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<StaffMemberDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/app/staff';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static getList(
    params: {
      /**  */
      sorting?: string;
      /**  */
      skipCount?: number;
      /**  */
      maxResultCount?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<StaffMemberDtoPagedResultDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/app/staff';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        Sorting: params['sorting'],
        SkipCount: params['skipCount'],
        MaxResultCount: params['maxResultCount']
      };

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static update(
    params: {
      /**  */
      id: string;
      /** requestBody */
      body?: CreateUpdateStaffMemberDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<StaffMemberDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/app/staff/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static delete(
    params: {
      /**  */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/app/staff/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static get(
    params: {
      /**  */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<StaffMemberDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/app/staff/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
}

export class TestMethodService {
  /**
   *
   */
  static create(
    params: {
      /** requestBody */
      body?: CreateUpdateTestMethodDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<TestMethodDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/app/test-method';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static getList(
    params: {
      /**  */
      sorting?: string;
      /**  */
      skipCount?: number;
      /**  */
      maxResultCount?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<TestMethodDtoPagedResultDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/app/test-method';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        Sorting: params['sorting'],
        SkipCount: params['skipCount'],
        MaxResultCount: params['maxResultCount']
      };

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static update(
    params: {
      /**  */
      id: string;
      /** requestBody */
      body?: CreateUpdateTestMethodDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<TestMethodDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/app/test-method/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static delete(
    params: {
      /**  */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/app/test-method/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static get(
    params: {
      /**  */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<TestMethodDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/app/test-method/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
}

export interface ActionApiDescriptionModel {
  /**  */
  uniqueName: string;

  /**  */
  name: string;

  /**  */
  httpMethod?: string;

  /**  */
  url: string;

  /**  */
  supportedVersions?: string[];

  /**  */
  parametersOnMethod: MethodParameterApiDescriptionModel[];

  /**  */
  parameters: ParameterApiDescriptionModel[];

  /**  */
  returnValue: ReturnValueApiDescriptionModel;

  /**  */
  allowAnonymous?: boolean;

  /**  */
  implementFrom?: string;
}

export interface ApplicationApiDescriptionModel {
  /**  */
  modules: object;

  /**  */
  types: object;
}

export interface ApplicationAuthConfigurationDto {
  /**  */
  grantedPolicies: object;
}

export interface ApplicationConfigurationDto {
  /**  */
  localization: ApplicationLocalizationConfigurationDto;

  /**  */
  auth: ApplicationAuthConfigurationDto;

  /**  */
  setting: ApplicationSettingConfigurationDto;

  /**  */
  currentUser: CurrentUserDto;

  /**  */
  features: ApplicationFeatureConfigurationDto;

  /**  */
  globalFeatures: ApplicationGlobalFeatureConfigurationDto;

  /**  */
  multiTenancy: MultiTenancyInfoDto;

  /**  */
  currentTenant: CurrentTenantDto;

  /**  */
  timing: TimingDto;

  /**  */
  clock: ClockDto;

  /**  */
  objectExtensions: ObjectExtensionsDto;

  /**  */
  extraProperties: object;
}

export interface ApplicationFeatureConfigurationDto {
  /**  */
  values: object;
}

export interface ApplicationGlobalFeatureConfigurationDto {
  /**  */
  enabledFeatures: string[];
}

export interface ApplicationLocalizationConfigurationDto {
  /**  */
  values: object;

  /**  */
  resources: object;

  /**  */
  languages: LanguageInfo[];

  /**  */
  currentCulture: CurrentCultureDto;

  /**  */
  defaultResourceName?: string;

  /**  */
  languagesMap: object;

  /**  */
  languageFilesMap: object;
}

export interface ApplicationLocalizationDto {
  /**  */
  resources: object;

  /**  */
  currentCulture: CurrentCultureDto;
}

export interface ApplicationLocalizationResourceDto {
  /**  */
  texts: object;

  /**  */
  baseResources: string[];
}

export interface ApplicationSettingConfigurationDto {
  /**  */
  values: object;
}

export interface ClockDto {
  /**  */
  kind: string;
}

export interface ControllerApiDescriptionModel {
  /**  */
  controllerName: string;

  /**  */
  controllerGroupName?: string;

  /**  */
  isRemoteService: boolean;

  /**  */
  isIntegrationService: boolean;

  /**  */
  apiVersion?: string;

  /**  */
  type: string;

  /**  */
  interfaces: ControllerInterfaceApiDescriptionModel[];

  /**  */
  actions: object;
}

export interface ControllerInterfaceApiDescriptionModel {
  /**  */
  type: string;

  /**  */
  name: string;

  /**  */
  methods: InterfaceMethodApiDescriptionModel[];
}

export interface CreateUpdateDiagnosisDto {
  /**  */
  name: string;
}

export interface CreateUpdateGeneDto {
  /**  */
  name: string;

  /**  */
  testMethodIds: string[];

  /**  */
  mutationIds: string[];
}

export interface CreateUpdateIllnessDto {
  /**  */
  name: string;

  /**  */
  recommendationIds: string[];
}

export interface CreateUpdateMutationDto {
  /**  */
  name: string;
}

export interface CreateUpdateRecommendationDto {
  /**  */
  name: string;

  /**  */
  content: string;

  /**  */
  level: RecommendationLevel;

  /**  */
  priority: number;

  /**  */
  ageRange: Range;
}

export interface CreateUpdateStaffMemberDto {
  /**  */
  name: string;

  /**  */
  title: string;

  /**  */
  role: StaffRole;
}

export interface CreateUpdateTestMethodDto {
  /**  */
  name: string;
}

export interface CurrentCultureDto {
  /**  */
  displayName: string;

  /**  */
  englishName: string;

  /**  */
  threeLetterIsoLanguageName: string;

  /**  */
  twoLetterIsoLanguageName: string;

  /**  */
  isRightToLeft: boolean;

  /**  */
  cultureName: string;

  /**  */
  name: string;

  /**  */
  nativeName: string;

  /**  */
  dateTimeFormat: DateTimeFormatDto;
}

export interface CurrentTenantDto {
  /**  */
  id?: string;

  /**  */
  name?: string;

  /**  */
  isAvailable: boolean;
}

export interface CurrentUserDto {
  /**  */
  isAuthenticated: boolean;

  /**  */
  id?: string;

  /**  */
  tenantId?: string;

  /**  */
  impersonatorUserId?: string;

  /**  */
  impersonatorTenantId?: string;

  /**  */
  impersonatorUserName?: string;

  /**  */
  impersonatorTenantName?: string;

  /**  */
  userName?: string;

  /**  */
  name?: string;

  /**  */
  surName?: string;

  /**  */
  email?: string;

  /**  */
  emailVerified: boolean;

  /**  */
  phoneNumber?: string;

  /**  */
  phoneNumberVerified: boolean;

  /**  */
  roles: string[];

  /**  */
  sessionId?: string;
}

export interface DateTimeFormatDto {
  /**  */
  calendarAlgorithmType: string;

  /**  */
  dateTimeFormatLong: string;

  /**  */
  shortDatePattern: string;

  /**  */
  fullDateTimePattern: string;

  /**  */
  dateSeparator: string;

  /**  */
  shortTimePattern: string;

  /**  */
  longTimePattern: string;
}

export interface DiagnosisDto {
  /**  */
  id: string;

  /**  */
  name: string;
}

export interface DiagnosisDtoPagedResultDto {
  /**  */
  items: DiagnosisDto[];

  /**  */
  totalCount: string;
}

export interface EntityExtensionDto {
  /**  */
  properties: object;

  /**  */
  configuration: object;
}

export interface ExtensionEnumDto {
  /**  */
  fields: ExtensionEnumFieldDto[];

  /**  */
  localizationResource?: string;
}

export interface ExtensionEnumFieldDto {
  /**  */
  name?: string;

  /**  */
  value?: any | null;
}

export interface ExtensionPropertyApiCreateDto {
  /**  */
  isAvailable: boolean;
}

export interface ExtensionPropertyApiDto {
  /**  */
  onGet: ExtensionPropertyApiGetDto;

  /**  */
  onCreate: ExtensionPropertyApiCreateDto;

  /**  */
  onUpdate: ExtensionPropertyApiUpdateDto;
}

export interface ExtensionPropertyApiGetDto {
  /**  */
  isAvailable: boolean;
}

export interface ExtensionPropertyApiUpdateDto {
  /**  */
  isAvailable: boolean;
}

export interface ExtensionPropertyAttributeDto {
  /**  */
  typeSimple: string;

  /**  */
  config: object;
}

export interface ExtensionPropertyDto {
  /**  */
  type: string;

  /**  */
  typeSimple: string;

  /**  */
  displayName: LocalizableStringDto;

  /**  */
  api: ExtensionPropertyApiDto;

  /**  */
  ui: ExtensionPropertyUiDto;

  /**  */
  attributes: ExtensionPropertyAttributeDto[];

  /**  */
  configuration: object;

  /**  */
  defaultValue?: any | null;
}

export interface ExtensionPropertyUiDto {
  /**  */
  onTable: ExtensionPropertyUiTableDto;

  /**  */
  onCreateForm: ExtensionPropertyUiFormDto;

  /**  */
  onEditForm: ExtensionPropertyUiFormDto;

  /**  */
  lookup: ExtensionPropertyUiLookupDto;
}

export interface ExtensionPropertyUiFormDto {
  /**  */
  isVisible: boolean;
}

export interface ExtensionPropertyUiLookupDto {
  /**  */
  url: string;

  /**  */
  resultListPropertyName: string;

  /**  */
  displayPropertyName: string;

  /**  */
  valuePropertyName: string;

  /**  */
  filterParamName: string;
}

export interface ExtensionPropertyUiTableDto {
  /**  */
  isVisible: boolean;
}

export interface GeneDto {
  /**  */
  id: string;

  /**  */
  name: string;

  /**  */
  testMethodIds: string[];

  /**  */
  mutationIds: string[];
}

export interface GeneDtoPagedResultDto {
  /**  */
  items: GeneDto[];

  /**  */
  totalCount: string;
}

export interface IanaTimeZone {
  /**  */
  timeZoneName?: string;
}

export interface IllnessDto {
  /**  */
  id: string;

  /**  */
  name: string;

  /**  */
  recommendationIds: string[];
}

export interface IllnessDtoPagedResultDto {
  /**  */
  items: IllnessDto[];

  /**  */
  totalCount: string;
}

export interface InterfaceMethodApiDescriptionModel {
  /**  */
  name: string;

  /**  */
  parametersOnMethod: MethodParameterApiDescriptionModel[];

  /**  */
  returnValue: ReturnValueApiDescriptionModel;
}

export interface LanguageInfo {
  /**  */
  cultureName: string;

  /**  */
  uiCultureName: string;

  /**  */
  displayName: string;

  /**  */
  twoLetterISOLanguageName: string;
}

export interface LocalizableStringDto {
  /**  */
  name: string;

  /**  */
  resource?: string;
}

export interface MethodParameterApiDescriptionModel {
  /**  */
  name: string;

  /**  */
  typeAsString: string;

  /**  */
  type: string;

  /**  */
  typeSimple: string;

  /**  */
  isOptional: boolean;

  /**  */
  defaultValue?: any | null;
}

export interface ModuleApiDescriptionModel {
  /**  */
  rootPath: string;

  /**  */
  remoteServiceName: string;

  /**  */
  controllers: object;
}

export interface ModuleExtensionDto {
  /**  */
  entities: object;

  /**  */
  configuration: object;
}

export interface MultiTenancyInfoDto {
  /**  */
  isEnabled: boolean;
}

export interface MutationDto {
  /**  */
  id: string;

  /**  */
  name: string;
}

export interface MutationDtoPagedResultDto {
  /**  */
  items: MutationDto[];

  /**  */
  totalCount: string;
}

export interface NameValue {
  /**  */
  name: string;

  /**  */
  value: string;
}

export interface ObjectExtensionsDto {
  /**  */
  modules: object;

  /**  */
  enums: object;
}

export interface ParameterApiDescriptionModel {
  /**  */
  nameOnMethod: string;

  /**  */
  name: string;

  /**  */
  jsonName?: string;

  /**  */
  type?: string;

  /**  */
  typeSimple?: string;

  /**  */
  isOptional: boolean;

  /**  */
  defaultValue?: any | null;

  /**  */
  constraintTypes?: string[];

  /**  */
  bindingSourceId?: string;

  /**  */
  descriptorName?: string;
}

export interface PropertyApiDescriptionModel {
  /**  */
  name: string;

  /**  */
  jsonName?: string;

  /**  */
  type: string;

  /**  */
  typeSimple: string;

  /**  */
  isRequired: boolean;

  /**  */
  minLength?: number;

  /**  */
  maxLength?: number;

  /**  */
  minimum?: string;

  /**  */
  maximum?: string;

  /**  */
  regex?: string;
}

export interface Range {
  /**  */
  from?: number;

  /**  */
  to?: number;
}

export interface RecommendationDto {
  /**  */
  id: string;

  /**  */
  name: string;

  /**  */
  content: string;

  /**  */
  level: RecommendationLevel;

  /**  */
  priority: number;

  /**  */
  ageRange: Range;
}

export interface RecommendationDtoPagedResultDto {
  /**  */
  items: RecommendationDto[];

  /**  */
  totalCount: string;
}

export interface RemoteServiceErrorInfo {
  /**  */
  code?: string;

  /**  */
  message?: string;

  /**  */
  details?: string;

  /**  */
  data?: object;

  /**  */
  validationErrors?: RemoteServiceValidationErrorInfo[];
}

export interface RemoteServiceErrorResponse {
  /**  */
  error: RemoteServiceErrorInfo;
}

export interface RemoteServiceValidationErrorInfo {
  /**  */
  message: string;

  /**  */
  members: string[];
}

export interface ReturnValueApiDescriptionModel {
  /**  */
  type: string;

  /**  */
  typeSimple: string;
}

export interface StaffMemberDto {
  /**  */
  id: string;

  /**  */
  name: string;

  /**  */
  title: string;

  /**  */
  role: StaffRole;
}

export interface StaffMemberDtoPagedResultDto {
  /**  */
  items: StaffMemberDto[];

  /**  */
  totalCount: string;
}

export interface TestMethodDto {
  /**  */
  id: string;

  /**  */
  name: string;
}

export interface TestMethodDtoPagedResultDto {
  /**  */
  items: TestMethodDto[];

  /**  */
  totalCount: string;
}

export interface TimeZone {
  /**  */
  iana: IanaTimeZone;

  /**  */
  windows: WindowsTimeZone;
}

export interface TimingDto {
  /**  */
  timeZone: TimeZone;
}

export interface TypeApiDescriptionModel {
  /**  */
  baseType?: string;

  /**  */
  isEnum: boolean;

  /**  */
  enumNames?: string[];

  /**  */
  enumValues?: any | null[];

  /**  */
  genericArguments?: string[];

  /**  */
  properties?: PropertyApiDescriptionModel[];
}

export interface WindowsTimeZone {
  /**  */
  timeZoneId?: string;
}

export enum RecommendationLevel {
  'I' = 'I',
  'II' = 'II',
  'III' = 'III'
}

export enum StaffRole {
  'Doctor' = 'Doctor',
  'Technician' = 'Technician',
  'Consultant' = 'Consultant',
  'Assistant' = 'Assistant'
}
