import { IEducationProps } from "./types";

const Education: React.FC<IEducationProps> = ({ t, data }) => (
	<div style={{ paddingTop: "32px" }}>
		<div className="block-title break-block" id="breakBlock">
			{t("cvBuilder.stepper.education")}
		</div>
		{data.map((item) => (
			<div
				className="time-interval--table-row break-block"
				key={`preview_previewId_${item.id}`}
				id="breakBlock"
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
							<div
								style={{
									marginRight: "auto",
									fontSize: "14px",
									fontWeight: "bold",
								}}
							>
								{item.field && (
									<span data-test-name="_cvBuilderPreviewEducationSpecialty">
										{item.field}
									</span>
								)}
								{item.field && item.degree && <span>,&nbsp;</span>}

								{item.degree && (
									<span data-test-name="_cvBuilderPreviewEducationLevel">
										{item.degree}
									</span>
								)}
							</div>
							{(item.startYear || item.endYear) && (
								<div
									style={{
										color: "#808080",
										whiteSpace: "nowrap",
										marginLeft: "20px",
									}}
									data-test-name="_cvBuilderPreviewEducationPeriod"
								>
									{item.startYear}
									{item.startYear && item.endYear && <span>&nbsp;-&nbsp;</span>}
									{item.endYear}
								</div>
							)}
						</div>
						{item.school && (
							<div
								style={{ fontSize: "14px", marginTop: "8px" }}
								data-test-name="_cvBuilderPreviewEducationSchool"
							>
								{item.school}
							</div>
						)}
					</div>
				</div>
			</div>
		))}
	</div>
);

export default Education;
