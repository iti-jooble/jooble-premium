import { uniqueId } from 'lodash';
import { ISkillsProps } from './types';

const Skills: React.FC<ISkillsProps> = ({ intl, data }) => (
	<div style={{ marginTop: '30px' }}>
		<div className="block-title">{intl.formatMessage({ id: 'cvBuilder.stepper.skills' })}</div>
		<div className="table-cell-2" style={{ fontSize: '14px', paddingBottom: '20px' }}>
			<div style={{ display: 'flex', flexDirection: 'column' }} data-test-name="_cvBuilderPreviewSkills">
				{data.map((item, index) => (
					<div
						style={{ position: 'relative', paddingLeft: '16px', marginTop: index !== 0 ? '10px' : 0 }}
						key={`preview_skills_${uniqueId()}`}
						data-test-name={`_cvBuilderPreviewSkills_skill${index}`}
					>
						<span
							style={{
								width: '5px',
								height: '5px',
								display: 'block',
								borderRadius: '4px',
								background: '#0965ef',
								position: 'absolute',
								top: '8px',
								left: '0px',
							}}
						/>
						<div style={{ display: 'inline', fontSize: '14px' }}>{item}</div>
					</div>
				))}
			</div>
		</div>
	</div>
);

export default Skills;
