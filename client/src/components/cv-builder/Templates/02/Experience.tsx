import { uniqueId } from 'lodash';
import { IExperienceProps } from './types';

const Experience: React.FC<IExperienceProps> = ({ intl, data }) => (
	<div>
		<div className="block-title break-block" id="breakBlock">
			{intl.formatMessage({ id: 'cvBuilder.stepper.experience' })}
		</div>
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			{data.map((item, index) => (
				<div
					className="time-interval--table-row break-block"
					id="breakBlock"
					key={`preview_experience_${uniqueId()}`}
					style={{ marginTop: index !== 0 ? '18px' : 0 }}
				>
					<div>
						<div style={{ fontSize: '14px' }}>
							<Base
								exists={item.company}
								style={{ fontSize: '16px', fontWeight: 'bold', color: '#0965EF' }}
								data-test-name="_cvBuilderPreviewExperienceCompany"
							>
								{item.company}
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
									exists={item.position}
									style={{ fontSize: '16px', color: '#3a395d', fontWeight: 'bold' }}
									data-test-name="_cvBuilderPreviewExperiencePosition"
								>
									{item.position}
								</Base>
								<Base
									exists={item.startYear || item.endYear}
									style={{ height: '20px', borderLeft: 'solid 1px #d5d5e7', marginLeft: '10px' }}
								/>
								<Base
									exists={item.startYear || item.endYear}
									style={{
										color: '#6e6d8f',
										whiteSpace: 'nowrap',
										marginLeft: '10px',
										fontSize: '16px',
									}}
									data-test-name="_cvBuilderPreviewExperiencePeriod"
								>
									{item.startYear}
									<Base
										exists={item.startYear && (item.endYear || item.isStillWorking)}
										component="span"
									>
										&nbsp;-&nbsp;
									</Base>
									{item.isStillWorking
										? intl.formatMessage({ id: 'cvBuilder.present' })
										: item.endYear}
								</Base>
							</div>

							<Base
								exists={item.responsibilities}
								className="table-cell-content"
								{...((item.position || item.company) && { style: { marginTop: '8px' } })}
								dangerouslySetInnerHTML={{ __html: item.responsibilities }}
								data-test-name="_cvBuilderPreviewExperienceResponsibilities"
							/>
						</div>
					</div>
				</div>
			))}
		</div>
	</div>
);

export default Experience;
