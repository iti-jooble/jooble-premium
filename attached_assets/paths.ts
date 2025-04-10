export const PATHS = {
	API: {
		ABOUT_API: {
			INIT: '/api/about/review',
			LEAVE_REQUEST: '/api/registerV2',
		},
		BASE_API: {
			BASE_INIT: '/api/BaseApi/BaseInit',
		},
		TERMS_OF_SERVICE: {
			INIT: '/api/TermsPage/Init',
		},
		PROFILE: {
			GET_PROFESSIONS_SUGGESTS: '/api/Profile/GetProfessionsSuggests',
		},
		MULTI_SUBSCRIPTIONS: {
			SUBSCRIBE: '/api/Subscriptions/CreateMultiSubscriptions',
		},
		CV_BUILDER: {
			INIT: '/api/cvbuilder/init',
			CREATE_CV: '/api/cvbuilder/createV2',
			GET_AISUGGEST: '/api/cvbuilder/suggestv2',
			SAVE_STATISTICS: '/api/cvbuilder/SaveStatisticAction',
		},
		COMPANY_SEARCH: {
			INIT: '/api/companySearch/init',
			SEARCH: '/api/companySearch/search',
		},
	},
	AUTOCOMPLETE: '/autocomplete',
	SPA_METRICS: '/spa-metrics',
};
