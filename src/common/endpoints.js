const URL_AUTH = `/auth`;
const URL_STUDENT = `/students`;
const URL_ADULT = `/adults`;
const URL_AVATAR = `/avatars`;
const URL_CLASSROOMS = `/classrooms`;
const URL_FORGOT_QUESTIONS = `/forgotquestions`;
const URL_JOBS = `/jobs`;
const URL_DWELLINGS = `/dwellings`;
const URL_GAMES = `/games`;

const Endpoints = {
  getAvatars: URL_AVATAR,
  getAvatarAdjective: `${URL_AVATAR}/adjective`,
  getAllForgotQuestions: URL_FORGOT_QUESTIONS,
  getOneForgotQuestion: `${URL_FORGOT_QUESTIONS}`,
  updateForgotQuestionAnswer: `${URL_AUTH}/updateforgot`,
  registerStudent: `${URL_AUTH}/register/student`,
  registerAdult: `${URL_AUTH}/register/adult`,
  getLoggedInUser: `${URL_AUTH}/me`,
  login: `${URL_AUTH}/login`,
  logout: `${URL_AUTH}/logout`,
  retrieveForgotQuestionFromUser: `${URL_AUTH}/forgotquestion`,
  validateForgotPassword: `${URL_AUTH}/forgotpassword`,
  resetPassword: `${URL_AUTH}/resetpassword`,
  resetPasswordByEmail: `${URL_AUTH}/adult/forgotpassword`,
  resetPasswordByToken: `${URL_AUTH}/resetpassword`,
  updateAdultProfile: `${URL_AUTH}/adult/updatedetails`,
  updateStudentProfile: `${URL_AUTH}/student/updatedetails`,
  updatePassword: `${URL_AUTH}/updatepassword`,
  deleteSelf: `${URL_AUTH}/deleteaccount`,
  updateAvatar: `${URL_AUTH}/updateavatar`,
  getClassrooms: URL_CLASSROOMS,
  getSpecificClassroom: `${URL_CLASSROOMS}/single`,
  getClassroomFromStudent: `${URL_CLASSROOMS}/student`,
  resetStudentPassword: URL_ADULT,
  getStudentInfo: URL_STUDENT,
  updateStudentByAdult: `${URL_ADULT}/updatestudent`,
  updateStudentInClassroom: `${URL_CLASSROOMS}/updatestudent`,
  addStudentToClassroom: `${URL_CLASSROOMS}/addstudent`,
  deleteAllClassroomsByTeacher: `${URL_CLASSROOMS}/deleteteacher`,
  deleteSelectedStudents: `${URL_AUTH}/deletestudents`,
  deleteStudentFromClass: `${URL_CLASSROOMS}/delete/studentinclass`,
  transferStudentToDifferentClass: `${URL_CLASSROOMS}/transferstudent`,
  deleteSingleClassroomByTeacher: `${URL_CLASSROOMS}/delete`,
  createNewStudentInClassroom: `${URL_CLASSROOMS}/createstudent`,
  deleteStudent: `${URL_CLASSROOMS}/delete/student`,
  getJob: URL_JOBS,
  getDwellings: URL_DWELLINGS,
  games: URL_GAMES,
  studentGame: `${URL_STUDENT}/game`,
  addScoreToStudent: `${URL_STUDENT}/score`,
  addResultsToStudentsHistory: `${URL_STUDENT}/addgameresults`,
  validateEmail: `${URL_ADULT}/validateemail`,
};

export default Endpoints;
