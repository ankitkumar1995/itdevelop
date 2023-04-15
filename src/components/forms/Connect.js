import { Form, Formik } from 'formik';
import CustomField from './CustomFields';
const Connect = () => {
  return (
    <Formik
      initialValues={{
        company_name: '',
        full_name: '',
        mobile_number: '',
        email: '',
        message: '',
      }}
    >
      {({ values, errors, touched }) => (
        <Form>
          <div className="contact-title">
            <h3>Connect With Flipkart</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut
            </p>
          </div>
          <div className="contact-all">
            <div className="single-con-input">
              <div className="single-in-input">
                <CustomField
                  isRequired
                  id="company_name"
                  label="comapny name *"
                  placeholder="Enter text here"
                  type="text"
                  touched={touched.company_name}
                  errors={errors.company_name}
                />
              </div>
            </div>
            <div className="single-con-input">
              <div className="single-in-input">
                <CustomField
                  isRequired
                  id="full_name"
                  label="full name"
                  placeholder="Enter text here"
                  type="text"
                  touched={touched.full_name}
                  errors={errors.full_name}
                />
              </div>
            </div>
            <div className="single-con-input">
              <div className="single-in-input">
                <CustomField
                  type="text"
                  id="mobile_number"
                  label="Mobile number"
                  placeholder="Enter number here"
                  touched={touched.mobile_number}
                  errors={errors.mobile_number}
                />
              </div>
            </div>
            <div className="single-con-input">
              <div className="single-in-input">
                <CustomField
                  isRequired
                  id="Email"
                  label="email"
                  type="email"
                  touched={touched.email}
                  errors={errors.email}
                />
              </div>
            </div>
            <div className="single-con-input">
              <div className="single-in-input">
                <CustomField
                  type="textarea"
                  id="message"
                  name="message"
                  isRequired
                  label="Message"
                  col={53}
                  row={10}
                  touched={touched.message}
                  errors={errors.message}
                />
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default Connect;
