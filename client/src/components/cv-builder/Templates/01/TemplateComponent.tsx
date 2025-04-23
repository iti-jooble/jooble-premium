import Skills from "./Skills";
import Education from "./Education";
import Experience from "./Experience";
import { ITemplateComponentProps } from "../types";
import { atLeastOneFieldExists, sortExperiences } from "../utils";

import "./template.raw.css";

const TemplateComponent: React.FC<ITemplateComponentProps> = ({
	cvData,
	t,
}) => (
	<div>
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
		<link
			href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@700&display=swap"
			rel="stylesheet"
		/>
		<div className="template template-01" id="template">
			<div
				style={{ height: "100%", display: "flex", flexDirection: "column" }}
				className="overflow-auto"
			>
				<div className="pages-indication">
					<div
						style={{
							padding: "50px 55px 30px 55px",
							display: "flex",
							gap: "42px",
						}}
					>
						<div id="breakColumn" style={{ flex: "1 1" }}>
							<div>
								{(cvData.personalInfo.firstName ||
									cvData.personalInfo.lastName) && (
									<div
										style={{
											fontSize: "32px",
											lineHeight: "1 !important",
											fontWeight: "bold",
											fontFamily: "'IBM Plex Serif', serif",
										}}
									>
										<span
											style={{ lineHeight: 1.2 }}
											data-test-name="_cvBuilderPreviewFirstName"
										>
											{cvData.personalInfo.firstName}
										</span>
										{cvData.personalInfo.firstName &&
											cvData.personalInfo.lastName && (
												<span style={{ lineHeight: "1.2" }}>&nbsp;</span>
											)}
										<span
											style={{ lineHeight: 1.2 }}
											data-test-name="_cvBuilderPreviewLastName"
										>
											{cvData.personalInfo.lastName}
										</span>
									</div>
								)}
								{(cvData.personalInfo.firstName ||
									cvData.personalInfo.lastName) && (
									<div
										style={{
											width: "88px",
											borderTop: "solid 1px #A1AFC1",
											marginTop: "16px",
											height: "18px",
										}}
									/>
								)}
							</div>
							{cvData.summary && (
								<div
									className="break-block"
									id="breakBlock"
									style={{ paddingBottom: "18px" }}
								>
									<div
										dangerouslySetInnerHTML={{ __html: cvData.summary }}
										className="table-cell-content"
										style={{ fontSize: "14px" }}
										data-test-name="_cvBuilderPreviewSummary"
									/>
								</div>
							)}
							{(cvData.personalInfo.phone ||
								cvData.personalInfo.country ||
								cvData.personalInfo.city) && (
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										gap: "5px",
										fontSize: "12px",
										paddingBottom: "36px",
									}}
								>
									{cvData.personalInfo.phone && (
										<div
											style={{
												display: "flex",
												alignItems: "center",
												gap: "10px",
											}}
											data-test-name="_cvBuilderPreviewPhone"
										>
											{cvData.personalInfo.phone}
										</div>
									)}

									{cvData.personalInfo.email && (
										<div
											style={{
												display: "flex",
												alignItems: "center",
												gap: "10px",
											}}
											data-test-name="_cvBuilderPreviewEmail"
										>
											{cvData.personalInfo.email}
										</div>
									)}

									{(cvData.personalInfo.city ||
										cvData.personalInfo.country) && (
										<div
											style={{
												display: "flex",
												alignItems: "center",
												gap: "10px",
											}}
											data-test-name="_cvBuilderPreviewLocation"
										>
											<div>
												{cvData.personalInfo.city}
												{cvData.personalInfo.city &&
													cvData.personalInfo.country && <span>, </span>}
												{cvData.personalInfo.country}
											</div>
										</div>
									)}
								</div>
							)}

							{atLeastOneFieldExists(cvData.skills) && (
								<Skills data={cvData.skills.filter((item) => !!item)} t={t} />
							)}

							{atLeastOneFieldExists(cvData.experience) && (
								<Experience data={sortExperiences(cvData.experience)} t={t} />
							)}

							{atLeastOneFieldExists(cvData.education) && (
								<Education
									data={cvData.education.sort(
										(a, b) =>
											parseInt(b.startYear || "0") -
											parseInt(a.startYear || "0"),
									)}
									t={t}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
);

export default TemplateComponent;
