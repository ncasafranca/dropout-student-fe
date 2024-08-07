export interface Prediction {
    codeStudent?: string;
    firstName?: string;
    lastName?: string;
    maritalStatus?: number;
    applicationMode?: number;
    applicationOrder?: number;
    daytimeAttendance?: number;
    previousQualification?: number;
    mothersQualification?: number;
    mothersOccupation?: number;
    fathersOccupation?: number;
    displaced?: number;
    debtor?: number;
    tuition?: number;
    gender?: number;
    scholarshipHolder?: number;
    ageAtEnrollment?: number;
    curricularUnits1stSemEvaluations?: number;
    curricularUnits1stSemGrade?: number;
    curricularUnits1stSemWithoutEvaluations?: number;
    curricularUnits2ndSemCredited?: number;
    curricularUnits2ndSemEnrolled?: number;
    curricularUnits2ndSemEvaluations?: number;
    curricularUnits2ndSemApproved?: number;
    curricularUnits2ndSemGrade?: number;
    curricularUnits2ndWithoutEvaluations?: number;
    predictRisk?: number
}