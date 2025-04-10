import {
	ICreateCvRequest,
	ICreateCvResponse,
	ICVBuilderInitResponse,
	TCVBuilderInitGet,
	IAISuggestResponse,
	IPromptConfigApi,
} from '@api/cvBuilder/types';
// @ts-ignore
import { requestFactory, REST_TYPE } from '@fugu-old/service/requestFactory';
import { PATHS } from '@api/constants';

export default {
	async getInitialData({ headers }: TCVBuilderInitGet = {}): Promise<ICVBuilderInitResponse> {
		const url = PATHS.API.CV_BUILDER.INIT;
		const method = REST_TYPE.POST;

		// @ts-ignore
		return await requestFactory({ url, method, headers });
	},

	async createCv(data: ICreateCvRequest): Promise<ICreateCvResponse> {
		const url = PATHS.API.CV_BUILDER.CREATE_CV;
		const method = REST_TYPE.POST;

		// @ts-ignore
		return await requestFactory({ url, method, data });
	},

	async getAISuggest(data: IPromptConfigApi): Promise<IAISuggestResponse> {
		const url = PATHS.API.CV_BUILDER.GET_AISUGGEST;
		const method = REST_TYPE.POST;

		// @ts-ignore
		return await requestFactory({ url, method, data });
	},
};
