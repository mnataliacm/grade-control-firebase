export interface StudentModuleModel {
  id?: number;
  grade: string;
  level: string;
  studentId: string;
  moduleId: string;
  gradeId: string;
  classwork?: [];
  exam?: [];
}
