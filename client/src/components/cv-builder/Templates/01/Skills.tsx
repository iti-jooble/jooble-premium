import { uniqueId } from 'lodash';
import { ISkillsProps } from './types';

const Skills: React.FC<ISkillsProps> = ({ intl, data }) => (
	<div>
		<div className="block-title">{intl.formatMessage({ id: 'cvBuilder.stepper.skills' })}</div>
		<div
			className="table-cell-2"
			style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '14px' }}
			data-test-name="_cvBuilderPreviewSkills"
		>
			{data.map((item, index) => (
				<div
					style={{
						border: 'solid 1px #D0D6DD',
						padding: '4px 8px',
						borderRadius: '6px',
						fontSize: '12px',
						marginRight: '8px',
						marginBottom: '4px',
					}}
					key={`preview_skills_${uniqueId()}`}
					data-test-name={`_cvBuilderPreviewSkills_skill${index}`}
				>
					{item}
				</div>
			))}
		</div>
	</div>
);

export default Skills;
