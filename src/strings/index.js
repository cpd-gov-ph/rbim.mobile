const auth_content = {
  IntroHeaderTitle: "Welcome to RBIM",
  SignInTitle: "Sign in to your account",
  EmailId: "Email ID",
  Password: "Password",
  ForgotPassword: "Forgot Password?",
  ForgotPasswordTitle: "Forgot password",
  RegisteredEmail:
    "Forgot your password please enter the registered email address",
  ResendCode: "Resend verification code",
  CodeVerificationTitle: "Code verification",
  VerificationCode:
    "Enter the verification code sent to the registered email address",
  ResetPasswordTitle: "Reset password",
  NewPassword: "New password",
  ConfirmPassword: "Confirm password",
  FollowInstruction: "Follow the instruction",
  logout_error: "You are logged in another device.",
  //Placeholder Text
  EnterEmailId: "Enter email address to sign in",
  EnterPassword: "Enter the password",
  EnterRegisteredEmail: "Enter the registered email address",
  EnterVerificationCode: "Enter the verification code",
  EnterNewPassword: "Enter new password",
  ConfirmNewPassword: "Confirm new password",

  //Button Text
  SignIn: "Sign in",
  SendCode: "Send verification code",
  VerifyCode: "Verify code",
  CreatePassword: "Create password",
  RBIM: "RBIM",
  RBIM_Fullform:
    "Baseline Census for the Establishment of Registry of Barangay Inhabitants and Migrants",
  Started: "Get Started",
  Password_Changed: "Password Changed!",
  Password_Success: "Your password has been changed successfully.",
  Back_Sign_in: "Back to sign in",
  Legal_Documentation: "Legal Documentation",
  Last_updated: "Last updated on ",
  Agree_Terms_and_Conditions: "I agree with Terms & conditions",
  Agree_Privacy_Policy: " I agree with Privacy Policy",
  I_Agree: "I Agree",
  PasswordLength: "Password must be at least 8 characters long.",
  PasswordInstruction: "Password should contain combination of numbers, mixture lower and upper case alphabet and special character.",
  ImprintMessage: "The Registry of Barangay Inhabitants and Migrants (RBIM) is a government-owned survey tool by the Commission on Population and Development (POPCOM), and supported by the Deutsche Gesellschaft für Internationale Zusammenarbeit (GIZ) GmbH through the Human Mobility in the Context of Climate Change (HMCCC) Project.",
  AppVersion: "App version: 147.7V",
};

// DatePicker Compoenent
const date_text = {
  placeholder: "DD/MM/YYYY",
  date_error: "Field cannot be empty",
};

//Drawer
const drawer_text = {
  survey: "Survey",
  legalDocumentation: "Legal & Documentation",
  logOut: "Log out",
  ongoingSurvey: "Ongoing survey",
  unsynchedSurvey: "Unsynched survey",
  recorrectionSurvey: "Recorrection survey",
};

const auth_error_text = {
  invaild_email: "You have entered an invalid e-mail address",
  no_email: "Please enter your e-mail to proceed",
  invaild_password:
    "Please choose a stronger password. Try a mix of letters, numbers, and symbols.",
  no_password: "Please enter your password to proceed",
  not_match: "Password do not match",
  new_password: "Please enter your new password to proceed",
};

const common_content = {
  logout_title: "Are you sure you want to logout ?",
  exit_title: "Are you sure you want to exit from current page?",
  warning_content:
    "Survey Number cannot be edited once proceed next. Are you sure want to continue?",
  cancel: "Cancel",
  ok: "Ok",
  title: "RBIM",
  exit_alert: "Are you sure you want to exit app?",
  login_again: "Are you sure you want to go back and login again?",
  change_signature: "Change the signature",
};

const note_text = {
  note_title: "Notes for review:",
};

const dropDown_text = {
  placeholder: "Select one ",
  cancel: "Cancel",
  select: "Select",
  text_input_placeholder: "For others",
};

const storage_key = {
  user_information: "USER_INFORMATION",
  survey_questions: "SURVEY_QUESTIONS",
  survey_ongoing: "SURVEY_ONGOING",
  survey_unSync: "SURVEY_UNSYNC",
  survey_reCorrection: "SURVEY_RECORRECTION",
  survey_localData: "SURVEY_LOCALDATA",
};

const survey_number = {
  survey_title: "Survey",
  number: "Number",
  num_error_text: "Please enter the valid survey ID",
  radio_error_text: "Please select any option",
  privacy_rights:
    'Lubos kong naunawaan ang layunin ng pananaliksik at Census ng baranga. Nabasa ko at pinaliwanag sa akin ang nilalaman ng kasulatian at kusang loob akong sumasangayon na makibahagi sa proyektong ito. Naunawaan kong magiging kampidensiyal ang lahat ng aking kasagutan. Gayunpaman , pinahihntulutan ko ang paggamit ng aking impormasyon ng barangay kalakip ng paggalang sa aking " data privacy rights "',
  button_text: "Next",
  no_reason: "No reasons mentioned",
  signature_validation: "Please enter signature",
};

