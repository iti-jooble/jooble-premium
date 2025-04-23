import React from 'react';
import Skills from './Skills';
import Experience from './Experience';
import Education from './Education';
import { atLeastOneFieldExists, sortExperiences } from '../utils';
import { ITemplateComponentProps } from './types';

import './template.raw.css';

const TemplateComponent: React.FC<ITemplateComponentProps> = ({ cvData, intl }) => (
	<div>
		<div className="template template-02" id="template">
			<link rel="preconnect" href="https://fonts.googleapis.com" />
			<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
			<link
				href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Noto+Serif:wght@700;800&display=swap"
				rel="stylesheet"
			/>
			<div style={{ height: '100%', display: 'flex', flexDirection: 'column' }} className="overflow-auto">
				<div className="pages-indication">
					<div style={{ display: 'flex', height: '100%' }}>
						<div
							style={{
								minWidth: '254px',
								maxWidth: '254px',
								height: '100%',
								minHeight: '1123px',
								padding: '58px 24px 32px 36px',
								backgroundColor: '#EAF3FE',
								alignSelf: 'stretch',
							}}
							id="breakColumn"
							className="stretch"
						>
							<Base
								className="break-block"
								id="breakBlock"
								exists={
									cvData.personalInfo.phone ||
									cvData.personalInfo.email ||
									cvData.personalInfo.city ||
									cvData.personalInfo.country
								}
								style={{ paddingBottom: '10px' }}
							>
								<div className="block-title">{intl.formatMessage({ id: 'cvBuilder.contacts' })}</div>
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										fontSize: '14px',
									}}
								>
									<Base
										exists={cvData.personalInfo.email}
										style={{ display: 'flex', alignItems: 'center' }}
										data-test-name="_cvBuilderPreviewEmail"
									>
										<svg
											width="14"
											height="14"
											viewBox="0 0 14 14"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											style={{
												width: '20px',
												height: 'auto',
												marginRight: '10px',
												minWidth: '20px',
											}}
										>
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M7.41432 6.92998C7.36009 6.98466 7.29557 7.02806 7.22449 7.05767C7.1534 7.08729 7.07716 7.10253 7.00015 7.10253C6.92314 7.10253 6.8469 7.08729 6.77581 7.05767C6.70473 7.02806 6.64021 6.98466 6.58598 6.92998L2.16095 2.50488C2.39466 2.39299 2.65257 2.33331 2.91663 2.33331H11.0833C11.3475 2.33331 11.6055 2.39304 11.8393 2.50502L7.41432 6.92998ZM12.6617 3.32765L8.23682 7.75248C7.90869 8.0802 7.4639 8.26428 7.00015 8.26428C6.5364 8.26428 6.09161 8.0802 5.76348 7.75248L1.33828 3.32745C1.22634 3.56122 1.16663 3.81919 1.16663 4.08331V9.91665C1.16663 10.3808 1.351 10.8259 1.67919 11.1541C2.00738 11.4823 2.4525 11.6666 2.91663 11.6666H11.0833C11.5474 11.6666 11.9925 11.4823 12.3207 11.1541C12.6489 10.8259 12.8333 10.3808 12.8333 9.91665V4.08331C12.8333 3.81926 12.7736 3.56137 12.6617 3.32765Z"
												fill="#0965EF"
											/>
										</svg>

										{cvData.personalInfo.email}
									</Base>
									<Base
										exists={cvData.personalInfo.phone}
										style={{ display: 'flex', alignItems: 'center', marginTop: '12px' }}
										data-test-name="_cvBuilderPreviewPhone"
									>
										<svg
											width="14"
											height="14"
											viewBox="0 0 14 14"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											style={{
												width: '20px',
												height: 'auto',
												marginRight: '10px',
												minWidth: '20px',
											}}
										>
											<path
												d="M11.8449 12.5391C5.9378 12.5474 1.45462 8.01053 1.46094 2.15506C1.46094 1.77267 1.77093 1.46094 2.15333 1.46094H3.98077C4.3239 1.46094 4.61539 1.71305 4.66577 2.05246C4.78653 2.86592 5.02337 3.65785 5.36908 4.40405L5.44023 4.55762C5.53916 4.77116 5.47211 5.02487 5.28059 5.16164C4.71465 5.56579 4.49837 6.37932 4.93926 7.01409C5.49253 7.81067 6.18995 8.50794 6.98634 9.06096C7.62108 9.50173 8.43448 9.28547 8.83863 8.71963C8.97549 8.52802 9.22934 8.46093 9.443 8.5599L9.59587 8.63071C10.3421 8.9764 11.1341 9.21325 11.9476 9.33399C12.2871 9.38436 12.5391 9.67583 12.5391 10.019V11.8467C12.5391 12.2291 12.2283 12.539 11.8459 12.539L11.8449 12.5391Z"
												fill="#0965EF"
											/>
										</svg>
										{cvData.personalInfo.phone}
									</Base>
									<Base
										exists={cvData.personalInfo.city || cvData.personalInfo.country}
										style={{ display: 'flex', alignItems: 'center', marginTop: '12px' }}
									>
										<svg
											width="14"
											height="14"
											viewBox="0 0 14 14"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											style={{
												width: '20px',
												height: 'auto',
												marginRight: '10px',
												minWidth: '20px',
											}}
										>
											<path
												d="M7.00072 0.65625C4.20235 0.65625 1.92547 2.93313 1.92547 5.72833C1.90707 9.81707 6.80786 13.2073 7.00072 13.3444C7.00072 13.3444 12.0944 9.81707 12.076 5.7315C12.076 2.93313 9.79908 0.65625 7.00072 0.65625ZM7.00072 8.26912C5.59868 8.26912 4.46309 7.13354 4.46309 5.7315C4.46309 4.32946 5.59868 3.19387 7.00072 3.19387C8.40275 3.19387 9.53834 4.32946 9.53834 5.7315C9.53834 7.13354 8.40275 8.26912 7.00072 8.26912Z"
												fill="#0965EF"
											/>
											<circle
												cx="6.99935"
												cy="5.91195"
												r="2.71888"
												stroke="#0965EF"
												strokeWidth="1.08755"
											/>
										</svg>
										<div data-test-name="_cvBuilderPreviewLocation">
											{cvData.personalInfo.city}
											<Base
												exists={cvData.personalInfo.city && cvData.personalInfo.country}
												component="span"
											>
												,&nbsp;
											</Base>
											{cvData.personalInfo.country}
										</div>
									</Base>
								</div>
							</Base>

							<Base
								exists={cvData.summary}
								className="break-block"
								id="breakBlock"
								style={{ marginTop: '20px' }}
							>
								<div className="block-title">
									{intl.formatMessage({ id: 'cvBuilder.stepper.about' })}
								</div>
								<Base
									exists={cvData.summary}
									className="table-cell-content"
									style={{ fontSize: '14px' }}
									dangerouslySetInnerHTML={{ __html: cvData.summary }}
									data-test-name="_cvBuilderPreviewSummary"
								/>
							</Base>

							<Base
								exists={atLeastOneFieldExists(cvData.careerObjective.skillSet)}
								component={Skills}
								data={cvData.careerObjective.skillSet.filter((item) => !!item)}
								intl={intl}
							/>
						</div>
						<div style={{ flex: '1 1', paddingRight: '36px', paddingLeft: '50px' }} id="breakColumn">
							<div style={{ paddingTop: '58px' }}>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										paddingBottom: '36px',
										marginBottom: '24px',
									}}
								>
									<div style={{ marginRight: 'auto' }}>
										<Base
											style={{
												width: '60px',
												borderTop: 'solid 4px #0965ef',
												marginBottom: '12px',
												marginTop: '6px',
											}}
											exists={cvData.personalInfo.firstName || cvData.personalInfo.lastName}
										/>
										<Base
											exists={cvData.personalInfo.firstName || cvData.personalInfo.lastName}
											style={{
												fontSize: '32px',
												lineHeight: '1 !important',
												fontWeight: '800',
												fontFamily: "'Noto Serif', serif",
											}}
										>
											<div
												style={{ lineHeight: '1.1', color: '#3a395d' }}
												data-test-name="_cvBuilderPreviewFirstName"
											>
												{cvData.personalInfo.firstName} {cvData.personalInfo.lastName}
											</div>
										</Base>
									</div>
								</div>
							</div>

							<Base
								exists={atLeastOneFieldExists(cvData.experience.workPlaces)}
								component={Experience}
								data={sortExperiences(cvData.experience.workPlaces)}
								intl={intl}
							/>

							<Base
								exists={atLeastOneFieldExists(cvData.education.educationPlaces)}
								component={Education}
								data={[...cvData.education.educationPlaces].sort(
									(a, b) => parseInt(b.admissionYear || '0') - parseInt(a.admissionYear || '0')
								)}
								intl={intl}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
);

export default TemplateComponent;
