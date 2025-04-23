import { uniqueId } from 'lodash';
import { IEducationProps } from './types';

const Education: React.FC<IEducationProps> = ({ intl, data }) => (
	<div>
		<div className="break-block" id="breakBlock" style={{ padding: '32px 0 24px' }}>
			<div style={{ borderBottom: 'solid 1px #e5e5ea' }} />
		</div>
		<div className="block-title break-block" id="breakBlock">
			{intl.formatMessage({ id: 'cvBuilder.stepper.education' })}
		</div>
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			{data.map((item, index) => (
				<div
					className="time-interval--table-row break-block"
					id="breakBlock"
					key={`preview_education_${uniqueId()}`}
					style={{ marginTop: index !== 0 ? '18px' : 0 }}
				>
					<div>
						<div style={{ fontSize: '14px' }}>
							<Base
								exists={item.specialty}
								style={{ fontSize: '16px', fontWeight: 'bold', color: '#0965EF' }}
								data-test-name="_cvBuilderPreviewEducationSpecialty"
							>
								{item.specialty}
							</Base>
							<Base
								exists={item.educationLevel}
								style={{ fontSize: '16px', fontWeight: 'bold' }}
								data-test-name="_cvBuilderPreviewEducationLevel"
							>
								{item.educationLevel}
							</Base>
							<div
								style={{
									display: 'flex',
									flexWrap: 'wrap',
									alignItems: 'flex-start',
									marginTop: '10px',
								}}
							>
								<Base
									exists={item.nameOfInstitution}
									style={{ fontSize: '16px', color: '#3a395d', fontWeight: 'bold' }}
									data-test-name="_cvBuilderPreviewEducationInstitution"
								>
									{item.nameOfInstitution}
								</Base>
								<Base
									exists={item.admissionYear || item.graduationYear}
									style={{ height: '20px', borderLeft: 'solid 1px #d5d5e7', marginLeft: '10px' }}
								/>
								<Base
									exists={item.admissionYear || item.graduationYear}
									style={{
										fontSize: '16px',
										color: '#6e6d8f',
										whiteSpace: 'nowrap',
										marginLeft: '10px',
									}}
									data-test-name="_cvBuilderPreviewEducationPeriod"
								>
									{item.admissionYear}
									<Base exists={item.admissionYear && item.graduationYear} component="span">
										&nbsp;-&nbsp;
									</Base>
									{item.graduationYear}
								</Base>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	</div>
);

export default Education;
