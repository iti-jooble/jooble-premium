import { IEducationProps } from './types';

const Education: React.FC<IEducationProps> = ({ intl, data }) => (
	<div style={{ paddingTop: '32px' }}>
		<div className="block-title break-block" id="breakBlock">
			{intl.formatMessage({ id: 'cvBuilder.stepper.education' })}
		</div>
		{data.map((item) => (
			<div className="time-interval--table-row break-block" key={`preview_previewId_${item.id}`} id="breakBlock">
				<div style={{ paddingBottom: '18px' }}>
					<div style={{ fontSize: '12px' }}>
						<div style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap' }}>
							<div style={{ marginRight: 'auto', fontSize: '14px', fontWeight: 'bold' }}>
								<Base
									exists={item.specialty}
									component="span"
									data-test-name="_cvBuilderPreviewEducationSpecialty"
								>
									{item.specialty}
								</Base>
								<Base exists={item.specialty && item.educationLevel} component="span">
									,&nbsp;
								</Base>
								<Base
									exists={item.educationLevel}
									component="span"
									data-test-name="_cvBuilderPreviewEducationLevel"
								>
									{item.educationLevel}
								</Base>
							</div>
							<Base
								style={{ color: '#808080', whiteSpace: 'nowrap', marginLeft: '20px' }}
								exists={item.admissionYear || item.graduationYear}
								data-test-name="_cvBuilderPreviewEducationPeriod"
							>
								{item.admissionYear}
								<Base exists={item.admissionYear && item.graduationYear} component="span">
									&nbsp;-&nbsp;
								</Base>
								{item.graduationYear}
							</Base>
						</div>
						<Base
							exists={item.nameOfInstitution}
							style={{ fontSize: '14px', marginTop: '8px' }}
							data-test-name="_cvBuilderPreviewEducationInstitution"
						>
							{item.nameOfInstitution}
						</Base>
					</div>
				</div>
			</div>
		))}
	</div>
);

export default Education;