const household_members = {
  title: "Enter number of members in household",
  field_title: "How many household members ?",
  name_error_text: "Name field is required",
  members_empty_error: "Please enter the number of household members",
  members_more_than_25: "House members can't be more than 25",
  proceed: "Proceed",
  member_limit:25,
};

const form_header = {
  notes: "Notes",
};

const form_footer = {
  previous: "Previous",
  next: "Next",
  submit: "Submit",
};

const home_text = {
  assignedTasks: "Assigned Tasks",
  noOfTasks: "No.of.Tasks",
  task: "Task",
};

const survey_form = {
  questions: "questions :",
  switchPerson: "Switch Person",
  age: "Age :",
  gender: "Gender :",
};

const notification = {
  clearAll: "Clear All",
  noData: "No data found",
};

const data_type = {
  text_box: "textbox",
  datepicker: "datepicker",
  textarea: "textarea",
  selectbox: "selectbox",
  multiselectbox: "multiselectbox",
  other_textbox: "other_textbox",
  age_picker: "age_picker",
  timepicker: "timepicker",
  other_selectbox: "other_selectbox",
  other_datepicker: "other_datepicker",
};
const age_validation = {
  BELOW_ONE_AGE: "FOR 0 TO 11 MONTH OLD",
  WOMEN_AGE: "FOR WOMEN 10 TO 54 YEARS",
  ABOVE_FIVE: "FOR 5 YRS & ABOVE",
  FIVIFTY_OLD_ABOVE_AGE: "FOR 15 YEARS OLD AND ABOVE",
  THERE_AND_TWENTY_FOUR: "FOR 3-24 YEARS OLD",
  FOR_TEN_AND_ABOVE: "FOR 10 & ABOVE",
  FOR_SIX_TEE_AND_ABOVE: "FOR 60 & ABOVE",
  FOR_EIXTEEN_AND_ABOVE: "FOR 18 & ABOVE",
  HOUSE_HOLD_MEMBERS: "FOR ALL HOUSEHOLD MEMBERS",
  FOR_MIRGRANT_TRANSIT: "FOR MIGRANTS AND TRANSIENTS",
};

const navigation_screens = {
  GetStarted: "GetStarted",
  Login: "Login",
  ForgotPassword: "ForgotPassword",
  CodeVerification: "CodeVerification",
  ResetPassword: "ResetPassword",
  PasswordChanged: "PasswordChanged",
  TermsAndConditions: "TermsAndConditions",
  Home: "Home",
  home: "home",
  Plus: "Plus",
  Profile: "Profile",
  MainScreens: "MainScreens",
  SurveyNumber: "SurveyNumber",
  OngoingSurvey: "OngoingSurvey",
  RecorrectionSurvey: "RecorrectionSurvey",
  RecorrectionSurveyNumber: "RecorrectionSurveyNumber",
  Notification: "Notification",
  LegalDocument: "LegalDocument",
  HouseholdMembers: "HouseholdMembers",
  AssignedTask: "AssignedTask",
  SwitchPerson: "SwitchPerson",
  RecorrectionSwitchPerson: "RecorrectionSwitchPerson",
  Notes: "Notes",
  RecorrectionNotes: "RecorrectionNotes",
  SurveyFormPartA: "SurveyFormPartA",
  SurveyFormPartB: "SurveyFormPartB",
  SurveyFormPartC: "SurveyFormPartC",
  VerifySignature: "VerifySignature",
  RecorrectionVerifySignature: "RecorrectionVerifySignature",
  EnterSignature: "EnterSignature",
  PauseSurvey: "PauseSurvey",
  FormSubmitPage: "FormSubmitPage",
  RecorrectionFormSubmitPage: "RecorrectionFormSubmitPage",
  RecorrectionSurveyFormPartA: "RecorrectionSurveyFormPartA",
  RecorrectionSurveyFormPartB: "RecorrectionSurveyFormPartB",
  RecorrectionSurveyFormPartC: "RecorrectionSurveyFormPartC",
  DrawerScreen: "DrawerScreen",
};

const profile = {
  my_profile: "My Profile",
  name: "Name",
  email_address: "Email address",
  phone_number: "Phone number",
  dob: "DOB",
  user_role: "User role",
  data_collector: "Data collector",
  barangay_official: "Barangay Official",
  province: "Province",
  city_municipality: "City/ Municipality",
  barangay: "Barangay",
  address: "Address",
};

const survey_questions = {
  male_or_female: "3. Is ___ male or female ?",
  migrant_and_transient: "36. Indicate if Non - migrant , Migrant or Transient ?",
  valid_ctc: "42 A. Does ___ have a valid CTC ?",
  plan_to_return_to_previous_residence: "39. Does ____ plan to return to previous residence ? When ?",
  family_planning_method: "23. What family planning method does ___  and partner currently use ?",
  when_was_born: "5. When was ___ born ?"
};


export {
  auth_content,
  date_text,
  drawer_text,
  auth_error_text,
  common_content,
  storage_key,
  note_text,
  dropDown_text,
  survey_number,
  household_members,
  form_header,
  form_footer,
  home_text,
  survey_form,
  data_type,
  age_validation,
  notification,
  navigation_screens,
  profile,
  survey_questions,
};
