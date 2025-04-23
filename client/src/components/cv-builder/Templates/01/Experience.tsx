import { IExperienceProps } from "./types";

const Experience: React.FC<IExperienceProps> = ({ t, data }) => (
	<div style={{ paddingTop: "36px" }}>
		<div className="block-title break-block" id="breakBlock">
			{t("cvPreview.experience")}
		</div>
		{data.map((item) => (
			<div
				className="time-interval--table-row break-block"
				id="breakBlock"
				key={`preview_previewId_${item.id}`}
			>
				<div style={{ paddingBottom: "18px" }}>
					<div style={{ fontSize: "12px" }}>
						<div
							style={{
								display: "flex",
								alignItems: "flex-start",
								flexWrap: "wrap",
							}}
						>
							<div style={{ marginRight: "auto" }}>
								{item.position && (
									<div
										style={{ fontSize: "14px", fontWeight: "bold" }}
										data-test-name="_cvBuilderPreviewExperiencePosition"
									>
										{item.position}
									</div>
								)}
							</div>
							{(item.startYear || item.endYear) && (
								<div
									style={{
										color: "#808080",
										whiteSpace: "nowrap",
										marginLeft: "20px",
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
						{item.company && (
							<div
								style={{
									fontSize: "14px",
									fontWeight: "bold",
									marginTop: "8px",
								}}
								data-test-name="_cvBuilderPreviewExperienceCompany"
							>
								{item.company}
							</div>
						)}

						{item.description && (
							<div
								className="table-cell-content"
								style={{
									fontSize: "14px",
									marginTop: item.position || item.company ? "10px" : undefined,
								}}
								dangerouslySetInnerHTML={{ __html: item.description }}
								data-test-name="_cvBuilderPreviewExperienceResponsibilities"
							/>
						)}
					</div>
				</div>
			</div>
		))}
	</div>
);

export default Experience;
