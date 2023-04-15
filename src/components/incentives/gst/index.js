import axios from 'axios';
import { useField } from 'formik';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../../../pages/api/url';
import CheckAndSuccessModal from '../../CheckAndSuccessModal';
import FormikStepperReg, { FormikStep } from '../../FormikStepperReg';
import Annexure1 from './Annexure1';
import DeclarationForm from './Declaration';
import { declarationValidation, gstAnnexureValidation } from './validation';
import { useRouter } from 'next/router';
const GSTForm = (props) => {
  const [apiId, setApiId] = useState('');
  const [checkbox, setCheckBox] = useState(false);
  const [show, setShow] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastStep, setLastStep] = useState(0);
  const [successModalData, setSuccessModalData] = useState(null);
  const router = useRouter();
  const [initialValues, setInitialValues] = useState({
    gstReimbursement: {
      gstAnnexure1Part1: {
        companyName: '',
        kitsRegNo: '',
        gokSupported: '',
        nameOfTheIncubator: '',
        incubGokAffiliated: '',
        reimburseClaim: '',
        gstSupplierPaymentTo: '',
        gstTaxPayment: '',
        reimbursementClaimAmount: '',
        incubatorDetails: '',
        incubationCommenceDate: '',
        gstRegNo: '',
        supplierGstRegNo: '',
        gstPaidDoc: [],
        itrDoc: [],
        purchaseInvoiceDoc: [],
        gstCertiNo: '',
        gstCertiDate: '',
        gstCertiDoc: [],
        otherRegTaxDoc: [],
        auditedFinanceStatementDoc: [],
        totalGstClaimYear: '',
        gstOfficerNameAndAddress: '',
      },

      gstAnnexure1Part2: {
        selfDeclarationDoc1: [],
        selfDeclarationDoc2: [],
      },
    },
    status: 'Pending',
    gstcheckbox1: '',
    gstcheckbox2: '',
    gstcheckbox3: '',
  });
  const getValue = (val) => {
    setCheckBox(val);
  };
  useEffect(() => {
    setLastStep(props?.stepCount);
    setInitialValues({
      gstReimbursement: {
        gstAnnexure1Part1: {
          companyName:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.companyName) ||
            (props.gstRes &&
              props.gstRes.gstAnnexure1Part1 &&
              props.gstRes.gstAnnexure1Part1.companyName) ||
            '',
          kitsRegNo:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.certificate &&
              props.registerData.data.certificate.number) ||
            (props.gstRes &&
              props.gstRes.gstAnnexure1Part1 &&
              props.gstRes.gstAnnexure1Part1.kitsRegNo) ||
            '',
          gokSupported:
            props.gstRes &&
            props.gstRes.gstAnnexure1Part1 &&
            props.gstRes.gstAnnexure1Part1.gokSupported
              ? true
              : props.gstRes &&
                props.gstRes.gstAnnexure1Part1 &&
                !props.gstRes.gstAnnexure1Part1.gokSupported
              ? false
              : '',
          nameOfTheIncubator:
            (props.gstRes &&
              props.gstRes.gstAnnexure1Part1 &&
              props.gstRes.gstAnnexure1Part1.nameOfTheIncubator) ||
            '',
          incubGokAffiliated:
            (props.gstRes &&
              props.gstRes.gstAnnexure1Part1 &&
              props.gstRes.gstAnnexure1Part1.incubGokAffiliated) ||
            '',
          reimburseClaim:
            (props.gstRes &&
              props.gstRes.gstAnnexure1Part1 &&
              props.gstRes.gstAnnexure1Part1.reimburseClaim) ||
            '',
          gstSupplierPaymentTo:
            (props.gstRes &&
              props.gstRes.gstAnnexure1Part1 &&
              props.gstRes.gstAnnexure1Part1.gstSupplierPaymentTo) ||
            '',
          gstTaxPayment:
            (props.gstRes &&
              props.gstRes.gstAnnexure1Part1 &&
              props.gstRes.gstAnnexure1Part1.gstTaxPayment) ||
            '',
          reimbursementClaimAmount:
            (props.gstRes &&
              props.gstRes.gstAnnexure1Part1 &&
              props.gstRes.gstAnnexure1Part1.reimbursementClaimAmount) ||
            '',
          incubatorDetails:
            (props.gstRes &&
              props.gstRes.gstAnnexure1Part1 &&
              props.gstRes.gstAnnexure1Part1.incubatorDetails) ||
            '',
          incubationCommenceDate:
            (props.gstRes &&
              props.gstRes.gstAnnexure1Part1 &&
              props.gstRes.gstAnnexure1Part1.incubationCommenceDate) ||
            '',
          gstRegNo:
            (props.gstRes &&
              props.gstRes.gstAnnexure1Part1 &&
              props.gstRes.gstAnnexure1Part1.gstRegNo) ||
            '',
          supplierGstRegNo:
            (props.gstRes &&
              props.gstRes.gstAnnexure1Part1 &&
              props.gstRes.gstAnnexure1Part1.supplierGstRegNo) ||
            '',
          gstPaidDoc:
            (props.gstRes &&
              props.gstRes.gstAnnexure1Part1 &&
              props.gstRes.gstAnnexure1Part1.gstPaidDoc) ||
            [],
          itrDoc:
            (props.gstRes &&
              props.gstRes.gstAnnexure1Part1 &&
              props.gstRes.gstAnnexure1Part1.itrDoc) ||
            [],
          purchaseInvoiceDoc:
            (props.gstRes &&
              props.gstRes.gstAnnexure1Part1 &&
              props.gstRes.gstAnnexure1Part1.purchaseInvoiceDoc) ||
            [],
          gstCertiNo:
            (props.gstRes &&
              props.gstRes.gstAnnexure1Part1 &&
              props.gstRes.gstAnnexure1Part1.gstCertiNo) ||
            '',
          gstCertiDate:
            (props.gstRes &&
              props.gstRes.gstAnnexure1Part1 &&
              props.gstRes.gstAnnexure1Part1.gstCertiDate) ||
            '',
          gstCertiDoc:
            (props.gstRes &&
              props.gstRes.gstAnnexure1Part1 &&
              props.gstRes.gstAnnexure1Part1.gstCertiDoc) ||
            [],
          otherRegTaxDoc:
            (props.gstRes &&
              props.gstRes.gstAnnexure1Part1 &&
              props.gstRes.gstAnnexure1Part1.otherRegTaxDoc) ||
            [],
          auditedFinanceStatementDoc:
            (props.gstRes &&
              props.gstRes.gstAnnexure1Part1 &&
              props.gstRes.gstAnnexure1Part1.auditedFinanceStatementDoc) ||
            [],
          totalGstClaimYear:
            (props.gstRes &&
              props.gstRes.gstAnnexure1Part1 &&
              props.gstRes.gstAnnexure1Part1.totalGstClaimYear) ||
            '',
          gstOfficerNameAndAddress:
            (props.gstRes &&
              props.gstRes.gstAnnexure1Part1 &&
              props.gstRes.gstAnnexure1Part1.gstOfficerNameAndAddress) ||
            '',
        },
        gstAnnexure1Part2: {
          selfDeclarationDoc1:
            (props.gstRes &&
              props.gstRes.gstAnnexure1Part2 &&
              props.gstRes.gstAnnexure1Part2.selfDeclarationDoc1) ||
            [],
          selfDeclarationDoc2:
            (props.gstRes &&
              props.gstRes.gstAnnexure1Part2 &&
              props.gstRes.gstAnnexure1Part2.selfDeclarationDoc2) ||
            [],
        },
      },
      status: 'Pending',
      gstcheckbox1: '',
      gstcheckbox2: '',
      gstcheckbox3: '',
    });
  }, [props]);
  return (
    <FormikStepperReg
      elevate
      formTopText="GST reimbursement"
      enableReinitialize={true}
      initialValues={initialValues}
      incentive
      incentiveName="Tax (GST/CST) Incentives"
      validateOnChange
      successModalData={successModalData}
      showSuccessModal={showSuccessModal}
      setShowSuccessModal={setShowSuccessModal}
      checkbox={checkbox}
      onSubmit={async (values, helpers, step, type) => {
        if (step === 0) {
          const res =
            props.updateId || apiId
              ? await axios
                  .post(
                    `${BASE_URL}/api/v1/startup/incentive/update/${
                      apiId !== '' ? apiId : props.updateId
                    }`,
                    {
                      'gstReimbursement.gstAnnexure1Part1':
                        values.gstReimbursement.gstAnnexure1Part1,
                      lastStep: step + 1,
                      userId: props.session.id,
                      applicationId: props.session.applicationId,
                      type: 'gst',
                    },
                    {
                      headers: {
                        Authorization: 'Bearer ' + props.session.accessToken,
                      },
                    }
                  )
                  .then((res) => {
                    if (res) {
                      setApiId(res.data.data._id);
                      if (type === 'saveAndexit') {
                        router.push('/');
                      }
                      setLastStep(res.data.data.lastStep);
                    }
                  })
              : await axios
                  .post(
                    `${BASE_URL}/api/v1/startup/incentive/create/`,
                    {
                      'gstReimbursement.gstAnnexure1Part1':
                        values.gstReimbursement.gstAnnexure1Part1,
                      lastStep: step + 1,
                      userId: props.session.id,
                      applicationId: props.session.applicationId,
                      type: 'gst',
                    },
                    {
                      headers: {
                        Authorization: 'Bearer ' + props.session.accessToken,
                      },
                    }
                  )
                  .then((res) => {
                    if (res) {
                      setApiId(res.data.data._id);
                      if (type === 'saveAndexit') {
                        router.push('/');
                      }
                      setLastStep(res.data.data.lastStep);
                    }
                  });
        }

        if (step === 1) {
          if (checkbox) {
            const res = await axios
              .post(
                `${BASE_URL}/api/v1/startup/incentive/update/${
                  apiId !== '' ? apiId : props.updateId
                }`,
                {
                  'gstReimbursement.gstAnnexure1Part2':
                    values.gstReimbursement.gstAnnexure1Part2,
                  lastStep: step + 1,
                  status: 'Pending',
                },
                {
                  headers: {
                    Authorization: 'Bearer ' + props.session.accessToken,
                  },
                }
              )
              .then(async (res) => {
                if (res) {
                  setLastStep(res.data.data.lastStep);
                  await setSuccessModalData(res);
                  await setShowSuccessModal(true);
                }
              });
          } else {
            <CheckAndSuccessModal
              terms
              show={!checkbox}
              onClose={() => setShow(false)}
            />;
          }
        }
      }}
      lastStep={lastStep}
    >
      <FormikStep label="Annexure-1" validationSchema={gstAnnexureValidation}>
        <Annexure1 />
      </FormikStep>
      <FormikStep label="Declaration" validationSchema={declarationValidation}>
        <DeclarationForm
          getValue={getValue}
          checkbox={checkbox}
          initialValues={initialValues}
        />
      </FormikStep>
    </FormikStepperReg>
  );
};
export default GSTForm;
