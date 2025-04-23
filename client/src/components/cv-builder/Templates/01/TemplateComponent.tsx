import Skills from './Skills';
import Education from './Education';
import Experience from './Experience';
import { ITemplateComponentProps } from './types';
import { atLeastOneFieldExists, sortExperiences } from '../utils';

import './template.raw.css';

const TemplateComponent: React.FC<ITemplateComponentProps> = ({ cvData, intl }) => (
	<div>
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
		<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@700&display=swap" rel="stylesheet" />
		<div className="template template-01" id="template">
			<div style={{ height: '100%', display: 'flex', flexDirection: 'column' }} className="overflow-auto">
				<div className="pages-indication">
					<div style={{ padding: '50px 55px 30px 55px', display: 'flex', gap: '42px' }}>
						<div id="breakColumn" style={{ flex: '1 1' }}>
							<div>
								<Base
									exists={cvData.personalInfo.firstName || cvData.personalInfo.lastName}
									style={{
										fontSize: '32px',
										lineHeight: '1 !important',
										fontWeight: 'bold',
										fontFamily: "'IBM Plex Serif', serif",
									}}
								>
									<span style={{ lineHeight: 1.2 }} data-test-name="_cvBuilderPreviewFirstName">
										{cvData.personalInfo.firstName}
									</span>
									<Base
										exists={cvData.personalInfo.firstName && cvData.personalInfo.lastName}
										component="span"
										style={{ lineHeight: '1.2' }}
									>
										&nbsp;
									</Base>
									<span style={{ lineHeight: 1.2 }} data-test-name="_cvBuilderPreviewLastName">
										{cvData.personalInfo.lastName}
									</span>
								</Base>
								<Base
									exists={cvData.personalInfo.firstName || cvData.personalInfo.lastName}
									style={{
										width: '88px',
										borderTop: 'solid 1px #A1AFC1',
										marginTop: '16px',
										height: '18px',
									}}
								/>
							</div>
							<Base
								exists={cvData.summary}
								className="break-block"
								id="breakBlock"
								style={{ paddingBottom: '18px' }}
							>
								<Base
									exists={cvData.summary}
									dangerouslySetInnerHTML={{ __html: cvData.summary }}
									className="table-cell-content"
									style={{ fontSize: '14px' }}
									data-test-name="_cvBuilderPreviewSummary"
								/>
							</Base>
							<Base
								exists={
									cvData.personalInfo.phone || cvData.personalInfo.country || cvData.personalInfo.city
								}
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: '5px',
									fontSize: '12px',
									paddingBottom: '36px',
								}}
							>
								<Base
									exists={cvData.personalInfo.phone}
									style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
									data-test-name="_cvBuilderPreviewPhone"
								>
									{cvData.personalInfo.phone}
								</Base>
								<Base
									exists={cvData.personalInfo.email}
									style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
									data-test-name="_cvBuilderPreviewEmail"
								>
									{cvData.personalInfo.email}
								</Base>
								<Base
									exists={cvData.personalInfo.city || cvData.personalInfo.country}
									style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
									data-test-name="_cvBuilderPreviewLocation"
								>
									<div>
										{cvData.personalInfo.city}
										<Base
											exists={cvData.personalInfo.city && cvData.personalInfo.country}
											component="span"
										>
											,{' '}
										</Base>
										{cvData.personalInfo.country}
									</div>
								</Base>
							</Base>
							<Base
								exists={atLeastOneFieldExists(cvData.careerObjective.skillSet)}
								component={Skills}
								data={cvData.careerObjective.skillSet.filter((item) => !!item)}
								intl={intl}
							/>
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
