import { uniqueId } from "lodash";
import { IExperienceProps } from "./types";

const Experience: React.FC<IExperienceProps> = ({ t, data }) => (
	<div>
		<div className="block-title break-block" id="breakBlock">
			{t("cvPreview.experience")}
		</div>
		<div style={{ display: "flex", flexDirection: "column" }}>
			{data.map((item, index) => (
				<div
					className="time-interval--table-row break-block"
					id="breakBlock"
					key={`preview_experience_${uniqueId()}`}
					style={{ marginTop: index !== 0 ? "18px" : 0 }}
				>
					<div>
						<div style={{ fontSize: "14px" }}>
							{item.company && (
								<div
									style={{
										fontSize: "16px",
										fontWeight: "bold",
										color: "#0965EF",
									}}
									data-test-name="_cvBuilderPreviewExperienceCompany"
								>
									{item.company}
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
								{item.position && (
									<div
										style={{
											fontSize: "16px",
											color: "#3a395d",
											fontWeight: "bold",
										}}
										data-test-name="_cvBuilderPreviewExperiencePosition"
									>
										{item.position}
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
											color: "#6e6d8f",
											whiteSpace: "nowrap",
											marginLeft: "10px",
											fontSize: "16px",
										}}
										data-test-name="_cvBuilderPreviewExperiencePeriod"
									>
										{item.startYear}
										{item.startYear && (item.endYear || item.isCurrent) && (
											<span>&nbsp;-&nbsp;</span>
										)}
										{item.isCurrent ? t("cvPreview.present") : item.endYear}
									</div>
								)}
							</div>

							{item.description && (
								<div
									className="table-cell-content"
									{...((item.position || item.company) && {
										style: { marginTop: "8px" },
									})}
									dangerouslySetInnerHTML={{ __html: item.description }}
									data-test-name="_cvBuilderPreviewExperiencedescription"
								/>
							)}
						</div>
					</div>
				</div>
			))}
		</div>
	</div>
);

export default Experience;
