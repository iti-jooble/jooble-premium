import { uniqueId } from "lodash";
import { IEducationProps } from "./types";

const Education: React.FC<IEducationProps> = ({ t, data }) => (
	<div>
		<div
			className="break-block"
			id="breakBlock"
			style={{ padding: "32px 0 24px" }}
		>
			<div style={{ borderBottom: "solid 1px #e5e5ea" }} />
		</div>
		<div className="block-title break-block" id="breakBlock">
			{t("cvPreview.education")}
		</div>
		<div style={{ display: "flex", flexDirection: "column" }}>
			{data.map((item, index) => (
				<div
					className="time-interval--table-row break-block"
					id="breakBlock"
					key={`preview_education_${uniqueId()}`}
					style={{ marginTop: index !== 0 ? "18px" : 0 }}
				>
					<div>
						<div style={{ fontSize: "14px" }}>
							{item.field && (
								<div
									style={{
										fontSize: "16px",
										fontWeight: "bold",
										color: "#0965EF",
									}}
									data-test-name="_cvBuilderPreviewEducationSpecialty"
								>
									{item.field}
								</div>
							)}

							{item.degree && (
								<div
									style={{ fontSize: "16px", fontWeight: "bold" }}
									data-test-name="_cvBuilderPreviewEducationLevel"
								>
									{item.degree}
								</div>
							)}

							<div
								style={{
									display: "flex",
									flexWrap: "wrap",
									alignItems: "flex-start",
									marginTop: "10px",
								}}
							>
								{item.school && (
									<div
										style={{
											fontSize: "16px",
											color: "#3a395d",
											fontWeight: "bold",
										}}
										data-test-name="_cvBuilderPreviewEducationInstitution"
									>
										{item.school}
									</div>
								)}

								{(item.startYear || item.endYear) && (
									<div
										style={{
											height: "20px",
											borderLeft: "solid 1px #d5d5e7",
											marginLeft: "10px",
										}}
									/>
								)}
								{(item.startYear || item.endYear) && (
									<div
										style={{
											fontSize: "16px",
											color: "#6e6d8f",
											whiteSpace: "nowrap",
											marginLeft: "10px",
										}}
										data-test-name="_cvBuilderPreviewEducationPeriod"
									>
										{item.startYear}
										{item.startYear && item.endYear && (
											<span>&nbsp;-&nbsp;</span>
										)}
										{item.endYear}
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	</div>
);

export default Education;
