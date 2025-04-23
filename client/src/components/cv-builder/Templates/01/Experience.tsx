import { IExperienceProps } from './types';

const Experience: React.FC<IExperienceProps> = ({ intl, data }) => (
	<div style={{ paddingTop: '36px' }}>
		<div className="block-title break-block" id="breakBlock">
			{intl.formatMessage({ id: 'cvBuilder.stepper.experience' })}
		</div>
		{data.map((item) => (
			<div className="time-interval--table-row break-block" id="breakBlock" key={`preview_previewId_${item.id}`}>
				<div style={{ paddingBottom: '18px' }}>
					<div style={{ fontSize: '12px' }}>
						<div style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap' }}>
							<div style={{ marginRight: 'auto' }}>
								<Base
									exists={item.position}
									style={{ fontSize: '14px', fontWeight: 'bold' }}
									data-test-name="_cvBuilderPreviewExperiencePosition"
								>
									{item.position}
								</Base>
							</div>
							<Base
								style={{ color: '#808080', whiteSpace: 'nowrap', marginLeft: '20px' }}
								exists={item.startYear || item.endYear}
								data-test-name="_cvBuilderPreviewExperiencePeriod"
							>
								{item.startYear}
								<Base exists={item.startYear && (item.endYear || item.isStillWorking)} component="span">
									&nbsp;-&nbsp;
								</Base>
								{item.isStillWorking ? intl.formatMessage({ id: 'cvBuilder.present' }) : item.endYear}
							</Base>
						</div>
						<Base
							exists={item.company}
							style={{ fontSize: '14px', fontWeight: 'bold', marginTop: '8px' }}
							data-test-name="_cvBuilderPreviewExperienceCompany"
						>
							{item.company}
						</Base>
						<Base
							exists={item.responsibilities}
							className="table-cell-content"
							style={{
								fontSize: '14px',
								marginTop: item.position || item.company ? '10px' : undefined,
							}}
							dangerouslySetInnerHTML={{ __html: item.responsibilities }}
							data-test-name="_cvBuilderPreviewExperienceResponsibilities"
						/>
					</div>
				</div>
			</div>
		))}
	</div>
);

export default Experience;
