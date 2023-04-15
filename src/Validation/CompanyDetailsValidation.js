import * as yup from "yup";

let CompanyValidation = yup.object().shape({
  companyName: yup.string().required("Company Name is Required"),
  dateOfIncorporation: yup.date().required("Date of Incorporation is Required"),
  incorporationNumber: yup.string().required("Incorporation is Required"),
  websiteURL: yup.string().url().required("Website URL is Required"),
});
